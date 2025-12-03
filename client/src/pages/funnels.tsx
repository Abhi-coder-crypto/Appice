import { useState } from "react";
import { Plus, Search, Download, Play, Filter, ChevronDown } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Header } from "@/components/layout/header";
import { funnels } from "@/lib/dummy-data";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import type { Funnel as FunnelType } from "@shared/schema";

function FunnelVisualization({ funnel }: { funnel: FunnelType }) {
  const data = funnel.steps.map((step, index) => ({
    name: step.name,
    value: step.count,
    percentage: step.percentage,
    position: index
  }));

  return (
    <div className="space-y-6">
      {/* Metrics Row */}
      <div className="flex items-start gap-12">
        {funnel.steps.map((step, index) => (
          <div key={index} className="text-center">
            <div className="text-3xl font-bold text-foreground">{step.count}</div>
            <div className="text-sm text-muted-foreground mt-1">{step.name}</div>
            <div className="text-lg font-semibold text-primary mt-1">{step.percentage}%</div>
          </div>
        ))}
      </div>

      {/* Funnel Chart */}
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={data}
            margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
          >
            <defs>
              <linearGradient id="funnelGradient" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#F97316" stopOpacity={0.9} />
                <stop offset="50%" stopColor="#FB923C" stopOpacity={0.7} />
                <stop offset="100%" stopColor="#FDBA74" stopOpacity={0.5} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis 
              dataKey="name" 
              tick={{ fontSize: 12 }} 
              stroke="hsl(var(--muted-foreground))" 
            />
            <YAxis 
              tick={{ fontSize: 12 }} 
              stroke="hsl(var(--muted-foreground))" 
            />
            <Tooltip
              contentStyle={{
                backgroundColor: 'hsl(var(--card))',
                border: '1px solid hsl(var(--border))',
                borderRadius: '6px'
              }}
            />
            <Area
              type="monotone"
              dataKey="value"
              stroke="#F97316"
              strokeWidth={2}
              fill="url(#funnelGradient)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

function FunnelDetailModal({ funnel, open, onClose }: { funnel: FunnelType | null; open: boolean; onClose: () => void }) {
  if (!funnel) return null;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle>Funnel / details</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">{funnel.name}</h2>
            <div className="flex gap-2">
              <Button variant="default" data-testid="button-launch-campaign">
                Launch campaign
              </Button>
              <Button variant="outline" data-testid="button-funnel-export">
                Funnel export
              </Button>
            </div>
          </div>
          
          <FunnelVisualization funnel={funnel} />
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default function Funnels() {
  const [selectedFunnel, setSelectedFunnel] = useState<FunnelType | null>(null);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const handleFunnelClick = (funnel: FunnelType) => {
    setSelectedFunnel(funnel);
    setShowDetailModal(true);
  };

  return (
    <div className="flex flex-col h-full">
      <Header title="Funnels" />
      
      <div className="flex-1 overflow-auto p-6">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          <div className="relative flex-1 min-w-[200px] max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search funnels..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9"
              data-testid="input-search-funnels"
            />
          </div>
          <Button data-testid="button-create-funnel">
            <Plus className="h-4 w-4 mr-2" />
            Create Funnel
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {funnels.map((funnel) => (
            <Card 
              key={funnel.id} 
              className="hover-elevate cursor-pointer" 
              onClick={() => handleFunnelClick(funnel)}
              data-testid={`card-funnel-${funnel.id}`}
            >
              <CardContent className="p-5">
                <div className="flex items-start justify-between mb-4">
                  <div className="w-10 h-10 rounded-lg bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center">
                    <Filter className="h-5 w-5 text-orange-600 dark:text-orange-400" />
                  </div>
                  <span className="text-xs text-muted-foreground">{funnel.period}</span>
                </div>
                <h3 className="font-semibold mb-3">{funnel.name}</h3>
                
                <div className="space-y-2">
                  {funnel.steps.slice(0, 3).map((step, index) => (
                    <div key={index} className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground truncate">{step.name}</span>
                      <span className="font-medium ml-2">{step.percentage}%</span>
                    </div>
                  ))}
                  {funnel.steps.length > 3 && (
                    <div className="text-xs text-muted-foreground text-center pt-1">
                      +{funnel.steps.length - 3} more steps
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Funnel Detail View */}
        {selectedFunnel && !showDetailModal && (
          <Card className="mt-6" data-testid="card-funnel-detail">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold">{selectedFunnel.name}</h2>
                <div className="flex gap-2">
                  <Button variant="default" data-testid="button-launch-campaign-inline">
                    Launch campaign
                  </Button>
                  <Button variant="outline" data-testid="button-funnel-export-inline">
                    Funnel export
                  </Button>
                </div>
              </div>
              <FunnelVisualization funnel={selectedFunnel} />
            </CardContent>
          </Card>
        )}
      </div>

      <FunnelDetailModal 
        funnel={selectedFunnel} 
        open={showDetailModal} 
        onClose={() => setShowDetailModal(false)} 
      />
    </div>
  );
}
