import { useState } from "react";
import { Plus, Smartphone, Apple, Globe, Settings, Trash2, MoreVertical, Edit } from "lucide-react";
import { Link } from "wouter";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Header } from "@/components/layout/header";
import { apps } from "@/lib/dummy-data";

function EditAppModal({ app, open, onClose }: { app: any; open: boolean; onClose: () => void }) {
  const [appName, setAppName] = useState(app?.name || "");
  const [platforms, setPlatforms] = useState({
    android: true,
    ios: true,
    web: true
  });

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Edit Application</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4 py-4">
          <div>
            <Label htmlFor="edit-app-name">Application Name</Label>
            <Input
              id="edit-app-name"
              value={appName}
              onChange={(e) => setAppName(e.target.value)}
              className="mt-1.5"
              data-testid="input-edit-app-name"
            />
          </div>
          <div>
            <Label className="mb-2 block">Enabled Platforms</Label>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Smartphone className="h-4 w-4 text-green-500" />
                  <span className="text-sm">Android</span>
                </div>
                <Switch 
                  checked={platforms.android} 
                  onCheckedChange={(v) => setPlatforms(p => ({ ...p, android: v }))}
                  data-testid="switch-android"
                />
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Apple className="h-4 w-4 text-gray-500" />
                  <span className="text-sm">iOS</span>
                </div>
                <Switch 
                  checked={platforms.ios} 
                  onCheckedChange={(v) => setPlatforms(p => ({ ...p, ios: v }))}
                  data-testid="switch-ios"
                />
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Globe className="h-4 w-4 text-blue-500" />
                  <span className="text-sm">Web</span>
                </div>
                <Switch 
                  checked={platforms.web} 
                  onCheckedChange={(v) => setPlatforms(p => ({ ...p, web: v }))}
                  data-testid="switch-web"
                />
              </div>
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose} data-testid="button-cancel-edit">
            Cancel
          </Button>
          <Button data-testid="button-save-app">
            Save Changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default function AppManagement() {
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedApp, setSelectedApp] = useState<any>(null);

  const handleEdit = (app: any) => {
    setSelectedApp(app);
    setShowEditModal(true);
  };

  return (
    <div className="flex flex-col h-full">
      <Header title="App Management" />
      
      <div className="flex-1 overflow-auto p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold">Your Applications</h2>
            <p className="text-sm text-muted-foreground mt-1">
              Manage your registered applications and their settings
            </p>
          </div>
          <Link href="/setup/new-app">
            <Button data-testid="button-add-app">
              <Plus className="h-4 w-4 mr-2" />
              Add Application
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {apps.map((app) => (
            <Card key={app.id} data-testid={`card-app-${app.id}`}>
              <CardContent className="p-5">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                      <Smartphone className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold">{app.name}</h3>
                      <p className="text-xs text-muted-foreground">ID: {app.id}</p>
                    </div>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" data-testid={`button-app-menu-${app.id}`}>
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => handleEdit(app)}>
                        <Edit className="h-4 w-4 mr-2" />
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Settings className="h-4 w-4 mr-2" />
                        Settings
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-destructive">
                        <Trash2 className="h-4 w-4 mr-2" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>

                <div className="flex gap-2 mb-4">
                  {app.platforms.android && (
                    <Badge variant="secondary" className="bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300">
                      <Smartphone className="h-3 w-3 mr-1" />
                      Android
                    </Badge>
                  )}
                  {app.platforms.ios && (
                    <Badge variant="secondary" className="bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300">
                      <Apple className="h-3 w-3 mr-1" />
                      iOS
                    </Badge>
                  )}
                  {app.platforms.web && (
                    <Badge variant="secondary" className="bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300">
                      <Globe className="h-3 w-3 mr-1" />
                      Web
                    </Badge>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-muted-foreground">Active Users</span>
                    <p className="font-semibold">
                      {(app.platforms.android?.active || 0) + 
                       (app.platforms.ios?.active || 0) + 
                       (app.platforms.web?.active || 0)}
                    </p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Inactive Users</span>
                    <p className="font-semibold">
                      {(app.platforms.android?.inactive || 0) + 
                       (app.platforms.ios?.inactive || 0) + 
                       (app.platforms.web?.inactive || 0)}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <EditAppModal 
        app={selectedApp} 
        open={showEditModal} 
        onClose={() => setShowEditModal(false)} 
      />
    </div>
  );
}
