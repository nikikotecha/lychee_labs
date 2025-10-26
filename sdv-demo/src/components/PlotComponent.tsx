'use client';

import dynamic from 'next/dynamic';
import { Loader } from '@mantine/core';

const Plot = dynamic(() => import('react-plotly.js'), { 
  ssr: false,
  loading: () => <Loader size="sm" />
});

interface PlotComponentProps {
  data: any[];
  layout: any;
}

export default function PlotComponent({ data, layout }: PlotComponentProps) {
  return <Plot data={data} layout={layout} />;
}
