"use client";

import React, { useState, useEffect } from 'react';
import ReactFlow, { Background, Controls, MiniMap } from 'reactflow';
import 'reactflow/dist/style.css';
import { Button, Card, Group, Text, Title } from '@mantine/core';
import { create } from 'zustand';
import PlotComponent from '@/components/PlotComponent';

// Zustand store for simulation state
interface SimState {
  phase: 'baseline' | 'fault' | 'recovery';
  kpi: number[];
  tick: number;
  reset: () => void;
  injectFault: () => void;
  startRecovery: () => void;
  addKpi: (val: number) => void;
}

const useSimStore = create<SimState>((set) => ({
  phase: 'baseline',
  kpi: [],
  tick: 0,
  reset: () => set({ phase: 'baseline', kpi: [], tick: 0 }),
  injectFault: () => set({ phase: 'fault' }),
  startRecovery: () => set({ phase: 'recovery' }),
  addKpi: (val: number) => set((s) => ({ kpi: [...s.kpi, val], tick: s.tick + 1 })),
}));

export default function SDVDemo() {
  const { phase, kpi, injectFault, startRecovery, addKpi, reset } = useSimStore();
  const [nodes, setNodes] = useState([
    { id: '1', data: { label: 'Sensor A' }, position: { x: 50, y: 50 }, style: { background: '#22c55e', color: 'white' } },
    { id: '2', data: { label: 'ECU B' }, position: { x: 250, y: 50 }, style: { background: '#22c55e', color: 'white' } },
    { id: '3', data: { label: 'Controller C' }, position: { x: 450, y: 50 }, style: { background: '#22c55e', color: 'white' } },
  ]);

  const edges = [
    { id: 'e1-2', source: '1', target: '2', animated: true },
    { id: 'e2-3', source: '2', target: '3', animated: true },
  ];

  // Simulate KPI evolution
  useEffect(() => {
    const interval = setInterval(() => {
      const currentState = useSimStore.getState();
      let newVal = 1.0;
      if (currentState.phase === 'baseline') newVal = 0.95 + Math.random() * 0.05;
      if (currentState.phase === 'fault') newVal = 0.5 + Math.random() * 0.1;
      if (currentState.phase === 'recovery') {
        const lastKpi = currentState.kpi.at(-1) || 0.5;
        newVal = lastKpi + 0.05 * (1 - lastKpi);
      }
      addKpi(newVal);
    }, 500);
    return () => clearInterval(interval);
  }, [phase, addKpi]);

  // Change node colors based on phase
  useEffect(() => {
    if (phase === 'fault') {
      setNodes((ns) => ns.map((n) => ({ ...n, style: { ...n.style, background: '#ef4444' } })));
    } else if (phase === 'recovery') {
      setNodes((ns) => ns.map((n) => ({ ...n, style: { ...n.style, background: '#eab308' } })));
    } else if (phase === 'baseline') {
      setNodes((ns) => ns.map((n) => ({ ...n, style: { ...n.style, background: '#22c55e' } })));
    }
  }, [phase]);

  return (
    <div className="p-4 space-y-4">
      <Title order={2}>SDV Subsystem Adaptation Demo</Title>

      <Group>
        <Button color="blue" onClick={injectFault} disabled={phase !== 'baseline'}>
          Inject Firmware Change
        </Button>
        <Button color="orange" onClick={startRecovery} disabled={phase !== 'fault'}>
          Start Adaptation
        </Button>
        <Button variant="outline" onClick={reset}>Reset</Button>
      </Group>

      <div className="grid grid-cols-2 gap-4">
        <Card shadow="sm" padding="md">
          <Text fw={500} mb="sm">Subsystem Dependency Graph</Text>
          <div style={{ height: 300 }}>
            <ReactFlow nodes={nodes} edges={edges} fitView>
              <MiniMap />
              <Controls />
              <Background gap={12} size={1} />
            </ReactFlow>
          </div>
        </Card>

        <Card shadow="sm" padding="md">
          <Text fw={500} mb="sm">Performance KPI Over Time</Text>
          <PlotComponent
            data={[
              {
                y: kpi,
                type: 'scatter',
                mode: 'lines+markers',
                line: { shape: 'spline' },
                marker: { color: phase === 'fault' ? 'red' : phase === 'recovery' ? 'orange' : 'green' },
              },
            ]}
            layout={{
              height: 300,
              margin: { t: 20, l: 40, r: 20, b: 40 },
              yaxis: { title: { text: 'Normalized KPI' } },
              xaxis: { title: { text: 'Episode' } },
            }}
          />
        </Card>
      </div>

      <Group>
        <Card shadow="sm" p="md" radius="md">
          <Text size="sm">Phase</Text>
          <Title order={4}>{phase}</Title>
        </Card>
        <Card shadow="sm" p="md" radius="md">
          <Text size="sm">Current KPI</Text>
          <Title order={4}>{kpi.at(-1)?.toFixed(2) ?? '--'}</Title>
        </Card>
      </Group>
    </div>
  );
}