import { useState } from "react";
import { Plus, Smartphone, Apple, Globe, Settings, Trash2, Edit, ChevronRight, Activity, TrendingUp } from "lucide-react";
import { Link } from "wouter";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
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
                  <Smartphone className="h-4 w-4 text-emerald-500" />
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
                  <Apple className="h-4 w-4 text-slate-500" />
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
                  <Globe className="h-4 w-4 text-orange-500" />
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

  const getTotalActive = (app: any) => {
    const android = typeof app.platforms.android?.active === 'number' ? app.platforms.android.active : 0;
    const ios = typeof app.platforms.ios?.active === 'number' ? app.platforms.ios.active : 0;
    const web = typeof app.platforms.web?.active === 'number' ? app.platforms.web.active : 0;
    return android + ios + web;
  };

  return (
    <div className="flex flex-col h-full">
      <Header title="App Management" />
      
      <div className="flex-1 overflow-auto p-6 bg-muted/30">
        <Card>
          <CardHeader className="border-b">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Registered Applications</CardTitle>
                <p className="text-sm text-muted-foreground mt-1">
                  Manage your applications and their configurations
                </p>
              </div>
              <Link href="/setup/new-app">
                <Button data-testid="button-add-app">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Application
                </Button>
              </Link>
            </div>
          </CardHeader>
          
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/50">
                  <TableHead className="w-[300px]">Application</TableHead>
                  <TableHead>Platforms</TableHead>
                  <TableHead className="text-center">Android</TableHead>
                  <TableHead className="text-center">iOS</TableHead>
                  <TableHead className="text-center">Web</TableHead>
                  <TableHead className="text-center">Total Active</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {apps.map((app) => (
                  <TableRow key={app.id} className="hover:bg-muted/30" data-testid={`card-app-${app.id}`}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-primary/70 flex items-center justify-center shadow">
                          <Activity className="h-5 w-5 text-primary-foreground" />
                        </div>
                        <div>
                          <p className="font-semibold">{app.name}</p>
                          <p className="text-xs text-muted-foreground">ID: {app.id}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-1">
                        {app.platforms.android && (
                          <div className="w-6 h-6 rounded bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center">
                            <Smartphone className="h-3 w-3 text-emerald-600 dark:text-emerald-400" />
                          </div>
                        )}
                        {app.platforms.ios && (
                          <div className="w-6 h-6 rounded bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
                            <Apple className="h-3 w-3 text-slate-600 dark:text-slate-400" />
                          </div>
                        )}
                        {app.platforms.web && (
                          <div className="w-6 h-6 rounded bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center">
                            <Globe className="h-3 w-3 text-orange-600 dark:text-orange-400" />
                          </div>
                        )}
                      </div>
                    </TableCell>
                    <TableCell className="text-center font-medium">
                      {app.platforms.android?.active || "—"}
                    </TableCell>
                    <TableCell className="text-center font-medium">
                      {app.platforms.ios?.active || "—"}
                    </TableCell>
                    <TableCell className="text-center font-medium">
                      {app.platforms.web?.active || "—"}
                    </TableCell>
                    <TableCell className="text-center">
                      <Badge className="bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400 border-0">
                        <TrendingUp className="h-3 w-3 mr-1" />
                        {getTotalActive(app).toLocaleString()}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-1">
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          onClick={() => handleEdit(app)}
                          data-testid={`button-edit-${app.id}`}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="icon"
                          data-testid={`button-settings-${app.id}`}
                        >
                          <Settings className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="icon"
                          className="text-destructive hover:text-destructive"
                          data-testid={`button-delete-${app.id}`}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>

      <EditAppModal 
        app={selectedApp} 
        open={showEditModal} 
        onClose={() => setShowEditModal(false)} 
      />
    </div>
  );
}
