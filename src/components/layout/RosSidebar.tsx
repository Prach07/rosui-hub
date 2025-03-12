
import { 
  Sidebar, 
  SidebarContent, 
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter
} from "@/components/ui/sidebar";
import { 
  Activity, 
  CircuitBoard, 
  Home, 
  Layers, 
  MessageSquare, 
  Settings, 
  Terminal, 
  Zap 
} from "lucide-react";
import { Link } from "react-router-dom";

const RosSidebar = () => {
  const menuItems = [
    { icon: Home, label: "Dashboard", url: "/" },
    { icon: Layers, label: "Nodes", url: "/nodes" },
    { icon: MessageSquare, label: "Topics", url: "/topics" },
    { icon: CircuitBoard, label: "Parameters", url: "/parameters" },
    { icon: Activity, label: "Monitoring", url: "/monitoring" },
    { icon: Terminal, label: "Console", url: "/console" },
    { icon: Settings, label: "Settings", url: "/settings" },
  ];

  return (
    <Sidebar>
      <SidebarHeader className="flex items-center gap-2 px-4 py-3">
        <Zap className="h-6 w-6 text-ros-blue" />
        <span className="font-bold text-xl text-ros-blue">ROS2 Hub</span>
      </SidebarHeader>
      
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.label}>
                  <SidebarMenuButton asChild>
                    <Link to={item.url} className="flex items-center">
                      <item.icon className="h-5 w-5 mr-3" />
                      <span>{item.label}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      
      <SidebarFooter className="px-4 py-3 text-xs text-gray-500">
        ROS2 Humble • Python • v0.1.0
      </SidebarFooter>
    </Sidebar>
  );
};

export default RosSidebar;
