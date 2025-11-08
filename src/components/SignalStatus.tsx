import { Card } from "@/components/ui/card";

interface SignalStatusProps {
  distance: number;
  status: "safe" | "caution" | "danger";
}

const SignalStatus = ({ distance, status }: SignalStatusProps) => {
  const getStatusColor = () => {
    switch (status) {
      case "safe":
        return "bg-success";
      case "caution":
        return "bg-accent";
      case "danger":
        return "bg-destructive";
      default:
        return "bg-success";
    }
  };

  return (
    <Card className="p-6 bg-card border-border">
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-muted-foreground uppercase tracking-wider">
          Signal Status
        </h3>
        <div className="flex items-center gap-4">
          <div
            className={`w-16 h-16 ${getStatusColor()} rounded-full shadow-lg`}
            style={{
              boxShadow: `0 0 20px ${
                status === "safe"
                  ? "hsl(var(--success))"
                  : status === "caution"
                  ? "hsl(var(--accent))"
                  : "hsl(var(--destructive))"
              }`,
            }}
          />
          <div>
            <p className="text-sm text-muted-foreground">Next Signal</p>
            <p className="text-2xl font-bold text-foreground">{distance} KM</p>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default SignalStatus;
