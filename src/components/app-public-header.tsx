import { headers } from "next/headers";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SignIn } from "@/features/public/auth/sign-in";
import { SignUp } from "@/features/public/auth/sign-up";
import { UserAvatar } from "@/features/public/auth/user-avatar";
import { auth } from "@/lib/auth";

export const AppPublicHeader = async () => {
  const session = await auth.api.getSession({
    headers: headers(),
  });

  return (
    <div className="mx-auto flex max-w-6xl items-center justify-between">
      <h1 className="text-3xl font-semibold text-blue-500">Owlicodes</h1>

      <Select>
        <SelectTrigger className="w-[500px]">
          <SelectValue placeholder="Theme" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="light">Light</SelectItem>
          <SelectItem value="dark">Dark</SelectItem>
          <SelectItem value="system">System</SelectItem>
        </SelectContent>
      </Select>

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
