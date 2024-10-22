"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { SignUpForm } from "./sign-up-form";

export const SignUp = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Dialog open={isOpen} onOpenChange={() => setIsOpen(false)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>How are you today?</DialogTitle>
            <DialogDescription className="text-black">
              Thank you for taking the time to make some feedbacks on our web
              services. Please fill in your information so you can get started.
            </DialogDescription>
          </DialogHeader>

          <SignUpForm closeDialog={() => setIsOpen(false)} />
        </DialogContent>
      </Dialog>

      <Button onClick={() => setIsOpen(true)}>Sign Up</Button>
    </>
  );
};
