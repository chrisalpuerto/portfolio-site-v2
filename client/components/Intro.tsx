import Image from "next/image";

export default function Intro() {
  return (
    <section id="home" className="ca-container ca-intro">
      <div>
        <h1 className="ca-intro-name ca-animate-element ca-animate-delay-100">
          Chris Alpuerto<span className="ca-intro-name-dot">.</span>
        </h1>
        <p className="ca-intro-desc ca-animate-element ca-animate-delay-200">
          Full stack software engineer focused on backend systems, cloud,
          DevOps, infrastructure, automation, and building with AI.
        </p>
      </div>

      {/* The entrance animation and the idle drift both animate
          `transform`, so they sit on separate elements. */}
      <div className="ca-intro-art ca-animate-mark ca-animate-delay-400">
        <Image
          className="ca-laptop-idle"
          src="/8bit-computer.gif"
          alt=""
          width={520}
          height={520}
          sizes="(max-width: 767px) 150px, 300px"
          quality={90}
          loading="eager"
          fetchPriority="high"
        />
      </div>
    </section>
  );
}
