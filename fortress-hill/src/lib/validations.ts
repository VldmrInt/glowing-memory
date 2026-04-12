import { z } from 'zod';

export const contactSchema = z.object({
  name: z.string().min(2, 'Имя должно содержать минимум 2 символа'),
  phone: z
    .string()
    .regex(
      /^\+7[\s\-]?\(?\d{3}\)?[\s\-]?\d{3}[\s\-]?\d{2}[\s\-]?\d{2}$/,
      'Введите корректный номер телефона (+7XXXXXXXXXX)',
    ),
  email: z.string().email('Введите корректный email'),
  message: z
    .string()
    .min(10, 'Сообщение должно содержать минимум 10 символов')
    .max(1000, 'Максимум 1000 символов'),
  agreement: z
    .boolean()
    .refine((val) => val === true, {
      message: 'Необходимо согласие на обработку персональных данных',
    }),
});

export type ContactFormData = z.infer<typeof contactSchema>;
