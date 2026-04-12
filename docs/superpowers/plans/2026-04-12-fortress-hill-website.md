# ФОРТРЕСС ХИЛЛ — One-Page Website Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a production-ready single-page website for IT company "ФОРТРЕСС ХИЛЛ" using React + Vite + TypeScript with the Gravity UI design system.

**Architecture:** Vite-powered React SPA with TypeScript, Gravity UI UIKit for all UI components, React Hook Form + Zod for contact form validation, and CSS Modules for layout styles not covered by Gravity UI. Each page section is an isolated component assembled in App.tsx.

**Tech Stack:** React 18, Vite, TypeScript 5, @gravity-ui/uikit, @gravity-ui/icons, react-hook-form, zod, CSS Modules

---

## File Map

| File | Responsibility |
|------|----------------|
| `package.json` | Dependencies and scripts |
| `vite.config.ts` | Vite + React plugin configuration |
| `tsconfig.json` | TypeScript config |
| `index.html` | HTML shell with meta SEO tags |
| `src/main.tsx` | Entry point — mounts React + ThemeProvider |
| `src/App.tsx` | Assembles all sections in order |
| `src/index.css` | Global resets + Gravity UI base styles import |
| `src/components/Header.tsx` | Sticky nav with logo + anchor links + theme toggle |
| `src/components/HeroSection.tsx` | Full-height hero with headline + CTA button |
| `src/components/ServicesBlock.tsx` | 2×2 grid of service cards |
| `src/components/TechnologiesBlock.tsx` | Tech stack badges grouped by category |
| `src/components/PortfolioBlock.tsx` | Placeholder project cards (3 items) |
| `src/components/ContactForm.tsx` | Validated contact form with mock API submit |
| `src/components/Footer.tsx` | 2-column footer: contacts + company details |
| `src/lib/validations.ts` | Zod schema for contact form |
| `src/types/index.ts` | Shared TypeScript types |

---

## Task 1: Project Scaffold

**Files:**
- Create: `package.json`
- Create: `vite.config.ts`
- Create: `tsconfig.json`
- Create: `index.html`
- Create: `src/main.tsx`
- Create: `src/App.tsx`
- Create: `src/index.css`

- [ ] **Step 1: Bootstrap Vite + React + TypeScript project**

```bash
cd C:\Users\USER\Documents\GitHub\glowing-memory
npm create vite@latest fortress-hill -- --template react-ts
cd fortress-hill
```

- [ ] **Step 2: Install Gravity UI and form dependencies**

```bash
npm install @gravity-ui/uikit @gravity-ui/icons react-hook-form zod
npm install -D @types/node
```

- [ ] **Step 3: Verify dev server starts**

```bash
npm run dev
```
Expected: Server running at `http://localhost:5173`

- [ ] **Step 4: Replace `src/index.css` with Gravity UI base styles**

```css
/* src/index.css */
@import '@gravity-ui/uikit/styles/fonts.css';
@import '@gravity-ui/uikit/styles/styles.css';

*, *::before, *::after {
  box-sizing: border-box;
}

html {
  scroll-behavior: smooth;
}

body {
  margin: 0;
  padding: 0;
}
```

- [ ] **Step 5: Replace `src/main.tsx`**

```tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import { ThemeProvider } from '@gravity-ui/uikit';
import App from './App';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider theme="dark">
      <App />
    </ThemeProvider>
  </React.StrictMode>
);
```

- [ ] **Step 6: Create placeholder `src/App.tsx`**

```tsx
export default function App() {
  return <div>ФОРТРЕСС ХИЛЛ</div>;
}
```

- [ ] **Step 7: Update `index.html` with SEO meta tags**

```html
<!DOCTYPE html>
<html lang="ru">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="description" content="ФОРТРЕСС ХИЛЛ — команда разработки e-commerce проектов в России. Веб-разработка, мобильные приложения, UX/UI дизайн." />
    <meta name="keywords" content="разработка сайтов, мобильные приложения, e-commerce, Кострома, IT компания" />
    <title>ФОРТРЕСС ХИЛЛ — IT разработка в России</title>
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
```

- [ ] **Step 8: Create `src/types/index.ts`**

```ts
export interface Service {
  id: string;
  title: string;
  description: string;
  price: string;
  icon: React.ReactNode;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  technologies: string[];
}

export interface ContactFormData {
  name: string;
  phone: string;
  email: string;
  message: string;
  agreement: boolean;
}
```

- [ ] **Step 9: Commit**

```bash
git add -A
git commit -m "feat: scaffold Vite + React + TypeScript + Gravity UI project"
```

---

## Task 2: Contact Form Validation Schema

**Files:**
- Create: `src/lib/validations.ts`

- [ ] **Step 1: Write failing test**

```bash
# Create test file
mkdir -p src/lib/__tests__
```

```ts
// src/lib/__tests__/validations.test.ts
import { contactSchema } from '../validations';

describe('contactSchema', () => {
  it('rejects empty name', () => {
    const result = contactSchema.safeParse({ name: 'a', phone: '+79991234567', email: 'a@b.com', message: 'hello world text', agreement: true });
    expect(result.success).toBe(false);
  });

  it('rejects invalid email', () => {
    const result = contactSchema.safeParse({ name: 'Иван', phone: '+79991234567', email: 'not-email', message: 'hello world text', agreement: true });
    expect(result.success).toBe(false);
  });

  it('accepts valid data', () => {
    const result = contactSchema.safeParse({
      name: 'Иван Иванов',
      phone: '+79991234567',
      email: 'ivan@example.com',
      message: 'Хочу заказать разработку сайта',
      agreement: true,
    });
    expect(result.success).toBe(true);
  });
});
```

- [ ] **Step 2: Install vitest and run test to see it fail**

```bash
npm install -D vitest @vitest/ui
```

Add to `vite.config.ts`:
```ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
  },
});
```

Add to `package.json` scripts:
```json
"test": "vitest run"
```

```bash
npm test
```
Expected: FAIL — `contactSchema` not found

- [ ] **Step 3: Implement `src/lib/validations.ts`**

```ts
import { z } from 'zod';

export const contactSchema = z.object({
  name: z.string().min(2, 'Имя должно содержать минимум 2 символа'),
  phone: z
    .string()
    .regex(/^\+7[\s\-]?\(?\d{3}\)?[\s\-]?\d{3}[\s\-]?\d{2}[\s\-]?\d{2}$/, 'Введите корректный номер телефона (+7XXXXXXXXXX)'),
  email: z.string().email('Введите корректный email'),
  message: z.string().min(10, 'Сообщение должно содержать минимум 10 символов').max(1000, 'Максимум 1000 символов'),
  agreement: z.literal(true, { errorMap: () => ({ message: 'Необходимо согласие на обработку данных' }) }),
});

export type ContactFormData = z.infer<typeof contactSchema>;
```

- [ ] **Step 4: Run tests and verify they pass**

```bash
npm test
```
Expected: PASS — 3 tests

- [ ] **Step 5: Commit**

```bash
git add src/lib/validations.ts src/lib/__tests__/validations.test.ts vite.config.ts package.json
git commit -m "feat: add Zod contact form validation schema with tests"
```

---

## Task 3: Header Component

**Files:**
- Create: `src/components/Header.tsx`
- Create: `src/components/Header.module.css`

- [ ] **Step 1: Create `src/components/Header.module.css`**

```css
.header {
  position: sticky;
  top: 0;
  z-index: 100;
  background-color: var(--g-color-base-background);
  border-bottom: 1px solid var(--g-color-line-generic);
  backdrop-filter: blur(8px);
}

.inner {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 24px;
  height: 64px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.logo {
  font-weight: 700;
  font-size: 20px;
  color: var(--g-color-text-primary);
  text-decoration: none;
}

.nav {
  display: flex;
  gap: 32px;
  align-items: center;
}

.navLink {
  color: var(--g-color-text-secondary);
  text-decoration: none;
  font-size: 14px;
  transition: color 0.2s;
}

.navLink:hover {
  color: var(--g-color-text-primary);
}

@media (max-width: 640px) {
  .nav {
    display: none;
  }
}
```

- [ ] **Step 2: Create `src/components/Header.tsx`**

```tsx
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
```

- [ ] **Step 3: Add Header to `src/App.tsx`**

```tsx
import { Header } from './components/Header';

export default function App() {
  return (
    <>
      <Header />
      <main>
        <div style={{ padding: '100px 24px', textAlign: 'center' }}>Контент скоро...</div>
      </main>
    </>
  );
}
```

- [ ] **Step 4: Verify in browser**

```bash
npm run dev
```
Expected: Sticky header with logo and nav links

- [ ] **Step 5: Commit**

```bash
git add src/components/Header.tsx src/components/Header.module.css src/App.tsx
git commit -m "feat: add sticky Header with navigation links"
```

---

## Task 4: Hero Section

**Files:**
- Create: `src/components/HeroSection.tsx`
- Create: `src/components/HeroSection.module.css`

- [ ] **Step 1: Create `src/components/HeroSection.module.css`**

```css
.hero {
  min-height: calc(100vh - 64px);
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, var(--g-color-base-background) 0%, var(--g-color-base-generic) 100%);
  padding: 80px 24px;
  text-align: center;
}

.content {
  max-width: 800px;
  margin: 0 auto;
}

.title {
  margin-bottom: 24px !important;
}

.subtitle {
  margin-bottom: 40px !important;
  display: block;
}

.badge {
  margin-bottom: 32px !important;
}
```

- [ ] **Step 2: Create `src/components/HeroSection.tsx`**

```tsx
import { Button, Text } from '@gravity-ui/uikit';
import styles from './HeroSection.module.css';

export function HeroSection() {
  return (
    <section id="hero" className={styles.hero}>
      <div className={styles.content}>
        <Text
          as="h1"
          variant="display-1"
          className={styles.title}
        >
          Мы команда разработки<br />e-commerce проектов в России
        </Text>
        <Text
          as="p"
          variant="subheader-3"
          color="secondary"
          className={styles.subtitle}
        >
          Профессиональная разработка и поддержка веб и мобильных приложений.
          Более 10 лет опыта в создании цифровых продуктов.
        </Text>
        <Button
          href="#services"
          size="xl"
          view="action"
        >
          Наши услуги
        </Button>
      </div>
    </section>
  );
}
```

- [ ] **Step 3: Add HeroSection to `src/App.tsx`**

```tsx
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';

export default function App() {
  return (
    <>
      <Header />
      <main>
        <HeroSection />
      </main>
    </>
  );
}
```

- [ ] **Step 4: Verify in browser — hero fills viewport with headline and button**

```bash
npm run dev
```

- [ ] **Step 5: Commit**

```bash
git add src/components/HeroSection.tsx src/components/HeroSection.module.css src/App.tsx
git commit -m "feat: add Hero section with headline and CTA button"
```

---

## Task 5: Services Block

**Files:**
- Create: `src/components/ServicesBlock.tsx`
- Create: `src/components/ServicesBlock.module.css`

- [ ] **Step 1: Create `src/components/ServicesBlock.module.css`**

```css
.section {
  padding: 96px 24px;
  background-color: var(--g-color-base-background);
}

.container {
  max-width: 1200px;
  margin: 0 auto;
}

.sectionTitle {
  text-align: center;
  margin-bottom: 56px !important;
}

.grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 24px;
  margin-bottom: 48px;
}

.card {
  padding: 32px !important;
}

.cardIcon {
  font-size: 40px;
  margin-bottom: 16px;
  line-height: 1;
}

.cardTitle {
  margin-bottom: 12px !important;
}

.cardDesc {
  margin-bottom: 16px !important;
}

.price {
  display: inline-block;
  color: var(--g-color-text-brand);
  font-weight: 600;
}

.ctaRow {
  text-align: center;
}

@media (max-width: 640px) {
  .grid {
    grid-template-columns: 1fr;
  }
}
```

- [ ] **Step 2: Create `src/components/ServicesBlock.tsx`**

```tsx
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
            <Card key={service.id} className={styles.card}>
              <div className={styles.cardIcon}>{service.icon}</div>
              <Text as="h3" variant="header-2" className={styles.cardTitle}>
                {service.title}
              </Text>
              <Text as="p" color="secondary" className={styles.cardDesc}>
                {service.description}
              </Text>
              <Text as="span" variant="subheader-2" className={styles.price}>
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
```

- [ ] **Step 3: Add ServicesBlock to `src/App.tsx`**

```tsx
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { ServicesBlock } from './components/ServicesBlock';

export default function App() {
  return (
    <>
      <Header />
      <main>
        <HeroSection />
        <ServicesBlock />
      </main>
    </>
  );
}
```

- [ ] **Step 4: Verify 2×2 cards render correctly in browser**

- [ ] **Step 5: Commit**

```bash
git add src/components/ServicesBlock.tsx src/components/ServicesBlock.module.css src/App.tsx
git commit -m "feat: add Services section with 4 service cards"
```

---

## Task 6: Technologies Block

**Files:**
- Create: `src/components/TechnologiesBlock.tsx`
- Create: `src/components/TechnologiesBlock.module.css`

- [ ] **Step 1: Create `src/components/TechnologiesBlock.module.css`**

```css
.section {
  padding: 96px 24px;
  background-color: var(--g-color-base-generic);
}

.container {
  max-width: 900px;
  margin: 0 auto;
}

.sectionTitle {
  text-align: center;
  margin-bottom: 56px !important;
}

.category {
  margin-bottom: 40px;
}

.categoryTitle {
  margin-bottom: 16px !important;
}

.badges {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}
```

- [ ] **Step 2: Create `src/components/TechnologiesBlock.tsx`**

```tsx
import { Badge, Text } from '@gravity-ui/uikit';
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
            <div className={styles.badges}>
              {cat.techs.map((tech) => (
                <Badge key={tech} theme="normal" size="m">
                  {tech}
                </Badge>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
```

- [ ] **Step 3: Add TechnologiesBlock to `src/App.tsx`**

```tsx
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { ServicesBlock } from './components/ServicesBlock';
import { TechnologiesBlock } from './components/TechnologiesBlock';

export default function App() {
  return (
    <>
      <Header />
      <main>
        <HeroSection />
        <ServicesBlock />
        <TechnologiesBlock />
      </main>
    </>
  );
}
```

- [ ] **Step 4: Commit**

```bash
git add src/components/TechnologiesBlock.tsx src/components/TechnologiesBlock.module.css src/App.tsx
git commit -m "feat: add Technologies section with categorized tech stack badges"
```

---

## Task 7: Portfolio Block

**Files:**
- Create: `src/components/PortfolioBlock.tsx`
- Create: `src/components/PortfolioBlock.module.css`

- [ ] **Step 1: Create `src/components/PortfolioBlock.module.css`**

```css
.section {
  padding: 96px 24px;
  background-color: var(--g-color-base-background);
}

.container {
  max-width: 1200px;
  margin: 0 auto;
}

.sectionTitle {
  text-align: center;
  margin-bottom: 16px !important;
}

.sectionSubtitle {
  text-align: center;
  margin-bottom: 56px !important;
  display: block;
}

.grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
}

.card {
  overflow: hidden;
}

.placeholder {
  width: 100%;
  height: 200px;
  background-color: var(--g-color-base-generic);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 48px;
}

.cardBody {
  padding: 24px;
}

.cardTitle {
  margin-bottom: 8px !important;
}

.cardDesc {
  margin-bottom: 16px !important;
}

.techBadges {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

@media (max-width: 768px) {
  .grid {
    grid-template-columns: 1fr;
  }
}
```

- [ ] **Step 2: Create `src/components/PortfolioBlock.tsx`**

```tsx
import { Badge, Card, Text } from '@gravity-ui/uikit';
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
            <Card key={project.id} className={styles.card}>
              <div className={styles.placeholder}>{project.emoji}</div>
              <div className={styles.cardBody}>
                <Text as="h3" variant="header-1" className={styles.cardTitle}>
                  {project.title}
                </Text>
                <Text as="p" color="secondary" className={styles.cardDesc}>
                  {project.description}
                </Text>
                <div className={styles.techBadges}>
                  {project.technologies.map((tech) => (
                    <Badge key={tech} theme="normal" size="s">
                      {tech}
                    </Badge>
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
```

- [ ] **Step 3: Add PortfolioBlock to `src/App.tsx`**

```tsx
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { ServicesBlock } from './components/ServicesBlock';
import { TechnologiesBlock } from './components/TechnologiesBlock';
import { PortfolioBlock } from './components/PortfolioBlock';

export default function App() {
  return (
    <>
      <Header />
      <main>
        <HeroSection />
        <ServicesBlock />
        <TechnologiesBlock />
        <PortfolioBlock />
      </main>
    </>
  );
}
```

- [ ] **Step 4: Commit**

```bash
git add src/components/PortfolioBlock.tsx src/components/PortfolioBlock.module.css src/App.tsx
git commit -m "feat: add Portfolio section with placeholder project cards"
```

---

## Task 8: Contact Form

**Files:**
- Create: `src/components/ContactForm.tsx`
- Create: `src/components/ContactForm.module.css`

- [ ] **Step 1: Create `src/components/ContactForm.module.css`**

```css
.section {
  padding: 96px 24px;
  background-color: var(--g-color-base-generic);
}

.container {
  max-width: 640px;
  margin: 0 auto;
}

.sectionTitle {
  text-align: center;
  margin-bottom: 12px !important;
}

.sectionSubtitle {
  text-align: center;
  margin-bottom: 40px !important;
  display: block;
}

.card {
  padding: 40px !important;
}

.fieldGroup {
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-bottom: 24px;
}

.field {
  width: 100%;
}

.agreement {
  margin-bottom: 24px;
}

.alertBox {
  margin-bottom: 20px;
}
```

- [ ] **Step 2: Create `src/components/ContactForm.tsx`**

```tsx
import { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Alert, Button, Card, Checkbox, Text, TextInput, TextArea } from '@gravity-ui/uikit';
import { contactSchema, ContactFormData } from '../lib/validations';
import styles from './ContactForm.module.css';

async function mockSubmit(data: ContactFormData): Promise<void> {
  await new Promise((resolve) => setTimeout(resolve, 800));
  console.log('Form submitted:', data);
  // Replace with real API call: await fetch('/api/contact', { method: 'POST', body: JSON.stringify(data) })
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
    defaultValues: { name: '', phone: '', email: '', message: '', agreement: false },
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

        <Card className={styles.card}>
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
                message="Пожалуйста, попробуйте ещё раз или напишите нам на itkostoma@yandex.ru"
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

            <div className={styles.agreement}>
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
```

- [ ] **Step 3: Install `@hookform/resolvers`**

```bash
npm install @hookform/resolvers
```

- [ ] **Step 4: Add ContactForm to `src/App.tsx`**

```tsx
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { ServicesBlock } from './components/ServicesBlock';
import { TechnologiesBlock } from './components/TechnologiesBlock';
import { PortfolioBlock } from './components/PortfolioBlock';
import { ContactForm } from './components/ContactForm';

export default function App() {
  return (
    <>
      <Header />
      <main>
        <HeroSection />
        <ServicesBlock />
        <TechnologiesBlock />
        <PortfolioBlock />
        <ContactForm />
      </main>
    </>
  );
}
```

- [ ] **Step 5: Verify form validation in browser**

Submit empty form — expect field errors.
Submit with valid data — expect success alert.

- [ ] **Step 6: Commit**

```bash
git add src/components/ContactForm.tsx src/components/ContactForm.module.css src/App.tsx package.json package-lock.json
git commit -m "feat: add validated Contact Form with React Hook Form + Zod"
```

---

## Task 9: Footer

**Files:**
- Create: `src/components/Footer.tsx`
- Create: `src/components/Footer.module.css`

- [ ] **Step 1: Create `src/components/Footer.module.css`**

```css
.footer {
  background-color: var(--g-color-base-misc-heavy-solid);
  color: var(--g-color-text-inverted-primary);
  padding: 64px 24px 24px;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
}

.grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 48px;
  margin-bottom: 48px;
}

.colTitle {
  margin-bottom: 20px !important;
  color: var(--g-color-text-inverted-primary) !important;
}

.contactRow {
  margin-bottom: 12px;
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.label {
  color: var(--g-color-text-inverted-secondary) !important;
  font-size: 12px;
}

.detailRow {
  margin-bottom: 8px;
}

.divider {
  margin: 0 0 20px !important;
  border-color: rgba(255,255,255,0.15) !important;
}

.copyright {
  text-align: center;
  color: var(--g-color-text-inverted-secondary) !important;
}

@media (max-width: 640px) {
  .grid {
    grid-template-columns: 1fr;
  }
}
```

- [ ] **Step 2: Create `src/components/Footer.tsx`**

```tsx
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
              <Link href="mailto:itkostoma@yandex.ru" target="_blank">
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
              <Text as="span" color="inverted-secondary">Пн–Пт: 09:00 – 18:00 (МСК)</Text>
              <Text as="span" color="inverted-secondary">Сб–Вс: Выходной</Text>
            </div>
          </div>

          {/* Колонка 2: Реквизиты */}
          <div>
            <Text as="h4" variant="subheader-3" className={styles.colTitle}>
              Реквизиты
            </Text>

            <div className={styles.detailRow}>
              <Text as="p" color="inverted-primary" variant="body-2">
                ООО «ФОРТРЕСС ХИЛЛ»
              </Text>
            </div>

            <div className={styles.detailRow}>
              <Text as="p" color="inverted-secondary" variant="body-2">
                156012, Костромская обл., г. Кострома,<br />
                ул. Костромская, д. 97б, помещ. 8,9
              </Text>
            </div>

            <div className={styles.detailRow}>
              <Text as="p" color="inverted-secondary" variant="body-2">
                ИНН: 4400010385
              </Text>
            </div>

            <div className={styles.detailRow}>
              <Text as="p" color="inverted-secondary" variant="body-2">
                ОКВЭД: 62.01 — Разработка программного обеспечения
              </Text>
            </div>
          </div>
        </div>

        <Divider className={styles.divider} />

        <Text as="p" className={styles.copyright}>
          © 2024 ФОРТРЕСС ХИЛЛ. Все права защищены.
        </Text>
      </div>
    </footer>
  );
}
```

- [ ] **Step 3: Add Footer to `src/App.tsx`**

```tsx
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { ServicesBlock } from './components/ServicesBlock';
import { TechnologiesBlock } from './components/TechnologiesBlock';
import { PortfolioBlock } from './components/PortfolioBlock';
import { ContactForm } from './components/ContactForm';
import { Footer } from './components/Footer';

export default function App() {
  return (
    <>
      <Header />
      <main>
        <HeroSection />
        <ServicesBlock />
        <TechnologiesBlock />
        <PortfolioBlock />
        <ContactForm />
      </main>
      <Footer />
    </>
  );
}
```

- [ ] **Step 4: Verify footer renders with correct data**

- [ ] **Step 5: Commit**

```bash
git add src/components/Footer.tsx src/components/Footer.module.css src/App.tsx
git commit -m "feat: add Footer with contacts and company details"
```

---

## Task 10: Build Verification

**Files:** No new files

- [ ] **Step 1: Run all tests**

```bash
npm test
```
Expected: All tests pass (validation schema tests)

- [ ] **Step 2: Run production build**

```bash
npm run build
```
Expected: `dist/` directory created, no TypeScript errors

- [ ] **Step 3: Preview production build**

```bash
npm run preview
```
Expected: Site works at `http://localhost:4173`

- [ ] **Step 4: Check for TypeScript errors**

```bash
npx tsc --noEmit
```
Expected: No errors output

- [ ] **Step 5: Final commit**

```bash
git add -A
git commit -m "chore: verify build passes, all sections complete"
```

---

## Spec Coverage Check

| Spec Requirement | Task |
|-----------------|------|
| Hero Section — заголовок + кнопка «Услуги» | Task 4 |
| 4 карточки услуг с ценами | Task 5 |
| Технологический стек (5 категорий) | Task 6 |
| Портфолио — 3 placeholder карточки | Task 7 |
| Форма: имя, телефон, email, сообщение, checkbox | Task 8 |
| Zod валидация | Task 2 + Task 8 |
| Footer: контакты + реквизиты (ИНН, адрес, ОКВЭД) | Task 9 |
| Gravity UI ThemeProvider | Task 1 |
| TypeScript | Task 1 |
| SEO meta tags | Task 1 |
| Sticky header + навигация по якорям | Task 3 |
| Адаптивный дизайн (mobile breakpoints) | Tasks 5, 7, 9 |
