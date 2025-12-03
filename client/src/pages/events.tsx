import { useState } from "react";
import { Search, Download, ChevronDown, BarChart3 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Header } from "@/components/layout/header";
import { topEvents } from "@/lib/dummy-data";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

export default function Events() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedEvent, setSelectedEvent] = useState<string | null>(null);

  const filteredEvents = topEvents.filter(event => 
    event.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex flex-col h-full">
      <Header title="Events" showPlatformFilter showDateFilter />
      
      <div className="flex-1 overflow-auto p-6 space-y-6">
        {/* Search and Filters */}
        <div className="flex flex-wrap items-center gap-4">
          <div className="relative flex-1 min-w-[200px] max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search events..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9"
              data-testid="input-search-events"
            />
          </div>
          <Button variant="outline" data-testid="button-export-events">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>

        {/* Events Chart */}
        <Card data-testid="card-events-chart">
          <CardHeader>
            <CardTitle className="text-base font-semibold">Event Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={filteredEvents} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" horizontal />
                <XAxis type="number" tick={{ fontSize: 12 }} stroke="hsl(var(--muted-foreground))" />
                <YAxis 
                  dataKey="name" 
                  type="category" 
                  tick={{ fontSize: 11 }} 
                  width={120}
                  stroke="hsl(var(--muted-foreground))" 
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'hsl(var(--card))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '6px'
                  }}
                  formatter={(value: number) => [value.toLocaleString(), 'Count']}
                />
                <Bar 
                  dataKey="count" 
                  fill="hsl(var(--primary))" 
                  radius={[0, 4, 4, 0]}
                  onClick={(data) => setSelectedEvent(data.name)}
                  className="cursor-pointer"
                />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Events Table */}
        <Card data-testid="card-events-table">
          <CardHeader>
            <CardTitle className="text-base font-semibold">All Events</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-xs font-semibold">
                    Event Name
                    <ChevronDown className="inline h-3 w-3 ml-1" />
                  </TableHead>
                  <TableHead className="text-xs font-semibold text-right">
                    Count
                    <ChevronDown className="inline h-3 w-3 ml-1" />
                  </TableHead>
                  <TableHead className="text-xs font-semibold text-right">
                    Percentage
                  </TableHead>
                  <TableHead className="text-xs font-semibold">
                    Trend
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredEvents.map((event, index) => {
                  const totalEvents = topEvents.reduce((sum, e) => sum + e.count, 0);
                  const percentage = ((event.count / totalEvents) * 100).toFixed(1);
                  
                  return (
                    <TableRow 
                      key={index}
                      className={`cursor-pointer hover-elevate ${selectedEvent === event.name ? 'bg-primary/5' : ''}`}
                      onClick={() => setSelectedEvent(event.name)}
                      data-testid={`row-event-${index}`}
                    >
                      <TableCell className="font-medium">
                        <div className="flex items-center gap-2">
                          <div 
                            className="w-3 h-3 rounded" 
                            style={{ backgroundColor: `hsl(${(index * 36) % 360}, 70%, 50%)` }}
                          />
                          {event.name}
                        </div>
                      </TableCell>
                      <TableCell className="text-right font-medium">
                        {event.count >= 1000 ? `${(event.count / 1000).toFixed(1)}K` : event.count}
                      </TableCell>
                      <TableCell className="text-right text-muted-foreground">
                        {percentage}%
                      </TableCell>
                      <TableCell>
                        <div className="w-16 h-4">
                          <svg viewBox="0 0 60 16" className="w-full h-full">
                            <path 
                              d={`M0 ${8 + Math.sin(index) * 4} Q15 ${8 - Math.cos(index) * 4} 30 ${8 + Math.sin(index + 1) * 4} T60 ${8 + Math.cos(index) * 3}`}
                              fill="none" 
                              stroke="hsl(var(--primary))" 
                              strokeWidth="1.5"
                            />
                          </svg>
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Event Detail */}
        {selectedEvent && (
          <Card data-testid="card-event-detail">
            <CardHeader>
              <CardTitle className="text-base font-semibold">
                Event Details: {selectedEvent}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Total Count</p>
                  <p className="text-2xl font-bold">
                    {topEvents.find(e => e.name === selectedEvent)?.count.toLocaleString()}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">First Seen</p>
                  <p className="text-lg font-medium">Oct 1, 2025</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Last Seen</p>
                  <p className="text-lg font-medium">Nov 12, 2025</p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
