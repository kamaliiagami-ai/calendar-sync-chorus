import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CheckCircle, Download, ExternalLink, AlertCircle, Play, Settings, Key } from "lucide-react";

interface SetupGuideProps {
  className?: string;
}

export const SetupGuide = ({ className }: SetupGuideProps) => {
  const handleDownloadInstructions = () => {
    const instructions = `
# Google Calendar to Zoho Calendar Sync - Setup Instructions

## What is this?
This is an automated workflow that keeps your Google Calendar and Zoho Calendar in sync. When you create, update, or delete events in Google Calendar, they will automatically be reflected in Zoho Calendar.

## Prerequisites
- n8n account (free at n8n.io)
- Google Calendar account with API access
- Zoho Calendar account with API access

## Step 1: Setup n8n
1. Go to https://n8n.io and create a free account
2. Create a new workflow
3. Import the provided workflow JSON file

## Step 2: Setup Google Calendar API
1. Go to Google Cloud Console (console.cloud.google.com)
2. Create a new project or select existing one
3. Enable Google Calendar API
4. Create OAuth 2.0 credentials
5. Add your n8n webhook URL to authorized redirect URIs

## Step 3: Setup Zoho Calendar API
1. Go to Zoho API Console (api-console.zoho.com)
2. Create a new application
3. Generate OAuth credentials
4. Note down Client ID and Client Secret

## Step 4: Configure Workflow
1. Add Google Calendar OAuth credentials in n8n
2. Add Zoho Calendar OAuth credentials in n8n
3. Configure webhook URL in Google Calendar
4. Test the workflow
5. Activate the workflow

## Step 5: Testing
1. Create a test event in Google Calendar
2. Check if it appears in Zoho Calendar
3. Update the event and verify sync
4. Delete the event and confirm removal

## Support
If you need help, contact your workflow provider or check n8n documentation at docs.n8n.io
    `;

    const dataStr = "data:text/plain;charset=utf-8," + encodeURIComponent(instructions);
    const downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute("href", dataStr);
    downloadAnchorNode.setAttribute("download", "calendar-sync-setup-guide.txt");
    document.body.appendChild(downloadAnchorNode);
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
  };

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Settings className="w-5 h-5" />
          Client Setup Guide
        </CardTitle>
        <CardDescription>
          Complete instructions for your client to implement the calendar sync workflow
        </CardDescription>
      </CardHeader>
      
      <CardContent>
        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="setup">Setup Steps</TabsTrigger>
            <TabsTrigger value="credentials">Credentials</TabsTrigger>
            <TabsTrigger value="testing">Testing</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="space-y-4">
            <div className="space-y-4">
              <h3 className="font-semibold">What this workflow does:</h3>
              <div className="space-y-3">
                {[
                  "Automatically syncs Google Calendar events to Zoho Calendar",
                  "Handles event creation, updates, and deletions",
                  "Works with all-day events and timed events",
                  "Runs in real-time using webhooks"
                ].map((feature, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span className="text-sm">{feature}</span>
                  </div>
                ))}
              </div>
              
              <div className="mt-6 p-4 bg-background/50 rounded-lg border">
                <div className="flex items-start gap-2">
                  <AlertCircle className="w-4 h-4 text-amber-500 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium">Prerequisites Required:</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      Your client needs n8n account, Google Calendar API access, and Zoho Calendar API access
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="setup" className="space-y-4">
            <div className="space-y-6">
              {[
                {
                  step: 1,
                  title: "Create n8n Account",
                  description: "Sign up at n8n.io (free account available)",
                  action: "Visit n8n.io"
                },
                {
                  step: 2,
                  title: "Import Workflow",
                  description: "Upload the provided JSON file to n8n",
                  action: "Use workflow JSON"
                },
                {
                  step: 3,
                  title: "Setup Google API",
                  description: "Enable Calendar API in Google Cloud Console",
                  action: "console.cloud.google.com"
                },
                {
                  step: 4,
                  title: "Setup Zoho API",
                  description: "Create application in Zoho API Console",
                  action: "api-console.zoho.com"
                },
                {
                  step: 5,
                  title: "Configure Credentials",
                  description: "Add OAuth credentials to n8n workflow",
                  action: "In n8n editor"
                },
                {
                  step: 6,
                  title: "Activate Workflow",
                  description: "Turn on the workflow to start syncing",
                  action: "Click activate in n8n"
                }
              ].map((step) => (
                <div key={step.step} className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-sm font-semibold">
                    {step.step}
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium">{step.title}</h4>
                    <p className="text-sm text-muted-foreground">{step.description}</p>
                    <Badge variant="outline" className="text-xs mt-1">{step.action}</Badge>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="credentials" className="space-y-4">
            <div className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <Key className="w-4 h-4 text-primary" />
                  <h3 className="font-semibold">Required API Credentials</h3>
                </div>
                
                <div className="grid gap-4">
                  <div className="p-4 border rounded-lg">
                    <h4 className="font-medium text-sm mb-2">Google Calendar OAuth</h4>
                    <div className="space-y-2 text-xs">
                      <div>• Client ID</div>
                      <div>• Client Secret</div>
                      <div>• Redirect URI (from n8n)</div>
                    </div>
                  </div>
                  
                  <div className="p-4 border rounded-lg">
                    <h4 className="font-medium text-sm mb-2">Zoho Calendar OAuth</h4>
                    <div className="space-y-2 text-xs">
                      <div>• Client ID</div>
                      <div>• Client Secret</div>
                      <div>• Redirect URI (from n8n)</div>
                    </div>
                  </div>
                </div>
                
                <div className="mt-4 p-3 bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 rounded-lg">
                  <p className="text-xs text-amber-800 dark:text-amber-200">
                    <strong>Important:</strong> Keep these credentials secure and never share them publicly.
                  </p>
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="testing" className="space-y-4">
            <div className="space-y-4">
              <h3 className="font-semibold flex items-center gap-2">
                <Play className="w-4 h-4" />
                Testing Your Workflow
              </h3>
              
              <div className="space-y-4">
                {[
                  {
                    action: "Create Test Event",
                    description: "Add a new event in Google Calendar",
                    expected: "Event should appear in Zoho Calendar within minutes"
                  },
                  {
                    action: "Update Event",
                    description: "Modify the test event details",
                    expected: "Changes should sync to Zoho Calendar"
                  },
                  {
                    action: "Delete Event",
                    description: "Remove the test event from Google Calendar",
                    expected: "Event should be deleted from Zoho Calendar"
                  }
                ].map((test, i) => (
                  <div key={i} className="p-3 border rounded-lg">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-sm font-medium">{test.action}</span>
                    </div>
                    <p className="text-xs text-muted-foreground mb-2">{test.description}</p>
                    <div className="text-xs">
                      <span className="text-green-600 dark:text-green-400">Expected: </span>
                      {test.expected}
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-6 p-4 bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 rounded-lg">
                <p className="text-xs text-green-800 dark:text-green-200">
                  <strong>Success:</strong> If all tests pass, your calendar sync is working correctly!
                </p>
              </div>
            </div>
          </TabsContent>
        </Tabs>
        
        <div className="mt-6 pt-4 border-t space-y-3">
          <Button 
            onClick={handleDownloadInstructions}
            className="w-full bg-gradient-primary hover:opacity-90"
          >
            <Download className="w-4 h-4 mr-2" />
            Download Complete Setup Guide
          </Button>
          
          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="flex-1" asChild>
              <a href="https://n8n.io" target="_blank" rel="noopener noreferrer">
                <ExternalLink className="w-3 h-3 mr-1" />
                n8n.io
              </a>
            </Button>
            <Button variant="outline" size="sm" className="flex-1" asChild>
              <a href="https://docs.n8n.io" target="_blank" rel="noopener noreferrer">
                <ExternalLink className="w-3 h-3 mr-1" />
                n8n Docs
              </a>
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};