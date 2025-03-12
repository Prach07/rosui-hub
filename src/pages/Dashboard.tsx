
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import NodeList from "@/components/dashboard/NodeList";
import StatusCard from "@/components/dashboard/StatusCard";
import SystemMonitor from "@/components/dashboard/SystemMonitor";
import TopicList from "@/components/dashboard/TopicList";
import { getNodes, getSystemStatus, getTopics } from "@/lib/api";
import { Activity, ArrowDownUp, Cpu, RefreshCcw, Server, Zap } from "lucide-react";
import { useEffect, useState } from "react";
import { useToast } from "@/hooks/use-toast";

const Dashboard = () => {
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [nodes, setNodes] = useState([]);
  const [topics, setTopics] = useState([]);
  const [systemStatus, setSystemStatus] = useState(null);
  const { toast } = useToast();

  const fetchData = async () => {
    try {
      setRefreshing(true);
      const [nodesData, topicsData, statusData] = await Promise.all([
        getNodes(),
        getTopics(),
        getSystemStatus()
      ]);
      setNodes(nodesData);
      setTopics(topicsData);
      setSystemStatus(statusData);
    } catch (error) {
      console.error("Error fetching data:", error);
      toast({
        title: "Failed to fetch data",
        description: "Couldn't connect to the ROS2 system",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchData();

    // Set up a refresh interval for system status
    const intervalId = setInterval(() => {
      getSystemStatus().then(setSystemStatus).catch(console.error);
    }, 5000);

    return () => clearInterval(intervalId);
  }, []);

  const getActiveNodeCount = () => {
    return nodes.filter(node => node.status === 'active').length;
  };

  const getActiveTopicCount = () => {
    return topics.filter(topic => topic.frequency > 0).length;
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">ROS2 Dashboard</h1>
        <Button 
          variant="outline" 
          size="sm" 
          onClick={fetchData} 
          disabled={refreshing}
          className="gap-2"
        >
          <RefreshCcw className={`h-4 w-4 ${refreshing ? 'animate-spin' : ''}`} />
          Refresh
        </Button>
      </div>

      {loading ? (
        <div className="h-96 flex items-center justify-center">
          <div className="flex flex-col items-center gap-4">
            <Zap className="h-12 w-12 text-ros-blue animate-pulse" />
            <p className="text-muted-foreground">Loading ROS2 system data...</p>
          </div>
        </div>
      ) : (
        <>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <StatusCard 
              title="Active Nodes" 
              value={getActiveNodeCount()} 
              icon={<Server className="h-5 w-5" />} 
              status={getActiveNodeCount() > 0 ? "success" : "normal"}
            />
            <StatusCard 
              title="Active Topics" 
              value={getActiveTopicCount()} 
              icon={<ArrowDownUp className="h-5 w-5" />} 
              status={getActiveTopicCount() > 0 ? "success" : "normal"}
            />
            <StatusCard 
              title="CPU Usage" 
              value={`${systemStatus?.cpuUsage.toFixed(1)}%`} 
              icon={<Cpu className="h-5 w-5" />} 
              status={systemStatus?.cpuUsage > 80 ? "warning" : "normal"}
            />
            <StatusCard 
              title="ROS Status" 
              value={systemStatus?.rosStatus === 'running' ? 'Running' : 'Offline'} 
              icon={<Activity className="h-5 w-5" />} 
              status={systemStatus?.rosStatus === 'running' ? "success" : "error"}
            />
          </div>

          <Card>
            <CardHeader>
              <CardTitle>System Monitor</CardTitle>
            </CardHeader>
            <CardContent>
              {systemStatus && <SystemMonitor status={systemStatus} />}
            </CardContent>
          </Card>

          <Tabs defaultValue="nodes">
            <TabsList>
              <TabsTrigger value="nodes">Nodes</TabsTrigger>
              <TabsTrigger value="topics">Topics</TabsTrigger>
            </TabsList>
            <TabsContent value="nodes">
              <Card>
                <CardHeader>
                  <CardTitle>ROS2 Nodes</CardTitle>
                </CardHeader>
                <CardContent>
                  <NodeList nodes={nodes} onRefresh={fetchData} />
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="topics">
              <Card>
                <CardHeader>
                  <CardTitle>ROS2 Topics</CardTitle>
                </CardHeader>
                <CardContent>
                  <TopicList topics={topics} />
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </>
      )}
    </div>
  );
};

export default Dashboard;
