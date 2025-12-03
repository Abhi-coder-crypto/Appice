import { Link } from "wouter";
import { Smartphone, Apple, Globe, Settings, Trash2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Header } from "@/components/layout/header";
import { apps } from "@/lib/dummy-data";

export default function Home() {
  return (
    <div className="flex flex-col h-full">
      <Header />
      
      <div className="flex-1 overflow-auto p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {apps.map((app) => (
            <Card key={app.id} className="overflow-visible" data-testid={`app-card-${app.id}`}>
              <CardContent className="p-5">
                <div className="flex items-center gap-3 mb-4">
                  <div className="flex items-center gap-1">
                    <div className="w-6 h-6 rounded bg-green-500 flex items-center justify-center">
                      <Smartphone className="h-3 w-3 text-white" />
                    </div>
                    <div className="w-6 h-6 rounded bg-red-500 flex items-center justify-center">
                      <span className="text-white text-xs">▶</span>
                    </div>
                    <div className="w-6 h-6 rounded bg-blue-500 flex items-center justify-center">
                      <Globe className="h-3 w-3 text-white" />
                    </div>
                  </div>
                  <h3 className="font-semibold text-foreground">{app.name}</h3>
                </div>
                
                <div className="grid grid-cols-4 gap-4 mb-4 text-center">
                  <div></div>
                  <div className="flex flex-col items-center">
                    <Smartphone className="h-4 w-4 text-green-500 mb-1" />
                  </div>
                  <div className="flex flex-col items-center">
                    <Apple className="h-4 w-4 text-gray-500 mb-1" />
                  </div>
                  <div className="flex flex-col items-center">
                    <Globe className="h-4 w-4 text-blue-500 mb-1" />
                  </div>
                </div>
                
                <div className="space-y-2 text-sm">
                  <div className="grid grid-cols-4 gap-4">
                    <span className="text-muted-foreground">ACTIVE</span>
                    <span className="text-center font-medium">{app.platforms.android.active}</span>
                    <span className="text-center font-medium">{app.platforms.ios.active}</span>
                    <span className="text-center font-medium">{app.platforms.web.active}</span>
                  </div>
                  <div className="grid grid-cols-4 gap-4">
                    <span className="text-muted-foreground">INACTIVE</span>
                    <span className="text-center font-medium">{app.platforms.android.inactive}</span>
                    <span className="text-center font-medium">{app.platforms.ios.inactive}</span>
                    <span className="text-center font-medium">{app.platforms.web.inactive}</span>
                  </div>
                </div>
                
                <div className="flex gap-2 mt-4">
                  <Link href="/dashboard">
                    <Button size="sm" data-testid={`button-dashboard-${app.id}`}>
                      Dashboard
                    </Button>
                  </Link>
                  <Button size="sm" variant="secondary" data-testid={`button-settings-${app.id}`}>
                    Settings
                  </Button>
                  <Button size="sm" variant="destructive" data-testid={`button-delete-${app.id}`}>
                    Delete
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
