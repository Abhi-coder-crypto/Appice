import { useState } from "react";
import { Link } from "wouter";
import { Plus, Search, Filter, Smartphone, Monitor, Bell, Layout, MessageSquare, Mail, MessageCircle, MoreVertical, Play, Pause, Edit, Trash2, ChevronRight } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Header } from "@/components/layout/header";
import { campaigns } from "@/lib/dummy-data";
import type { CampaignChannel } from "@shared/schema";

const channelOptions = [
  { id: "push" as CampaignChannel, label: "Push", icon: Smartphone, description: "Mobile push notifications" },
  { id: "in-app" as CampaignChannel, label: "IN-APP", icon: Layout, description: "In-app messages" },
  { id: "web-push" as CampaignChannel, label: "Web Push", icon: Bell, description: "Browser push notifications" },
  { id: "web-popup" as CampaignChannel, label: "Web Popup", icon: Monitor, description: "Website popups" },
];

function ChannelSelectModal({ open, onClose, onSelect }: { open: boolean; onClose: () => void; onSelect: (channel: CampaignChannel) => void }) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>All campaigns / create /</DialogTitle>
        </DialogHeader>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 py-8">
          {channelOptions.map((channel) => (
            <div
              key={channel.id}
              className="flex flex-col items-center p-6 border border-border rounded-lg cursor-pointer hover:border-primary hover:bg-primary/5 transition-colors"
              onClick={() => onSelect(channel.id)}
              data-testid={`channel-${channel.id}`}
            >
              <div className="w-20 h-32 border-2 border-dashed border-muted rounded-lg flex items-center justify-center mb-4">
                <channel.icon className="h-8 w-8 text-muted-foreground" />
              </div>
              <span className="font-medium text-center">{channel.label}</span>
            </div>
          ))}
        </div>

        <div className="flex justify-between pt-4 border-t border-border">
          <Button variant="outline" size="icon" disabled>
            <ChevronRight className="h-4 w-4 rotate-180" />
          </Button>
          <Button variant="outline" size="icon" disabled>
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

function getStatusColor(status: string) {
  switch (status) {
    case "active":
      return "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300";
    case "scheduled":
      return "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300";
    case "draft":
      return "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300";
    case "completed":
      return "bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300";
    case "paused":
      return "bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300";
    default:
      return "bg-gray-100 text-gray-700";
  }
}

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
      return MessageSquare;
    case "whatsapp":
      return MessageCircle;
    default:
      return Bell;
  }
}

export default function Campaigns() {
  const [showChannelModal, setShowChannelModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const handleChannelSelect = (channel: CampaignChannel) => {
    setShowChannelModal(false);
    window.location.href = `/engagement/campaigns/create/${channel}`;
  };

  return (
    <div className="flex flex-col h-full">
      <Header title="All campaigns" />
      
      <div className="flex-1 overflow-auto p-6">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          <div className="relative flex-1 min-w-[200px] max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search campaigns..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9"
              data-testid="input-search-campaigns"
            />
          </div>
          <Button onClick={() => setShowChannelModal(true)} data-testid="button-create-campaign">
            <Plus className="h-4 w-4 mr-2" />
            Create Campaign
          </Button>
        </div>

        <div className="space-y-4">
          {campaigns.map((campaign) => {
            const ChannelIcon = getChannelIcon(campaign.channel);
            return (
              <Card key={campaign.id} className="hover-elevate" data-testid={`card-campaign-${campaign.id}`}>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                        <ChannelIcon className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-medium">{campaign.name}</h3>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-xs text-muted-foreground capitalize">{campaign.channel}</span>
                          <span className="text-muted-foreground">•</span>
                          <span className="text-xs text-muted-foreground">{campaign.createdAt}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Badge variant="secondary" className={getStatusColor(campaign.status)}>
                        {campaign.status}
                      </Badge>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" data-testid={`button-campaign-menu-${campaign.id}`}>
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>
                            <Edit className="h-4 w-4 mr-2" />
                            Edit
                          </DropdownMenuItem>
                          {campaign.status === "active" ? (
                            <DropdownMenuItem>
                              <Pause className="h-4 w-4 mr-2" />
                              Pause
                            </DropdownMenuItem>
                          ) : (
                            <DropdownMenuItem>
                              <Play className="h-4 w-4 mr-2" />
                              Activate
                            </DropdownMenuItem>
                          )}
                          <DropdownMenuItem className="text-destructive">
                            <Trash2 className="h-4 w-4 mr-2" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      <ChannelSelectModal
        open={showChannelModal}
        onClose={() => setShowChannelModal(false)}
        onSelect={handleChannelSelect}
      />
    </div>
  );
}
