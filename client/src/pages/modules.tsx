import { useState } from "react";
import { Shield, Bell, MessageSquare, Mail, BarChart3, Users, Zap, Settings, Check } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Header } from "@/components/layout/header";

interface Module {
  id: string;
  name: string;
  description: string;
  icon: any;
  enabled: boolean;
  category: "engagement" | "analytics" | "security";
}

const modules: Module[] = [
  {
    id: "push",
    name: "Push Notifications",
    description: "Send push notifications to Android, iOS, and web users",
    icon: Bell,
    enabled: true,
    category: "engagement"
  },
  {
    id: "in-app",
    name: "In-App Messaging",
    description: "Display contextual messages within your app",
    icon: MessageSquare,
    enabled: true,
    category: "engagement"
  },
  {
    id: "email",
    name: "Email Campaigns",
    description: "Send automated email campaigns to users",
    icon: Mail,
    enabled: false,
    category: "engagement"
  },
  {
    id: "analytics",
    name: "Event Analytics",
    description: "Track and analyze user events and behavior",
    icon: BarChart3,
    enabled: true,
    category: "analytics"
  },
  {
    id: "segments",
    name: "Audience Segments",
    description: "Create and manage user segments for targeting",
    icon: Users,
    enabled: true,
    category: "analytics"
  },
  {
    id: "funnels",
    name: "Funnel Analysis",
    description: "Analyze user conversion funnels",
    icon: Zap,
    enabled: true,
    category: "analytics"
  },
  {
    id: "gdpr",
    name: "GDPR Compliance",
    description: "Manage user data and consent preferences",
    icon: Shield,
    enabled: false,
    category: "security"
  }
];

function ModuleCard({ module, onToggle }: { module: Module; onToggle: (id: string, enabled: boolean) => void }) {
  const Icon = module.icon;

  return (
    <Card className="overflow-visible" data-testid={`card-module-${module.id}`}>
      <CardContent className="p-5">
        <div className="flex items-start justify-between mb-3">
          <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
            <Icon className="h-5 w-5 text-primary" />
          </div>
          <Switch
            checked={module.enabled}
            onCheckedChange={(checked) => onToggle(module.id, checked)}
            data-testid={`switch-module-${module.id}`}
          />
        </div>
        <h3 className="font-semibold mb-1">{module.name}</h3>
        <p className="text-sm text-muted-foreground mb-3">{module.description}</p>
        <div className="flex items-center justify-between">
          <Badge 
            variant="secondary" 
            className={
              module.category === "engagement" 
                ? "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300"
                : module.category === "analytics"
                ? "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300"
                : "bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300"
            }
          >
            {module.category}
          </Badge>
          {module.enabled && (
            <span className="text-xs text-green-600 flex items-center gap-1">
              <Check className="h-3 w-3" />
              Active
            </span>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

export default function Modules() {
  const [moduleList, setModuleList] = useState(modules);

  const handleToggle = (id: string, enabled: boolean) => {
    setModuleList(prev =>
      prev.map(m => m.id === id ? { ...m, enabled } : m)
    );
  };

  const engagementModules = moduleList.filter(m => m.category === "engagement");
  const analyticsModules = moduleList.filter(m => m.category === "analytics");
  const securityModules = moduleList.filter(m => m.category === "security");

  return (
    <div className="flex flex-col h-full">
      <Header title="Modules" />
      
      <div className="flex-1 overflow-auto p-6 space-y-8">
        <div>
          <h2 className="text-lg font-semibold mb-1">Modules Configuration</h2>
          <p className="text-sm text-muted-foreground">
            Enable or disable platform modules based on your needs
          </p>
        </div>

        {/* Engagement Modules */}
        <div>
          <h3 className="text-base font-medium mb-4 flex items-center gap-2">
            <Bell className="h-4 w-4" />
            Engagement Modules
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {engagementModules.map((module) => (
              <ModuleCard key={module.id} module={module} onToggle={handleToggle} />
            ))}
          </div>
        </div>

        {/* Analytics Modules */}
        <div>
          <h3 className="text-base font-medium mb-4 flex items-center gap-2">
            <BarChart3 className="h-4 w-4" />
            Analytics Modules
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {analyticsModules.map((module) => (
              <ModuleCard key={module.id} module={module} onToggle={handleToggle} />
            ))}
          </div>
        </div>

        {/* Security Modules */}
        <div>
          <h3 className="text-base font-medium mb-4 flex items-center gap-2">
            <Shield className="h-4 w-4" />
            Security & Compliance
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {securityModules.map((module) => (
              <ModuleCard key={module.id} module={module} onToggle={handleToggle} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
