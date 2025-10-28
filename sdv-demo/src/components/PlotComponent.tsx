'use client';

import dynamic from 'next/dynamic';
import { Loader, Alert } from '@mantine/core';
import { IconChartLine } from '@tabler/icons-react';

const Plot = dynamic(() => import('react-plotly.js'), { 
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center h-64">
      <div className="text-center">
        <Loader size="md" color="red" />
        <p className="text-sm text-gray-500 mt-2">Loading Kulfi Analytics...</p>
      </div>
    </div>
  )
});

interface PlotComponentProps {
  data: any[];
  layout: any;
}

export default function PlotComponent({ data, layout }: PlotComponentProps) {
  try {
    return (
      <div className="kulfi-chart-container">
        <Plot 
          data={data} 
          layout={{
            ...layout,
            showlegend: false,
            responsive: true,
          }} 
          config={{
            displayModeBar: false,
            responsive: true,
            doubleClick: false,
            scrollZoom: false,
          }}
          style={{ width: '100%', height: '100%' }}
        />
      </div>
    );
  } catch (error) {
    return (
      <Alert 
        icon={<IconChartLine size={16} />} 
        title="Chart Error" 
        color="red"
        variant="light"
      >
        Unable to render analytics chart. Please refresh the page.
      </Alert>
    );
  }
}
