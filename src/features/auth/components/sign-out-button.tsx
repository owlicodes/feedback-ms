"use client";

import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { client } from "@/lib/client";

export const SignOutButton = () => {
  const router = useRouter();

  const signOut = async () => {
    await client.signOut().then(() => {
      router.push("/");
    });
  };

  return (
    <Button variant="link" onClick={signOut}>
      Sign Out
    </Button>
  );
};
