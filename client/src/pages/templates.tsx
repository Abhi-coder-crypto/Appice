import { useState } from "react";
import { Plus, Search, Smartphone, Layout, Bell, Monitor, Mail, MessageSquare, MoreVertical, Edit, Trash2, Copy } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Header } from "@/components/layout/header";
import { templates } from "@/lib/dummy-data";
import type { CampaignChannel } from "@shared/schema";

function getChannelIcon(channel: CampaignChannel) {
  switch (channel) {
    case "push":
      return Smartphone;
    case "in-app":
      return Layout;
    case "web-push":
      return Bell;
    case "web-popup":
      return Monitor;
    case "email":
      return Mail;
    case "sms":
    case "whatsapp":
      return MessageSquare;
    default:
      return Bell;
  }
}

function getChannelColor(channel: CampaignChannel) {
  switch (channel) {
    case "push":
      return "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300";
    case "in-app":
      return "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300";
    case "web-push":
      return "bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300";
    case "web-popup":
      return "bg-orange-100 text-orange-700 dark:bg-orange-900 dark:text-orange-300";
    default:
      return "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300";
  }
}

export default function Templates() {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredTemplates = templates.filter(template =>
    template.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex flex-col h-full">
      <Header title="Templates" />
      
      <div className="flex-1 overflow-auto p-6">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          <div className="relative flex-1 min-w-[200px] max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search templates..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9"
              data-testid="input-search-templates"
            />
          </div>
          <Button data-testid="button-create-template">
            <Plus className="h-4 w-4 mr-2" />
            Create Template
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredTemplates.map((template) => {
            const ChannelIcon = getChannelIcon(template.channel);
            return (
              <Card key={template.id} className="hover-elevate" data-testid={`card-template-${template.id}`}>
                <CardContent className="p-5">
                  <div className="flex items-start justify-between mb-3">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                      <ChannelIcon className="h-5 w-5 text-primary" />
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8" data-testid={`button-template-menu-${template.id}`}>
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                          <Edit className="h-4 w-4 mr-2" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Copy className="h-4 w-4 mr-2" />
                          Duplicate
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive">
                          <Trash2 className="h-4 w-4 mr-2" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                  
                  <h3 className="font-semibold mb-2">{template.name}</h3>
                  <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{template.content}</p>
                  
                  <div className="flex items-center justify-between">
                    <Badge variant="secondary" className={getChannelColor(template.channel)}>
                      {template.channel}
                    </Badge>
                    <span className="text-xs text-muted-foreground">{template.createdAt}</span>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
}
