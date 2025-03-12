
import { Progress } from "@/components/ui/progress";
import { SystemStatus } from "@/lib/api";
import { formatDuration } from "@/lib/utils";
import { Activity, HardDrive, Server, Wifi } from "lucide-react";

interface SystemMonitorProps {
  status: SystemStatus;
}

const SystemMonitor = ({ status }: SystemMonitorProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="space-y-4">
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="flex items-center gap-2">
              <Server className="h-4 w-4" /> 
              CPU Usage
            </span>
            <span className="font-medium">{status.cpuUsage.toFixed(1)}%</span>
          </div>
          <Progress value={status.cpuUsage} className="h-2" />
        </div>

        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="flex items-center gap-2">
              <HardDrive className="h-4 w-4" /> 
              Memory Usage
            </span>
            <span className="font-medium">{status.memoryUsage.toFixed(1)}%</span>
          </div>
          <Progress value={status.memoryUsage} className="h-2" />
        </div>

        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="flex items-center gap-2">
              <HardDrive className="h-4 w-4" /> 
              Disk Usage
            </span>
            <span className="font-medium">{status.diskUsage.toFixed(1)}%</span>
          </div>
          <Progress value={status.diskUsage} className="h-2" />
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between p-3 bg-muted rounded-md">
          <span className="flex items-center gap-2">
            <Wifi className="h-4 w-4" /> Network Status
          </span>
          <span className={`px-2 py-1 rounded-full text-xs ${
            status.networkStatus === 'connected' 
              ? 'bg-green-100 text-green-800' 
              : 'bg-red-100 text-red-800'
          }`}>
            {status.networkStatus === 'connected' ? 'Connected' : 'Disconnected'}
          </span>
        </div>

        <div className="flex items-center justify-between p-3 bg-muted rounded-md">
          <span className="flex items-center gap-2">
            <Activity className="h-4 w-4" /> ROS Status
          </span>
          <span className={`px-2 py-1 rounded-full text-xs ${
            status.rosStatus === 'running' 
              ? 'bg-green-100 text-green-800' 
              : status.rosStatus === 'stopped'
              ? 'bg-yellow-100 text-yellow-800'
              : 'bg-red-100 text-red-800'
          }`}>
            {status.rosStatus.charAt(0).toUpperCase() + status.rosStatus.slice(1)}
          </span>
        </div>

        <div className="flex items-center justify-between p-3 bg-muted rounded-md">
          <span className="flex items-center gap-2">
            <Server className="h-4 w-4" /> System Uptime
          </span>
          <span className="font-mono">{formatDuration(status.uptime)}</span>
        </div>
      </div>
    </div>
  );
};

export default SystemMonitor;
