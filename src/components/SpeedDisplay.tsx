import { Card } from "@/components/ui/card";

interface SpeedDisplayProps {
  speed: number;
}

const SpeedDisplay = ({ speed }: SpeedDisplayProps) => {
  return (
    <Card className="p-6 bg-card border-border">
      <div className="space-y-2">
        <h3 className="text-lg font-semibold text-muted-foreground uppercase tracking-wider">
          Speed
        </h3>
        <div className="flex items-baseline gap-2">
          <span className="text-6xl font-bold text-foreground">{speed}</span>
          <span className="text-2xl text-muted-foreground">km/h</span>
        </div>
      </div>
    </Card>
  );
};

export default SpeedDisplay;
