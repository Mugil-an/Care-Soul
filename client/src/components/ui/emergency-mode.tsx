import { Button } from "./button"
import { Card, CardContent } from "./card"

export function EmergencyMode() {
  return (
    <Card className="border-destructive border-2 bg-destructive/5">
      <CardContent className="p-6">
        <div className="text-center space-y-4">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-destructive/10 rounded-full mb-4">
            <span className="text-3xl">🚨</span>
          </div>
          
          <h3 className="text-xl font-bold text-foreground">Emergency Mode</h3>
          <p className="text-muted-foreground max-w-md mx-auto">
            Get immediate medical assistance in case of emergency
          </p>
          
          <div className="space-y-3 max-w-sm mx-auto">
            <Button size="lg" className="w-full bg-destructive hover:bg-destructive/90 text-white">
              Call Emergency Services
            </Button>
            <Button size="lg" variant="outline" className="w-full">
              Contact On-Call Doctor
            </Button>
          </div>
          
          <div className="grid grid-cols-2 gap-4 mt-6 pt-6 border-t border-border">
            <div className="text-center">
              <p className="text-sm font-medium text-muted-foreground">Ambulance</p>
              <p className="text-2xl font-bold text-destructive">102</p>
            </div>
            <div className="text-center">
              <p className="text-sm font-medium text-muted-foreground">Police</p>
              <p className="text-2xl font-bold text-destructive">100</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
