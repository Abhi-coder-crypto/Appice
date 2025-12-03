import { useState } from "react";
import { GripVertical, ChevronDown, ChevronRight, Save } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Header } from "@/components/layout/header";
import { displayPreferences } from "@/lib/dummy-data";
import type { DisplayPreferenceItem } from "@shared/schema";

function PreferenceItem({ 
  item, 
  depth = 0 
}: { 
  item: DisplayPreferenceItem; 
  depth?: number;
}) {
  const [isOpen, setIsOpen] = useState(true);
  const hasChildren = item.children && item.children.length > 0;

  return (
    <div className="select-none">
      <div 
        className={`flex items-center gap-2 py-2 px-3 rounded-md hover:bg-muted/50 cursor-move transition-colors`}
        style={{ marginLeft: depth * 24 }}
        data-testid={`preference-item-${item.id}`}
      >
        <GripVertical className="h-4 w-4 text-muted-foreground flex-shrink-0" />
        
        {hasChildren && (
          <Button
            variant="ghost"
            size="icon"
            className="h-5 w-5 p-0"
            onClick={() => setIsOpen(!isOpen)}
            data-testid={`toggle-${item.id}`}
          >
            {isOpen ? (
              <ChevronDown className="h-3 w-3" />
            ) : (
              <ChevronRight className="h-3 w-3" />
            )}
          </Button>
        )}
        
        {!hasChildren && <div className="w-5" />}
        
        <span className="text-sm">{item.label}</span>
      </div>
      
      {hasChildren && isOpen && (
        <div>
          {item.children!.map((child) => (
            <PreferenceItem key={child.id} item={child} depth={depth + 1} />
          ))}
        </div>
      )}
    </div>
  );
}

export default function DisplayPreference() {
  const [preferences, setPreferences] = useState(displayPreferences);

  return (
    <div className="flex flex-col h-full">
      <Header title="Display Preference" />
      
      <div className="flex-1 overflow-auto p-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between gap-4">
            <div>
              <CardTitle className="text-base font-semibold">Display Preference</CardTitle>
              <p className="text-sm text-muted-foreground mt-1">
                Drag and drop the navigation links below to rearrange the display. Press save once done and refresh the site to see the navigation.
              </p>
            </div>
            <Button data-testid="button-save-preferences">
              <Save className="h-4 w-4 mr-2" />
              Save
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-1 border border-border rounded-lg p-4">
              {preferences.map((item) => (
                <PreferenceItem key={item.id} item={item} />
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
