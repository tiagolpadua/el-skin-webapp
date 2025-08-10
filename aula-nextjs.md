# Aula: Next.js - Framework React para Produção

**Duração:** 1h 30min  
**Objetivo:** Compreender os conceitos fundamentais do Next.js e avaliar os benefícios de migrar do Create React App

---

## 📚 **MÓDULO 1: Introdução ao Next.js** _(20 min)_

### O que é Next.js?

Next.js é um **framework React de produção** que oferece:

- **Server-Side Rendering (SSR)**
- **Static Site Generation (SSG)**
- **Roteamento baseado em arquivos**
- **API Routes integradas**
- **Otimizações automáticas de performance**

### História e Evolução

- **2016**: Criado pela Vercel (antiga Zeit)
- **2018**: Next.js 7 - Dynamic Import
- **2020**: Next.js 10 - Image Optimization
- **2022**: Next.js 13 - App Router
- **2024**: Next.js 15 - React 19 Support

### Comparação: SPA vs SSR vs SSG

| Característica          | SPA (CRA)   | SSR (Next.js)    | SSG (Next.js)   |
| ----------------------- | ----------- | ---------------- | --------------- |
| **Renderização**        | Cliente     | Servidor         | Build time      |
| **SEO**                 | ❌ Limitado | ✅ Excelente     | ✅ Excelente    |
| **Performance inicial** | ❌ Lenta    | ✅ Rápida        | ✅ Muito rápida |
| **Interatividade**      | ✅ Imediata | ⚠️ Hidratação    | ⚠️ Hidratação   |
| **Hosting**             | CDN simples | Servidor Node.js | CDN simples     |

---

## 🏗️ **MÓDULO 2: Arquitetura e Conceitos Core** _(25 min)_

### 1. Sistema de Roteamento

#### Pages Router (Tradicional)

```txt
pages/
  index.js          → /
  about.js          → /about
  products/
    index.js        → /products
    [id].js         → /products/123
    [...slug].js    → /products/a/b/c
```

#### App Router (Next.js 13+) - **Recomendado**

```txt
app/
  page.tsx          → /
  about/
    page.tsx        → /about
  products/
    page.tsx        → /products
    [id]/
      page.tsx      → /products/123
  layout.tsx        → Layout compartilhado
```

### 2. Estratégias de Renderização

#### Static Site Generation (SSG)

```typescript
// Gera páginas estáticas no build
export async function getStaticProps() {
  const data = await fetchData();
  return {
    props: { data },
    revalidate: 60, // ISR - Revalida a cada 60s
  };
}
```

#### Server-Side Rendering (SSR)

```typescript
// Renderiza no servidor a cada request
export async function getServerSideProps() {
  const data = await fetchData();
  return {
    props: { data },
  };
}
```

#### App Router - Server Components

```typescript
// app/products/page.tsx
async function ProductsPage() {
  const products = await fetch("api/products").then((r) => r.json());

  return (
    <div>
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
```

### 3. API Routes

#### Pages Router

```typescript
// pages/api/products.ts
import { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    res.json({ products: [] });
  }
}
```

#### App Router

```typescript
// app/api/products/route.ts
export async function GET() {
  const products = await fetchProducts();
  return Response.json(products);
}

export async function POST(request: Request) {
  const data = await request.json();
  // Process data
  return Response.json({ success: true });
}
```

### 4. Otimizações Automáticas

```typescript
import Image from 'next/image';
import Link from 'next/link';
import { Inter } from 'next/font/google';

// Otimização de fontes
const inter = Inter({ subsets: ['latin'] });

// Otimização de imagens
<Image
  src="/product.jpg"
  alt="Product"
  width={300}
  height={200}
  priority // Para above-the-fold
/>

// Prefetch automático de links
<Link href="/products" prefetch={true}>
  Produtos
</Link>
```

---

## ⚖️ **MÓDULO 3: Create React App vs Next.js** _(20 min)_

### Limitações do Create React App

| Problema        | CRA                               | Next.js                    |
| --------------- | --------------------------------- | -------------------------- |
| **SEO**         | JavaScript renderizado no cliente | SSR/SSG nativos            |
| **Performance** | Bundle único grande               | Code splitting automático  |
| **Roteamento**  | React Router (extra)              | File-based routing         |
| **API**         | Backend separado necessário       | API Routes integradas      |
| **Deploy**      | Build estático simples            | Múltiplas opções de deploy |
| **Otimizações** | Manuais                           | Automáticas                |

### Comparação Prática

#### CRA - Estrutura Típica

```txt
src/
  components/
    Header.tsx
    Footer.tsx
    ProductCard.tsx
  pages/
    Home.tsx
    About.tsx
    Products.tsx
  services/
    api.ts
  App.tsx
  index.tsx

+ React Router
+ Estado global (Redux/Context)
+ Build configuration manual
```

#### Next.js - Estrutura

```txt
app/
  page.tsx                 # Home
  about/page.tsx          # About
  products/page.tsx       # Products
  api/
    products/route.ts     # API integrada
  layout.tsx              # Layout global

src/
  components/             # Componentes reutilizáveis

+ Roteamento automático
+ API integrada
+ Otimizações automáticas
```

### Migração Real - Exemplo do Projeto Atual

**Antes (CRA):**

```typescript
// src/App.tsx
function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}
```

**Depois (Next.js):**

```typescript
// app/layout.tsx
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt">
      <body>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}

// app/page.tsx - Rota automática
export default function Home() {
  return <HomePage />;
}
```

---

## 🚀 **MÓDULO 4: Vantagens da Migração** _(25 min)_

### 1. **SEO e Performance**

#### Antes (CRA)

```html
<!-- HTML inicial vazio -->
<div id="root"></div>
<script src="/bundle.js"></script>
<!-- Crawlers não veem conteúdo -->
```

#### Depois (Next.js SSR)

```html
<!-- HTML com conteúdo completo -->
<div>
  <h1>Produtos de Skincare</h1>
  <div class="product-grid">
    <div class="product-card">
      <h2>Hidratante Facial</h2>
      <p>Para peles secas...</p>
    </div>
  </div>
</div>
```

### 2. **Core Web Vitals - Melhorias Reais**

| Métrica | CRA   | Next.js | Melhoria         |
| ------- | ----- | ------- | ---------------- |
| **LCP** | 3.2s  | 1.8s    | 44% mais rápido  |
| **FID** | 280ms | 95ms    | 66% melhor       |
| **CLS** | 0.25  | 0.05    | 80% mais estável |

### 3. **Developer Experience**

#### Desenvolvimento Local

```bash
# CRA
npm start          # ~15s para iniciar
# Hot reload básico

# Next.js
npm run dev        # ~3s para iniciar
# Fast Refresh - mantém estado
# Erro overlay melhorado
```

#### Deploy e Hosting

**CRA:**

```bash
npm run build      # Build estático
# Upload para CDN
# Configuração manual de rotas
```

**Next.js:**

```bash
npm run build      # Build otimizado
# Deploy automático na Vercel
# Edge functions
# Análise de bundle automática
```

### 4. **Funcionalidades Avançadas**

#### Image Optimization

```typescript
// Automática no Next.js
<Image
  src="/product-image.jpg"
  alt="Product"
  width={300}
  height={200}
  // Formatos modernos (WebP, AVIF)
  // Lazy loading
  // Responsive images
/>
```

#### Middleware para Funcionalidades Avançadas

```typescript
// middleware.ts
import { NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  // A/B Testing
  // Autenticação
  // Redirecionamentos
  // Rate limiting

  return NextResponse.next();
}
```

#### Internacionalização Nativa

```javascript
// next.config.js
module.exports = {
  i18n: {
    locales: ["pt", "en", "es"],
    defaultLocale: "pt",
  },
};
```

---

## 💼 **MÓDULO 5: Casos de Uso e Exemplos Práticos** _(20 min)_

### Exemplo 1: E-commerce (Como nosso projeto)

#### Página de Produto com SSG

```typescript
// app/products/[id]/page.tsx
interface Props {
  params: { id: string };
}

export async function generateStaticParams() {
  const products = await fetch("/api/products").then((r) => r.json());
  return products.map((product: any) => ({
    id: product.id.toString(),
  }));
}

export default async function ProductPage({ params }: Props) {
  const product = await fetch(`/api/products/${params.id}`).then((r) =>
    r.json()
  );

  return (
    <div>
      <h1>{product.name}</h1>
      <Image src={product.image} alt={product.name} />
      <p>{product.description}</p>
      <AddToCartButton product={product} />
    </div>
  );
}
```

### Exemplo 2: Blog com ISR

```typescript
// app/blog/[slug]/page.tsx
export default async function BlogPost({ params }: Props) {
  const post = await fetch(`/api/posts/${params.slug}`, {
    next: { revalidate: 3600 }, // Revalida a cada hora
  }).then((r) => r.json());

  return (
    <article>
      <h1>{post.title}</h1>
      <div dangerouslySetInnerHTML={{ __html: post.content }} />
    </article>
  );
}
```

### Exemplo 3: Dashboard com Server Components

```typescript
// app/dashboard/page.tsx
async function Dashboard() {
  // Executa no servidor - sem loading state
  const [users, analytics, notifications] = await Promise.all([
    fetchUsers(),
    fetchAnalytics(),
    fetchNotifications(),
  ]);

  return (
    <div className="dashboard">
      <UsersList users={users} />
      <AnalyticsChart data={analytics} />
      <NotificationPanel notifications={notifications} />
    </div>
  );
}
```

### Performance: Antes vs Depois

#### Bundle Size Comparison

```bash
# CRA Build
build/static/js/main.abc123.js    245 KB
build/static/css/main.def456.css   12 KB
Total: 257 KB

# Next.js Build
.next/static/chunks/pages/index.js     45 KB
.next/static/chunks/main.js           89 KB
.next/static/css/styles.css           8 KB
Total initial load: 142 KB (45% menor)
```

---

## 🎯 **EXERCÍCIOS PRÁTICOS** _(10 min)_

### Exercício 1: Análise do Projeto Atual

Identifique no projeto atual:

1. Quais componentes se beneficiariam de SSR?
2. Quais rotas poderiam usar SSG?
3. Onde API Routes seriam úteis?

### Exercício 2: Planejamento da Migração

Para o projeto de e-commerce skincare:

1. **Mapeie as rotas:**

   - `/` → `app/page.tsx`
   - `/about` → `app/about/page.tsx`
   - `/products` → `app/products/page.tsx`

2. **Identifique dados estáticos vs dinâmicos:**

   - Produtos: SSG com ISR
   - Carrinho: Client-side
   - Busca: Server-side

3. **Planeje as API Routes:**
   - `app/api/products/route.ts`
   - `app/api/cart/route.ts`

### Exercício 3: ROI da Migração

Calcule os benefícios:

- **SEO**: +40% tráfego orgânico
- **Conversão**: +25% (página 1s mais rápida)
- **Desenvolvimento**: -30% tempo de feature
- **Hosting**: Vercel vs AWS/CDN

---

## 📊 **RESUMO EXECUTIVO: Vale a Pena Migrar?**

### ✅ **Vantagens Imediatas**

- **SEO**: Melhora significativa no ranking
- **Performance**: Core Web Vitals otimizados
- **Developer Experience**: Desenvolvimento mais rápido
- **Produção**: Deploy e monitoramento simplificados

### ⚠️ **Considerações**

- **Learning Curve**: 2-3 semanas de adaptação
- **Migração**: 1-2 sprints dependendo da complexidade
- **Hosting**: Mudança de infraestrutura pode ser necessária

### 💰 **ROI Estimado**

- **Desenvolvimento**: -20% tempo de feature
- **Performance**: +30% Core Web Vitals
- **SEO**: +40% tráfego orgânico
- **Conversão**: +15-25% devido à velocidade

### 🎯 **Recomendação Final**

**Para projetos como o nosso e-commerce:**

- ✅ **Migre se**: SEO é prioridade, performance importa, equipe quer crescer
- ❌ **Mantenha CRA se**: Projeto interno, prazos apertados, equipe resistente

---

## 🔗 **Recursos Adicionais**

- **Documentação**: [nextjs.org](https://nextjs.org)
- **Migração**: [Guia oficial CRA → Next.js](https://nextjs.org/docs/migrating/from-create-react-app)
- **Performance**: [Web.dev Core Web Vitals](https://web.dev/vitals/)
- **Deploy**: [Vercel Platform](https://vercel.com)

---

**Próximos Passos:**

1. Experimentar com um projeto pequeno
2. Fazer POC com uma rota do projeto atual
3. Planejar migração gradual
4. Treinamento da equipe
