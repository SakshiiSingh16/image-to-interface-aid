import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { MovingTrack } from "@/components/MovingTrack";
import { SpeedDisplay } from "@/components/SpeedDisplay";
import { SignalStatus } from "@/components/SignalStatus";
import { AnalyticsDashboard } from "@/components/AnalyticsDashboard";
import { CollisionAlert } from "@/components/CollisionAlert";
import { WeatherTime } from "@/components/WeatherTime";
import { AlertDialog, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { toast } from "@/hooks/use-toast";
import { stations } from "@/data/stations";
import { TRAIN_DB } from "../train-database";

interface TrainState {
  id: string;
  label: string;
  color: string;
  position: number;
  speed: number;
  distance: number;
  direction?: "UP" | "DOWN";
  latitude?: number;
  longitude?: number;
  stationName?: string;
}

interface SignalState {
  left: "safe" | "caution" | "danger";
  right: "safe" | "caution" | "danger";
}

interface TrainDetails {
  id: string;
  name: string;
  number: string;
  status: string;
  eta: string;
}

const Index = () => {
  const [showEmergencyDialog, setShowEmergencyDialog] = useState(false);
  const [selectedTrain, setSelectedTrain] = useState<string | null>(null);
  const [previousTrain, setPreviousTrain] = useState<TrainDetails | null>(null);
  const [nextTrain, setNextTrain] = useState<TrainDetails | null>(null);

  // Load data from TRAIN_DB
  // We will use the first two trains to demonstrate "facing each other"
  const train1Data = TRAIN_DB[0];
  const train2Data = TRAIN_DB[1];

  // Calculate positions based on location
  // We define a window to make them visible on the track (0-100%)
  // Let's assume a 10km window centered on the midpoint of the two trains
  const loc1 = train1Data.location;
  const loc2 = train2Data.location;
  const midPoint = (loc1 + loc2) / 2;
  const windowSize = 10; // 10km window
  const startLoc = midPoint - windowSize / 2;

  const getPosition = (loc: number) => {
    const pos = ((loc - startLoc) / windowSize) * 100;
    return Math.max(5, Math.min(95, pos)); // Clamp between 5% and 95%
  };

  const pos1 = getPosition(loc1);
  const pos2 = getPosition(loc2);

  // Determine direction to face each other
  // Left train (smaller position) should face Right (DOWN)
  // Right train (larger position) should face Left (UP)
  const dir1 = pos1 < pos2 ? "DOWN" : "UP";
  const dir2 = pos2 < pos1 ? "DOWN" : "UP";

  const [trains, setTrains] = useState<TrainState[]>([
    {
      id: train1Data.trainNumber,
      label: train1Data.trainName,
      color: "#00d4ff",
      position: pos1,
      speed: 60,
      distance: 0,
      direction: dir1,
      stationName: train1Data.stationName,
      latitude: 12.9716, // Mock coords
      longitude: 77.5946
    },
    {
      id: train2Data.trainNumber,
      label: train2Data.trainName,
      color: "#ff9500",
      position: pos2,
      speed: 55,
      distance: Math.abs(loc1 - loc2),
      direction: dir2,
      stationName: train2Data.stationName,
      latitude: 13.0827, // Mock coords
      longitude: 80.2707
    },
  ]);

  // Mock Hardware Input Simulation
  const [currentGPS, setCurrentGPS] = useState({
    lat: stations[0].coordinates.lat,
    lng: stations[0].coordinates.lng
  });

  // Polling for live backend data (Optional/Background)
  useEffect(() => {
    const API_URL = import.meta.env.VITE_BACKEND_API || "http://localhost:8080";

    const fetchLiveData = async () => {
      try {
        const response = await fetch(`${API_URL}/live`);
        if (!response.ok) return; // Silent fail if backend not running
        const data = await response.json();

        // Update GPS
        if (data.currentGPS) {
          setCurrentGPS({ lat: data.currentGPS.lat, lng: data.currentGPS.lng });
        }

        // We are NOT updating trains from API here to preserve the TRAIN_DB demo
        // But we can update signals/other info
        if (data.signals) {
          setSignals(data.signals);
        }
        if (data.previousTrain) setPreviousTrain(data.previousTrain);
        if (data.nextTrain) setNextTrain(data.nextTrain);

      } catch (error) {
        // console.error("Error fetching live data:", error);
      }
    };

    fetchLiveData();
    const interval = setInterval(fetchLiveData, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const wsUrl = import.meta.env.VITE_BACKEND_WS || "ws://localhost:8080";
    const ws = new WebSocket(wsUrl);

    ws.onopen = () => console.log("WebSocket connected 👍");

    ws.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        if (data.lat && data.lng) {
          setCurrentGPS({ lat: data.lat, lng: data.lng });
        }
        if (data.type === 'SIGNAL_UPDATE' && data.signals) {
          setSignals(data.signals);
        }
        if (data.previousTrain) setPreviousTrain(data.previousTrain);
        if (data.nextTrain) setNextTrain(data.nextTrain);
        if (data.type === 'EMERGENCY_STOP') {
          toast({
            title: "🚨 EMERGENCY STOP RECEIVED",
            description: `Train ${data.trainId} stopped remotely.`,
            variant: "destructive",
          });
        }
      } catch (err) {
        console.error("WebSocket parse error:", err);
      }
    };

    return () => ws.close();
  }, []);


  // Calculate if trains are approaching or moving away
  const getTrainStatus = (trainA: TrainState, trainB: TrainState): "Approaching" | "Moving Away" => {
    // Since they are facing each other, they are approaching
    return "Approaching";
  };

  const [signals, setSignals] = useState<Record<string, SignalState>>({
    "track-up": { left: "safe", right: "safe" },
    "track-down": { left: "safe", right: "safe" },
  });

  // COLLISION DETECTION LOGIC
  const COLLISION_THRESHOLD_KM = 1;
  const distanceBetweenTrains = Math.abs(trains[0].distance); // Already calculated in state
  const isCollisionRisk = distanceBetweenTrains <= COLLISION_THRESHOLD_KM;

  // Dashboard Metrics Calculation
  const avgSpeed = Math.round(trains.reduce((acc, curr) => acc + curr.speed, 0) / trains.length) || 0;
  const warningCount = isCollisionRisk ? 1 : 0;
  const systemStatus = isCollisionRisk ? "Warning" : "Normal";

  // Next Signal Distance Calculation
  const nextSignalDistance = Math.max(0, (60 - 50) / 10);


  const handleSignalClick = (trackId: string, side: "left" | "right") => {
    const apiUrl = import.meta.env.VITE_BACKEND_API || "http://localhost:8080";

    setSignals(prev => {
      const currentSignal = prev[trackId][side];
      const nextSignal =
        currentSignal === "safe" ? "caution" :
          currentSignal === "caution" ? "danger" : "safe";

      fetch(`${apiUrl}/update-signal`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ trackId, [side]: nextSignal })
      }).catch(err => console.error("Failed to update signal:", err));

      return {
        ...prev,
        [trackId]: {
          ...prev[trackId],
          [side]: nextSignal
        }
      };
    });

    toast({
      title: "Signal Updated",
      description: `${trackId.toUpperCase()} ${side} signal changed`,
    });
  };

  const handleEmergencyStop = async (trainId: string) => {
    const train = trains.find(t => t.id === trainId);
    if (!train) return;

    const apiUrl = import.meta.env.VITE_BACKEND_API || "http://localhost:8080";
    fetch(`${apiUrl}/emergency-stop`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ trainId })
    }).catch(err => console.error("Failed to trigger emergency stop:", err));

    toast({
      title: "🚨 EMERGENCY STOP ACTIVATED",
      description: `${train.label}: Emergency brake initialization...`,
      variant: "destructive",
    });

    setTimeout(() => {
      toast({
        title: "⚠️ BRAKING IN PROGRESS",
        description: `${train.label}: Slowing down... Speed reducing rapidly.`,
        variant: "destructive",
      });
    }, 2000);

    setTimeout(() => {
      toast({
        title: "✓ VEHICLE STOPPED",
        description: `${train.label} has been brought to a complete stop safely.`,
      });
      setSelectedTrain(null);
      setShowEmergencyDialog(false);
    }, 4000);
  };

  return (
    <div className="h-screen w-screen bg-background text-foreground overflow-hidden flex flex-col p-2">
      {/* Header */}
      <div className="mb-2 flex-shrink-0 text-center">
        <h1 className="text-2xl font-bold tracking-tight text-foreground">
          SMART RAIL-TRACKING AND ANTI-COLLISION SYSTEM
        </h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-2 flex-1 overflow-hidden min-h-0">
        {/* Main Track Visualization */}
        <div className="lg:col-span-2 flex flex-col gap-1 overflow-hidden min-h-0">
          {/* Railway Tracks */}
          <Card className="p-2 bg-card border-border flex-shrink-0 overflow-hidden flex flex-col">
            <div className="space-y-3 flex-1">
              <MovingTrack
                name="MAIN TRACK"
                direction="forward"
                mainTrain={{
                  ...trains[0],
                  // Ensure main train uses its calculated position and direction
                }}
                nearbyTrains={[
                  {
                    ...trains[1],
                    // Ensure nearby train uses its calculated position and direction
                  }
                ]}
                status={getTrainStatus(trains[0], trains[1])}
                signalLeft={signals["track-up"].left}
                signalRight={signals["track-up"].right}
                onSignalClick={(side) => handleSignalClick("track-up", side)}
              />
            </div>
          </Card >

          {/* Analytics Dashboard */}
          < div className="flex-shrink-0 overflow-hidden min-h-0" >
            <AnalyticsDashboard
              activeTrains={2}
              avgSpeed={avgSpeed}
              warningCount={warningCount}
              systemStatus={systemStatus}
            />
            <div className="mt-1 mb-1">
              <SignalStatus
                distance={nextSignalDistance}
                status={signals["track-up"].left}
              />
            </div>
          </div >
        </div >

        {/* Right Sidebar - Metrics */}
        < div className="flex flex-col gap-1.5 overflow-hidden" >
          <SpeedDisplay
            tracks={[
              { direction: "UP", speed: trains[0].speed, distance: trains[0].distance },
              { direction: "DOWN", speed: trains[1].speed, distance: trains[1].distance },
            ]}
          />
          <WeatherTime locationName={stations[0].name} />
          <CollisionAlert isRisk={isCollisionRisk} trainLabel="MAIN TRAIN" />

          {/* Previous & Next Train Details */}
          <Card className="p-1.5 bg-card border-border space-y-1.5">
            <h2 className="text-xs font-semibold text-muted-foreground">TRAIN SCHEDULE</h2>
            <div className="grid grid-cols-2 gap-1.5">
              <div className="bg-muted/50 p-1.5 rounded-md">
                <p className="text-[10px] text-muted-foreground mb-0.5">Previous Train</p>
                {previousTrain ? (
                  <>
                    <p className="font-bold text-xs truncate">{previousTrain.name}</p>
                    <p className="text-[10px] font-mono leading-none opacity-80">{previousTrain.number}</p>
                    <p className="text-[10px] text-green-500 font-medium mt-0.5">{previousTrain.status}</p>
                  </>
                ) : (
                  <p className="text-[10px] italic">Loading...</p>
                )}
              </div>
              <div className="bg-muted/50 p-1.5 rounded-md">
                <p className="text-[10px] text-muted-foreground mb-0.5">Next Train</p>
                {nextTrain ? (
                  <>
                    <p className="font-bold text-xs truncate">{nextTrain.name}</p>
                    <p className="text-[10px] font-mono leading-none opacity-80">{nextTrain.number}</p>
                    <p className="text-[10px] text-blue-500 font-medium mt-0.5">ETA: {nextTrain.eta}</p>
                  </>
                ) : (
                  <p className="text-[10px] italic">Loading...</p>
                )}
              </div>
            </div>
          </Card>

          <Button
            onClick={() => setShowEmergencyDialog(true)}
            className="w-full h-9 text-sm font-bold bg-destructive hover:bg-destructive/90 text-destructive-foreground shadow-lg"
          >
            EMERGENCY STOP
          </Button>
        </div >
      </div >

      {/* Emergency Stop Dialog */}
      < AlertDialog open={showEmergencyDialog} onOpenChange={setShowEmergencyDialog} >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Select Train to Stop</AlertDialogTitle>
            <AlertDialogDescription>
              Choose which train should execute emergency stop procedure.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <div className="space-y-3 my-4">
            {trains.map((train) => (
              <Button
                key={train.id}
                onClick={() => {
                  setSelectedTrain(train.id);
                  handleEmergencyStop(train.id);
                }}
                className="w-full h-12 text-lg font-semibold"
                style={{ backgroundColor: train.color }}
              >
                {train.label} - {train.speed} km/h
              </Button>
            ))}
          </div>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog >
    </div >
  );
};

export default Index;
