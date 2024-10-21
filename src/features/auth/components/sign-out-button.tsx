"use client";

import { Button } from "@/components/ui/button";
import { client } from "@/lib/client";

export const SignOutButton = () => {
  const signOut = async () => {
    await client.signOut();
  };

  return <Button onClick={signOut}>Sign Out</Button>;
};
