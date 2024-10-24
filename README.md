# Feedback Management System

![React](https://img.shields.io/badge/-ReactJs-61DAFB?logo=react&logoColor=white&style=for-the-badge)
![Next.js](https://img.shields.io/badge/next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/tailwindcss-0F172A?style=for-the-badge&logo=tailwindcss&logoColor=white)
![Prisma](https://img.shields.io/badge/Prisma-3982CE?style=for-the-badge&logo=Prisma&logoColor=white)
![React Hook Form](https://img.shields.io/badge/react--hook--form-EC5990?style=for-the-badge&logo=reacthookform&logoColor=white)
![Zod](https://img.shields.io/badge/-Zod-3E67B1?style=for-the-badge&logo=zod&logoColor=white)
![React Query](https://img.shields.io/badge/-React%20Query-FF4154?style=for-the-badge&logo=react%20query&logoColor=white)
![Axios](https://img.shields.io/badge/axios.js-854195?style=for-the-badge&logo=axios&logoColor=5A29E4)
![Better Auth](https://img.shields.io/badge/-Better--Auth-000000?logo=shield&logoColor=black&style=for-the-badge)
![MongoDB](https://img.shields.io/badge/-MongoDB-13aa52?style=for-the-badge&logo=mongodb&logoColor=white)

Feedback Management System is a system that allows a company or a business to collect feedbacks from their customers.

1. [Initial Setup](#initial-setup)
2. [Entity Relationship Diagram](#entity-relationship-diagram)

## Initial Setup

To begin, you need a mongodb, for this project I used atlas. Once you have your mongodb all setup, you can proceed to next steps.

Define your environment variables by creating a .env in your root folder.

```.env
NODE_ENV="development"
BETTER_AUTH_SECRET="better-auth-secret"
BETTER_AUTH_URL="http://localhost:3000"
BETTER_AUTH_SEED_ADMIN_PASSWORD="password" // used for seeding
DATABASE_URL="mongodb+srv://{user}:{password}@development.mongodb.net/feedback-ms-db?retryWrites=true&w=majority&appName=development" // replace this with your own mongodb database url
```

Next, generate the prisma models and push it to your mongodb.

```bash
npx prisma generate

npx prisma db push
```

You can run the prisma seed script to create the initial admin user, **REPLACE THE EMAIL AND NAME** of the user in the script.

```bash
npx prisma db seed
```

Once the seed script is done, visit your mongodb collections, you will see a model for **session**, delete the first entry, it is inserted by the seed script. You need to delete it so you can login properly when using the app. We need to find a better seed script to avoid this extra step.

Once you have created the initial admin user, you can run the application.

```bash
npm run dev
```

## Entity Relationship Diagram

![Entity Relationship Diagram](erd.png)
