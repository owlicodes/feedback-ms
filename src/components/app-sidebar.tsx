import { headers } from "next/headers";

import {
  ChevronRight,
  ChevronUp,
  LayoutDashboard,
  Map,
  User2,
  Users2,
} from "lucide-react";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import { SignOutButton } from "@/features/auth/components/sign-out-button";
import { auth } from "@/lib/auth";

const items = [
  {
    title: "Overview",
    url: "#",
    icon: LayoutDashboard,
    items: [
      {
        title: "Dashboard",
        url: "/admin/dashboard",
      },
    ],
  },
  {
    title: "Users & Staff",
    url: "#",
    icon: Users2,
    items: [
      {
        title: "Staff Members",
        url: "/admin/staff-members",
      },
      {
        title: "Users",
        url: "/admin/users",
      },
    ],
  },
  {
    title: "Data",
    url: "#",
    icon: Map,
    items: [
      {
        title: "Categories",
        url: "/admin/categories",
      },
      {
        title: "Roadmaps",
        url: "/admin/roadmaps",
      },
      {
        title: "Boards",
        url: "/admin/boards",
      },
    ],
  },
];

export async function AppSidebar() {
  const session = await auth.api.getSession({
    headers: headers(),
  });

  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="bg-blue-500 font-semibold text-white">
            Feedback MS
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <Collapsible
                  key={item.title}
                  asChild
                  defaultOpen
                  className="group/collapsible"
                >
                  <SidebarMenuItem>
                    <CollapsibleTrigger asChild className="bg-secondary">
                      <SidebarMenuButton tooltip={item.title}>
                        {item.icon && <item.icon />}
                        <span className="text-base font-semibold">
                          {item.title}
                        </span>
                        <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                      </SidebarMenuButton>
                    </CollapsibleTrigger>
                    <CollapsibleContent>
                      <SidebarMenuSub>
                        {item.items?.map((subItem) => (
                          <SidebarMenuSubItem key={subItem.title}>
                            <SidebarMenuSubButton asChild>
                              <a href={subItem.url}>
                                <span>{subItem.title}</span>
                              </a>
                            </SidebarMenuSubButton>
                          </SidebarMenuSubItem>
                        ))}
                      </SidebarMenuSub>
                    </CollapsibleContent>
                  </SidebarMenuItem>
                </Collapsible>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton>
                  <User2 /> {session?.user.email}
                  <ChevronUp className="ml-auto" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                side="top"
                className="w-[--radix-popper-anchor-width]"
              >
                <DropdownMenuItem className="w-full">
                  <SignOutButton />
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
