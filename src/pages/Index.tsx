import { WorkflowCanvas } from "@/components/WorkflowCanvas";
import { ConfigPanel } from "@/components/ConfigPanel";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight, Download, GitBranch } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border/50 bg-background/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
                <GitBranch className="w-4 h-4 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                  n8n Calendar Sync
                </h1>
                <p className="text-xs text-muted-foreground">Google Calendar ↔ Zoho Calendar</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <Badge variant="outline" className="text-xs">
                Workflow Designer
              </Badge>
              <Button size="sm" className="bg-gradient-primary hover:opacity-90">
                <Download className="w-3 h-3 mr-2" />
                Export
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          
          {/* Workflow Canvas */}
          <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-foreground mb-2">
                  Visual Workflow Builder
                </h2>
                <p className="text-muted-foreground">
                  Design your Google Calendar to Zoho Calendar synchronization workflow
                </p>
              </div>
              
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <span>Auto-sync</span>
                <ArrowRight className="w-4 h-4" />
                <span>Real-time</span>
              </div>
            </div>
            
            <WorkflowCanvas />
            
            {/* Features */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
              {[
                { label: "Bidirectional Sync", icon: "↔️" },
                { label: "All-Day Events", icon: "📅" },
                { label: "Real-time Updates", icon: "⚡" },
                { label: "Error Handling", icon: "🛡️" }
              ].map((feature, i) => (
                <div key={i} className="p-3 rounded-lg bg-card border border-border/50 text-center">
                  <div className="text-lg mb-1">{feature.icon}</div>
                  <div className="text-xs text-muted-foreground">{feature.label}</div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Configuration Panel */}
          <div className="lg:col-span-1">
            <ConfigPanel />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
