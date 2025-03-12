
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface StatusCardProps {
  title: string;
  value: string | number;
  icon: ReactNode;
  status?: "normal" | "warning" | "error" | "success";
  className?: string;
}

const StatusCard = ({ title, value, icon, status = "normal", className }: StatusCardProps) => {
  const statusColors = {
    normal: "bg-card",
    warning: "bg-yellow-50 border-yellow-200",
    error: "bg-red-50 border-red-200", 
    success: "bg-green-50 border-green-200"
  };

  const statusIconColors = {
    normal: "text-gray-500",
    warning: "text-ros-yellow",
    error: "text-ros-red",
    success: "text-ros-green"
  };

  return (
    <Card className={cn(statusColors[status], className)}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <div className={statusIconColors[status]}>{icon}</div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
      </CardContent>
    </Card>
  );
};

export default StatusCard;
