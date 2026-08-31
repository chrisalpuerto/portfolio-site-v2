const TABS = [
  { label: "Home", href: "#home" },
  { label: "Projects", href: "#projects" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

const ACTIVE = "Home";

export default function Header() {
  return (
    <header className="ca-header">
      <div className="ca-container ca-header-inner">
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
