import { Button, Text } from '@gravity-ui/uikit';
import styles from './HeroSection.module.css';

export function HeroSection() {
  return (
    <section id="hero" className={styles.hero}>
      <div className={styles.content}>
        <Text as="h1" variant="display-2" className={styles.title}>
          Мы команда разработки<br />e-commerce проектов в России
        </Text>
        <Text as="p" variant="subheader-3" color="secondary" className={styles.subtitle}>
          Профессиональная разработка и поддержка веб и мобильных приложений.
          Более 10 лет опыта в создании цифровых продуктов.
        </Text>
        <Button href="#services" size="xl" view="action">
          Наши услуги
        </Button>
      </div>
    </section>
  );
}
