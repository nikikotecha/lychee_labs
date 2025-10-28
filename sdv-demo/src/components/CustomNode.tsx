'use client';

import React, { useState } from 'react';
import { Handle, Position } from 'reactflow';
import { Popover, Text, Badge, Group, Stack } from '@mantine/core';
import { IconActivity, IconShield, IconCpu, IconEye } from '@tabler/icons-react';

interface CustomNodeProps {
  data: {
    label: string;
    type: 'sensor' | 'controller' | 'actuator';
    status: string;
    value: string;
    health: number;
  };
  selected?: boolean;
}

const CustomNode = ({ data }: CustomNodeProps) => {
  const [isHovered, setIsHovered] = useState(false);

  const getNodeIcon = (type: string) => {
    switch (type) {
      case 'sensor': return <IconEye size={14} />;
      case 'controller': return <IconCpu size={14} />;
      case 'actuator': return <IconActivity size={14} />;
      default: return <IconActivity size={14} />;
    }
  };

  const getHealthColor = (health: number) => {
    if (health >= 95) return 'teal';
    if (health >= 85) return 'yellow';
    return 'red';
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'operational': return 'teal';
      case 'warning': return 'yellow';
      case 'fault': return 'red';
      case 'adapting': return 'orange';
      default: return 'gray';
    }
  };

  return (
    <Popover 
      width={280} 
      position="top" 
      withArrow 
      shadow="lg"
      opened={isHovered}
      onChange={setIsHovered}
    >
      <Popover.Target>
        <div
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className="px-3 py-2 rounded-lg border-2 bg-white shadow-md hover:shadow-lg transition-all duration-200 cursor-pointer min-w-[120px]"
          style={{
            borderColor: getStatusColor(data.status) === 'teal' ? '#00A8A8' : 
                        getStatusColor(data.status) === 'yellow' ? '#F59E0B' : 
                        getStatusColor(data.status) === 'red' ? '#EF4444' : '#6B7280'
          }}
        >
          <Group gap={6} align="center">
            {getNodeIcon(data.type)}
            <Text size="sm" fw={600} className="text-gray-800">
              {data.label}
            </Text>
          </Group>
          
          {/* Connection handles */}
          <Handle
            type="target"
            position={Position.Left}
            className="w-2 h-2 !bg-gray-400"
          />
          <Handle
            type="source"
            position={Position.Right}
            className="w-2 h-2 !bg-gray-400"
          />
        </div>
      </Popover.Target>

      <Popover.Dropdown className="!p-4">
        <Stack gap={12}>
          {/* Header */}
          <Group justify="between" align="flex-start">
            <div>
              <Text fw={600} size="sm" className="text-gray-800">
                {data.label}
              </Text>
              <Badge 
                color={getStatusColor(data.status)} 
                variant="light" 
                size="xs"
                leftSection={<IconShield size={10} />}
              >
                {data.status.toUpperCase()}
              </Badge>
            </div>
            <Badge 
              color={getHealthColor(data.health)} 
              variant="filled" 
              size="sm"
            >
              {data.health}% Health
            </Badge>
          </Group>

          {/* Current Value */}
          <Group gap={8}>
            <Text size="xs" c="dimmed" fw={500}>Current Value:</Text>
            <Text size="sm" fw={600} className="font-mono">
              {data.value}
            </Text>
          </Group>

          {/* Executive Metrics */}
          <div className="bg-gray-50 rounded-md p-3">
            <Text size="xs" fw={600} c="dimmed" mb={8}>EXECUTIVE METRICS</Text>
            <Stack gap={4}>
              <Group justify="between">
                <Text size="xs" c="dimmed">Uptime:</Text>
                <Text size="xs" fw={600}>99.7%</Text>
              </Group>
              <Group justify="between">
                <Text size="xs" c="dimmed">Performance:</Text>
                <Text size="xs" fw={600} c={data.health > 95 ? 'teal' : 'orange'}>
                  {data.health > 95 ? 'Optimal' : 'Degraded'}
                </Text>
              </Group>
              <Group justify="between">
                <Text size="xs" c="dimmed">Cost Impact:</Text>
                <Text size="xs" fw={600} c="green">
                  ${data.health > 90 ? '0' : '2.4k'}/day
                </Text>
              </Group>
            </Stack>
          </div>

          {/* Type-specific metrics */}
          {data.type === 'sensor' && (
            <Group gap={8}>
              <Text size="xs" c="dimmed">Signal Quality:</Text>
              <Badge color="teal" variant="light" size="xs">Excellent</Badge>
            </Group>
          )}
          
          {data.type === 'controller' && (
            <Group gap={8}>
              <Text size="xs" c="dimmed">Processing Load:</Text>
              <Badge color="blue" variant="light" size="xs">Normal</Badge>
            </Group>
          )}
          
          {data.type === 'actuator' && (
            <Group gap={8}>
              <Text size="xs" c="dimmed">Wear Level:</Text>
              <Badge color="yellow" variant="light" size="xs">Low</Badge>
            </Group>
          )}
        </Stack>
      </Popover.Dropdown>
    </Popover>
  );
};

export default CustomNode;
