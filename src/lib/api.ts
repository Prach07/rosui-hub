
// Mock API functions to simulate ROS2 data
// These will be replaced with real Python backend integration

export interface RosNode {
  id: string;
  name: string;
  status: 'active' | 'inactive' | 'error';
  type: string;
  pid?: number;
  cpu?: number;
  memory?: number;
}

export interface RosTopic {
  id: string;
  name: string;
  type: string;
  publishers: string[];
  subscribers: string[];
  frequency?: number;
  lastMessage?: any;
}

export interface RosParameter {
  id: string;
  name: string;
  value: string | number | boolean;
  type: 'string' | 'integer' | 'float' | 'boolean' | 'array';
  description?: string;
  node: string;
}

export interface SystemStatus {
  cpuUsage: number;
  memoryUsage: number;
  diskUsage: number;
  networkStatus: 'connected' | 'disconnected';
  rosStatus: 'running' | 'stopped' | 'error';
  uptime: number;
}

// Mock data
const mockNodes: RosNode[] = [
  { id: '1', name: '/talker', status: 'active', type: 'demo_nodes_cpp/talker', pid: 12345, cpu: 1.2, memory: 24.5 },
  { id: '2', name: '/listener', status: 'active', type: 'demo_nodes_cpp/listener', pid: 12346, cpu: 0.8, memory: 20.1 },
  { id: '3', name: '/camera_node', status: 'active', type: 'image_pipeline/camera_node', pid: 12347, cpu: 4.5, memory: 128.3 },
  { id: '4', name: '/logger', status: 'inactive', type: 'rclcpp/logger_node', pid: 12348, cpu: 0, memory: 0 },
  { id: '5', name: '/controller', status: 'error', type: 'control_system/controller', pid: 12349, cpu: 6.7, memory: 45.2 },
];

const mockTopics: RosTopic[] = [
  { id: '1', name: '/chatter', type: 'std_msgs/String', publishers: ['/talker'], subscribers: ['/listener'], frequency: 10.0 },
  { id: '2', name: '/camera/image_raw', type: 'sensor_msgs/Image', publishers: ['/camera_node'], subscribers: [], frequency: 30.0 },
  { id: '3', name: '/tf', type: 'tf2_msgs/TFMessage', publishers: ['/talker', '/camera_node'], subscribers: ['/listener'], frequency: 100.0 },
  { id: '4', name: '/diagnostics', type: 'diagnostic_msgs/DiagnosticArray', publishers: ['/controller'], subscribers: ['/logger'], frequency: 1.0 },
  { id: '5', name: '/cmd_vel', type: 'geometry_msgs/Twist', publishers: [], subscribers: ['/controller'], frequency: 0 },
];

const mockParameters: RosParameter[] = [
  { id: '1', name: 'publish_frequency', value: 10, type: 'integer', description: 'Publishing rate in Hz', node: '/talker' },
  { id: '2', name: 'use_sim_time', value: false, type: 'boolean', description: 'Use simulation time', node: '/listener' },
  { id: '3', name: 'camera_frame_id', value: 'camera_link', type: 'string', description: 'Camera frame ID', node: '/camera_node' },
  { id: '4', name: 'debug_level', value: 2, type: 'integer', description: 'Debug verbosity level', node: '/logger' },
  { id: '5', name: 'gains', value: '[1.0, 0.5, 0.1]', type: 'array', description: 'Controller gains [P, I, D]', node: '/controller' },
];

const mockSystemStatus: SystemStatus = {
  cpuUsage: 32.5,
  memoryUsage: 45.8,
  diskUsage: 68.3,
  networkStatus: 'connected',
  rosStatus: 'running',
  uptime: 12845, // seconds
};

// Simulated API calls
export const getNodes = (): Promise<RosNode[]> => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(mockNodes), 500);
  });
};

export const getTopics = (): Promise<RosTopic[]> => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(mockTopics), 500);
  });
};

export const getParameters = (): Promise<RosParameter[]> => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(mockParameters), 500);
  });
};

export const getSystemStatus = (): Promise<SystemStatus> => {
  return new Promise((resolve) => {
    // Randomize CPU usage a bit to simulate changes
    const status = { 
      ...mockSystemStatus,
      cpuUsage: Math.min(100, Math.max(10, mockSystemStatus.cpuUsage + (Math.random() * 10 - 5))),
      memoryUsage: Math.min(100, Math.max(20, mockSystemStatus.memoryUsage + (Math.random() * 5 - 2.5))),
    };
    setTimeout(() => resolve(status), 300);
  });
};

export const startNode = (nodeId: string): Promise<boolean> => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(true), 800);
  });
};

export const stopNode = (nodeId: string): Promise<boolean> => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(true), 800);
  });
};

export const updateParameter = (paramId: string, value: any): Promise<boolean> => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(true), 600);
  });
};
