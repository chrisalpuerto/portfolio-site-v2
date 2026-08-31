"use client";

import { useEffect, useRef, type ReactNode } from "react";

type Props = {
  id: string;
  className?: string;
  children: ReactNode;
};

/**
 * A section whose load-in animations hold until it first scrolls
 * into view. Children stay server-rendered; only the trigger is
 * client-side. The animation classes and delays are the same ones
 * the intro uses on page load — see app/styles/animate.css.
 *
 * The visible class is toggled on the node directly rather than
 * through state: this component never re-renders, and a one-shot
 * class flip is exactly the kind of external-system update an
 * effect is for.
 */
export default function RevealSection({ id, className = "", children }: Props) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reveal = () => el.classList.add("is-visible");

    if (typeof IntersectionObserver === "undefined") {
      reveal();
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          reveal();
          observer.disconnect();
        }
      },
      // Waits until the section is a little way in before firing.
      { rootMargin: "0px 0px -15% 0px" },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section id={id} ref={ref} className={`ca-reveal ${className}`}>
      {children}
    </section>
  );
}
