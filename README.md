# AliWallet — Backend

API REST que alimenta o AliWallet, aplicação de controle de finanças pessoais. O sistema resolve um problema simples e comum: a falta de visibilidade sobre receitas e despesas do dia a dia.

A API gerencia autenticação de usuários, cadastro de categorias personalizadas e registro de transações financeiras, garantindo que cada usuário acesse apenas os próprios dados.

---

## Stack

- **Node.js** + **TypeScript**
- **Fastify** — framework HTTP
- **Prisma v7** — ORM
- **PostgreSQL** — banco de dados (Supabase)
- **Zod** — validação de schemas
- **JWT** + **cookies** — autenticação
- **bcrypt** — hash de senhas
- **node-cron** — agendamento de tarefas
- **slugify** — geração de slugs

## Como rodar localmente

**Pré-requisitos:** Node.js 18+, banco PostgreSQL

```bash
# Clone o repositório
git clone https://github.com/aalisonbarbosa/aliwallet-api.git
cd aliwallet-api

# Instale as dependências
npm install

# Configure as variáveis de ambiente
cp .env.example .env
# Edite .env com suas credenciais

# Rode as migrations
npm run prisma:migrate

# Inicie o servidor de desenvolvimento
npm run dev
```

## Variáveis de ambiente

```env
DATABASE_URL=postgresql://usuario:senha@host:porta/banco
JWT_SECRET=sua_chave_secreta
FRONTEND_URL=http://localhost:3000
```

## Deploy

Hospedado no **Render**. Banco de dados no **Supabase**.

---

## Frontend

Repositório da interface: [github.com/aalisonbarbosa/aliwallet](https://github.com/aalisonbarbosa/aliwallet)
