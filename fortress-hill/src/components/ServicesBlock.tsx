import { Button, Card, Text } from '@gravity-ui/uikit';
import styles from './ServicesBlock.module.css';

const SERVICES = [
  {
    id: 'web',
    icon: '🌐',
    title: 'Разработка веб-ПО',
    description: 'Создание современных веб-приложений и корпоративных порталов любой сложности.',
    price: 'от 1 000 ₽',
  },
  {
    id: 'mobile',
    icon: '📱',
    title: 'Разработка мобильных приложений',
    description: 'Нативные и кросс-платформенные приложения для Android и iOS.',
    price: 'от 1 000 ₽',
  },
  {
    id: 'support',
    icon: '🔧',
    title: 'Техническая поддержка',
    description: 'Сопровождение, обновление и оперативное устранение неполадок вашего проекта.',
    price: 'от 500 ₽',
  },
  {
    id: 'design',
    icon: '🎨',
    title: 'UX/UI дизайн',
    description: 'Проектирование удобных интерфейсов, прототипирование и создание дизайн-систем.',
    price: 'от 850 ₽',
  },
];

export function ServicesBlock() {
  return (
    <section id="services" className={styles.section}>
      <div className={styles.container}>
        <Text as="h2" variant="display-2" className={styles.sectionTitle}>
          Наши услуги
        </Text>

        <div className={styles.grid}>
          {SERVICES.map((service) => (
            <Card key={service.id} type="container" view="outlined" className={styles.card}>
              <div className={styles.cardIcon}>{service.icon}</div>
              <Text as="h3" variant="header-2" className={styles.cardTitle}>
                {service.title}
              </Text>
              <Text as="p" color="secondary" className={styles.cardDesc}>
                {service.description}
              </Text>
              <Text variant="subheader-2" className={styles.price}>
                {service.price}
              </Text>
            </Card>
          ))}
        </div>

        <div className={styles.ctaRow}>
          <Button href="#contact" size="xl" view="action">
            Связаться с нами
          </Button>
        </div>
      </div>
    </section>
  );
}
