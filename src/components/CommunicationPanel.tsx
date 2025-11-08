import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface TrainDistance {
  id: string;
  distance: number;
}

interface CommunicationPanelProps {
  trains: TrainDistance[];
  onEmergencyStop: () => void;
}

const CommunicationPanel = ({ trains, onEmergencyStop }: CommunicationPanelProps) => {
  return (
    <Card className="p-6 bg-card border-border">
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-muted-foreground uppercase tracking-wider">
          Communication
        </h3>
        <div className="space-y-2">
          {trains.map((train) => (
            <div
              key={train.id}
              className="flex items-center justify-between bg-secondary px-4 py-3 rounded-lg"
            >
              <span className="text-lg font-semibold text-foreground">TRAIN {train.id}</span>
              <span className="text-lg text-muted-foreground">&lt; {train.distance} KM</span>
            </div>
          ))}
        </div>
        <Button
          onClick={onEmergencyStop}
          variant="destructive"
          size="lg"
          className="w-full h-14 text-xl font-bold uppercase tracking-wider"
        >
          Emergency Stop
        </Button>
      </div>
    </Card>
  );
};

export default CommunicationPanel;
