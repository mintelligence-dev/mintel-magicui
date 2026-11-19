import { AnimatedTabs, AnimatedTabsContent, AnimatedTabsList, AnimatedTabsTrigger } from "@/registry/mintel/motion/animated-tabs"

export default function AnimatedTabsExample() {
  return (
    <div className="grid justify-items-center gap-6">
      <AnimatedTabs defaultValue="all">
        <AnimatedTabsList>
          <AnimatedTabsTrigger value="all">All</AnimatedTabsTrigger>
          <AnimatedTabsTrigger value="open">Open</AnimatedTabsTrigger>
          <AnimatedTabsTrigger value="closed">Closed</AnimatedTabsTrigger>
        </AnimatedTabsList>
        <AnimatedTabsContent value="all" className="pt-3 text-center text-sm text-muted-foreground">37 cases</AnimatedTabsContent>
        <AnimatedTabsContent value="open" className="pt-3 text-center text-sm text-muted-foreground">12 open</AnimatedTabsContent>
        <AnimatedTabsContent value="closed" className="pt-3 text-center text-sm text-muted-foreground">25 closed</AnimatedTabsContent>
      </AnimatedTabs>
      <AnimatedTabs defaultValue="chat" variant="underline">
        <AnimatedTabsList>
          <AnimatedTabsTrigger value="chat">Chat</AnimatedTabsTrigger>
          <AnimatedTabsTrigger value="ai">AI</AnimatedTabsTrigger>
          <AnimatedTabsTrigger value="report">Report</AnimatedTabsTrigger>
        </AnimatedTabsList>
        <AnimatedTabsContent value="chat" className="pt-3 text-sm text-muted-foreground">Chat history</AnimatedTabsContent>
        <AnimatedTabsContent value="ai" className="pt-3 text-sm text-muted-foreground">AI suggestions</AnimatedTabsContent>
        <AnimatedTabsContent value="report" className="pt-3 text-sm text-muted-foreground">Weekly report</AnimatedTabsContent>
      </AnimatedTabs>
    </div>
  )
}
