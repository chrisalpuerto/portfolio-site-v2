const TABS = [
  { label: "home", href: "#home" },
  { label: "work", href: "#work" },
  { label: "projects", href: "#projects" },
  { label: "about", href: "#about" },
  { label: "contact", href: "#contact" },
];

const ACTIVE = "home";

export default function Header() {
  return (
    <header className="ca-header">
      <div className="ca-header-inner">
        <nav className="ca-nav" aria-label="Primary">
          {TABS.map(({ label, href }) => {
            const isActive = label === ACTIVE;
            return (
              <a
                key={label}
                href={href}
                className={`ca-nav-link${isActive ? " is-active" : ""}`}
                aria-current={isActive ? "page" : undefined}
              >
                {label}
              </a>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
