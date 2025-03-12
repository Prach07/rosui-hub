
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import RosLayout from "./components/layout/RosLayout";
import Dashboard from "./pages/Dashboard";
import NotImplementedPage from "./pages/NotImplementedPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={
            <RosLayout>
              <Dashboard />
            </RosLayout>
          } />
          <Route path="/nodes" element={
            <RosLayout>
              <NotImplementedPage 
                title="Nodes Management" 
                description="A detailed view of all ROS2 nodes with advanced control options."
              />
            </RosLayout>
          } />
          <Route path="/topics" element={
            <RosLayout>
              <NotImplementedPage 
                title="Topics Explorer" 
                description="Browse and inspect all ROS2 topics, view message details and visualize data streams."
              />
            </RosLayout>
          } />
          <Route path="/parameters" element={
            <RosLayout>
              <NotImplementedPage 
                title="Parameters Configuration" 
                description="View and modify parameters for all ROS2 nodes in the system."
              />
            </RosLayout>
          } />
          <Route path="/monitoring" element={
            <RosLayout>
              <NotImplementedPage 
                title="System Monitoring" 
                description="Real-time monitoring of system resources and ROS2 components."
              />
            </RosLayout>
          } />
          <Route path="/console" element={
            <RosLayout>
              <NotImplementedPage 
                title="Console" 
                description="Interactive terminal for running ROS2 CLI commands directly from the web interface."
              />
            </RosLayout>
          } />
          <Route path="/settings" element={
            <RosLayout>
              <NotImplementedPage 
                title="Settings" 
                description="Configure connection settings, appearance, and other options for the ROS2 Web UI."
              />
            </RosLayout>
          } />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
