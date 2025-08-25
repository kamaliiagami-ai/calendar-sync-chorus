export interface N8nWorkflowConfig {
  googleClientId: string;
  googleClientSecret: string;
  zohoClientId: string;
  zohoClientSecret: string;
  bidirectionalSync: boolean;
  includeAllDay: boolean;
  syncFrequency: string;
  calendarSelection: string;
}

export const generateN8nWorkflow = (config: Partial<N8nWorkflowConfig> = {}) => {
  const workflow = {
    name: "Google Calendar to Zoho Calendar Sync",
    nodes: [
      {
        parameters: {
          mode: "webhook",
          webhookId: "google-calendar-webhook",
          options: {}
        },
        id: "webhook-trigger",
        name: "Google Calendar Webhook",
        type: "n8n-nodes-base.webhook",
        typeVersion: 1,
        position: [240, 300],
        webhookId: "google-calendar-webhook"
      },
      {
        parameters: {
          authentication: "oAuth2",
          resource: "event",
          operation: "get",
          calendarId: "primary",
          eventId: "={{ $json.eventId }}"
        },
        id: "google-calendar-get",
        name: "Get Google Calendar Event",
        type: "n8n-nodes-base.googleCalendar",
        typeVersion: 1,
        position: [460, 300],
        credentials: {
          googleCalendarOAuth2: {
            id: "google-calendar-oauth",
            name: "Google Calendar OAuth2"
          }
        }
      },
      {
        parameters: {
          conditions: {
            options: {
              caseSensitive: true,
              leftValue: "",
              typeValidation: "strict"
            },
            conditions: [
              {
                id: "condition-1",
                leftValue: "={{ $json.action }}",
                rightValue: "created",
                operator: {
                  operation: "equals",
                  type: "string"
                }
              }
            ],
            combinator: "and"
          },
          options: {}
        },
        id: "if-created",
        name: "If Event Created",
        type: "n8n-nodes-base.if",
        typeVersion: 2,
        position: [680, 200]
      },
      {
        parameters: {
          conditions: {
            options: {
              caseSensitive: true,
              leftValue: "",
              typeValidation: "strict"
            },
            conditions: [
              {
                id: "condition-1",
                leftValue: "={{ $json.action }}",
                rightValue: "updated",
                operator: {
                  operation: "equals",
                  type: "string"
                }
              }
            ],
            combinator: "and"
          },
          options: {}
        },
        id: "if-updated",
        name: "If Event Updated",
        type: "n8n-nodes-base.if",
        typeVersion: 2,
        position: [680, 300]
      },
      {
        parameters: {
          conditions: {
            options: {
              caseSensitive: true,
              leftValue: "",
              typeValidation: "strict"
            },
            conditions: [
              {
                id: "condition-1",
                leftValue: "={{ $json.action }}",
                rightValue: "deleted",
                operator: {
                  operation: "equals",
                  type: "string"
                }
              }
            ],
            combinator: "and"
          },
          options: {}
        },
        id: "if-deleted",
        name: "If Event Deleted",
        type: "n8n-nodes-base.if",
        typeVersion: 2,
        position: [680, 400]
      },
      {
        parameters: {
          authentication: "oAuth2",
          resource: "event",
          operation: "create",
          calendarId: "primary",
          start: "={{ $node['Get Google Calendar Event'].json.start.dateTime || $node['Get Google Calendar Event'].json.start.date }}",
          end: "={{ $node['Get Google Calendar Event'].json.end.dateTime || $node['Get Google Calendar Event'].json.end.date }}",
          summary: "={{ $node['Get Google Calendar Event'].json.summary }}",
          additionalFields: {
            description: "={{ $node['Get Google Calendar Event'].json.description }}",
            location: "={{ $node['Get Google Calendar Event'].json.location }}"
          }
        },
        id: "zoho-create",
        name: "Create Zoho Event",
        type: "n8n-nodes-base.zohoCalendar",
        typeVersion: 1,
        position: [900, 200],
        credentials: {
          zohoCalendarOAuth2: {
            id: "zoho-calendar-oauth",
            name: "Zoho Calendar OAuth2"
          }
        }
      },
      {
        parameters: {
          authentication: "oAuth2",
          resource: "event",
          operation: "update",
          calendarId: "primary",
          eventId: "={{ $json.zohoEventId }}",
          updateFields: {
            start: "={{ $node['Get Google Calendar Event'].json.start.dateTime || $node['Get Google Calendar Event'].json.start.date }}",
            end: "={{ $node['Get Google Calendar Event'].json.end.dateTime || $node['Get Google Calendar Event'].json.end.date }}",
            summary: "={{ $node['Get Google Calendar Event'].json.summary }}",
            description: "={{ $node['Get Google Calendar Event'].json.description }}",
            location: "={{ $node['Get Google Calendar Event'].json.location }}"
          }
        },
        id: "zoho-update",
        name: "Update Zoho Event",
        type: "n8n-nodes-base.zohoCalendar",
        typeVersion: 1,
        position: [900, 300],
        credentials: {
          zohoCalendarOAuth2: {
            id: "zoho-calendar-oauth",
            name: "Zoho Calendar OAuth2"
          }
        }
      },
      {
        parameters: {
          authentication: "oAuth2",
          resource: "event",
          operation: "delete",
          calendarId: "primary",
          eventId: "={{ $json.zohoEventId }}"
        },
        id: "zoho-delete",
        name: "Delete Zoho Event",
        type: "n8n-nodes-base.zohoCalendar",
        typeVersion: 1,
        position: [900, 400],
        credentials: {
          zohoCalendarOAuth2: {
            id: "zoho-calendar-oauth",
            name: "Zoho Calendar OAuth2"
          }
        }
      }
    ],
    connections: {
      "webhook-trigger": {
        main: [
          [
            {
              node: "google-calendar-get",
              type: "main",
              index: 0
            }
          ]
        ]
      },
      "google-calendar-get": {
        main: [
          [
            {
              node: "if-created",
              type: "main",
              index: 0
            },
            {
              node: "if-updated",
              type: "main",
              index: 0
            },
            {
              node: "if-deleted",
              type: "main",
              index: 0
            }
          ]
        ]
      },
      "if-created": {
        main: [
          [
            {
              node: "zoho-create",
              type: "main",
              index: 0
            }
          ]
        ]
      },
      "if-updated": {
        main: [
          [
            {
              node: "zoho-update",
              type: "main",
              index: 0
            }
          ]
        ]
      },
      "if-deleted": {
        main: [
          [
            {
              node: "zoho-delete",
              type: "main",
              index: 0
            }
          ]
        ]
      }
    },
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    settings: {
      executionOrder: "v1"
    },
    staticData: null,
    tags: ["calendar", "sync", "google", "zoho"],
    triggerCount: 1,
    versionId: "1"
  };

  return workflow;
};

export const downloadWorkflow = (workflow: any, filename = "google-zoho-calendar-sync.json") => {
  const dataStr = JSON.stringify(workflow, null, 2);
  const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
  
  const exportFileDefaultName = filename;
  const linkElement = document.createElement('a');
  linkElement.setAttribute('href', dataUri);
  linkElement.setAttribute('download', exportFileDefaultName);
  linkElement.click();
};

export const copyToClipboard = async (text: string) => {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch (err) {
    // Fallback for older browsers
    const textArea = document.createElement('textarea');
    textArea.value = text;
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    try {
      document.execCommand('copy');
      document.body.removeChild(textArea);
      return true;
    } catch (err) {
      document.body.removeChild(textArea);
      return false;
    }
  }
};