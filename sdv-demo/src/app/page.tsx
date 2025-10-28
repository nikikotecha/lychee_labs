"use client";

import React, { useState, useEffect, useCallback } from 'react';
import ReactFlow, { Background, Controls, MiniMap, Node } from 'reactflow';
import 'reactflow/dist/style.css';
import { Button, Card, Group, Text, Title, Badge, Tabs, Switch, ActionIcon, Tooltip, Popover } from '@mantine/core';
import { IconSun, IconMoon, IconRefresh, IconPlayerPlay, IconActivity, IconShield, IconCpu } from '@tabler/icons-react';
import { create } from 'zustand';
import PlotComponent from '@/components/PlotComponent';
import CustomNode from '@/components/CustomNode';

// Kulfi AI Engine - Adaptive Cognition Store
interface KulfiState {
  domain: 'sdv' | 'process' | 'factory';
  phase: 'baseline' | 'change' | 'adapting' | 'stabilized';
  kpis: {
    primary: number[];
    secondary: number[];
    tertiary: number[];
  };
  adaptationProgress: number;
  tick: number;
  darkMode: boolean;
  simulationSpeed: number;
  metrics: {
    currentKPIs: { primary: number; secondary: number; tertiary: number };
    recoveryTime: number;
    regressionFailures: number;
    deltaImprovement: number;
    costSavings: number;
  };
  reset: () => void;
  injectChange: () => void;
  startAdaptation: () => void;
  setDomain: (domain: 'sdv' | 'process' | 'factory') => void;
  toggleTheme: () => void;
  setSimulationSpeed: (speed: number) => void;
  addKpis: (primary: number, secondary: number, tertiary: number) => void;
}

const domainConfigs = {
  sdv: {
    title: "SDV Adaptation",
    nodes: [
      // Sensor Layer
      { id: 'wheel_fl', data: { label: 'Wheel Sensor FL', type: 'sensor', status: 'operational', value: '2450 RPM', health: 98 }, position: { x: 50, y: 50 }, type: 'sensor' },
      { id: 'wheel_fr', data: { label: 'Wheel Sensor FR', type: 'sensor', status: 'operational', value: '2448 RPM', health: 97 }, position: { x: 150, y: 50 }, type: 'sensor' },
      { id: 'wheel_rl', data: { label: 'Wheel Sensor RL', type: 'sensor', status: 'operational', value: '2452 RPM', health: 99 }, position: { x: 50, y: 150 }, type: 'sensor' },
      { id: 'wheel_rr', data: { label: 'Wheel Sensor RR', type: 'sensor', status: 'operational', value: '2449 RPM', health: 98 }, position: { x: 150, y: 150 }, type: 'sensor' },
      
      // Fusion & Processing
      { id: 'sensor_fusion', data: { label: 'Sensor Fusion ECU', type: 'controller', status: 'operational', value: 'CPU: 34%', health: 95 }, position: { x: 300, y: 100 }, type: 'controller' },
      { id: 'central_gateway', data: { label: 'Central Gateway', type: 'controller', status: 'operational', value: 'Load: 28%', health: 96 }, position: { x: 500, y: 100 }, type: 'controller' },
      
      // Control Systems
      { id: 'brake_ecu', data: { label: 'Brake ECU', type: 'controller', status: 'operational', value: 'Response: 12ms', health: 94 }, position: { x: 200, y: 250 }, type: 'controller' },
      { id: 'abs_controller', data: { label: 'ABS Controller', type: 'actuator', status: 'operational', value: 'Pressure: 85 bar', health: 92 }, position: { x: 100, y: 350 }, type: 'actuator' },
      { id: 'steering_ecu', data: { label: 'Steering ECU', type: 'controller', status: 'operational', value: 'Torque: 3.2 Nm', health: 97 }, position: { x: 400, y: 250 }, type: 'controller' },
      { id: 'eps_controller', data: { label: 'EPS Controller', type: 'actuator', status: 'operational', value: 'Assist: 42%', health: 95 }, position: { x: 300, y: 350 }, type: 'actuator' },
      { id: 'engine_ecu', data: { label: 'Engine ECU', type: 'controller', status: 'operational', value: 'RPM: 1850', health: 98 }, position: { x: 600, y: 250 }, type: 'controller' },
      { id: 'transmission', data: { label: 'Transmission', type: 'actuator', status: 'operational', value: 'Gear: 4th', health: 94 }, position: { x: 500, y: 350 }, type: 'actuator' },
    ],
    edges: [
      // Sensor to Fusion
      { id: 'e1', source: 'wheel_fl', target: 'sensor_fusion', animated: true },
      { id: 'e2', source: 'wheel_fr', target: 'sensor_fusion', animated: true },
      { id: 'e3', source: 'wheel_rl', target: 'sensor_fusion', animated: true },
      { id: 'e4', source: 'wheel_rr', target: 'sensor_fusion', animated: true },
      
      // Fusion to Gateway
      { id: 'e5', source: 'sensor_fusion', target: 'central_gateway', animated: true },
      
      // Gateway to Control Systems
      { id: 'e6', source: 'central_gateway', target: 'brake_ecu', animated: true },
      { id: 'e7', source: 'central_gateway', target: 'steering_ecu', animated: true },
      { id: 'e8', source: 'central_gateway', target: 'engine_ecu', animated: true },
      
      // Control to Actuators
      { id: 'e9', source: 'brake_ecu', target: 'abs_controller', animated: true },
      { id: 'e10', source: 'steering_ecu', target: 'eps_controller', animated: true },
      { id: 'e11', source: 'engine_ecu', target: 'transmission', animated: true },
    ],
    kpiLabel: "Vehicle System Efficiency",
    changeLabel: "ECU Firmware Update",
    kpis: ["Response Time", "Safety Score", "Energy Efficiency"]
  },
  process: {
    title: "Process Adaptation",
    nodes: [
      // Input Sensors
      { id: 'temp_reactor', data: { label: 'Reactor Temp', type: 'sensor', status: 'operational', value: '285°C', health: 96 }, position: { x: 100, y: 50 }, type: 'sensor' },
      { id: 'pressure_feed', data: { label: 'Feed Pressure', type: 'sensor', status: 'operational', value: '12.5 bar', health: 98 }, position: { x: 50, y: 150 }, type: 'sensor' },
      { id: 'flow_inlet', data: { label: 'Inlet Flow', type: 'sensor', status: 'operational', value: '450 L/min', health: 94 }, position: { x: 150, y: 150 }, type: 'sensor' },
      
      // Control Layer
      { id: 'reactor_controller', data: { label: 'Reactor Controller', type: 'controller', status: 'operational', value: 'Setpoint: 290°C', health: 97 }, position: { x: 300, y: 100 }, type: 'controller' },
      { id: 'safety_interlock', data: { label: 'Safety Interlock', type: 'controller', status: 'operational', value: 'All Clear', health: 99 }, position: { x: 200, y: 250 }, type: 'controller' },
      { id: 'cascade_controller', data: { label: 'Cascade Controller', type: 'controller', status: 'operational', value: 'Auto Mode', health: 95 }, position: { x: 400, y: 250 }, type: 'controller' },
      
      // Output Actuators
      { id: 'heating_valve', data: { label: 'Heating Valve', type: 'actuator', status: 'operational', value: '67% Open', health: 92 }, position: { x: 500, y: 100 }, type: 'actuator' },
      { id: 'feed_valve', data: { label: 'Feed Valve', type: 'actuator', status: 'operational', value: '45% Open', health: 96 }, position: { x: 100, y: 350 }, type: 'actuator' },
      { id: 'cooling_pump', data: { label: 'Cooling Pump', type: 'actuator', status: 'operational', value: '1450 RPM', health: 89 }, position: { x: 300, y: 350 }, type: 'actuator' },
      { id: 'outlet_valve', data: { label: 'Outlet Valve', type: 'actuator', status: 'operational', value: '78% Open', health: 93 }, position: { x: 500, y: 350 }, type: 'actuator' },
    ],
    edges: [
      // Sensors to Controllers
      { id: 'e1', source: 'temp_reactor', target: 'reactor_controller', animated: true },
      { id: 'e2', source: 'pressure_feed', target: 'safety_interlock', animated: true },
      { id: 'e3', source: 'flow_inlet', target: 'cascade_controller', animated: true },
      
      // Controller Interconnections
      { id: 'e4', source: 'reactor_controller', target: 'cascade_controller', animated: true },
      { id: 'e5', source: 'safety_interlock', target: 'reactor_controller', animated: true },
      
      // Controllers to Actuators
      { id: 'e6', source: 'reactor_controller', target: 'heating_valve', animated: true },
      { id: 'e7', source: 'safety_interlock', target: 'feed_valve', animated: true },
      { id: 'e8', source: 'cascade_controller', target: 'cooling_pump', animated: true },
      { id: 'e9', source: 'cascade_controller', target: 'outlet_valve', animated: true },
      
      // Feedback Loops
      { id: 'e10', source: 'heating_valve', target: 'temp_reactor', animated: true, style: { stroke: '#6B7280', strokeDasharray: '5,5' } },
      { id: 'e11', source: 'feed_valve', target: 'pressure_feed', animated: true, style: { stroke: '#6B7280', strokeDasharray: '5,5' } },
    ],
    kpiLabel: "Process Yield Efficiency",
    changeLabel: "Sensor Drift Detected",
    kpis: ["Yield Rate", "Energy Usage", "Safety Score"]
  },
  factory: {
    title: "Factory Adaptation",
    nodes: [
      // Vision & Inspection
      { id: 'vision_station_1', data: { label: 'Vision Station 1', type: 'sensor', status: 'operational', value: '1920x1080@60fps', health: 97 }, position: { x: 50, y: 50 }, type: 'sensor' },
      { id: 'vision_station_2', data: { label: 'Vision Station 2', type: 'sensor', status: 'operational', value: '2560x1440@30fps', health: 95 }, position: { x: 200, y: 50 }, type: 'sensor' },
      { id: 'quality_scanner', data: { label: 'Quality Scanner', type: 'sensor', status: 'operational', value: '0.02mm accuracy', health: 98 }, position: { x: 350, y: 50 }, type: 'sensor' },
      
      // Processing & Control
      { id: 'vision_processor', data: { label: 'Vision Processor', type: 'controller', status: 'operational', value: 'AI Confidence: 94%', health: 96 }, position: { x: 125, y: 150 }, type: 'controller' },
      { id: 'quality_controller', data: { label: 'Quality Controller', type: 'controller', status: 'operational', value: 'Pass Rate: 98.7%', health: 99 }, position: { x: 350, y: 150 }, type: 'controller' },
      { id: 'safety_controller', data: { label: 'Safety Controller', type: 'controller', status: 'operational', value: 'Zone Clear', health: 99 }, position: { x: 500, y: 150 }, type: 'controller' },
      
      // Production Line
      { id: 'robot_arm_1', data: { label: 'Robot Arm 1', type: 'actuator', status: 'operational', value: 'Cycle: 12.3s', health: 91 }, position: { x: 100, y: 250 }, type: 'actuator' },
      { id: 'robot_arm_2', data: { label: 'Robot Arm 2', type: 'actuator', status: 'operational', value: 'Cycle: 11.8s', health: 93 }, position: { x: 250, y: 250 }, type: 'actuator' },
      { id: 'conveyor_main', data: { label: 'Main Conveyor', type: 'actuator', status: 'operational', value: '2.5 m/min', health: 87 }, position: { x: 400, y: 250 }, type: 'actuator' },
      { id: 'sorting_unit', data: { label: 'Sorting Unit', type: 'actuator', status: 'operational', value: '450 parts/hr', health: 95 }, position: { x: 550, y: 250 }, type: 'actuator' },
      
      // Material Handling
      { id: 'feeder_system', data: { label: 'Feeder System', type: 'actuator', status: 'operational', value: 'Buffer: 87%', health: 92 }, position: { x: 50, y: 350 }, type: 'actuator' },
      { id: 'packaging_unit', data: { label: 'Packaging Unit', type: 'actuator', status: 'operational', value: '12 units/min', health: 94 }, position: { x: 350, y: 350 }, type: 'actuator' },
    ],
    edges: [
      // Vision Processing Pipeline
      { id: 'e1', source: 'vision_station_1', target: 'vision_processor', animated: true },
      { id: 'e2', source: 'vision_station_2', target: 'vision_processor', animated: true },
      { id: 'e3', source: 'quality_scanner', target: 'quality_controller', animated: true },
      
      // Control Coordination
      { id: 'e4', source: 'vision_processor', target: 'robot_arm_1', animated: true },
      { id: 'e5', source: 'vision_processor', target: 'robot_arm_2', animated: true },
      { id: 'e6', source: 'quality_controller', target: 'sorting_unit', animated: true },
      { id: 'e7', source: 'safety_controller', target: 'conveyor_main', animated: true },
      
      // Production Flow
      { id: 'e8', source: 'feeder_system', target: 'robot_arm_1', animated: true },
      { id: 'e9', source: 'robot_arm_1', target: 'conveyor_main', animated: true },
      { id: 'e10', source: 'robot_arm_2', target: 'conveyor_main', animated: true },
      { id: 'e11', source: 'conveyor_main', target: 'sorting_unit', animated: true },
      { id: 'e12', source: 'sorting_unit', target: 'packaging_unit', animated: true },
      
      // Safety Interlocks
      { id: 'e13', source: 'safety_controller', target: 'robot_arm_1', animated: true, style: { stroke: '#F59E0B', strokeWidth: 2 } },
      { id: 'e14', source: 'safety_controller', target: 'robot_arm_2', animated: true, style: { stroke: '#F59E0B', strokeWidth: 2 } },
    ],
    kpiLabel: "Production Efficiency",
    changeLabel: "Camera Calibration Change",
    kpis: ["Throughput", "Quality Rate", "OEE Score"]
  }
};

const useKulfiStore = create<KulfiState>((set, get) => ({
  domain: 'sdv',
  phase: 'baseline',
  kpis: {
    primary: [0.92],
    secondary: [0.89],
    tertiary: [0.94]
  },
  adaptationProgress: 0,
  tick: 0,
  darkMode: true,
  simulationSpeed: 1,
  metrics: {
    currentKPIs: { primary: 0.92, secondary: 0.89, tertiary: 0.94 },
    recoveryTime: 0,
    regressionFailures: 0,
    deltaImprovement: 0,
    costSavings: 0,
  },
  reset: () => set({ 
    phase: 'baseline', 
    kpis: { primary: [0.92], secondary: [0.89], tertiary: [0.94] },
    tick: 0, 
    adaptationProgress: 0,
    metrics: { 
      currentKPIs: { primary: 0.92, secondary: 0.89, tertiary: 0.94 },
      recoveryTime: 0, 
      regressionFailures: 0, 
      deltaImprovement: 0,
      costSavings: 0 
    }
  }),
  injectChange: () => set({ phase: 'change' }),
  startAdaptation: () => set({ phase: 'adapting', adaptationProgress: 0 }),
  setDomain: (domain) => set({ 
    domain, 
    phase: 'baseline', 
    kpis: { primary: [0.92], secondary: [0.89], tertiary: [0.94] },
    tick: 0 
  }),
  toggleTheme: () => set((state) => ({ darkMode: !state.darkMode })),
  setSimulationSpeed: (speed) => set({ simulationSpeed: speed }),
  addKpis: (primary: number, secondary: number, tertiary: number) => set((s) => ({ 
    kpis: { 
      primary: [...s.kpis.primary, primary],
      secondary: [...s.kpis.secondary, secondary],
      tertiary: [...s.kpis.tertiary, tertiary]
    },
    tick: s.tick + 1,
    metrics: { ...s.metrics, currentKPIs: { primary, secondary, tertiary } }
  })),
}));

export default function KulfiAIDemo() {
  const { 
    domain, phase, kpis, adaptationProgress, darkMode, simulationSpeed, metrics,
    injectChange, startAdaptation, reset, setDomain, toggleTheme, setSimulationSpeed, addKpis 
  } = useKulfiStore();
  
  const currentConfig = domainConfigs[domain];
  const [nodes, setNodes] = useState(() => 
    currentConfig.nodes.map(node => ({
      ...node,
      type: 'custom',
    }))
  );

  const nodeTypes = {
    custom: CustomNode,
  };

  const edges = currentConfig.edges;

  // Simulate KPI evolution with Kulfi's adaptive behavior
  useEffect(() => {
    const interval = setInterval(() => {
      const currentState = useKulfiStore.getState();
      let primary = 0.92, secondary = 0.89, tertiary = 0.94;
      
      if (currentState.phase === 'baseline') {
        primary = 0.90 + Math.random() * 0.04;
        secondary = 0.87 + Math.random() * 0.04;
        tertiary = 0.92 + Math.random() * 0.04;
      } else if (currentState.phase === 'change') {
        primary = 0.45 + Math.random() * 0.1;
        secondary = 0.42 + Math.random() * 0.1;
        tertiary = 0.48 + Math.random() * 0.1;
      } else if (currentState.phase === 'adapting') {
        const lastPrimary = currentState.kpis.primary.at(-1) || 0.5;
        const lastSecondary = currentState.kpis.secondary.at(-1) || 0.5;
        const lastTertiary = currentState.kpis.tertiary.at(-1) || 0.5;
        const progress = currentState.adaptationProgress / 100;
        
        primary = lastPrimary + (0.08 * progress) + Math.random() * 0.02;
        secondary = lastSecondary + (0.07 * progress) + Math.random() * 0.02;
        tertiary = lastTertiary + (0.06 * progress) + Math.random() * 0.02;
        
        // Update adaptation progress
        if (currentState.adaptationProgress < 100) {
          useKulfiStore.setState({ adaptationProgress: currentState.adaptationProgress + 2 });
        } else {
          useKulfiStore.setState({ 
            phase: 'stabilized',
            metrics: {
              ...currentState.metrics,
              recoveryTime: 47,
              deltaImprovement: 62,
              costSavings: 125000
            }
          });
        }
      } else if (currentState.phase === 'stabilized') {
        primary = 0.97 + Math.random() * 0.02;
        secondary = 0.94 + Math.random() * 0.02;
        tertiary = 0.96 + Math.random() * 0.02;
      }
      
      addKpis(
        Math.min(1, Math.max(0, primary)),
        Math.min(1, Math.max(0, secondary)),
        Math.min(1, Math.max(0, tertiary))
      );
    }, 500 / simulationSpeed);
    
    return () => clearInterval(interval);
  }, [phase, simulationSpeed, addKpis]);

  // Update nodes when domain or phase changes
  useEffect(() => {
    setNodes(currentConfig.nodes.map(node => ({
      ...node,
      type: 'custom',
      data: {
        ...node.data,
        status: phase === 'baseline' ? 'operational' : 
                phase === 'change' ? 'warning' : 
                phase === 'adapting' ? 'adapting' : 'operational'
      }
    })));
  }, [domain, phase, currentConfig]);

  return (
    <div className={`min-h-screen transition-colors duration-300 ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}>
      {/* Header Bar */}
      <header className="sticky top-0 z-50 border-b border-gray-700 bg-gray-800/90 backdrop-blur-sm px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <img 
                src="/kulfi-logo.svg" 
                alt="Kulfi AI Logo" 
                className="w-8 h-8 hover:scale-110 transition-transform duration-200"
              />
              <div>
                <h1 className="text-xl font-bold text-white">Kulfi AI</h1>
                <p className="text-xs text-gray-400">Adaptive Cognition Engine</p>
              </div>
            </div>
            <Badge variant="outline" color="gray" size="sm">
              Powered by Lychee Labs · Cognitive Play Framework™
            </Badge>
          </div>
          
          <div className="flex items-center space-x-4">
            <Text size="sm" c="dimmed">Simulation Speed: {simulationSpeed}×</Text>
            <input 
              type="range" 
              min="1" 
              max="5" 
              value={simulationSpeed}
              onChange={(e) => setSimulationSpeed(Number(e.target.value))}
              className="w-20"
            />
            <Switch
              checked={darkMode}
              onChange={toggleTheme}
              onLabel={<IconSun size={16} />}
              offLabel={<IconMoon size={16} />}
            />
            <Button variant="subtle" onClick={reset} leftSection={<IconRefresh size={16} />}>
              Reset All
            </Button>
          </div>
        </div>
      </header>

      {/* Navigation Tabs */}
      <div className="px-6 pt-4">
        <Tabs value={domain} onChange={(value) => setDomain(value as any)}>
          <Tabs.List>
            <Tabs.Tab value="sdv">SDV Adaptation</Tabs.Tab>
            <Tabs.Tab value="process">Process Adaptation</Tabs.Tab>
            <Tabs.Tab value="factory">Factory Adaptation</Tabs.Tab>
          </Tabs.List>
        </Tabs>
      </div>

      {/* Main Content */}
      <div className="px-6 py-6">
        <div className="mb-6">
          <Title order={2} className="mb-2">{currentConfig.title}</Title>
          <Text c="dimmed" size="sm">
            Real-time cognitive adaptation for {domain.toUpperCase()} subsystems. 
            {phase === 'adapting' && ` Progress: ${adaptationProgress}%`}
          </Text>
        </div>

        {/* Control Buttons */}
        <Group className="mb-6">
          <Button 
            color="blue" 
            onClick={injectChange} 
            disabled={phase !== 'baseline' && phase !== 'stabilized'}
            leftSection={<IconPlayerPlay size={16} />}
          >
            Inject {currentConfig.changeLabel}
          </Button>
          <Button 
            color="red" 
            onClick={startAdaptation} 
            disabled={phase !== 'change'}
            variant={phase === 'change' ? 'filled' : 'outline'}
          >
            Start Kulfi Adaptation
          </Button>
          <Badge 
            color={
              phase === 'baseline' ? 'gray' : 
              phase === 'change' ? 'orange' : 
              phase === 'adapting' ? 'red' : 'teal'
            }
            size="lg"
          >
            {phase.toUpperCase()}
          </Badge>
        </Group>

        {/* Two-column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          {/* Left Panel - Subsystem Graph (60%) */}
          <div className="lg:col-span-3">
            <Card shadow="sm" padding="md" className="h-96">
              <Text fw={500} mb="sm">Subsystem Dependency Graph</Text>
              <Text size="xs" c="dimmed" mb="md">
                Each node represents a controller, sensor, or actuator. Watch the credit assignment propagation.
              </Text>
              <div className="h-80">
                <ReactFlow 
                  nodes={nodes} 
                  edges={edges} 
                  nodeTypes={nodeTypes}
                  fitView
                  nodesDraggable={false}
                  nodesConnectable={false}
                  elementsSelectable={false}
                  className="bg-gray-50 rounded-lg"
                >
                  <MiniMap 
                    nodeColor={(node) => {
                      if (node.data?.type === 'sensor') return '#3B82F6';
                      if (node.data?.type === 'controller') return '#8B5CF6';
                      return '#10B981';
                    }}
                  />
                  <Controls />
                  <Background gap={12} size={1} color="#E5E7EB" />
                </ReactFlow>
              </div>
            </Card>
          </div>

          {/* Right Panel - Multi-KPI Charts (40%) */}
          <div className="lg:col-span-2">
            <Card shadow="sm" padding="md" className="h-96">
              <Text fw={500} mb="sm">{currentConfig.kpiLabel}</Text>
              <Text size="xs" c="dimmed" mb="md">
                Multi-dimensional performance optimization across {currentConfig.kpis.join(', ').toLowerCase()}.
              </Text>
              <PlotComponent
                data={[
                  {
                    y: kpis.primary,
                    name: currentConfig.kpis[0],
                    type: 'scatter',
                    mode: 'lines+markers',
                    line: { 
                      shape: 'spline',
                      color: '#8A2D38',
                      width: 3
                    },
                    marker: { color: '#8A2D38', size: 6 },
                  },
                  {
                    y: kpis.secondary,
                    name: currentConfig.kpis[1],
                    type: 'scatter',
                    mode: 'lines',
                    line: { 
                      shape: 'spline',
                      color: '#00A8A8',
                      width: 2
                    },
                  },
                  {
                    y: kpis.tertiary,
                    name: currentConfig.kpis[2],
                    type: 'scatter',
                    mode: 'lines',
                    line: { 
                      shape: 'spline',
                      color: '#F59E0B',
                      width: 2
                    },
                  },
                ]}
                layout={{
                  height: 280,
                  margin: { t: 20, l: 40, r: 20, b: 40 },
                  yaxis: { 
                    title: { text: 'Normalized Performance' },
                    range: [0, 1],
                    gridcolor: '#374151'
                  },
                  xaxis: { 
                    title: { text: 'Cognitive Episodes' },
                    gridcolor: '#374151'
                  },
                  plot_bgcolor: 'transparent',
                  paper_bgcolor: 'transparent',
                  font: { color: darkMode ? '#E5E7EB' : '#374151' },
                  showlegend: true,
                  legend: { orientation: 'h', y: -0.1 }
                }}
              />
            </Card>
          </div>
        </div>

        {/* Enhanced Metrics Cards */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mt-6">
          <Card shadow="sm" p="md" radius="md">
            <Text size="sm" c="dimmed">Cognitive Phase</Text>
            <Title order={4}>{phase}</Title>
            <Badge 
              color={
                phase === 'baseline' ? 'gray' : 
                phase === 'change' ? 'orange' : 
                phase === 'adapting' ? 'red' : 'teal'
              }
              variant="light"
              size="xs"
              mt={4}
            >
              {phase === 'adapting' ? `${adaptationProgress}%` : 'Complete'}
            </Badge>
          </Card>
          
          <Card shadow="sm" p="md" radius="md">
            <Text size="sm" c="dimmed">Primary KPI</Text>
            <Title order={4}>{metrics.currentKPIs.primary.toFixed(3)}</Title>
            <Text size="xs" c={metrics.currentKPIs.primary > 0.9 ? 'teal' : 'red'}>
              {metrics.currentKPIs.primary > 0.9 ? '+Optimal' : 'Degraded'}
            </Text>
          </Card>
          
          <Card shadow="sm" p="md" radius="md">
            <Text size="sm" c="dimmed">Recovery Time</Text>
            <Title order={4}>{phase === 'stabilized' ? `${metrics.recoveryTime}s` : '—'}</Title>
            <Text size="xs" c="teal">
              {phase === 'stabilized' ? `−${metrics.deltaImprovement}%` : '—'}
            </Text>
          </Card>
          
          <Card shadow="sm" p="md" radius="md">
            <Text size="sm" c="dimmed">Cost Savings</Text>
            <Title order={4}>{phase === 'stabilized' ? `$${(metrics.costSavings/1000).toFixed(0)}k` : '—'}</Title>
            <Text size="xs" c="green">
              {phase === 'stabilized' ? 'Annual' : '—'}
            </Text>
          </Card>
          
          <Card shadow="sm" p="md" radius="md">
            <Text size="sm" c="dimmed">System Health</Text>
            <Title order={4}>
              {Math.round((metrics.currentKPIs.primary + metrics.currentKPIs.secondary + metrics.currentKPIs.tertiary) / 3 * 100)}%
            </Title>
            <Text size="xs" c="blue">
              Multi-domain
            </Text>
          </Card>
        </div>
      </div>

      {/* Footer */}
      <footer className="mt-12 border-t border-gray-700 bg-gray-800/50 px-6 py-4">
        <div className="flex justify-between items-center text-sm text-gray-400">
          <span>© 2025 Lychee Labs - Born in OxBridge × Imperial · Built for the World</span>
          <span>In collaboration with Siemens Digital Industries</span>
        </div>
      </footer>
    </div>
  );
}