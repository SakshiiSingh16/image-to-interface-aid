import { Card } from "./ui/card";
import { Activity, TrendingUp, AlertTriangle, CheckCircle2 } from "lucide-react";

export const AnalyticsDashboard = () => {
  const metrics = [
    { label: "Active Trains", value: "2", icon: Activity, color: "text-train-a" },
    { label: "Avg Speed", value: "66 km/h", icon: TrendingUp, color: "text-signal-safe" },
    { label: "Warnings", value: "0", icon: AlertTriangle, color: "text-accent" },
    { label: "System Status", value: "Normal", icon: CheckCircle2, color: "text-signal-safe" },
  ];

  return (
    <Card className="p-6 bg-card border-border">
      <h3 className="text-sm font-medium text-muted-foreground tracking-wider mb-4">ANALYTICS DASHBOARD</h3>
      
      <div className="grid grid-cols-2 gap-4">
        {metrics.map((metric, index) => (
          <div key={index} className="p-4 bg-secondary/50 rounded-lg border border-border">
            <div className="flex items-center justify-between mb-2">
              <metric.icon className={`w-5 h-5 ${metric.color}`} />
              <span className="text-2xl font-bold text-foreground">{metric.value}</span>
            </div>
            <div className="text-xs text-muted-foreground uppercase tracking-wide">{metric.label}</div>
          </div>
        ))}
      </div>

      <div className="mt-6 space-y-3">
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">RFID Modules Active</span>
          <span className="text-foreground font-semibold">8/8</span>
        </div>
        <div className="h-2 bg-secondary rounded-full overflow-hidden">
          <div className="h-full bg-signal-safe w-full rounded-full" />
        </div>
        
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">Signal Coverage</span>
          <span className="text-foreground font-semibold">100%</span>
        </div>
        <div className="h-2 bg-secondary rounded-full overflow-hidden">
          <div className="h-full bg-train-a w-full rounded-full" />
        </div>
      </div>
    </Card>
  );
};
