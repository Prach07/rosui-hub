
import { Badge } from "@/components/ui/badge";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { RosTopic } from "@/lib/api";
import { Boxes } from "lucide-react";

interface TopicListProps {
  topics: RosTopic[];
}

const TopicList = ({ topics }: TopicListProps) => {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Publishers</TableHead>
            <TableHead>Subscribers</TableHead>
            <TableHead>Frequency</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {topics.map((topic) => (
            <TableRow key={topic.id}>
              <TableCell className="font-medium">{topic.name}</TableCell>
              <TableCell className="font-mono text-xs">{topic.type}</TableCell>
              <TableCell>
                <div className="flex flex-wrap gap-1">
                  {topic.publishers.length > 0 ? (
                    topic.publishers.map((pub, idx) => (
                      <Badge key={idx} variant="outline" className="text-xs">
                        {pub}
                      </Badge>
                    ))
                  ) : (
                    <span className="text-gray-400 text-xs italic">None</span>
                  )}
                </div>
              </TableCell>
              <TableCell>
                <div className="flex flex-wrap gap-1">
                  {topic.subscribers.length > 0 ? (
                    topic.subscribers.map((sub, idx) => (
                      <Badge key={idx} variant="outline" className="text-xs">
                        {sub}
                      </Badge>
                    ))
                  ) : (
                    <span className="text-gray-400 text-xs italic">None</span>
                  )}
                </div>
              </TableCell>
              <TableCell>
                {topic.frequency ? (
                  <div className="flex items-center gap-1">
                    <span>{topic.frequency.toFixed(1)} Hz</span>
                    <Badge 
                      variant="secondary" 
                      className={`h-2 w-2 rounded-full p-0 ${topic.frequency > 0 ? "bg-green-500" : "bg-gray-300"}`}
                    />
                  </div>
                ) : (
                  <span className="text-gray-400 text-xs italic">Not active</span>
                )}
              </TableCell>
            </TableRow>
          ))}
          {topics.length === 0 && (
            <TableRow>
              <TableCell colSpan={5} className="h-24 text-center">
                <div className="flex flex-col items-center justify-center text-gray-500">
                  <Boxes className="h-8 w-8 mb-2" />
                  <span>No topics found</span>
                </div>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default TopicList;
