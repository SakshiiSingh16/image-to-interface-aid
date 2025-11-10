import { Card } from "./ui/card";
import { ArrowUp, ArrowDown } from "lucide-react";

interface TrackSpeed {
  direction: "UP" | "DOWN";
  speed: number;
  distance: number;
}

interface SpeedDisplayProps {
  tracks: TrackSpeed[];
}

export const SpeedDisplay = ({ tracks }: SpeedDisplayProps) => {
  return (
    <Card className="p-6 bg-card border-border">
      <div className="space-y-4">
        <h3 className="text-sm font-medium text-muted-foreground tracking-wider mb-4">TRACK SPEED</h3>
        
        {tracks.map((track, index) => (
          <div key={index} className="flex items-center justify-between p-4 bg-secondary/50 rounded-lg border border-border">
            <div className="flex items-center gap-3">
              {track.direction === "UP" ? (
                <div className="w-8 h-8 rounded-full bg-train-a/20 flex items-center justify-center">
                  <ArrowUp className="w-5 h-5 text-train-a" />
                </div>
              ) : (
                <div className="w-8 h-8 rounded-full bg-train-b/20 flex items-center justify-center">
                  <ArrowDown className="w-5 h-5 text-train-b" />
                </div>
              )}
              <span className="text-lg font-bold text-foreground">{track.direction}</span>
            </div>
            
            <div className="text-right">
              <div className="text-2xl font-bold text-foreground">{track.speed} km/h</div>
              <div className="text-sm text-muted-foreground">{track.distance} km away</div>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};
