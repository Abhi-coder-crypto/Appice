import { useState } from "react";
import { Download, TrendingUp, TrendingDown, Users, Smartphone, Apple, Globe, Calendar } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Header } from "@/components/layout/header";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";

const acquisitionData = [
  { date: "Oct 1", android: 120, ios: 80, web: 250 },
  { date: "Oct 8", android: 180, ios: 95, web: 320 },
  { date: "Oct 15", android: 150, ios: 110, web: 280 },
  { date: "Oct 22", android: 220, ios: 130, web: 410 },
  { date: "Oct 29", android: 190, ios: 145, web: 380 },
  { date: "Nov 5", android: 250, ios: 160, web: 450 },
  { date: "Nov 12", android: 280, ios: 175, web: 520 },
];

const summaryCards = [
  {
    title: "Total Installs",
    value: "12.5K",
    change: 23.5,
    icon: Download,
    color: "text-blue-500"
  },
  {
    title: "Android Installs",
    value: "4.2K",
    change: 18.2,
    icon: Smartphone,
    color: "text-green-500"
  },
  {
    title: "iOS Installs",
    value: "2.8K",
    change: 12.8,
    icon: Apple,
    color: "text-gray-500"
  },
  {
    title: "Web Signups",
    value: "5.5K",
    change: 32.4,
    icon: Globe,
    color: "text-blue-500"
  }
];

export default function AppAcquisition() {
  const [period, setPeriod] = useState("30days");

  return (
    <div className="flex flex-col h-full">
      <Header title="App Acquisition" showPlatformFilter showDateFilter />
      
      <div className="flex-1 overflow-auto p-6 space-y-6">
        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {summaryCards.map((card, index) => (
            <Card key={index} data-testid={`card-${card.title.toLowerCase().replace(/\s+/g, '-')}`}>
              <CardContent className="p-5">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-2">
                      {card.title}
                    </p>
                    <div className="text-3xl font-bold">{card.value}</div>
                    <div className="flex items-center gap-1 mt-2 text-xs">
                      {card.change >= 0 ? (
                        <TrendingUp className="h-3 w-3 text-green-500" />
                      ) : (
                        <TrendingDown className="h-3 w-3 text-red-500" />
                      )}
                      <span className={card.change >= 0 ? "text-green-500" : "text-red-500"}>
                        {card.change >= 0 ? "+" : ""}{card.change}%
                      </span>
                      <span className="text-muted-foreground">vs last period</span>
                    </div>
                  </div>
                  <div className={`w-10 h-10 rounded-lg bg-muted flex items-center justify-center ${card.color}`}>
                    <card.icon className="h-5 w-5" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Acquisition Chart */}
        <Card data-testid="card-acquisition-chart">
          <CardHeader className="flex flex-row items-center justify-between gap-4">
            <CardTitle className="text-base font-semibold">Acquisition Trends</CardTitle>
            <Select value={period} onValueChange={setPeriod}>
              <SelectTrigger className="w-32" data-testid="select-period">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="7days">Last 7 days</SelectItem>
                <SelectItem value="30days">Last 30 days</SelectItem>
                <SelectItem value="90days">Last 90 days</SelectItem>
              </SelectContent>
            </Select>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={350}>
              <LineChart data={acquisitionData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis 
                  dataKey="date" 
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
                <Legend />
                <Line 
                  type="monotone" 
                  dataKey="android" 
                  stroke="#22C55E" 
                  strokeWidth={2} 
                  dot={{ fill: '#22C55E' }}
                  name="Android"
                />
                <Line 
                  type="monotone" 
                  dataKey="ios" 
                  stroke="#6B7280" 
                  strokeWidth={2} 
                  dot={{ fill: '#6B7280' }}
                  name="iOS"
                />
                <Line 
                  type="monotone" 
                  dataKey="web" 
                  stroke="#3B82F6" 
                  strokeWidth={2} 
                  dot={{ fill: '#3B82F6' }}
                  name="Web"
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Platform Breakdown */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card data-testid="card-android-breakdown">
            <CardContent className="p-5">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                  <Smartphone className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <h3 className="font-semibold">Android</h3>
                  <p className="text-sm text-muted-foreground">Mobile App</p>
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Organic</span>
                  <span className="font-medium">2,850</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Paid</span>
                  <span className="font-medium">1,350</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Referral</span>
                  <span className="font-medium">420</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card data-testid="card-ios-breakdown">
            <CardContent className="p-5">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
                  <Apple className="h-5 w-5 text-gray-600" />
                </div>
                <div>
                  <h3 className="font-semibold">iOS</h3>
                  <p className="text-sm text-muted-foreground">Mobile App</p>
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Organic</span>
                  <span className="font-medium">1,680</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Paid</span>
                  <span className="font-medium">890</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Referral</span>
                  <span className="font-medium">230</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card data-testid="card-web-breakdown">
            <CardContent className="p-5">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                  <Globe className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-semibold">Web</h3>
                  <p className="text-sm text-muted-foreground">Website</p>
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Direct</span>
                  <span className="font-medium">2,450</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Search</span>
                  <span className="font-medium">1,890</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Social</span>
                  <span className="font-medium">1,160</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
