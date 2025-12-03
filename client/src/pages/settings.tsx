import { useState } from "react";
import { Key, Mail, MessageSquare, Bell, Shield, Users, Save } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Header } from "@/components/layout/header";

export default function Settings() {
  const [emailSettings, setEmailSettings] = useState({
    smtpHost: "",
    smtpPort: "",
    smtpUser: "",
    smtpPassword: "",
    senderEmail: "",
    senderName: ""
  });

  const [smsSettings, setSmsSettings] = useState({
    provider: "twilio",
    apiKey: "",
    apiSecret: "",
    senderId: ""
  });

  const [pushSettings, setPushSettings] = useState({
    fcmKey: "",
    apnsKey: "",
    webVapidKey: ""
  });

  return (
    <div className="flex flex-col h-full">
      <Header title="App Setting" />
      
      <div className="flex-1 overflow-auto p-6">
        <Tabs defaultValue="api-keys" className="space-y-6">
          <TabsList data-testid="settings-tabs">
            <TabsTrigger value="api-keys" data-testid="tab-api-keys">
              <Key className="h-4 w-4 mr-2" />
              API Keys
            </TabsTrigger>
            <TabsTrigger value="email" data-testid="tab-email">
              <Mail className="h-4 w-4 mr-2" />
              Email
            </TabsTrigger>
            <TabsTrigger value="sms" data-testid="tab-sms">
              <MessageSquare className="h-4 w-4 mr-2" />
              SMS
            </TabsTrigger>
            <TabsTrigger value="push" data-testid="tab-push">
              <Bell className="h-4 w-4 mr-2" />
              Push
            </TabsTrigger>
          </TabsList>

          <TabsContent value="api-keys">
            <Card>
              <CardHeader>
                <CardTitle>API Keys</CardTitle>
                <CardDescription>
                  Manage your application API keys for SDK integration
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label>App Key</Label>
                    <div className="flex gap-2 mt-1.5">
                      <Input 
                        value="ak_live_xxxxxxxxxxxxx" 
                        readOnly 
                        className="font-mono text-sm"
                        data-testid="input-app-key"
                      />
                      <Button variant="outline" size="sm">Copy</Button>
                    </div>
                  </div>
                  <div>
                    <Label>App Secret</Label>
                    <div className="flex gap-2 mt-1.5">
                      <Input 
                        value="as_live_xxxxxxxxxxxxx" 
                        type="password"
                        readOnly 
                        className="font-mono text-sm"
                        data-testid="input-app-secret"
                      />
                      <Button variant="outline" size="sm">Copy</Button>
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
                  <div>
                    <h4 className="font-medium">Regenerate API Keys</h4>
                    <p className="text-sm text-muted-foreground">
                      This will invalidate your current keys
                    </p>
                  </div>
                  <Button variant="destructive" data-testid="button-regenerate-keys">
                    Regenerate
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="email">
            <Card>
              <CardHeader>
                <CardTitle>Email Settings</CardTitle>
                <CardDescription>
                  Configure SMTP settings for email campaigns
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="smtp-host">SMTP Host</Label>
                    <Input
                      id="smtp-host"
                      value={emailSettings.smtpHost}
                      onChange={(e) => setEmailSettings(s => ({ ...s, smtpHost: e.target.value }))}
                      placeholder="smtp.example.com"
                      className="mt-1.5"
                      data-testid="input-smtp-host"
                    />
                  </div>
                  <div>
                    <Label htmlFor="smtp-port">SMTP Port</Label>
                    <Input
                      id="smtp-port"
                      value={emailSettings.smtpPort}
                      onChange={(e) => setEmailSettings(s => ({ ...s, smtpPort: e.target.value }))}
                      placeholder="587"
                      className="mt-1.5"
                      data-testid="input-smtp-port"
                    />
                  </div>
                  <div>
                    <Label htmlFor="smtp-user">SMTP Username</Label>
                    <Input
                      id="smtp-user"
                      value={emailSettings.smtpUser}
                      onChange={(e) => setEmailSettings(s => ({ ...s, smtpUser: e.target.value }))}
                      placeholder="username"
                      className="mt-1.5"
                      data-testid="input-smtp-user"
                    />
                  </div>
                  <div>
                    <Label htmlFor="smtp-password">SMTP Password</Label>
                    <Input
                      id="smtp-password"
                      type="password"
                      value={emailSettings.smtpPassword}
                      onChange={(e) => setEmailSettings(s => ({ ...s, smtpPassword: e.target.value }))}
                      placeholder="********"
                      className="mt-1.5"
                      data-testid="input-smtp-password"
                    />
                  </div>
                  <div>
                    <Label htmlFor="sender-email">Sender Email</Label>
                    <Input
                      id="sender-email"
                      value={emailSettings.senderEmail}
                      onChange={(e) => setEmailSettings(s => ({ ...s, senderEmail: e.target.value }))}
                      placeholder="notifications@example.com"
                      className="mt-1.5"
                      data-testid="input-sender-email"
                    />
                  </div>
                  <div>
                    <Label htmlFor="sender-name">Sender Name</Label>
                    <Input
                      id="sender-name"
                      value={emailSettings.senderName}
                      onChange={(e) => setEmailSettings(s => ({ ...s, senderName: e.target.value }))}
                      placeholder="Your Company"
                      className="mt-1.5"
                      data-testid="input-sender-name"
                    />
                  </div>
                </div>
                <div className="flex justify-end">
                  <Button data-testid="button-save-email">
                    <Save className="h-4 w-4 mr-2" />
                    Save Settings
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="sms">
            <Card>
              <CardHeader>
                <CardTitle>SMS Settings</CardTitle>
                <CardDescription>
                  Configure SMS provider settings for SMS campaigns
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="sms-api-key">API Key</Label>
                    <Input
                      id="sms-api-key"
                      value={smsSettings.apiKey}
                      onChange={(e) => setSmsSettings(s => ({ ...s, apiKey: e.target.value }))}
                      placeholder="Enter API key"
                      className="mt-1.5"
                      data-testid="input-sms-api-key"
                    />
                  </div>
                  <div>
                    <Label htmlFor="sms-api-secret">API Secret</Label>
                    <Input
                      id="sms-api-secret"
                      type="password"
                      value={smsSettings.apiSecret}
                      onChange={(e) => setSmsSettings(s => ({ ...s, apiSecret: e.target.value }))}
                      placeholder="Enter API secret"
                      className="mt-1.5"
                      data-testid="input-sms-api-secret"
                    />
                  </div>
                  <div>
                    <Label htmlFor="sender-id">Sender ID</Label>
                    <Input
                      id="sender-id"
                      value={smsSettings.senderId}
                      onChange={(e) => setSmsSettings(s => ({ ...s, senderId: e.target.value }))}
                      placeholder="A2S2PR"
                      className="mt-1.5"
                      data-testid="input-sender-id"
                    />
                  </div>
                </div>
                <div className="flex justify-end">
                  <Button data-testid="button-save-sms">
                    <Save className="h-4 w-4 mr-2" />
                    Save Settings
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="push">
            <Card>
              <CardHeader>
                <CardTitle>Push Notification Settings</CardTitle>
                <CardDescription>
                  Configure push notification credentials for Android, iOS, and Web
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="fcm-key">Firebase Cloud Messaging (FCM) Key</Label>
                    <Input
                      id="fcm-key"
                      value={pushSettings.fcmKey}
                      onChange={(e) => setPushSettings(s => ({ ...s, fcmKey: e.target.value }))}
                      placeholder="Enter FCM server key"
                      className="mt-1.5"
                      data-testid="input-fcm-key"
                    />
                    <p className="text-xs text-muted-foreground mt-1">
                      Used for Android push notifications
                    </p>
                  </div>
                  <div>
                    <Label htmlFor="apns-key">Apple Push Notification Service (APNs) Key</Label>
                    <Input
                      id="apns-key"
                      value={pushSettings.apnsKey}
                      onChange={(e) => setPushSettings(s => ({ ...s, apnsKey: e.target.value }))}
                      placeholder="Upload .p8 key file or enter key"
                      className="mt-1.5"
                      data-testid="input-apns-key"
                    />
                    <p className="text-xs text-muted-foreground mt-1">
                      Used for iOS push notifications
                    </p>
                  </div>
                  <div>
                    <Label htmlFor="vapid-key">Web VAPID Key</Label>
                    <Input
                      id="vapid-key"
                      value={pushSettings.webVapidKey}
                      onChange={(e) => setPushSettings(s => ({ ...s, webVapidKey: e.target.value }))}
                      placeholder="Enter VAPID public key"
                      className="mt-1.5"
                      data-testid="input-vapid-key"
                    />
                    <p className="text-xs text-muted-foreground mt-1">
                      Used for web push notifications
                    </p>
                  </div>
                </div>
                <div className="flex justify-end">
                  <Button data-testid="button-save-push">
                    <Save className="h-4 w-4 mr-2" />
                    Save Settings
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
