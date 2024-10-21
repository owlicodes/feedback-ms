import { headers } from "next/headers";

import { auth } from "@/lib/auth";

export const Dashboard = async () => {
  const session = await auth.api.getSession({
    headers: headers(),
  });

  if (!session) {
    return <div>Not authenticated</div>;
  }

  return (
    <div>
      <h1>Welcome {session.user.name}</h1>
    </div>
  );
};
