import { Card } from "./ui/card";

interface SignalStatusProps {
  distance: number;
}

export const SignalStatus = ({ distance }: SignalStatusProps) => {
  return (
    <Card className="p-3 bg-card border-border">
      <h3 className="text-xs font-medium text-muted-foreground tracking-wider mb-2">SIGNAL STATUS</h3>
      <div className="flex items-center gap-2">
        <div className="w-10 h-10 rounded-full bg-signal-safe shadow-lg shadow-signal-safe/30 animate-pulse" />
        <div>
          <p className="text-xs text-muted-foreground">Next Signal</p>
          <p className="text-xl font-bold text-foreground">{distance} KM</p>
        </div>
      </div>
    </Card>
  );
};
