import { useState } from "react";
import { Link, useLocation } from "wouter";
import {
  Home,
  LayoutDashboard,
  AppWindow,
  Users,
  BarChart3,
  Send,
  FileText,
  Database,
  Settings,
  ChevronDown,
  ChevronRight,
  User,
  Target,
  TrendingUp,
  Calendar,
  Filter,
  Mail,
  Download,
  Map
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubItem,
  SidebarMenuSubButton,
  SidebarHeader,
  SidebarFooter,
} from "@/components/ui/sidebar";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

interface NavItem {
  title: string;
  icon: any;
  href?: string;
  children?: { title: string; href: string }[];
}

const navItems: NavItem[] = [
  { title: "Home", icon: Home, href: "/" },
  { title: "Dashboard", icon: LayoutDashboard, href: "/dashboard" },
  {
    title: "Setup Apps",
    icon: AppWindow,
    children: [
      { title: "Setup New App", href: "/setup/new-app" }
    ]
  },
  {
    title: "Users",
    icon: Users,
    children: [
      { title: "Customer 360", href: "/users/customer-360" },
      { title: "Audience Segments", href: "/users/segments" }
    ]
  },
  {
    title: "Analytics",
    icon: BarChart3,
    children: [
      { title: "App Acquisition", href: "/analytics/acquisition" },
      { title: "Events", href: "/analytics/events" },
      { title: "Funnels", href: "/analytics/funnels" }
    ]
  },
  {
    title: "Engagement",
    icon: Send,
    children: [
      { title: "Campaigns", href: "/engagement/campaigns" },
      { title: "Template", href: "/engagement/templates" }
    ]
  },
  {
    title: "Reports",
    icon: FileText,
    children: [
      { title: "Exports", href: "/reports/exports" }
    ]
  },
  {
    title: "Data Management",
    icon: Database,
    children: [
      { title: "Journeys", href: "/data/journeys" }
    ]
  },
  {
    title: "Settings",
    icon: Settings,
    children: [
      { title: "App Management", href: "/settings/app-management" },
      { title: "Manage Modules", href: "/settings/modules" },
      { title: "User Management", href: "/settings/user-management" },
      { title: "App Setting", href: "/settings/app-setting" },
      { title: "Display Preference", href: "/settings/display-preference" }
    ]
  }
];

export function AppSidebar() {
  const [location] = useLocation();
  const [openItems, setOpenItems] = useState<string[]>(["Setup Apps", "Users", "Analytics", "Engagement", "Reports", "Data Management", "Settings"]);

  const toggleItem = (title: string) => {
    setOpenItems(prev =>
      prev.includes(title)
        ? prev.filter(item => item !== title)
        : [...prev, title]
    );
  };

  const isActive = (href: string) => location === href;
  const isParentActive = (children?: { href: string }[]) => {
    return children?.some(child => location === child.href);
  };

  return (
    <Sidebar className="border-r border-sidebar-border">
      <SidebarHeader className="p-4 border-b border-sidebar-border">
        <Link href="/">
          <span className="text-2xl font-bold text-primary cursor-pointer" data-testid="logo-a2s2pr">
            A2S2PR
          </span>
        </Link>
      </SidebarHeader>
      <SidebarContent className="px-2 py-4">
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {navItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  {item.children ? (
                    <Collapsible
                      open={openItems.includes(item.title)}
                      onOpenChange={() => toggleItem(item.title)}
                    >
                      <CollapsibleTrigger asChild>
                        <SidebarMenuButton
                          className={`w-full justify-between ${isParentActive(item.children) ? "bg-sidebar-accent text-primary font-medium" : ""}`}
                          data-testid={`nav-${item.title.toLowerCase().replace(/\s+/g, '-')}`}
                        >
                          <span className="flex items-center gap-3">
                            <item.icon className="h-4 w-4" />
                            <span>{item.title}</span>
                          </span>
                          {openItems.includes(item.title) ? (
                            <ChevronDown className="h-4 w-4" />
                          ) : (
                            <ChevronRight className="h-4 w-4" />
                          )}
                        </SidebarMenuButton>
                      </CollapsibleTrigger>
                      <CollapsibleContent>
                        <SidebarMenuSub>
                          {item.children.map((child) => (
                            <SidebarMenuSubItem key={child.href}>
                              <SidebarMenuSubButton
                                asChild
                                className={isActive(child.href) ? "bg-sidebar-accent text-primary font-medium" : ""}
                              >
                                <Link href={child.href} data-testid={`nav-${child.title.toLowerCase().replace(/\s+/g, '-')}`}>
                                  {child.title}
                                </Link>
                              </SidebarMenuSubButton>
                            </SidebarMenuSubItem>
                          ))}
                        </SidebarMenuSub>
                      </CollapsibleContent>
                    </Collapsible>
                  ) : (
                    <SidebarMenuButton
                      asChild
                      className={isActive(item.href!) ? "bg-sidebar-accent text-primary font-medium" : ""}
                    >
                      <Link href={item.href!} data-testid={`nav-${item.title.toLowerCase().replace(/\s+/g, '-')}`}>
                        <item.icon className="h-4 w-4" />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  )}
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="p-4 border-t border-sidebar-border">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <ChevronRight className="h-4 w-4" />
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
