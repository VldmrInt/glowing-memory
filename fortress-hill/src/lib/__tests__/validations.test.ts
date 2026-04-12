import { describe, it, expect } from 'vitest';
import { contactSchema } from '../validations';

const VALID_DATA = {
  name: 'Иван Иванов',
  phone: '+79991234567',
  email: 'ivan@example.com',
  message: 'Хочу заказать разработку сайта',
  agreement: true as const,
};

describe('contactSchema', () => {
  it('accepts valid data', () => {
    const result = contactSchema.safeParse(VALID_DATA);
    expect(result.success).toBe(true);
  });

  it('rejects name shorter than 2 chars', () => {
    const result = contactSchema.safeParse({ ...VALID_DATA, name: 'а' });
    expect(result.success).toBe(false);
  });

  it('rejects invalid email', () => {
    const result = contactSchema.safeParse({ ...VALID_DATA, email: 'not-an-email' });
    expect(result.success).toBe(false);
  });

  it('rejects invalid phone', () => {
    const result = contactSchema.safeParse({ ...VALID_DATA, phone: '89001234567' });
    expect(result.success).toBe(false);
  });

  it('rejects message shorter than 10 chars', () => {
    const result = contactSchema.safeParse({ ...VALID_DATA, message: 'Привет' });
    expect(result.success).toBe(false);
  });

  it('rejects unchecked agreement', () => {
    const result = contactSchema.safeParse({ ...VALID_DATA, agreement: false });
    expect(result.success).toBe(false);
  });
});
