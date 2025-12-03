import { useState } from "react";
import { useRoute, Link } from "wouter";
import { ChevronRight, Check, Smartphone, Image, Volume2, Vibrate, Bell } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Header } from "@/components/layout/header";

const steps = [
  { id: 1, label: "Create Message", active: true },
  { id: 2, label: "Select Audience", active: false },
  { id: 3, label: "Launch Campaign", active: false }
];

function MobilePreview({ 
  header, 
  description, 
  expandedText,
  expandedDescription 
}: { 
  header: string; 
  description: string;
  expandedText: boolean;
  expandedDescription: string;
}) {
  return (
    <div className="relative mx-auto" style={{ width: 280 }}>
      {/* Phone Frame */}
      <div className="relative bg-black rounded-[2.5rem] p-3 shadow-xl">
        {/* Notch */}
        <div className="absolute top-3 left-1/2 -translate-x-1/2 w-24 h-6 bg-black rounded-full z-10" />
        
        {/* Screen */}
        <div className="relative bg-gradient-to-b from-gray-800 to-gray-900 rounded-[2rem] overflow-hidden" style={{ height: 520 }}>
          {/* Status Bar */}
          <div className="flex items-center justify-between px-6 pt-3 text-white text-xs">
            <span>09:20</span>
            <div className="flex items-center gap-1">
              <div className="w-4 h-2.5 border border-white rounded-sm relative">
                <div className="absolute inset-0.5 bg-white rounded-sm" style={{ width: '60%' }} />
              </div>
            </div>
          </div>
          
          {/* Notification */}
          <div className="m-3 mt-8 bg-white rounded-2xl p-3 shadow-lg">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-lg bg-gray-200 flex items-center justify-center flex-shrink-0">
                <Image className="h-5 w-5 text-gray-400" />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="font-semibold text-sm text-gray-900 truncate">
                  {header || "Feel the Digital Cash revolution"}
                </h4>
                <p className="text-xs text-gray-600 mt-0.5 line-clamp-2">
                  {description || "Download & register on the 'Bank of India Digital rupee App'..."}
                </p>
                {expandedText && expandedDescription && (
                  <p className="text-xs text-gray-500 mt-1 line-clamp-3">
                    {expandedDescription}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function CampaignCreate() {
  const [, params] = useRoute("/engagement/campaigns/create/:channel");
  const channel = params?.channel || "push";
  
  const [templateName, setTemplateName] = useState("");
  const [header, setHeader] = useState("");
  const [description, setDescription] = useState("");
  const [expandedText, setExpandedText] = useState(true);
  const [expandedImage, setExpandedImage] = useState(false);
  const [expandedDescription, setExpandedDescription] = useState("");
  const [category, setCategory] = useState("");
  const [url, setUrl] = useState("");
  const [urlType, setUrlType] = useState("landing");
  const [openIn, setOpenIn] = useState("browser");
  const [customData, setCustomData] = useState(true);
  const [liveActivity, setLiveActivity] = useState(false);
  const [sound, setSound] = useState(false);
  const [vibrate, setVibrate] = useState(false);
  const [incrementBadge, setIncrementBadge] = useState(false);
  const [advancedOpen, setAdvancedOpen] = useState(false);
  const [platform, setPlatform] = useState("android");
  const [selectedTemplate, setSelectedTemplate] = useState("");

  return (
    <div className="flex flex-col h-full">
      <Header title={`All campaigns / create / ${channel}`} />
      
      <div className="flex-1 overflow-auto">
        {/* Progress Steps */}
        <div className="border-b border-border bg-background">
          <div className="flex items-center justify-center py-4 gap-8">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center gap-2">
                <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium ${
                  step.active 
                    ? 'bg-primary text-primary-foreground' 
                    : 'bg-muted text-muted-foreground'
                }`}>
                  {step.active ? <Check className="h-3 w-3" /> : step.id}
                </div>
                <span className={`text-sm ${step.active ? 'text-foreground font-medium' : 'text-muted-foreground'}`}>
                  {step.label}
                </span>
                {index < steps.length - 1 && (
                  <div className="w-12 h-0.5 bg-muted ml-2" />
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Form Section */}
            <div className="space-y-6">
              <h2 className="text-xl font-semibold">Push campaign</h2>
              
              <div>
                <Label className="text-sm text-muted-foreground">Select existing template</Label>
                <Select value={selectedTemplate} onValueChange={setSelectedTemplate}>
                  <SelectTrigger className="mt-1.5" data-testid="select-template">
                    <SelectValue placeholder="Select existing template" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="template1">Feel the Digital Cash revolution Android Nov25</SelectItem>
                    <SelectItem value="template2">Holiday Sale Push</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="template-name">Template name</Label>
                <Input
                  id="template-name"
                  value={templateName}
                  onChange={(e) => setTemplateName(e.target.value)}
                  placeholder="Template name"
                  className="mt-1.5"
                  data-testid="input-template-name"
                />
              </div>

              <div>
                <div className="flex justify-between items-center">
                  <Label htmlFor="header">Header</Label>
                  <span className="text-xs text-muted-foreground">{header.length}/500</span>
                </div>
                <Input
                  id="header"
                  value={header}
                  onChange={(e) => setHeader(e.target.value)}
                  placeholder="Push notification header"
                  className="mt-1.5"
                  maxLength={500}
                  data-testid="input-header"
                />
              </div>

              <div>
                <div className="flex justify-between items-center">
                  <Label htmlFor="description">Description</Label>
                  <span className="text-xs text-muted-foreground">{description.length}</span>
                </div>
                <Textarea
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Push notification description"
                  className="mt-1.5 min-h-[100px]"
                  data-testid="input-description"
                />
              </div>

              <div className="flex flex-wrap gap-8">
                <div className="flex items-center gap-4">
                  <Label>Expanded text</Label>
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant={expandedText ? "default" : "outline"}
                      onClick={() => setExpandedText(true)}
                      data-testid="button-expanded-text-yes"
                    >
                      Yes
                    </Button>
                    <Button
                      size="sm"
                      variant={!expandedText ? "default" : "outline"}
                      onClick={() => setExpandedText(false)}
                      data-testid="button-expanded-text-no"
                    >
                      No
                    </Button>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <Label>Expanded image</Label>
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant={expandedImage ? "default" : "outline"}
                      onClick={() => setExpandedImage(true)}
                      data-testid="button-expanded-image-yes"
                    >
                      Yes
                    </Button>
                    <Button
                      size="sm"
                      variant={!expandedImage ? "default" : "outline"}
                      onClick={() => setExpandedImage(false)}
                      data-testid="button-expanded-image-no"
                    >
                      No
                    </Button>
                  </div>
                </div>
              </div>

              {expandedText && (
                <div>
                  <div className="flex justify-between items-center">
                    <Label htmlFor="expanded-description">Expanded text description</Label>
                    <span className="text-xs text-muted-foreground">{expandedDescription.length}</span>
                  </div>
                  <Textarea
                    id="expanded-description"
                    value={expandedDescription}
                    onChange={(e) => setExpandedDescription(e.target.value)}
                    placeholder="Expanded text description"
                    className="mt-1.5 min-h-[100px]"
                    data-testid="input-expanded-description"
                  />
                </div>
              )}

              <div>
                <Label htmlFor="category">Category</Label>
                <Input
                  id="category"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  placeholder="Category"
                  className="mt-1.5"
                  data-testid="input-category"
                />
              </div>

              <Collapsible open={advancedOpen} onOpenChange={setAdvancedOpen}>
                <CollapsibleTrigger asChild>
                  <Button variant="ghost" className="w-full justify-between" data-testid="button-advanced-settings">
                    Advanced settings
                    <ChevronRight className={`h-4 w-4 transition-transform ${advancedOpen ? 'rotate-90' : ''}`} />
                  </Button>
                </CollapsibleTrigger>
                <CollapsibleContent className="space-y-4 pt-4">
                  <div>
                    <Label htmlFor="url">URL</Label>
                    <Input
                      id="url"
                      value={url}
                      onChange={(e) => setUrl(e.target.value)}
                      placeholder="External URL/Deeplink URL"
                      className="mt-1.5"
                      data-testid="input-url"
                    />
                  </div>

                  <div className="flex items-center gap-4">
                    <Label>URL type</Label>
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant={urlType === "landing" ? "default" : "outline"}
                        onClick={() => setUrlType("landing")}
                        data-testid="button-url-landing"
                      >
                        Landing page
                      </Button>
                      <Button
                        size="sm"
                        variant={urlType === "deeplink" ? "default" : "outline"}
                        onClick={() => setUrlType("deeplink")}
                        data-testid="button-url-deeplink"
                      >
                        Deep link
                      </Button>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <Label>Open in</Label>
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant={openIn === "browser" ? "default" : "outline"}
                        onClick={() => setOpenIn("browser")}
                        data-testid="button-open-browser"
                      >
                        Browser
                      </Button>
                      <Button
                        size="sm"
                        variant={openIn === "webview" ? "default" : "outline"}
                        onClick={() => setOpenIn("webview")}
                        data-testid="button-open-webview"
                      >
                        Webview
                      </Button>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <Label>Custom data</Label>
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant={customData ? "default" : "outline"}
                        onClick={() => setCustomData(true)}
                        data-testid="button-custom-data-yes"
                      >
                        Yes
                      </Button>
                      <Button
                        size="sm"
                        variant={!customData ? "default" : "outline"}
                        onClick={() => setCustomData(false)}
                        data-testid="button-custom-data-no"
                      >
                        No
                      </Button>
                      {customData && (
                        <Button size="sm" variant="destructive" data-testid="button-edit-view">
                          Edit/View
                        </Button>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <Label>Live activity</Label>
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant={liveActivity ? "default" : "outline"}
                        onClick={() => setLiveActivity(true)}
                        data-testid="button-live-activity-yes"
                      >
                        Yes
                      </Button>
                      <Button
                        size="sm"
                        variant={!liveActivity ? "default" : "outline"}
                        onClick={() => setLiveActivity(false)}
                        data-testid="button-live-activity-no"
                      >
                        No
                      </Button>
                    </div>
                  </div>

                  <div className="flex items-center gap-8">
                    <Label>Special Attributes</Label>
                    <div className="flex gap-4">
                      <div className="flex items-center gap-2">
                        <span className="text-sm">Sound</span>
                        <Button
                          size="sm"
                          variant={sound ? "default" : "outline"}
                          onClick={() => setSound(!sound)}
                          data-testid="button-sound"
                        >
                          {sound ? "Yes" : "No"}
                        </Button>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm">Vibrate</span>
                        <Button
                          size="sm"
                          variant={vibrate ? "default" : "outline"}
                          onClick={() => setVibrate(!vibrate)}
                          data-testid="button-vibrate"
                        >
                          {vibrate ? "Yes" : "No"}
                        </Button>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm">Increment badge</span>
                        <Button
                          size="sm"
                          variant={incrementBadge ? "default" : "outline"}
                          onClick={() => setIncrementBadge(!incrementBadge)}
                          data-testid="button-increment-badge"
                        >
                          {incrementBadge ? "Yes" : "No"}
                        </Button>
                      </div>
                    </div>
                  </div>
                </CollapsibleContent>
              </Collapsible>
            </div>

            {/* Preview Section */}
            <div className="space-y-6">
              <div className="flex justify-center">
                <MobilePreview
                  header={header}
                  description={description}
                  expandedText={expandedText}
                  expandedDescription={expandedDescription}
                />
              </div>
              
              <div className="flex justify-center gap-2">
                <Button
                  variant={platform === "android" ? "default" : "outline"}
                  onClick={() => setPlatform("android")}
                  className="gap-2"
                  data-testid="button-platform-android"
                >
                  <Smartphone className="h-4 w-4" />
                  Android
                </Button>
                <Button
                  variant={platform === "ios" ? "default" : "outline"}
                  onClick={() => setPlatform("ios")}
                  className="gap-2"
                  data-testid="button-platform-ios"
                >
                  <Smartphone className="h-4 w-4" />
                  iOS
                </Button>
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-4 mt-8">
            <Link href="/engagement/campaigns">
              <Button variant="outline" data-testid="button-cancel">Cancel</Button>
            </Link>
            <Button data-testid="button-next-step">Next Step</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
