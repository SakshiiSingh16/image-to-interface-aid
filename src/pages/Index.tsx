import { useState } from "react";
import TrainTrackVisualization from "@/components/TrainTrackVisualization";
import SpeedDisplay from "@/components/SpeedDisplay";
import SignalStatus from "@/components/SignalStatus";
import AutoSignalResponse from "@/components/AutoSignalResponse";
import CommunicationPanel from "@/components/CommunicationPanel";
import { useToast } from "@/hooks/use-toast";

const Index = () => {
  const { toast } = useToast();
  const [speed] = useState(72);
  const [signalDistance] = useState(2);
  const [brakeActive] = useState(true);
  const [trains] = useState([
    { id: "72", distance: 3 },
    { id: "36", distance: 3 },
  ]);

  const handleEmergencyStop = () => {
    toast({
      title: "Emergency Stop Activated",
      description: "All trains have been signaled to stop immediately.",
      variant: "destructive",
    });
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-[1600px] mx-auto space-y-6">
        {/* Header */}
        <header className="text-center py-4">
          <h1 className="text-4xl font-bold text-foreground tracking-wider uppercase">
            Smart Rail-Tracking and Anti-Collision System
          </h1>
        </header>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Track Visualization */}
          <div className="lg:col-span-2 space-y-6">
            <div className="h-[400px]">
              <TrainTrackVisualization />
            </div>

            {/* Auto Signal Response */}
            <AutoSignalResponse
              active={brakeActive}
              message={brakeActive ? "AUTO BRAKE ACTIVATED" : "SYSTEM STANDBY"}
            />
          </div>

          {/* Right Column - Stats and Controls */}
          <div className="space-y-6">
            <SpeedDisplay speed={speed} />
            <SignalStatus distance={signalDistance} status="safe" />
            <CommunicationPanel trains={trains} onEmergencyStop={handleEmergencyStop} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
