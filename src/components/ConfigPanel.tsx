import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Settings, Calendar, Zap } from "lucide-react";

interface ConfigPanelProps {
  className?: string;
}

export const ConfigPanel = ({ className }: ConfigPanelProps) => {
  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Settings className="w-5 h-5" />
          Sync Configuration
        </CardTitle>
        <CardDescription>
          Configure your Google Calendar to Zoho Calendar sync workflow
        </CardDescription>
      </CardHeader>
      
      <CardContent>
        <Tabs defaultValue="connections" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="connections">Connections</TabsTrigger>
            <TabsTrigger value="sync">Sync Settings</TabsTrigger>
            <TabsTrigger value="export">Export</TabsTrigger>
          </TabsList>
          
          <TabsContent value="connections" className="space-y-6">
            <div className="space-y-4">
              <div className="flex items-center gap-2 mb-4">
                <Calendar className="w-4 h-4 text-node-google" />
                <h3 className="font-semibold">Google Calendar</h3>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="google-client-id">Client ID</Label>
                <Input 
                  id="google-client-id" 
                  placeholder="Enter Google OAuth Client ID"
                  className="bg-background/50"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="google-client-secret">Client Secret</Label>
                <Input 
                  id="google-client-secret" 
                  type="password"
                  placeholder="Enter Google OAuth Client Secret"
                  className="bg-background/50"
                />
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center gap-2 mb-4">
                <Calendar className="w-4 h-4 text-node-zoho" />
                <h3 className="font-semibold">Zoho Calendar</h3>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="zoho-client-id">Client ID</Label>
                <Input 
                  id="zoho-client-id" 
                  placeholder="Enter Zoho OAuth Client ID"
                  className="bg-background/50"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="zoho-client-secret">Client Secret</Label>
                <Input 
                  id="zoho-client-secret" 
                  type="password"
                  placeholder="Enter Zoho OAuth Client Secret"
                  className="bg-background/50"
                />
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="sync" className="space-y-6">
            <div className="space-y-4">
              <div className="flex items-center gap-2 mb-4">
                <Zap className="w-4 h-4 text-node-trigger" />
                <h3 className="font-semibold">Sync Behavior</h3>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Bidirectional Sync</Label>
                  <p className="text-sm text-muted-foreground">
                    Sync changes from both calendars
                  </p>
                </div>
                <Switch />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Include All-Day Events</Label>
                  <p className="text-sm text-muted-foreground">
                    Sync all-day events between calendars
                  </p>
                </div>
                <Switch defaultChecked />
              </div>
              
              <div className="space-y-2">
                <Label>Sync Frequency</Label>
                <Select defaultValue="5min">
                  <SelectTrigger className="bg-background/50">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1min">Every minute</SelectItem>
                    <SelectItem value="5min">Every 5 minutes</SelectItem>
                    <SelectItem value="15min">Every 15 minutes</SelectItem>
                    <SelectItem value="1hour">Every hour</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label>Calendar Selection</Label>
                <Select defaultValue="primary">
                  <SelectTrigger className="bg-background/50">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="primary">Primary calendar only</SelectItem>
                    <SelectItem value="all">All calendars</SelectItem>
                    <SelectItem value="custom">Custom selection</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="export" className="space-y-6">
            <div className="space-y-4">
              <h3 className="font-semibold">Export Workflow</h3>
              <p className="text-sm text-muted-foreground">
                Download your configured workflow as an n8n JSON file
              </p>
              
              <div className="space-y-3">
                <Button className="w-full bg-gradient-primary hover:opacity-90">
                  Download n8n Workflow
                </Button>
                
                <Button variant="outline" className="w-full">
                  Copy Workflow JSON
                </Button>
                
                <Button variant="ghost" className="w-full">
                  Preview Workflow Code
                </Button>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};