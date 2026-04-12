import { Card, Label, Text } from '@gravity-ui/uikit';
import styles from './PortfolioBlock.module.css';

const PROJECTS = [
  {
    id: 'proj1',
    emoji: '🛒',
    title: 'E-commerce платформа',
    description: 'Современная платформа онлайн-продаж с каталогом, корзиной и интеграцией платёжных систем.',
    technologies: ['React', 'Node.js', 'PostgreSQL', 'Docker'],
  },
  {
    id: 'proj2',
    emoji: '📦',
    title: 'Корпоративный портал',
    description: 'Внутренняя система управления задачами и документооборотом для среднего бизнеса.',
    technologies: ['PHP', 'Laravel', 'MySQL', 'Redis'],
  },
  {
    id: 'proj3',
    emoji: '📱',
    title: 'Мобильное приложение',
    description: 'Android-приложение для отслеживания заказов с push-уведомлениями и офлайн-режимом.',
    technologies: ['Java', 'MySQL', 'Docker'],
  },
];

export function PortfolioBlock() {
  return (
    <section id="portfolio" className={styles.section}>
      <div className={styles.container}>
        <Text as="h2" variant="display-2" className={styles.sectionTitle}>
          Портфолио
        </Text>
        <Text as="p" color="secondary" className={styles.sectionSubtitle}>
          Примеры выполненных проектов
        </Text>

        <div className={styles.grid}>
          {PROJECTS.map((project) => (
            <Card key={project.id} type="container" view="outlined" className={styles.card}>
              <div className={styles.placeholder}>{project.emoji}</div>
              <div className={styles.cardBody}>
                <Text as="h3" variant="header-1" className={styles.cardTitle}>
                  {project.title}
                </Text>
                <Text as="p" color="secondary" className={styles.cardDesc}>
                  {project.description}
                </Text>
                <div className={styles.techLabels}>
                  {project.technologies.map((tech) => (
                    <Label key={tech} theme="normal" size="xs">
                      {tech}
                    </Label>
                  ))}
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
