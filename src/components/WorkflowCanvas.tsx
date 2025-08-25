import { WorkflowNode } from "./WorkflowNode";
import { Calendar, Zap, Clock, ArrowRight } from "lucide-react";
import { Card } from "@/components/ui/card";

export const WorkflowCanvas = () => {
  return (
    <Card className="p-8 bg-gradient-secondary border-border/50 min-h-[500px]">
      <div className="flex flex-col items-center justify-center h-full space-y-8">
        
        {/* Trigger Section */}
        <div className="flex items-center gap-6">
          <WorkflowNode
            type="trigger"
            title="Calendar Trigger"
            subtitle="Google Calendar webhook"
            icon={<Clock className="w-4 h-4 text-node-trigger" />}
            connected={true}
          />
          
          <ArrowRight className="w-6 h-6 text-muted-foreground animate-pulse" />
          
          <WorkflowNode
            type="google"
            title="Google Calendar"
            subtitle="Source calendar"
            icon={<Calendar className="w-4 h-4 text-node-google" />}
            connected={true}
          />
        </div>
        
        {/* Processing Arrow */}
        <div className="flex flex-col items-center gap-2">
          <ArrowRight className="w-6 h-6 text-muted-foreground rotate-90" />
          <div className="text-xs text-muted-foreground">Process Event</div>
        </div>
        
        {/* Action Section */}
        <div className="flex items-center gap-6">
          <WorkflowNode
            type="action"
            title="Event Processor"
            subtitle="Handle CRUD operations"
            icon={<Zap className="w-4 h-4 text-node-action" />}
            connected={false}
          />
          
          <ArrowRight className="w-6 h-6 text-muted-foreground" />
          
          <WorkflowNode
            type="zoho"
            title="Zoho Calendar"
            subtitle="Destination calendar"
            icon={<Calendar className="w-4 h-4 text-node-zoho" />}
            connected={false}
          />
        </div>
        
        {/* Connection Lines */}
        <div className="absolute inset-0 pointer-events-none">
          <svg className="w-full h-full">
            <defs>
              <linearGradient id="connectionGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.6" />
                <stop offset="100%" stopColor="hsl(var(--primary-glow))" stopOpacity="0.3" />
              </linearGradient>
            </defs>
          </svg>
        </div>
        
        {/* Status Indicator */}
        <div className="mt-8 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-background/20 border border-border/50">
            <div className="w-2 h-2 bg-node-trigger rounded-full animate-pulse-glow" />
            <span className="text-xs text-muted-foreground">Ready to configure</span>
          </div>
        </div>
      </div>
    </Card>
  );
};