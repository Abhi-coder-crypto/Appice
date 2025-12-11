import { useState } from "react";
import { TrendingUp, TrendingDown, Users, UserCheck, Activity, UserX, Download, ExternalLink, Smartphone, Apple, Globe } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Header } from "@/components/layout/header";
import { dashboardMetrics, topEvents, activeUserTrends, dauTrends, cohortData } from "@/lib/dummy-data";
import { PieChart, Pie, Cell, BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";

const COLORS = ['#3B82F6', '#22C55E', '#F59E0B', '#EF4444', '#8B5CF6', '#EC4899', '#06B6D4', '#84CC16', '#F97316', '#6366F1'];

function MetricCard({ 
  title, 
  value, 
  change, 
  period, 
  icon: Icon, 
  iconColor,
  breakdown,
  metrics 
}: { 
  title: string; 
  value: string | number; 
  change: number; 
  period: string; 
  icon: any;
  iconColor: string;
  breakdown?: { platform: string; count: number | string }[];
  metrics?: { label: string; value: number | string }[];
}) {
  const isPositive = change >= 0;

  return (
    <Card className="overflow-visible border-l-4 border-l-primary" data-testid={`metric-card-${title.toLowerCase().replace(/\s+/g, '-')}`}>
      <CardContent className="p-5">
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-3">
              <div className={`p-2 rounded-lg bg-primary/10 ${iconColor}`}>
                <Icon className="h-4 w-4" />
              </div>
              <p className="text-sm font-medium text-muted-foreground">{title}</p>
            </div>
            <div className="flex items-baseline gap-3 mb-2">
              <span className="text-3xl font-bold text-foreground">{typeof value === 'number' ? value.toLocaleString() : value}</span>
              <div className={`flex items-center gap-1 text-sm font-medium ${isPositive ? "text-emerald-600" : "text-rose-600"}`}>
                {isPositive ? (
                  <TrendingUp className="h-4 w-4" />
                ) : (
                  <TrendingDown className="h-4 w-4" />
                )}
                <span>{isPositive ? "+" : ""}{change}%</span>
              </div>
            </div>
            <p className="text-xs text-muted-foreground">Compared to {period}</p>
          </div>
        </div>
        
        {breakdown && (
          <div className="mt-4 pt-4 border-t border-border space-y-2">
            {breakdown.map((item, idx) => (
              <div key={idx} className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  {item.platform === "Android" && <Smartphone className="h-4 w-4 text-emerald-500" />}
                  {item.platform === "iOS" && <Apple className="h-4 w-4 text-slate-500" />}
                  {item.platform === "Web" && <Globe className="h-4 w-4 text-orange-500" />}
                  <span className="text-muted-foreground">{item.platform}</span>
                </div>
                <span className="font-semibold">{item.count}</span>
              </div>
            ))}
          </div>
        )}
        
        {metrics && (
          <div className="mt-4 pt-4 border-t border-border space-y-2">
            {metrics.map((item, idx) => (
              <div key={idx} className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-primary" />
                  {item.label}
                </span>
                <span className="font-semibold">{item.value}</span>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

function TopEventsChart() {
  const pieData = topEvents.map((event, index) => ({
    name: event.name,
    value: event.count,
    color: COLORS[index % COLORS.length]
  }));

  const totalEvents = topEvents.reduce((sum, event) => sum + event.count, 0);

  return (
    <Card data-testid="card-top-events">
      <CardHeader className="pb-2">
        <CardTitle className="text-base font-semibold">Top 10 Events</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="relative">
            <ResponsiveContainer width="100%" height={280}>
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={2}
                  dataKey="value"
                  label={({ name, value }) => `${(value / 1000).toFixed(1)}K`}
                  labelLine={false}
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(value: number) => `${(value / 1000).toFixed(1)}K`} />
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="text-center">
                <div className="text-2xl font-bold">{(totalEvents / 1000).toFixed(1)}K</div>
              </div>
            </div>
          </div>
          
          <div>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-xs">Event Name</TableHead>
                  <TableHead className="text-xs text-right">Number Of Events</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {topEvents.map((event, index) => (
                  <TableRow key={index}>
                    <TableCell className="text-sm py-2">{event.name}</TableCell>
                    <TableCell className="text-sm py-2 text-right font-medium">
                      {event.count >= 1000 ? `${(event.count / 1000).toFixed(1)}K` : event.count}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <Button variant="ghost" className="mt-2 p-0 h-auto text-xs text-primary hover:bg-transparent" data-testid="button-view-event-details">
              View Details
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function ActiveUserTrendsChart() {
  return (
    <Card data-testid="card-active-user-trends">
      <CardHeader className="pb-2">
        <CardTitle className="text-base font-semibold">Active User Trends</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={activeUserTrends}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis dataKey="month" tick={{ fontSize: 12 }} stroke="hsl(var(--muted-foreground))" />
            <YAxis tick={{ fontSize: 12 }} stroke="hsl(var(--muted-foreground))" />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: 'hsl(var(--card))', 
                border: '1px solid hsl(var(--border))',
                borderRadius: '6px'
              }} 
            />
            <Bar dataKey="count" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}

function DAUTrendsChart() {
  return (
    <Card data-testid="card-dau-trends">
      <CardHeader className="pb-2">
        <CardTitle className="text-base font-semibold">DAU Trends</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={250}>
          <LineChart data={dauTrends}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis dataKey="date" tick={{ fontSize: 12 }} stroke="hsl(var(--muted-foreground))" />
            <YAxis tick={{ fontSize: 12 }} stroke="hsl(var(--muted-foreground))" />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: 'hsl(var(--card))', 
                border: '1px solid hsl(var(--border))',
                borderRadius: '6px'
              }} 
            />
            <Line 
              type="monotone" 
              dataKey="count" 
              stroke="hsl(var(--chart-3))" 
              strokeWidth={2} 
              dot={{ fill: 'hsl(var(--chart-3))', strokeWidth: 2 }} 
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}

function InstallCohort() {
  const [showPercentage, setShowPercentage] = useState(false);
  const [period, setPeriod] = useState("D+30");

  return (
    <Card data-testid="card-install-cohort">
      <CardHeader className="pb-3">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <CardTitle className="text-base font-semibold">Install Cohort</CardTitle>
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="text-xs text-muted-foreground">ON</span>
              <Switch 
                checked={showPercentage} 
                onCheckedChange={setShowPercentage}
                data-testid="switch-show-percentage"
              />
              <span className="text-xs text-muted-foreground">OFF</span>
              <span className="text-xs text-muted-foreground ml-2">Show Percentage</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs text-muted-foreground">Period</span>
              <Select value={period} onValueChange={setPeriod}>
                <SelectTrigger className="w-32 h-8 text-xs" data-testid="select-cohort-period">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="D+7">D+7 (Week)</SelectItem>
                  <SelectItem value="D+30">D+30 (Month)</SelectItem>
                  <SelectItem value="D+90">D+90 (Quarter)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center gap-2 text-xs">
              <span className="text-muted-foreground">Jan 1, 2025</span>
              <span>→</span>
              <span className="text-muted-foreground">Nov 12, 2025</span>
            </div>
            <Button size="sm" data-testid="button-view-cohort">View</Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-xs font-semibold">Time</TableHead>
                <TableHead className="text-xs font-semibold">Acquisition</TableHead>
                {[...Array(11)].map((_, i) => (
                  <TableHead key={i} className="text-xs font-semibold text-center bg-primary/10">{i + 1}</TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {cohortData.map((row, rowIndex) => (
                <TableRow key={rowIndex}>
                  <TableCell className="text-xs whitespace-nowrap">{row.time}</TableCell>
                  <TableCell className="text-xs font-medium">{row.acquisition}</TableCell>
                  {row.retention.map((value, colIndex) => {
                    const intensity = value / row.acquisition;
                    const bgColor = intensity > 0.8 ? 'bg-primary/30' : intensity > 0.5 ? 'bg-primary/20' : 'bg-primary/10';
                    return (
                      <TableCell 
                        key={colIndex} 
                        className={`text-xs text-center ${bgColor}`}
                      >
                        {showPercentage ? `${Math.round((value / row.acquisition) * 100)}%` : value}
                      </TableCell>
                    );
                  })}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}

export default function Dashboard() {
  return (
    <div className="flex flex-col h-full">
      <Header title="BOI-UA-UAT" showPlatformFilter showDateFilter />
      
      <div className="flex-1 overflow-auto p-6 space-y-6">
        {/* Metrics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <MetricCard
            title="NEW USER"
            value={dashboardMetrics.newUsers.count}
            change={dashboardMetrics.newUsers.change}
            period={dashboardMetrics.newUsers.period}
            icon={Users}
            iconColor="text-blue-500"
            breakdown={dashboardMetrics.newUsers.breakdown}
          />
          <MetricCard
            title="RETAINED USERS"
            value={`${(dashboardMetrics.retainedUsers.count / 1000).toFixed(1)}K`}
            change={dashboardMetrics.retainedUsers.change}
            period={dashboardMetrics.retainedUsers.period}
            icon={UserCheck}
            iconColor="text-green-500"
            metrics={[
              { label: "DAU", value: dashboardMetrics.retainedUsers.dau },
              { label: "WAU", value: dashboardMetrics.retainedUsers.wau },
              { label: "MAU", value: `${(dashboardMetrics.retainedUsers.mau / 1000).toFixed(1)}K` }
            ]}
          />
          <MetricCard
            title="ENGAGEMENT"
            value={`${(dashboardMetrics.engagement.count / 1000).toFixed(1)}K`}
            change={dashboardMetrics.engagement.change}
            period={dashboardMetrics.engagement.period}
            icon={Activity}
            iconColor="text-yellow-500"
            metrics={[
              { label: "Active Campaigns", value: dashboardMetrics.engagement.activeCampaigns },
              { label: "Total Campaigns", value: `${(dashboardMetrics.engagement.totalCampaigns / 1000).toFixed(1)}K` },
              { label: "DAU/MAU", value: dashboardMetrics.engagement.dauMau }
            ]}
          />
          <MetricCard
            title="INACTIVE"
            value={dashboardMetrics.inactive.count}
            change={dashboardMetrics.inactive.change}
            period={dashboardMetrics.inactive.period}
            icon={UserX}
            iconColor="text-red-500"
            breakdown={dashboardMetrics.inactive.breakdown}
          />
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <ActiveUserTrendsChart />
          <DAUTrendsChart />
        </div>

        {/* Top Events */}
        <TopEventsChart />

        {/* Install Cohort */}
        <InstallCohort />
      </div>
    </div>
  );
}
