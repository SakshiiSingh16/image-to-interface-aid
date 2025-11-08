import { Card } from "@/components/ui/card";
import { Bell } from "lucide-react";

interface AutoSignalResponseProps {
  active: boolean;
  message: string;
}

const AutoSignalResponse = ({ active, message }: AutoSignalResponseProps) => {
  return (
    <Card className="p-6 bg-card border-border">
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-muted-foreground uppercase tracking-wider">
          Auto Signal Response
        </h3>
        <div className="flex items-center gap-4">
          <Bell
            className={`w-12 h-12 ${
              active ? "text-destructive animate-pulse" : "text-muted-foreground"
            }`}
          />
          <div
            className={`flex-1 px-4 py-3 rounded-lg ${
              active ? "bg-destructive/20" : "bg-secondary"
            }`}
          >
            <p
              className={`text-lg font-semibold ${
                active ? "text-destructive" : "text-muted-foreground"
              }`}
            >
              {message}
            </p>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default AutoSignalResponse;
