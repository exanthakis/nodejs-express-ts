# Express TypeScript REST API

A production-ready REST API built with **Node.js**, **Express.js**, **TypeScript**, **MongoDB**, and **Mongoose**. The project includes JWT-based authentication with RSA signing, refresh-token sessions, request validation, and product CRUD operations.

## ✨ Features

- 👤 User registration and authentication
- 🔐 JWT-based authentication
- 🔄 Access and refresh token support
- 🔑 RSA-based JWT signing and verification
- 🗂️ Session management
- 📦 Product CRUD operations
- ✅ Request validation with Zod
- 🗄️ MongoDB persistence with Mongoose
- 📘 TypeScript for type-safe development
- 🚀 Fast development workflow with `tsx`

## 🛠️ Tech Stack

| Technology                                    | Purpose                             |
| --------------------------------------------- | ----------------------------------- |
| [Node.js](https://nodejs.org/)                | JavaScript runtime                  |
| [Express.js](https://expressjs.com/)          | HTTP server and REST API framework  |
| [TypeScript](https://www.typescriptlang.org/) | Static typing                       |
| [MongoDB](https://www.mongodb.com/)           | Database                            |
| [Mongoose](https://mongoosejs.com/)           | MongoDB ODM                         |
| [Zod](https://zod.dev/)                       | Request/schema validation           |
| JWT                                           | Authentication and authorization    |
| nanoid                                        | Unique ID generation                |
| tsx                                           | TypeScript execution in development |

## 📋 Requirements

Make sure the following are installed on your system:

- [Node.js](https://nodejs.org/) — preferably an LTS version
- npm — included with Node.js
- [MongoDB](https://www.mongodb.com/) — local installation or a MongoDB instance

## 🚀 Getting Started

### 1. Install Dependencies

Clone the repository and install the project dependencies:

```bash
npm install
```

### 2. Configure Environment Variables

Create a `.env` file in the root directory of the project.

The application requires an RSA public/private key pair for signing and verifying access tokens.

You can generate an RSA key pair using the [JSEncrypt RSA Key Generator](https://travistidwell.com/jsencrypt/demo/).

Add the keys to your `.env` file:

```env
ACCESS_TOKEN_PUBLIC_KEY="-----BEGIN PUBLIC KEY-----
YOUR_PUBLIC_KEY
-----END PUBLIC KEY-----"

ACCESS_TOKEN_PRIVATE_KEY="-----BEGIN RSA PRIVATE KEY-----
YOUR_PRIVATE_KEY
-----END RSA PRIVATE KEY-----"
```

> **Important:** Keep your private key secret. Never commit `.env` or private keys to source control.

### 3. Start MongoDB

Make sure MongoDB is running before starting the API.

By default, the application connects to:

```text
mongodb://127.0.0.1:27017/rest-api-db
```

If your MongoDB instance uses a different connection string, configure it through the `DB_URI` environment variable.

### 4. Run the Application

#### Development

Start the application in development mode:

```bash
npm run dev
```

#### Build

Compile the TypeScript project:

```bash
npm run build
```

#### Production

Start the compiled application:

```bash
npm run start:prod
```

## 🔧 Available Scripts

| Command              | Description                       |
| -------------------- | --------------------------------- |
| `npm run dev`        | Start the API in development mode |
| `npm run build`      | Build the TypeScript project      |
| `npm run start:prod` | Start the production build        |

## 🔐 Authentication

The API uses **JWT access and refresh tokens** for authentication.

Access tokens are signed and verified using an **RSA public/private key pair**, while refresh tokens are used to maintain authenticated sessions without requiring the user to log in again after every access-token expiration.

## 📁 Project Structure

Project structure look like:

```text
.
├── src/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── schemas/
│   ├── services/
│   └── utils/
├── .env
├── package.json
├── tsconfig.json
└── README.md
```

> The exact structure may vary depending on the current implementation.

## 🗄️ Database

The application uses **MongoDB** through **Mongoose** for persistence.

The default local database is:

```text
rest-api-db
```

with the default connection:

```text
mongodb://127.0.0.1:27017/rest-api-db
```

## 🧪 Development

For local development:

1. Install dependencies.
2. Configure the required environment variables.
3. Start MongoDB.
4. Run `npm run dev`.
5. Use your preferred API client, such as Postman, Insomnia, or curl, to interact with the REST API.

## 🔒 Security Notes

- Never commit `.env` files to the repository.
- Never expose the RSA private key publicly.
- Use strong, unique secrets and credentials in production.
- Use HTTPS when deploying the API.
- Store production secrets using a secure secret-management solution rather than committing them to source control.
