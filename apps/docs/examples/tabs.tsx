import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/registry/mintel/ui/tabs"

export default function TabsExample() {
  return (
    <Tabs defaultValue="overview" className="w-full max-w-sm">
      <TabsList className="w-full">
        <TabsTrigger value="overview">Overview</TabsTrigger>
        <TabsTrigger value="cases">Cases</TabsTrigger>
        <TabsTrigger value="settings">Settings</TabsTrigger>
      </TabsList>
      <TabsContent value="overview" className="rounded-lg border p-3 text-sm">
        1,284 messages today
      </TabsContent>
      <TabsContent value="cases" className="rounded-lg border p-3 text-sm">
        37 open cases
      </TabsContent>
      <TabsContent value="settings" className="rounded-lg border p-3 text-sm">
        Notification and SLA settings
      </TabsContent>
    </Tabs>
  )
}
