# 🚀 Project Setup Guide

This repository contains a **Node.js + Express + TypeScript** backend project using **MongoDB**, **JWT authentication**, and **Yarn** as the package manager.

Follow the steps below to set up and run the project locally.

---

## 📦 Prerequisites

Make sure you have the following installed:

* **Node.js** (v18+ recommended)
* **Yarn** (v1.22+)
* **MongoDB** (local or cloud – MongoDB Atlas)

Check versions:

```bash
node -v
yarn -v
```

---

## 📥 Clone the Repository

```bash
git clone https://github.com/SelimRejabd/Job-Task-Suhas-Backend
cd Job-Task-Suhas-Backend
```

---

## 📦 Install Dependencies

```bash
yarn install
```

---

## 🔐 Environment Variables Setup

Create a `.env` file in the root directory:

```bash
cp .env.example .env
```

### Example `.env`

```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/express_ts_app
NODE_ENV=development
LOCAL_FRONTEND_URL=http://localhost:3000
PROD_FRONTEND_URL=https://your-production-domain.com

JWT_ACCESS_SECRET=your_jwt_secret_key

# example values: 15m, 1h, 1d
JWT_EXPIRES_IN=1d

JWT_REFRESH_SECRET=your_jwt_refresh_secret_key
JWT_REFRESH_EXPIRES_IN=7d

SALT_ROUNDS=10

COOKIE_DOMAIN=localhost

INVITE_SECRET=your_invite_secret_key

#in seconds
INVITE_EXPIRES=86400

ADMIN_EMAIL=admin@example.com
ADMIN_PASSWORD=Admin@123

---

## 🗄️ Database Setup

Make sure MongoDB is running locally or your MongoDB Atlas URL is correct.

The application will automatically connect to the database on startup.

---

## 👑 Create Admin User (One-Time Command)

An admin user must be created **once** when the project is initialized.

Run the following command:

```bash
yarn create:admin
```

✔ This command is **idempotent** (safe to re-run)
✔ If an admin already exists, it will skip creation

Admin credentials are taken from the `.env` file.

---

## ▶️ Run the Project

### Development mode

```bash
yarn dev
```

---

## 🧪 Useful Commands

| Command             | Description                   |
| ------------------- | ----------------------------- |
| `yarn install`      | Start development server      |
|  `yarn dev`         | Build the project             |
|                     | Run compiled production build |
| `yarn create:admin` | Create initial admin user     |
|                     | Run ESLint                    |

---

## 🧑‍💻 Author

Developed by **Salim Reja**

---

## 📄 License

This project is licensed under the MIT License.
