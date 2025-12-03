import { useState } from "react";
import { Smartphone, Apple, Globe, Plus } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Header } from "@/components/layout/header";

export default function SetupNewApp() {
  const [appName, setAppName] = useState("");
  const [platforms, setPlatforms] = useState({
    android: false,
    ios: false,
    web: false
  });

  return (
    <div className="flex flex-col h-full">
      <Header title="Setup New App" />
      
      <div className="flex-1 overflow-auto p-6">
        <Card className="max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle className="text-xl">Create a New Application</CardTitle>
            <p className="text-sm text-muted-foreground mt-1">
              Configure your application settings to start tracking user engagement
            </p>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <Label htmlFor="app-name">Application Name</Label>
              <Input
                id="app-name"
                value={appName}
                onChange={(e) => setAppName(e.target.value)}
                placeholder="Enter your app name"
                className="mt-1.5"
                data-testid="input-app-name"
              />
            </div>

            <div>
              <Label className="mb-3 block">Select Platforms</Label>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div
                  className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                    platforms.android 
                      ? 'border-primary bg-primary/5' 
                      : 'border-border hover:border-muted-foreground'
                  }`}
                  onClick={() => setPlatforms(p => ({ ...p, android: !p.android }))}
                  data-testid="platform-android"
                >
                  <div className="flex items-center gap-3">
                    <Checkbox checked={platforms.android} />
                    <div className="flex items-center gap-2">
                      <Smartphone className="h-5 w-5 text-green-500" />
                      <span className="font-medium">Android</span>
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground mt-2 ml-7">
                    Track Android app users
                  </p>
                </div>

                <div
                  className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                    platforms.ios 
                      ? 'border-primary bg-primary/5' 
                      : 'border-border hover:border-muted-foreground'
                  }`}
                  onClick={() => setPlatforms(p => ({ ...p, ios: !p.ios }))}
                  data-testid="platform-ios"
                >
                  <div className="flex items-center gap-3">
                    <Checkbox checked={platforms.ios} />
                    <div className="flex items-center gap-2">
                      <Apple className="h-5 w-5 text-gray-500" />
                      <span className="font-medium">iOS</span>
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground mt-2 ml-7">
                    Track iOS app users
                  </p>
                </div>

                <div
                  className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                    platforms.web 
                      ? 'border-primary bg-primary/5' 
                      : 'border-border hover:border-muted-foreground'
                  }`}
                  onClick={() => setPlatforms(p => ({ ...p, web: !p.web }))}
                  data-testid="platform-web"
                >
                  <div className="flex items-center gap-3">
                    <Checkbox checked={platforms.web} />
                    <div className="flex items-center gap-2">
                      <Globe className="h-5 w-5 text-blue-500" />
                      <span className="font-medium">Web</span>
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground mt-2 ml-7">
                    Track website visitors
                  </p>
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-4 pt-4">
              <Button variant="outline" data-testid="button-cancel">
                Cancel
              </Button>
              <Button 
                disabled={!appName || !Object.values(platforms).some(Boolean)}
                data-testid="button-create-app"
              >
                <Plus className="h-4 w-4 mr-2" />
                Create Application
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
