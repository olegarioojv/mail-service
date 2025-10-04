# 📚 Biblioteca Service & 📩 Mail Service

Sistema de gestão de biblioteca com microsserviços usando NestJS + RabbitMQ + MySQL

---

## 🛠️ Tecnologias

- **NestJS** - Framework Node.js
- **TypeORM + MySQL** - Banco de dados
- **RabbitMQ** - Mensageria entre serviços
- **Nodemailer + Pug** - Envio de emails
- **Brevo** - SMTP gratuito
- **Docker** - Containers

---

## 📂 Estrutura

### Biblioteca Service
- **Users**: Cadastro, listagem, atualização e remoção
- **Books**: Gerenciamento do acervo
- **Loans**: Controle de empréstimos e devoluções
- **Eventos**: Publica `user.created` e `loan.created` no RabbitMQ

### Mail Service
- Consome eventos do RabbitMQ
- Envia email de boas-vindas (`user.created`)
- Envia confirmação de empréstimo (`loan.created`)

---

## ⚙️ Configuração

### 1. Subir Docker

```bash
docker-compose up -d
```

**docker-compose.yml:**
```yaml
version: "3.9"
services:
  rabbitmq:
    image: rabbitmq:3-management
    ports:
      - "5672:5672"
      - "15672:15672"
    environment:
      RABBITMQ_DEFAULT_USER: guest
      RABBITMQ_DEFAULT_PASS: guest

  mysql:
    image: mysql:8.1
    ports:
      - "3306:3306"
    environment:
      MYSQL_ROOT_PASSWORD: root
      MYSQL_DATABASE: biblioteca
```

### 2. Instalar dependências

```bash
npm install
```

### 3. Configurar .env

**Biblioteca Service:**
```env
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASS=root
DB_NAME=biblioteca
```

**Mail Service:**
```env
SMTP_HOST=smtp-relay.brevo.com
SMTP_PORT=587
SMTP_USER=seu_email@example.com
SMTP_PASS=sua_senha_brevo
MAIL_FROM=noreply@biblioteca.com
```

> Crie conta grátis no [Brevo](https://www.brevo.com) para obter credenciais SMTP

### 4. Rodar Migrations

```bash
# Gerar migration
npx ts-node ./node_modules/typeorm/cli.js migration:generate ./src/migrations/NomeMigration -d ./src/data-source.ts

# Executar migration
npx ts-node ./node_modules/typeorm/cli.js migration:run -d ./src/data-source.ts
```

### 5. Iniciar serviços

```bash
npm run start:dev
```

---

## 📮 Testar API

Importe a collection do Postman: `Biblioteca Service.postman_collection.json`

**Exemplos:**

```bash
# Criar usuário
POST http://localhost:3000/users
{
  "name": "João Silva",
  "email": "joao@example.com",
  "department": "TI"
}

# Criar livro
POST http://localhost:3000/books
{
  "title": "Clean Code",
  "author": "Robert Martin",
  "isbn": "123456789",
  "quantity": 5
}

# Criar empréstimo
POST http://localhost:3000/loans
{
  "userId": 1,
  "bookId": 1,
  "loanDate": "2025-10-03",
  "returnDate": "2025-10-17"
}
```

---

## 🔄 Como funciona

1. Cliente faz requisição → Biblioteca Service
2. Dados salvos no MySQL
3. Evento publicado no RabbitMQ
4. Mail Service consome evento
5. Email enviado via Brevo

---

## 📝 Comandos Úteis

```bash
# Ver logs Docker
docker-compose logs -f

# Parar containers
docker-compose down

# Reverter migration
npx ts-node ./node_modules/typeorm/cli.js migration:revert -d ./src/data-source.ts
```

---

## ✅ Funcionalidades

- Arquitetura de microsserviços
- Mensageria assíncrona
- Envio automático de emails
- Templates personalizados
- Controle de estoque de livros

---
