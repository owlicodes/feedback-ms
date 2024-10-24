import { GitBranch, Lightbulb, MessageSquare, Users } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import prisma from "@/lib/prisma";

export const DashboardTopCards = async () => {
  const users = await prisma.user.count({
    where: {
      role: {
        not: "admin",
      },
    },
  });
  const comments = await prisma.comment.count();
  const roadmaps = await prisma.roadmap.count();
  const feedbacks = await prisma.feedback.count({
    where: {
      status: "APPROVED",
    },
  });

  const cards = [
    { title: "Feedback Users", count: users, icon: Users },
    { title: "Overall Comments", count: comments, icon: MessageSquare },
    { title: "Roadmap Statuses", count: roadmaps, icon: GitBranch },
    { title: "Approved Feedbacks", count: feedbacks, icon: Lightbulb },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {cards.map((card, index) => (
        <Card key={index}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{card.title}</CardTitle>
            <card.icon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {card.count.toLocaleString()}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
