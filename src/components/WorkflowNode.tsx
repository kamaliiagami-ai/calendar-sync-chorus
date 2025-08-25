import { cn } from "@/lib/utils";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface WorkflowNodeProps {
  type: 'google' | 'zoho' | 'trigger' | 'action';
  title: string;
  subtitle?: string;
  icon?: React.ReactNode;
  className?: string;
  connected?: boolean;
}

const nodeStyles = {
  google: "bg-node-google/20 border-node-google/50 text-foreground",
  zoho: "bg-node-zoho/20 border-node-zoho/50 text-foreground", 
  trigger: "bg-node-trigger/20 border-node-trigger/50 text-foreground",
  action: "bg-node-action/20 border-node-action/50 text-foreground"
};

export const WorkflowNode = ({ 
  type, 
  title, 
  subtitle, 
  icon, 
  className,
  connected = false 
}: WorkflowNodeProps) => {
  return (
    <Card className={cn(
      "relative p-4 min-w-[200px] transition-all duration-300 hover:scale-105",
      "backdrop-blur-sm border-2",
      nodeStyles[type],
      connected && "shadow-[0_0_20px_rgba(124,58,237,0.3)]",
      className
    )}>
      <div className="flex items-center gap-3 mb-2">
        {icon && (
          <div className="p-2 rounded-lg bg-background/20">
            {icon}
          </div>
        )}
        <div>
          <h3 className="font-semibold text-sm">{title}</h3>
          {subtitle && (
            <p className="text-xs text-muted-foreground">{subtitle}</p>
          )}
        </div>
      </div>
      
      <div className="flex justify-between items-center">
        <Badge variant={connected ? "default" : "secondary"} className="text-xs">
          {connected ? "Connected" : "Configure"}
        </Badge>
        
        {/* Connection dots */}
        <div className="flex gap-1">
          <div className="w-2 h-2 rounded-full bg-muted" />
          <div className="w-2 h-2 rounded-full bg-muted" />
        </div>
      </div>
      
      {/* Animated connection line for connected nodes */}
      {connected && (
        <div className="absolute -right-4 top-1/2 w-8 h-0.5 bg-gradient-to-r from-primary to-transparent animate-pulse-glow" />
      )}
    </Card>
  );
};