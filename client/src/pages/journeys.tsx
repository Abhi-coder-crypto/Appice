import { useState } from "react";
import { Plus, Search, ChevronDown, Check } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { Header } from "@/components/layout/header";
import { journeyEvents, profileAttributes } from "@/lib/dummy-data";

export default function Journeys() {
  const [selectedJourney, setSelectedJourney] = useState("");
  const [selectedEvent, setSelectedEvent] = useState("");
  const [eventName, setEventName] = useState("");
  const [step, setStep] = useState("");

  return (
    <div className="flex flex-col h-full">
      <Header title="Data Management / Journeys" />
      
      <div className="flex-1 overflow-auto p-6 space-y-6">
        {/* Update Event Section */}
        <Card data-testid="card-update-event">
          <CardHeader>
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center text-xs font-medium text-primary">2</div>
              <CardTitle className="text-base font-semibold">Update event</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
              <div>
                <Label className="text-sm text-muted-foreground">Select journey</Label>
                <Select value={selectedJourney} onValueChange={setSelectedJourney}>
                  <SelectTrigger className="mt-1.5" data-testid="select-journey">
                    <SelectValue placeholder="Select journey" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="journey1">User Onboarding</SelectItem>
                    <SelectItem value="journey2">Purchase Flow</SelectItem>
                    <SelectItem value="journey3">Account Setup</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label className="text-sm text-muted-foreground">Select event</Label>
                <Select value={selectedEvent} onValueChange={setSelectedEvent}>
                  <SelectTrigger className="mt-1.5" data-testid="select-event">
                    <SelectValue placeholder="Select event" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="login">Login</SelectItem>
                    <SelectItem value="registration">Registration</SelectItem>
                    <SelectItem value="pageview">PageView</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-center gap-2">
                <Checkbox id="set-display" data-testid="checkbox-set-display" />
                <Label htmlFor="set-display" className="text-sm">Set display</Label>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex-1">
                <Input
                  value={eventName}
                  onChange={(e) => setEventName(e.target.value)}
                  placeholder="Event name"
                  className="bg-primary/10"
                  data-testid="input-event-name"
                />
              </div>
              <span className="text-sm text-muted-foreground">is</span>
              <Select value={step} onValueChange={setStep}>
                <SelectTrigger className="w-32" data-testid="select-step">
                  <SelectValue placeholder="Select step" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="step1">Step 1</SelectItem>
                  <SelectItem value="step2">Step 2</SelectItem>
                  <SelectItem value="step3">Step 3</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="secondary" data-testid="button-add-event">Add event</Button>
            </div>
          </CardContent>
        </Card>

        {/* Validate Events Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card data-testid="card-validate-events">
            <CardHeader>
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center text-xs font-medium text-primary">3</div>
                <CardTitle className="text-base font-semibold">Validate events in journey</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <Select>
                <SelectTrigger data-testid="select-validate-journey">
                  <SelectValue placeholder="Select journey" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="journey1">User Onboarding</SelectItem>
                  <SelectItem value="journey2">Purchase Flow</SelectItem>
                </SelectContent>
              </Select>
            </CardContent>
          </Card>

          <Card data-testid="card-update-attributes">
            <CardHeader>
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center text-xs font-medium text-primary">4</div>
                <CardTitle className="text-base font-semibold">Add/remove/update attributes</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">Select event to edit attribute</p>
            </CardContent>
          </Card>
        </div>

        {/* Profile Attributes Table */}
        <Card data-testid="card-profile-attributes">
          <CardHeader>
            <CardTitle className="text-base font-semibold">Profile</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-xs font-semibold">Name</TableHead>
                  <TableHead className="text-xs font-semibold">Display name</TableHead>
                  <TableHead className="text-xs font-semibold">Type</TableHead>
                  <TableHead className="text-xs font-semibold text-center">Display</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {profileAttributes.map((attr, index) => (
                  <TableRow key={index} data-testid={`row-attribute-${index}`}>
                    <TableCell>
                      <Input 
                        value={attr.name} 
                        className="h-8 text-sm"
                        readOnly
                      />
                    </TableCell>
                    <TableCell>
                      <Input 
                        value={attr.displayName} 
                        placeholder="Display name"
                        className="h-8 text-sm"
                        data-testid={`input-display-name-${index}`}
                      />
                    </TableCell>
                    <TableCell>
                      <Select defaultValue={attr.type}>
                        <SelectTrigger className="h-8 text-sm" data-testid={`select-type-${index}`}>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Number">Number</SelectItem>
                          <SelectItem value="String">String</SelectItem>
                          <SelectItem value="Boolean">Boolean</SelectItem>
                          <SelectItem value="object">object</SelectItem>
                        </SelectContent>
                      </Select>
                    </TableCell>
                    <TableCell className="text-center">
                      <Checkbox 
                        defaultChecked={attr.display} 
                        data-testid={`checkbox-display-${index}`}
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
