import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export const FeedbackCardAvatar = ({ email }: { email: string }) => {
  return (
    <Avatar>
      <AvatarImage
        src="/placeholder.svg?height=32&width=32"
        alt="User avatar"
      />
      <AvatarFallback className="bg-blue-500 text-white">
        {email.slice(0, 2).toUpperCase()}
      </AvatarFallback>
    </Avatar>
  );
};
