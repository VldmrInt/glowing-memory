import styles from './Header.module.css';

const NAV_LINKS = [
  { href: '#services', label: 'Услуги' },
  { href: '#technologies', label: 'Технологии' },
  { href: '#portfolio', label: 'Портфолио' },
  { href: '#contact', label: 'Контакты' },
];

export function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <a href="#" className={styles.logo}>
          ФОРТРЕСС ХИЛЛ
        </a>
        <nav className={styles.nav}>
          {NAV_LINKS.map((link) => (
            <a key={link.href} href={link.href} className={styles.navLink}>
              {link.label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}
