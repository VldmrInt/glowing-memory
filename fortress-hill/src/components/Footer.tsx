import { Divider, Link, Text } from '@gravity-ui/uikit';
import styles from './Footer.module.css';

export function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.grid}>
          {/* Колонка 1: Контакты */}
          <div>
            <Text as="h4" variant="subheader-3" className={styles.colTitle}>
              Контакты
            </Text>

            <div className={styles.contactRow}>
              <Text as="span" className={styles.label}>Email</Text>
              <Link href="mailto:itkostoma@yandex.ru">
                itkostoma@yandex.ru
              </Link>
            </div>

            <div className={styles.contactRow}>
              <Text as="span" className={styles.label}>Телефон</Text>
              <Link href="tel:+79303307800">
                +7 (930) 330-7800
              </Link>
            </div>

            <div className={styles.contactRow}>
              <Text as="span" className={styles.label}>Часы работы</Text>
              <Text as="span" className={styles.workHours}>Пн–Пт: 09:00 – 18:00 (МСК)</Text>
              <Text as="span" className={styles.workHours}>Сб–Вс: Выходной</Text>
            </div>
          </div>

          {/* Колонка 2: Реквизиты */}
          <div>
            <Text as="h4" variant="subheader-3" className={styles.colTitle}>
              Реквизиты
            </Text>

            <div className={styles.detailRow}>
              <Text as="p" variant="body-2">
                ООО «ФОРТРЕСС ХИЛЛ»
              </Text>
            </div>
            <div className={styles.detailRow}>
              <Text as="p" variant="body-2" color="secondary">
                156012, Костромская обл., г. Кострома,<br />
                ул. Костромская, д. 97б, помещ. 8,9
              </Text>
            </div>
            <div className={styles.detailRow}>
              <Text as="p" variant="body-2" color="secondary">
                ИНН: 4400010385
              </Text>
            </div>
            <div className={styles.detailRow}>
              <Text as="p" variant="body-2" color="secondary">
                ОКВЭД: 62.01 — Разработка программного обеспечения
              </Text>
            </div>
          </div>
        </div>

        <Divider />

        <Text as="p" variant="body-2" className={styles.copyright}>
          © 2024 ФОРТРЕСС ХИЛЛ. Все права защищены.
        </Text>
      </div>
    </footer>
  );
}
