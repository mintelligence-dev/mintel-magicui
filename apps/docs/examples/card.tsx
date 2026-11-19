import { Button } from "@/registry/mintel/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/registry/mintel/ui/card"

export default function CardExample() {
  return (
    <Card className="w-full max-w-sm">
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
  )
}
