import { useState } from "react";
import { Plus, Search, Filter, Calendar, Clock, Target, Users, ChevronDown, Download, Copy, X } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Header } from "@/components/layout/header";
import { segments } from "@/lib/dummy-data";

interface ConditionOption {
  id: string;
  label: string;
  description: string;
  icon: any;
  subOptions?: { id: string; label: string }[];
}

const conditionOptions: ConditionOption[] = [
  {
    id: "events",
    label: "Events",
    description: "Events performed by customers",
    icon: Calendar,
    subOptions: [
      { id: "past-event", label: "Past event" },
      { id: "live-event", label: "Live event" },
      { id: "journey", label: "Journey" }
    ]
  },
  {
    id: "traits",
    label: "User traits",
    description: "Properties related to the user",
    icon: Users
  }
];

function CreateSegmentModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [segmentName, setSegmentName] = useState("");
  const [segmentDescription, setSegmentDescription] = useState("");
  const [showConditionMenu, setShowConditionMenu] = useState(false);
  const [selectedConditionType, setSelectedConditionType] = useState<string | null>(null);
  const [conditions, setConditions] = useState<any[]>([]);

  const handleAddCondition = (type: string, subType?: string) => {
    setConditions([...conditions, { type, subType }]);
    setShowConditionMenu(false);
    setSelectedConditionType(null);
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-auto">
        <DialogHeader>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <Filter className="h-5 w-5 text-primary" />
            </div>
            <DialogTitle className="text-xl">Create segment</DialogTitle>
          </div>
        </DialogHeader>
        
        <div className="space-y-6 py-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2 space-y-4">
              <div>
                <Label htmlFor="segment-name" className="text-sm font-medium">Segment name</Label>
                <Input
                  id="segment-name"
                  value={segmentName}
                  onChange={(e) => setSegmentName(e.target.value)}
                  placeholder="Enter segment name"
                  className="mt-1.5"
                  data-testid="input-segment-name"
                />
              </div>
              <div>
                <Label htmlFor="segment-desc" className="text-sm font-medium">Segment description</Label>
                <Input
                  id="segment-desc"
                  value={segmentDescription}
                  onChange={(e) => setSegmentDescription(e.target.value)}
                  placeholder="Enter description"
                  className="mt-1.5"
                  data-testid="input-segment-description"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label className="text-sm font-medium">Segment Size</Label>
              <div className="flex items-center gap-3">
                <span className="text-3xl font-bold">0</span>
                <div className="flex gap-1">
                  <Button size="icon" variant="outline" className="h-8 w-8" data-testid="button-download-segment">
                    <Download className="h-4 w-4" />
                  </Button>
                  <Button size="icon" variant="outline" className="h-8 w-8" data-testid="button-copy-segment">
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-primary font-medium mb-4">Query</h3>
            <div className="border-l-2 border-primary pl-4">
              <Popover open={showConditionMenu} onOpenChange={setShowConditionMenu}>
                <PopoverTrigger asChild>
                  <Button variant="default" size="sm" className="gap-2" data-testid="button-add-condition">
                    <Plus className="h-4 w-4" />
                    Add Condition
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-80 p-0" align="start">
                  <div className="flex">
                    <div className="w-1/2 border-r border-border">
                      {conditionOptions.map((option) => (
                        <div
                          key={option.id}
                          className={`p-3 cursor-pointer hover:bg-muted ${selectedConditionType === option.id ? 'bg-muted' : ''}`}
                          onClick={() => {
                            if (option.subOptions) {
                              setSelectedConditionType(option.id);
                            } else {
                              handleAddCondition(option.id);
                            }
                          }}
                        >
                          <div className="flex items-center gap-2">
                            <div className={`w-6 h-6 rounded flex items-center justify-center ${option.id === 'events' ? 'bg-blue-100 text-blue-600' : 'bg-pink-100 text-pink-600'}`}>
                              <option.icon className="h-4 w-4" />
                            </div>
                            <div>
                              <div className="font-medium text-sm">{option.label}</div>
                              <div className="text-xs text-muted-foreground">{option.description}</div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                    {selectedConditionType && (
                      <div className="w-1/2">
                        <div className="p-2">
                          <div className="relative mb-2">
                            <Search className="absolute left-2 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <Input placeholder="Search" className="pl-8 h-8 text-sm" />
                          </div>
                          {conditionOptions
                            .find(o => o.id === selectedConditionType)
                            ?.subOptions?.map((sub) => (
                              <div
                                key={sub.id}
                                className="flex items-center gap-2 p-2 cursor-pointer hover:bg-muted rounded"
                                onClick={() => handleAddCondition(selectedConditionType, sub.id)}
                              >
                                <div className="w-5 h-5 rounded-full border border-border flex items-center justify-center">
                                  {sub.id === 'journey' ? (
                                    <div className="w-3 h-3 rounded bg-blue-500" />
                                  ) : (
                                    <div className="w-2 h-2 rounded-full bg-blue-500" />
                                  )}
                                </div>
                                <span className="text-sm">{sub.label}</span>
                              </div>
                            ))}
                        </div>
                      </div>
                    )}
                  </div>
                </PopoverContent>
              </Popover>

              {conditions.map((condition, index) => (
                <div key={index} className="mt-4 p-4 border border-border rounded-lg bg-muted/50">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">{condition.type} - {condition.subType}</span>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-6 w-6"
                      onClick={() => setConditions(conditions.filter((_, i) => i !== index))}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <DialogFooter className="gap-2">
          <Button variant="outline" onClick={onClose} data-testid="button-discard-segment">
            Discard
          </Button>
          <Button data-testid="button-create-segment">Create segment</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default function AudienceSegments() {
  const [showCreateModal, setShowCreateModal] = useState(false);

  return (
    <div className="flex flex-col h-full">
      <Header title="Audience / Create" />
      
      <div className="flex-1 overflow-auto p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold">Segments</h2>
          <Button onClick={() => setShowCreateModal(true)} data-testid="button-new-segment">
            <Plus className="h-4 w-4 mr-2" />
            Create Segment
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {segments.map((segment) => (
            <Card key={segment.id} className="hover-elevate cursor-pointer" data-testid={`card-segment-${segment.id}`}>
              <CardContent className="p-5">
                <div className="flex items-start justify-between mb-3">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Target className="h-5 w-5 text-primary" />
                  </div>
                  <span className="text-xs text-muted-foreground">{segment.createdAt}</span>
                </div>
                <h3 className="font-semibold mb-1">{segment.name}</h3>
                <p className="text-sm text-muted-foreground mb-3">{segment.description}</p>
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm font-medium">{segment.size.toLocaleString()} users</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <CreateSegmentModal open={showCreateModal} onClose={() => setShowCreateModal(false)} />
    </div>
  );
}
