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
    <Card className="p-3 bg-card border-border">
      <div className="space-y-2">
        <h3 className="text-xs font-medium text-muted-foreground tracking-wider mb-2">TRACK SPEED</h3>
        
        {tracks.map((track, index) => (
          <div key={index} className="flex items-center justify-between p-2 bg-secondary/50 rounded-lg border border-border">
            <div className="flex items-center gap-2">
              {track.direction === "UP" ? (
                <div className="w-6 h-6 rounded-full bg-train-a/20 flex items-center justify-center">
                  <ArrowUp className="w-3 h-3 text-train-a" />
                </div>
              ) : (
                <div className="w-6 h-6 rounded-full bg-train-b/20 flex items-center justify-center">
                  <ArrowDown className="w-3 h-3 text-train-b" />
                </div>
              )}
              <span className="text-sm font-bold text-foreground">{track.direction}</span>
            </div>
            
            <div className="text-right">
              <div className="text-lg font-bold text-foreground">{track.speed} km/h</div>
              <div className="text-xs text-muted-foreground">{track.distance} km away</div>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};
