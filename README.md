# AR Design Vision

Catálogo de móveis com visualização em **Realidade Aumentada (AR)**, painel administrativo completo e autenticação de usuários, construído com React, TypeScript e Supabase.

## ✨ Funcionalidades

- **Visualizador AR** (`/ar-viewer`) — pré-visualização de móveis em ambientes reais
- **Catálogo de produtos** com filtros por categoria e ambiente
- **Ambientes e materiais** — navegação por estilos e composições de decoração
- **Autenticação de usuários** (login/cadastro) com sessão persistida via Supabase
- **Perfil do usuário** com histórico de interações
- **Painel administrativo** — gestão de usuários, categorias e produtos, com métricas de uso
- **Tutoriais** integrados para orientar o uso do visualizador AR

## 🛠️ Stack

- **Frontend:** React, TypeScript, Vite, Tailwind CSS, shadcn/ui
- **Backend/Dados:** Supabase (autenticação e persistência)
- **Formulários e validação:** React Hook Form + Zod

## 🚀 Como rodar localmente

Pré-requisito: Node.js e npm instalados ([instalar com nvm](https://github.com/nvm-sh/nvm#installing-and-updating)).

```sh
# Clonar o repositório
git clone https://github.com/jvdesenvolvimentos/ar-design-vision.git

# Entrar na pasta do projeto
cd ar-design-vision

# Instalar dependências
npm i

# Rodar em modo desenvolvimento
npm run dev
```

## 📦 Build de produção

```sh
npm run build
```

Os arquivos estáticos gerados ficam em `dist/`, prontos para deploy em qualquer serviço de hospedagem estática (Netlify, Vercel, etc.).
