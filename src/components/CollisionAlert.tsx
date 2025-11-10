import { Card } from "./ui/card";
import { AlertTriangle } from "lucide-react";
import { cn } from "@/lib/utils";

interface CollisionAlertProps {
  isRisk: boolean;
}

export const CollisionAlert = ({ isRisk }: CollisionAlertProps) => {
  return (
    <Card className={cn(
      "p-6 border-2 transition-all duration-300",
      isRisk 
        ? "bg-signal-stop/20 border-signal-stop animate-pulse" 
        : "bg-card border-border"
    )}>
      <h3 className="text-sm font-medium text-muted-foreground tracking-wider mb-4">COLLISION ALERT SYSTEM</h3>
      
      <div className={cn(
        "flex items-center gap-4 p-4 rounded-lg border-2 transition-all duration-300",
        isRisk
          ? "bg-signal-stop/30 border-signal-stop"
          : "bg-signal-safe/20 border-signal-safe"
      )}>
        <div className={cn(
          "w-12 h-12 rounded-full flex items-center justify-center",
          isRisk ? "bg-signal-stop animate-pulse" : "bg-signal-safe"
        )}>
          <AlertTriangle className={cn(
            "w-7 h-7",
            isRisk ? "text-white animate-pulse" : "text-background"
          )} />
        </div>
        
        <div className="flex-1">
          <div className={cn(
            "text-2xl font-bold tracking-wide mb-1",
            isRisk ? "text-signal-stop" : "text-signal-safe"
          )}>
            {isRisk ? "⚠️ COLLISION RISK DETECTED" : "✓ ALL CLEAR"}
          </div>
          <div className="text-sm text-muted-foreground">
            {isRisk 
              ? "Approaching trains within danger zone - Auto brake initiated" 
              : "Safe distance maintained between all trains"}
          </div>
        </div>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-3">
        <div className="p-3 bg-secondary/50 rounded-lg">
          <div className="text-xs text-muted-foreground mb-1">MIN DISTANCE</div>
          <div className={cn(
            "text-lg font-bold",
            isRisk ? "text-signal-stop" : "text-foreground"
          )}>
            {isRisk ? "< 2 KM" : "5 KM"}
          </div>
        </div>
        <div className="p-3 bg-secondary/50 rounded-lg">
          <div className="text-xs text-muted-foreground mb-1">ALERT STATUS</div>
          <div className={cn(
            "text-lg font-bold",
            isRisk ? "text-signal-stop" : "text-signal-safe"
          )}>
            {isRisk ? "CRITICAL" : "NORMAL"}
          </div>
        </div>
      </div>
    </Card>
  );
};
