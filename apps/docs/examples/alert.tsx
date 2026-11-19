import { CircleCheckIcon, InfoIcon, TriangleAlertIcon, OctagonXIcon } from "lucide-react"

import { Alert, AlertDescription, AlertTitle } from "@/registry/mintel/ui/alert"

export default function AlertExample() {
  return (
    <div className="grid w-full max-w-lg gap-3">
      <Alert variant="brand">
        <InfoIcon />
        <AlertTitle>New: LINE OA sync</AlertTitle>
        <AlertDescription>Chats from LINE now appear as cases automatically.</AlertDescription>
      </Alert>
      <Alert variant="success">
        <CircleCheckIcon />
        <AlertTitle>Settings saved</AlertTitle>
      </Alert>
      <Alert variant="warning">
        <TriangleAlertIcon />
        <AlertTitle>3 cases are close to their SLA</AlertTitle>
        <AlertDescription>Reply within 30 minutes to stay on target.</AlertDescription>
      </Alert>
      <Alert variant="destructive">
        <OctagonXIcon />
        <AlertTitle>Couldn’t connect to Salesforce</AlertTitle>
        <AlertDescription>Check the connected app and try again.</AlertDescription>
      </Alert>
    </div>
  )
}
