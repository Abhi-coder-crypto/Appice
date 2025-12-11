import { Link } from "wouter";
import { Smartphone, Apple, Globe, ArrowRight, MoreHorizontal, Activity, Users } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Header } from "@/components/layout/header";
import { Badge } from "@/components/ui/badge";
import { apps } from "@/lib/dummy-data";

export default function Home() {
  return (
    <div className="flex flex-col h-full">
      <Header />
      
      <div className="flex-1 overflow-auto p-6 bg-muted/30">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-foreground">Your Applications</h2>
          <p className="text-muted-foreground">Manage and monitor your connected apps</p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {apps.map((app) => {
            const totalActive = 
              (typeof app.platforms.android.active === 'number' ? app.platforms.android.active : 0) +
              (typeof app.platforms.ios.active === 'number' ? app.platforms.ios.active : 0) +
              (typeof app.platforms.web.active === 'number' ? app.platforms.web.active : 0);
            
            return (
              <Card key={app.id} className="overflow-hidden hover:shadow-lg transition-shadow" data-testid={`app-card-${app.id}`}>
                <div className="bg-gradient-to-r from-primary/10 to-primary/5 p-4 border-b">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-xl bg-primary flex items-center justify-center shadow-md">
                        <Activity className="h-6 w-6 text-primary-foreground" />
                      </div>
                      <div>
                        <h3 className="font-bold text-lg text-foreground">{app.name}</h3>
                        <p className="text-xs text-muted-foreground">App ID: {app.id}</p>
                      </div>
                    </div>
                    <Button variant="ghost" size="icon">
                      <MoreHorizontal className="h-5 w-5" />
                    </Button>
                  </div>
                </div>
                
                <CardContent className="p-4">
                  <div className="flex items-center gap-2 mb-4">
                    <Badge variant="secondary" className="bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400">
                      <Users className="h-3 w-3 mr-1" />
                      {totalActive.toLocaleString()} Active Users
                    </Badge>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-3 mb-4">
                    <div className="bg-muted/50 rounded-lg p-3 text-center">
                      <div className="flex items-center justify-center mb-2">
                        <Smartphone className="h-5 w-5 text-emerald-500" />
                      </div>
                      <p className="text-lg font-bold">{app.platforms.android.active}</p>
                      <p className="text-xs text-muted-foreground">Android</p>
                    </div>
                    <div className="bg-muted/50 rounded-lg p-3 text-center">
                      <div className="flex items-center justify-center mb-2">
                        <Apple className="h-5 w-5 text-slate-500" />
                      </div>
                      <p className="text-lg font-bold">{app.platforms.ios.active}</p>
                      <p className="text-xs text-muted-foreground">iOS</p>
                    </div>
                    <div className="bg-muted/50 rounded-lg p-3 text-center">
                      <div className="flex items-center justify-center mb-2">
                        <Globe className="h-5 w-5 text-orange-500" />
                      </div>
                      <p className="text-lg font-bold">{app.platforms.web.active}</p>
                      <p className="text-xs text-muted-foreground">Web</p>
                    </div>
                  </div>
                  
                  <div className="flex gap-2">
                    <Link href="/dashboard" className="flex-1">
                      <Button className="w-full" data-testid={`button-dashboard-${app.id}`}>
                        Open Dashboard
                        <ArrowRight className="h-4 w-4 ml-2" />
                      </Button>
                    </Link>
                    <Button variant="outline" data-testid={`button-settings-${app.id}`}>
                      Settings
                    </Button>
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
