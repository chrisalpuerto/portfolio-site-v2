import Image from "next/image";

type Props = {
  /** 1-based; rendered zero-padded as the ghosted numeral. */
  index: number;
  title: string;
  description: string;
  /** Omit to render the "image coming soon" panel in its place. */
  image?: { src: string; alt: string };
  className?: string;
};

export default function ProjectCard({
  index,
  title,
  description,
  image,
  className = "",
}: Props) {
  return (
    <article className={`ca-project ${className}`}>
      <span className="ca-project-number" aria-hidden="true">
        {String(index).padStart(2, "0")}
      </span>

      <div className="ca-project-content">
        <h3 className="ca-project-title">{title}</h3>
        <p className="ca-project-desc">{description}</p>

        <div className="ca-project-media">
          {image ? (
            <Image
              src={image.src}
              alt={image.alt}
              fill
              sizes="(max-width: 767px) 100vw, 435px"
              className="ca-project-image"
            />
          ) : (
            <span className="ca-project-placeholder">image coming soon</span>
          )}
        </div>
      </div>
    </article>
  );
}
