import { useState } from "react";
import { User, ChevronDown, LogOut, Settings, UserCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { SidebarTrigger } from "@/components/ui/sidebar";

interface HeaderProps {
  title?: string;
  showPlatformFilter?: boolean;
  showDateFilter?: boolean;
}

export function Header({ title, showPlatformFilter = false, showDateFilter = false }: HeaderProps) {
  const [platform, setPlatform] = useState("all");
  const [startDate, setStartDate] = useState("Oct 14, 2025");
  const [endDate, setEndDate] = useState("Nov 12, 2025");

  return (
    <header className="flex items-center justify-between h-14 px-4 border-b border-border bg-background">
      <div className="flex items-center gap-4">
        <SidebarTrigger data-testid="button-sidebar-toggle" />
        {title && (
          <h1 className="text-lg font-semibold text-foreground" data-testid="page-title">
            {title}
          </h1>
        )}
      </div>

      <div className="flex items-center gap-4">
        {showPlatformFilter && (
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">Platform</span>
            <Select value={platform} onValueChange={setPlatform}>
              <SelectTrigger className="w-24" data-testid="select-platform">
                <SelectValue placeholder="All" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="android">Android</SelectItem>
                <SelectItem value="ios">iOS</SelectItem>
                <SelectItem value="web">Web</SelectItem>
              </SelectContent>
            </Select>
          </div>
        )}

        {showDateFilter && (
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">Period</span>
            <div className="flex items-center gap-1 px-3 py-1.5 bg-muted rounded-md text-sm">
              <span data-testid="date-start">{startDate}</span>
              <span className="text-muted-foreground">→</span>
              <span data-testid="date-end">{endDate}</span>
            </div>
          </div>
        )}

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="flex items-center gap-2" data-testid="button-user-menu">
              <Avatar className="h-8 w-8">
                <AvatarFallback className="bg-primary text-primary-foreground text-xs">
                  AU
                </AvatarFallback>
              </Avatar>
              <span className="text-sm font-medium">Admin User</span>
              <ChevronDown className="h-4 w-4 text-muted-foreground" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            <DropdownMenuItem data-testid="menu-profile">
              <UserCircle className="h-4 w-4 mr-2" />
              Profile
            </DropdownMenuItem>
            <DropdownMenuItem data-testid="menu-settings">
              <Settings className="h-4 w-4 mr-2" />
              Settings
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-destructive" data-testid="menu-logout">
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
