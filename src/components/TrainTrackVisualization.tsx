import { Train } from "lucide-react";

interface TrainPosition {
  id: string;
  color: "blue" | "red" | "yellow";
  track: number;
}

interface ObstaclePosition {
  track: number;
  position: number;
}

const TrainTrackVisualization = () => {
  const trains: TrainPosition[] = [
    { id: "main", color: "blue", track: 0 },
    { id: "72", color: "red", track: 1 },
    { id: "36", color: "yellow", track: 2 },
  ];

  const obstacles: ObstaclePosition[] = [
    { track: 1, position: 35 },
    { track: 2, position: 65 },
  ];

  const getTrainColor = (color: string) => {
    switch (color) {
      case "blue":
        return "text-primary";
      case "red":
        return "text-destructive";
      case "yellow":
        return "text-accent";
      default:
        return "text-primary";
    }
  };

  return (
    <div className="relative w-full h-full bg-track-bg rounded-lg p-8">
      <div className="flex gap-6 items-center h-full">
        {/* Main train on left */}
        <div className="flex-shrink-0">
          <Train className="w-16 h-16 text-primary" />
        </div>

        {/* Track lines */}
        <div className="flex-1 flex flex-col gap-8 justify-center">
          {[0, 1, 2, 3].map((trackIndex) => (
            <div key={trackIndex} className="relative h-1 bg-track-rail rounded-full">
              {/* Junction curves for first track */}
              {trackIndex === 0 && (
                <svg
                  className="absolute left-0 top-1/2 -translate-y-1/2 w-12 h-24"
                  viewBox="0 0 48 96"
                  fill="none"
                >
                  <path
                    d="M 0 48 Q 24 24 48 24"
                    stroke="hsl(var(--track-rail))"
                    strokeWidth="4"
                    fill="none"
                  />
                  <path
                    d="M 0 48 Q 24 48 48 48"
                    stroke="hsl(var(--track-rail))"
                    strokeWidth="4"
                    fill="none"
                  />
                  <path
                    d="M 0 48 Q 24 72 48 72"
                    stroke="hsl(var(--track-rail))"
                    strokeWidth="4"
                    fill="none"
                  />
                </svg>
              )}

              {/* Trains on tracks */}
              {trains
                .filter((train) => train.track === trackIndex)
                .map((train) => (
                  <div
                    key={train.id}
                    className="absolute top-1/2 -translate-y-1/2"
                    style={{ left: train.id === "main" ? "0%" : "50%" }}
                  >
                    <Train className={`w-10 h-10 ${getTrainColor(train.color)}`} />
                  </div>
                ))}

              {/* Obstacles */}
              {obstacles
                .filter((obs) => obs.track === trackIndex)
                .map((obs, idx) => (
                  <div
                    key={idx}
                    className="absolute top-1/2 -translate-y-1/2 w-4 h-4 bg-destructive rounded-full animate-pulse"
                    style={{ left: `${obs.position}%` }}
                  />
                ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TrainTrackVisualization;
