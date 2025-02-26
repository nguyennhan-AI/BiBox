import { Home, Trash2, Star, Inbox, CloudUpload } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

// Sidebar menu items
const items = [
  { title: "Home", url: "#", icon: Home },
  { title: "Workspace", url: "#", icon: Inbox },
  { title: "Star Tagged", url: "#", icon: Star },
  { title: "Trash Bin", url: "#", icon: Trash2},
  { title: "Memories", url: "#", icon: CloudUpload },
];

export function AppSidebar() {
  return (
    <Sidebar className="w-64 min-h-screen">
      <SidebarContent className="p-4">
        {/* Logo Section */}
        <SidebarGroup className="mb-6 flex justify-center">
          <SidebarGroupLabel>
            <Link href="/">
              <Image
                src="/icon-hcmut.png"
                alt="logo"
                width={160}
                height={50}
                className="h-auto hidden lg:block mix-blend-multiply pt-3"
              />
            </Link>
          </SidebarGroupLabel>
        </SidebarGroup>

        {/* Menu Items */}
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-2">
              {items.map((item) => (
                <SidebarMenuItem key={item.title} className="hover:bg-black-800 rounded-lg py-2">
                  <SidebarMenuButton asChild>
                    <a href={item.url} className="flex items-center gap-3 p-3">
                      <item.icon size={20} />
                      <span className="text-sm font-medium">{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
                  {/* Button at Bottom */}
        <div className="mt-auto flex justify-center">
          <Button className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 rounded-lg mt-5">
            + New
          </Button>
        </div>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
