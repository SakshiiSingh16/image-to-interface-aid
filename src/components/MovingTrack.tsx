import { cn } from "@/lib/utils";
import { Radio } from "lucide-react";

interface Train {
  id: string;
  label: string;
  color: string;
  position: number;
}

interface MovingTrackProps {
  name: string;
  direction: "forward" | "backward";
  train: Train;
  signalLeft: "safe" | "caution" | "danger";
  signalRight: "safe" | "caution" | "danger";
  onSignalClick?: (side: "left" | "right") => void;
  onCollisionRisk?: (isRisk: boolean) => void;
}

export const MovingTrack = ({ name, direction, train, signalLeft, signalRight, onSignalClick }: MovingTrackProps) => {
  const trackLetter = name.includes("UP") ? "A" : name.includes("DOWN") ? "B" : "C";
  
  // Moving background elements (pillars, stations, signals)
  const backgroundElements = [
    { id: 1, position: 10, type: "pillar" },
    { id: 2, position: 25, type: "station" },
    { id: 3, position: 40, type: "pillar" },
    { id: 4, position: 55, type: "signal" },
    { id: 5, position: 70, type: "pillar" },
    { id: 6, position: 85, type: "station" },
    { id: 7, position: 100, type: "pillar" },
    // Duplicate for seamless loop
    { id: 8, position: 110, type: "pillar" },
    { id: 9, position: 125, type: "station" },
    { id: 10, position: 140, type: "pillar" },
    { id: 11, position: 155, type: "signal" },
    { id: 12, position: 170, type: "pillar" },
    { id: 13, position: 185, type: "station" },
  ];

  // Dynamic moving trains on the track
  const dynamicTrains = [
    { id: "dyn1", position: 20, color: direction === "forward" ? "#10b981" : "#f59e0b", size: "small" },
    { id: "dyn2", position: 60, color: direction === "forward" ? "#3b82f6" : "#ef4444", size: "medium" },
    { id: "dyn3", position: 130, color: direction === "forward" ? "#8b5cf6" : "#06b6d4", size: "small" },
  ];

  const animationClass = direction === "forward" ? "animate-track-forward" : "animate-track-backward";

  return (
    <div className="relative py-8 flex items-center gap-4">
      {/* Track Name Label */}
      <div className="min-w-[100px]">
        <span className="text-sm font-semibold text-foreground">{name}</span>
      </div>

      {/* Left Traffic Signal */}
      <div 
        className="cursor-pointer hover:scale-110 transition-transform z-50 flex flex-col items-center gap-1"
        onClick={() => onSignalClick?.("left")}
      >
        <div className="h-16 w-2 bg-muted-foreground/20" />
        <div className="flex flex-col gap-1 bg-secondary/90 p-2 rounded border border-border">
          <div className={cn(
            "w-3 h-3 rounded-full border",
            signalLeft === "danger" ? "bg-signal-stop border-signal-stop shadow-lg shadow-signal-stop/50" : "bg-muted/50 border-muted-foreground/30"
          )} />
          <div className={cn(
            "w-3 h-3 rounded-full border",
            signalLeft === "caution" ? "bg-accent border-accent shadow-lg shadow-accent/50" : "bg-muted/50 border-muted-foreground/30"
          )} />
          <div className={cn(
            "w-3 h-3 rounded-full border",
            signalLeft === "safe" ? "bg-signal-safe border-signal-safe shadow-lg shadow-signal-safe/50" : "bg-muted/50 border-muted-foreground/30"
          )} />
        </div>
      </div>

      {/* Track Container with Moving Background */}
      <div className="flex-1 relative overflow-hidden h-24">
        {/* Moving Background Layer */}
        <div className={cn("absolute inset-0 flex items-center", animationClass)}>
          <div className="relative h-3 bg-track rounded-full" style={{ width: "200%" }}>
            {/* Background Elements Moving with Track */}
            {backgroundElements.map(element => (
              <div
                key={element.id}
                className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2"
                style={{ left: `${element.position}%` }}
              >
                {element.type === "pillar" && (
                  <div className="flex flex-col items-center gap-1">
                    <div className="w-1 h-8 bg-muted-foreground/40 rounded-full" />
                    <div className="w-3 h-3 bg-muted-foreground/60 rounded-full" />
                  </div>
                )}
                {element.type === "station" && (
                  <div className="flex flex-col items-center gap-1">
                    <div className="px-2 py-1 bg-station/80 rounded text-[8px] text-white font-bold">
                      STN
                    </div>
                    <div className="w-px h-4 bg-station/40" />
                  </div>
                )}
                {element.type === "signal" && (
                  <div className="flex flex-col items-center gap-0.5">
                    <Radio className="w-2 h-2 text-primary/70" />
                    <div className="w-px h-3 bg-primary/30" />
                  </div>
                )}
              </div>
            ))}

            {/* Dynamic Moving Trains */}
            {dynamicTrains.map(dynTrain => (
              <div
                key={dynTrain.id}
                className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 z-20"
                style={{ left: `${dynTrain.position}%` }}
              >
                <div 
                  className={cn(
                    "rounded-lg flex items-center justify-center shadow-xl border border-white/20",
                    dynTrain.size === "small" ? "w-10 h-8" : "w-12 h-10"
                  )}
                  style={{ backgroundColor: dynTrain.color }}
                >
                  <svg className="w-6 h-6 text-white/90" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2c-4 0-8 0.5-8 4v9.5C4 17.43 5.57 19 7.5 19L6 20.5v0.5h2l2-2h4l2 2h2v-0.5L16.5 19c1.93 0 3.5-1.57 3.5-3.5V6c0-3.5-4-4-8-4zM7.5 17c-0.83 0-1.5-0.67-1.5-1.5S6.67 14 7.5 14s1.5 0.67 1.5 1.5S8.33 17 7.5 17zm3.5-7H6V6h5v4zm2 0V6h5v4h-5zm3.5 7c-0.83 0-1.5-0.67-1.5-1.5s0.67-1.5 1.5-1.5 1.5 0.67 1.5 1.5-0.67 1.5-1.5 1.5z"/>
                  </svg>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Static Foreground Train (Always Visible) */}
        <div 
          className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-40"
          style={{ left: `${train.position}%` }}
        >
          <div className="px-3 py-1 bg-card/95 rounded border border-border shadow-lg">
            <div className="flex flex-col items-center gap-0.5">
              <span className="font-bold text-foreground text-sm whitespace-nowrap">{train.label}</span>
              <span className="text-[10px] text-muted-foreground">Status: Active</span>
            </div>
          </div>
          <div className="relative">
            <div 
              className="w-16 h-14 rounded-lg flex items-center justify-center shadow-2xl border-2 border-white/20"
              style={{ backgroundColor: train.color }}
            >
              <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2c-4 0-8 0.5-8 4v9.5C4 17.43 5.57 19 7.5 19L6 20.5v0.5h2l2-2h4l2 2h2v-0.5L16.5 19c1.93 0 3.5-1.57 3.5-3.5V6c0-3.5-4-4-8-4zM7.5 17c-0.83 0-1.5-0.67-1.5-1.5S6.67 14 7.5 14s1.5 0.67 1.5 1.5S8.33 17 7.5 17zm3.5-7H6V6h5v4zm2 0V6h5v4h-5zm3.5 7c-0.83 0-1.5-0.67-1.5-1.5s0.67-1.5 1.5-1.5 1.5 0.67 1.5 1.5-0.67 1.5-1.5 1.5z"/>
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Right Traffic Signal */}
      <div 
        className="cursor-pointer hover:scale-110 transition-transform z-50 flex flex-col items-center gap-1"
        onClick={() => onSignalClick?.("right")}
      >
        <div className="h-16 w-2 bg-muted-foreground/20" />
        <div className="flex flex-col gap-1 bg-secondary/90 p-2 rounded border border-border">
          <div className={cn(
            "w-3 h-3 rounded-full border",
            signalRight === "danger" ? "bg-signal-stop border-signal-stop shadow-lg shadow-signal-stop/50" : "bg-muted/50 border-muted-foreground/30"
          )} />
          <div className={cn(
            "w-3 h-3 rounded-full border",
            signalRight === "caution" ? "bg-accent border-accent shadow-lg shadow-accent/50" : "bg-muted/50 border-muted-foreground/30"
          )} />
          <div className={cn(
            "w-3 h-3 rounded-full border",
            signalRight === "safe" ? "bg-signal-safe border-signal-safe shadow-lg shadow-signal-safe/50" : "bg-muted/50 border-muted-foreground/30"
          )} />
        </div>
      </div>
    </div>
  );
};
