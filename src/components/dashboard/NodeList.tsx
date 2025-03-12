
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { RosNode, startNode, stopNode } from "@/lib/api";
import { Play, Square } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

interface NodeListProps {
  nodes: RosNode[];
  onRefresh: () => void;
}

const NodeList = ({ nodes, onRefresh }: NodeListProps) => {
  const [loading, setLoading] = useState<Record<string, boolean>>({});
  const { toast } = useToast();

  const handleStart = async (node: RosNode) => {
    setLoading({ ...loading, [node.id]: true });
    try {
      await startNode(node.id);
      toast({
        title: "Node started",
        description: `Node ${node.name} started successfully`,
      });
      onRefresh();
    } catch (error) {
      toast({
        title: "Error starting node",
        description: `Failed to start node ${node.name}`,
        variant: "destructive"
      });
    } finally {
      setLoading({ ...loading, [node.id]: false });
    }
  };

  const handleStop = async (node: RosNode) => {
    setLoading({ ...loading, [node.id]: true });
    try {
      await stopNode(node.id);
      toast({
        title: "Node stopped",
        description: `Node ${node.name} stopped successfully`,
      });
      onRefresh();
    } catch (error) {
      toast({
        title: "Error stopping node",
        description: `Failed to stop node ${node.name}`,
        variant: "destructive"
      });
    } finally {
      setLoading({ ...loading, [node.id]: false });
    }
  };

  const getStatusBadge = (status: RosNode["status"]) => {
    switch (status) {
      case "active":
        return <Badge className="bg-ros-green">Active</Badge>;
      case "inactive":
        return <Badge variant="outline">Inactive</Badge>;
      case "error":
        return <Badge variant="destructive">Error</Badge>;
      default:
        return <Badge variant="secondary">Unknown</Badge>;
    }
  };

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="w-[100px]">CPU</TableHead>
            <TableHead className="w-[100px]">Memory</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {nodes.map((node) => (
            <TableRow key={node.id}>
              <TableCell className="font-medium">{node.name}</TableCell>
              <TableCell className="font-mono text-xs">{node.type}</TableCell>
              <TableCell>{getStatusBadge(node.status)}</TableCell>
              <TableCell>{node.cpu !== undefined ? `${node.cpu}%` : "-"}</TableCell>
              <TableCell>{node.memory !== undefined ? `${node.memory} MB` : "-"}</TableCell>
              <TableCell className="text-right">
                <TooltipProvider>
                  {node.status === "active" ? (
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button 
                          variant="outline" 
                          size="icon" 
                          onClick={() => handleStop(node)}
                          disabled={loading[node.id]}
                        >
                          <Square className="h-4 w-4" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Stop Node</p>
                      </TooltipContent>
                    </Tooltip>
                  ) : (
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button 
                          variant="outline" 
                          size="icon" 
                          onClick={() => handleStart(node)}
                          disabled={loading[node.id]}
                        >
                          <Play className="h-4 w-4" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Start Node</p>
                      </TooltipContent>
                    </Tooltip>
                  )}
                </TooltipProvider>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default NodeList;
