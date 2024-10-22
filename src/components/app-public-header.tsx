import { headers } from "next/headers";

import { SignIn } from "@/features/public/auth/sign-in";
import { SignUp } from "@/features/public/auth/sign-up";
import { UserAvatar } from "@/features/public/auth/user-avatar";
import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";

import { AppPublicBoardSelect } from "./app-public-board-select";

export const AppPublicHeader = async () => {
  const session = await auth.api.getSession({
    headers: headers(),
  });

  const boards = await prisma.board.findMany();

  return (
    <div className="mx-auto flex max-w-6xl items-center justify-between">
      <h1 className="text-3xl font-semibold text-blue-500">Owlicodes</h1>

      <AppPublicBoardSelect boards={boards} />

      {session ? (
        <UserAvatar name={session.user.name} email={session.user.email} />
      ) : (
        <div className="flex items-center gap-4">
          <SignUp />
          <SignIn />
        </div>
      )}
    </div>
  );
};
