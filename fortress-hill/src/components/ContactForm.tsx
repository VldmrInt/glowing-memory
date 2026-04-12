import { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Alert, Button, Card, Checkbox, Text, TextInput, TextArea } from '@gravity-ui/uikit';
import { contactSchema } from '../lib/validations';
import type { ContactFormData } from '../lib/validations';
import styles from './ContactForm.module.css';

async function mockSubmit(_data: ContactFormData): Promise<void> {
  await new Promise((resolve) => setTimeout(resolve, 800));
  // Replace with: await fetch('/api/contact', { method: 'POST', body: JSON.stringify(data) })
}

export function ContactForm() {
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: '',
      phone: '',
      email: '',
      message: '',
      agreement: false,
    },
  });

  const onSubmit = async (data: ContactFormData) => {
    try {
      await mockSubmit(data);
      setSubmitStatus('success');
      reset();
    } catch {
      setSubmitStatus('error');
    }
  };

  return (
    <section id="contact" className={styles.section}>
      <div className={styles.container}>
        <Text as="h2" variant="display-2" className={styles.sectionTitle}>
          Свяжитесь с нами
        </Text>
        <Text as="p" color="secondary" className={styles.sectionSubtitle}>
          Заполните форму и мы свяжемся с вами в ближайшее время
        </Text>

        <Card type="container" view="outlined" className={styles.card}>
          {submitStatus === 'success' && (
            <div className={styles.alertBox}>
              <Alert
                theme="success"
                title="Сообщение отправлено!"
                message="Спасибо! Мы свяжемся с вами в ближайшее время."
              />
            </div>
          )}
          {submitStatus === 'error' && (
            <div className={styles.alertBox}>
              <Alert
                theme="danger"
                title="Ошибка отправки"
                message="Пожалуйста, попробуйте ещё раз или напишите на itkostoma@yandex.ru"
              />
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} noValidate>
            <div className={styles.fieldGroup}>
              <Controller
                name="name"
                control={control}
                render={({ field }) => (
                  <TextInput
                    {...field}
                    className={styles.field}
                    label="Имя"
                    placeholder="Ваше имя"
                    size="l"
                    error={errors.name?.message}
                    validationState={errors.name ? 'invalid' : undefined}
                  />
                )}
              />

              <Controller
                name="phone"
                control={control}
                render={({ field }) => (
                  <TextInput
                    {...field}
                    className={styles.field}
                    label="Телефон"
                    placeholder="+7 (XXX) XXX-XX-XX"
                    type="tel"
                    size="l"
                    error={errors.phone?.message}
                    validationState={errors.phone ? 'invalid' : undefined}
                  />
                )}
              />

              <Controller
                name="email"
                control={control}
                render={({ field }) => (
                  <TextInput
                    {...field}
                    className={styles.field}
                    label="Email"
                    placeholder="ваш@email.com"
                    type="email"
                    size="l"
                    error={errors.email?.message}
                    validationState={errors.email ? 'invalid' : undefined}
                  />
                )}
              />

              <Controller
                name="message"
                control={control}
                render={({ field }) => (
                  <TextArea
                    {...field}
                    className={styles.field}
                    placeholder="Расскажите о вашем проекте..."
                    minRows={5}
                    size="l"
                    error={errors.message?.message}
                    validationState={errors.message ? 'invalid' : undefined}
                  />
                )}
              />
            </div>

            <div className={styles.agreementRow}>
              <Controller
                name="agreement"
                control={control}
                render={({ field }) => (
                  <Checkbox
                    checked={field.value}
                    onChange={(e) => field.onChange(e.target.checked)}
                    content={
                      <Text as="span" variant="body-1">
                        Я согласен(а) с{' '}
                        <a href="#" style={{ color: 'var(--g-color-text-link)' }}>
                          обработкой персональных данных
                        </a>
                      </Text>
                    }
                  />
                )}
              />
            </div>

            <Button
              type="submit"
              size="l"
              view="action"
              loading={isSubmitting}
              width="max"
            >
              Отправить
            </Button>
          </form>
        </Card>
      </div>
    </section>
  );
}
