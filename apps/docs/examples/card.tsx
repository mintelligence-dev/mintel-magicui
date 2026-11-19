import { Button } from "@/registry/mintel/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/registry/mintel/ui/card"

export default function CardExample() {
  return (
    <div className="grid w-full max-w-3xl gap-6 md:grid-cols-[1fr_16rem] [&>*]:min-w-0">
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Salesforce connector</CardTitle>
          <CardDescription>LINE · Facebook · TikTok</CardDescription>
        </CardHeader>
        <CardContent className="text-sm text-muted-foreground">
          Messages from every channel become cases in Salesforce.
        </CardContent>
        <CardFooter>
          <Button variant="brand" className="w-full">
            Connect
          </Button>
        </CardFooter>
      </Card>

      {/* interactive: lifts on hover, presses on click */}
      <Card interactive className="gap-2 py-5" role="link" tabIndex={0}>
        <CardHeader className="px-5">
          <CardTitle>Open cases</CardTitle>
          <CardDescription>37 need a reply today</CardDescription>
        </CardHeader>
        <CardContent className="px-5 font-heading text-4xl font-bold text-brand">37</CardContent>
      </Card>
    </div>
  )
}
