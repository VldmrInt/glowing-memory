import { Label, Text } from '@gravity-ui/uikit';
import styles from './TechnologiesBlock.module.css';

const TECH_CATEGORIES = [
  {
    id: 'frontend',
    title: '🖥️ Фронтенд-разработка',
    techs: ['HTML', 'CSS', 'JavaScript', 'React', 'Vue', 'jQuery', 'Bootstrap'],
  },
  {
    id: 'backend',
    title: '⚙️ Бэкенд-разработка',
    techs: ['PHP', 'Laravel', 'Yii', 'Python', 'Node.js'],
  },
  {
    id: 'mobile',
    title: '📱 Мобильная разработка',
    techs: ['Java'],
  },
  {
    id: 'database',
    title: '🗄️ Базы данных',
    techs: ['MySQL', 'Redis', 'PostgreSQL', 'MongoDB'],
  },
  {
    id: 'devops',
    title: '🚀 DevOps',
    techs: ['Docker', 'Kubernetes'],
  },
];

export function TechnologiesBlock() {
  return (
    <section id="technologies" className={styles.section}>
      <div className={styles.container}>
        <Text as="h2" variant="display-2" className={styles.sectionTitle}>
          Технологический стек
        </Text>

        {TECH_CATEGORIES.map((cat) => (
          <div key={cat.id} className={styles.category}>
            <Text as="h3" variant="subheader-3" className={styles.categoryTitle}>
              {cat.title}
            </Text>
            <div className={styles.labels}>
              {cat.techs.map((tech) => (
                <Label key={tech} theme="normal" size="m">
                  {tech}
                </Label>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
