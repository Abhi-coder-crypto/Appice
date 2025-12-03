import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/layout/app-sidebar";
import NotFound from "@/pages/not-found";
import Home from "@/pages/home";
import Dashboard from "@/pages/dashboard";
import Customer360 from "@/pages/customer-360";
import AudienceSegments from "@/pages/audience-segments";
import Campaigns from "@/pages/campaigns";
import CampaignCreate from "@/pages/campaign-create";
import Templates from "@/pages/templates";
import Funnels from "@/pages/funnels";
import Events from "@/pages/events";
import AppAcquisition from "@/pages/app-acquisition";
import Exports from "@/pages/exports";
import Journeys from "@/pages/journeys";
import SetupNewApp from "@/pages/setup-new-app";
import Settings from "@/pages/settings";
import UserManagement from "@/pages/user-management";
import DisplayPreference from "@/pages/display-preference";
import AppManagement from "@/pages/app-management";
import Modules from "@/pages/modules";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/dashboard" component={Dashboard} />
      <Route path="/setup/new-app" component={SetupNewApp} />
      <Route path="/users/customer-360" component={Customer360} />
      <Route path="/users/segments" component={AudienceSegments} />
      <Route path="/analytics/acquisition" component={AppAcquisition} />
      <Route path="/analytics/events" component={Events} />
      <Route path="/analytics/funnels" component={Funnels} />
      <Route path="/engagement/campaigns" component={Campaigns} />
      <Route path="/engagement/campaigns/create/:channel" component={CampaignCreate} />
      <Route path="/engagement/templates" component={Templates} />
      <Route path="/reports/exports" component={Exports} />
      <Route path="/data/journeys" component={Journeys} />
      <Route path="/settings/app-management" component={AppManagement} />
      <Route path="/settings/modules" component={Modules} />
      <Route path="/settings/user-management" component={UserManagement} />
      <Route path="/settings/app-setting" component={Settings} />
      <Route path="/settings/display-preference" component={DisplayPreference} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  const style = {
    "--sidebar-width": "16rem",
    "--sidebar-width-icon": "3.5rem",
  };

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <SidebarProvider style={style as React.CSSProperties}>
          <div className="flex h-screen w-full">
            <AppSidebar />
            <main className="flex-1 overflow-hidden">
              <Router />
            </main>
          </div>
        </SidebarProvider>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
