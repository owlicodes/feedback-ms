import { PrismaClient } from "@prisma/client";
import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { admin } from "better-auth/plugins";

const prisma = new PrismaClient();

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "mongodb",
  }),
  emailAndPassword: {
    enabled: true,
  },
  plugins: [
    admin({
      defaultRole: "admin",
    }),
  ],
});

async function main() {
  await auth.api.signUpEmail({
    body: {
      name: "josediago",
      email: "josediago@email.com",
      password: process.env.BETTER_AUTH_SEED_ADMIN_PASSWORD,
      role: "admin",
    },
  });

  // after running the seed, it will create a session as well, remove that session else you won't be able to sign in
  // there is no seed instructions yet for better-auth, we need to find a better way to handle this in the future
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
