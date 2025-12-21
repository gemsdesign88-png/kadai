"use client"

interface BarChartProps {
  data: Array<{ name: string; value: number }>;
  height?: number;
  maxValue?: number;
}

export function SimpleBarChart({ data, height = 300, maxValue }: BarChartProps) {
  const max = maxValue || Math.max(...data.map(d => d.value), 1);
  const colors = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899'];
  
  return (
    <div style={{ height, display: 'flex', alignItems: 'flex-end', gap: '8px', padding: '12px', borderRadius: '8px' }}>
      {data.map((item, idx) => (
        <div key={item.name} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}>
          <div style={{ fontSize: '12px', color: '#666', textAlign: 'center' }}>
            {item.value.toLocaleString()}
          </div>
          <div
            style={{
              width: '100%',
              height: `${(item.value / max) * (height - 60)}px`,
              backgroundColor: colors[idx % colors.length],
              borderRadius: '4px 4px 0 0',
              minHeight: item.value > 0 ? '4px' : '0px',
              transition: 'all 0.3s ease'
            }}
          />
          <div style={{ fontSize: '12px', color: '#666', textAlign: 'center', wordBreak: 'break-word', width: '100%' }}>
            {item.name.slice(0, 8)}
          </div>
        </div>
      ))}
    </div>
  );
}

interface LineChartProps {
  data: Array<{ name: string; value: number }>;
  height?: number;
}

export function SimpleLineChart({ data, height = 250 }: LineChartProps) {
  if (data.length === 0) return <div style={{ height }}>No data</div>;

  const max = Math.max(...data.map(d => d.value), 1);
  const points = data.map((item, idx) => ({
    x: (idx / (data.length - 1 || 1)) * 100,
    y: 100 - (item.value / max) * 85,
    value: item.value
  }));

  const pathD = points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x}% ${p.y}%`).join(' ');

  return (
    <svg viewBox="0 0 100 100" style={{ height, width: '100%', aspectRatio: 'auto' } as any}>
      <defs>
        <linearGradient id="grad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" style={{ stopColor: '#3b82f6', stopOpacity: 0.3 }} />
          <stop offset="100%" style={{ stopColor: '#3b82f6', stopOpacity: 0.05 }} />
        </linearGradient>
      </defs>
      <path d={pathD} stroke="#3b82f6" strokeWidth="0.5" fill="none" />
      <path d={`${pathD} L 100 100 L 0 100 Z`} fill="url(#grad)" />
      {points.map((p, i) => (
        <circle key={i} cx={`${p.x}%`} cy={`${p.y}%`} r="1" fill="#3b82f6" />
      ))}
    </svg>
  );
}

interface PieChartProps {
  data: Array<{ name: string; value: number }>;
  size?: number;
}

export function SimplePieChart({ data, size = 200 }: PieChartProps) {
  const total = data.reduce((sum, item) => sum + item.value, 0);
  const colors = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899', '#14b8a6', '#f97316'];
  
  let currentAngle = 0;
  const segments = data.map((item, idx) => {
    const sliceAngle = (item.value / total) * 360;
    const startAngle = currentAngle;
    const endAngle = currentAngle + sliceAngle;
    
    const start = {
      x: Math.cos((startAngle - 90) * Math.PI / 180),
      y: Math.sin((startAngle - 90) * Math.PI / 180),
    };
    const end = {
      x: Math.cos((endAngle - 90) * Math.PI / 180),
      y: Math.sin((endAngle - 90) * Math.PI / 180),
    };
    
    const largeArc = sliceAngle > 180 ? 1 : 0;
    const path = `M 0 0 L ${start.x} ${start.y} A 1 1 0 ${largeArc} 1 ${end.x} ${end.y} Z`;
    
    currentAngle = endAngle;
    
    return { path, color: colors[idx % colors.length], name: item.name, value: item.value };
  });

  return (
    <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
      <svg width={size} height={size} viewBox="-1.2 -1.2 2.4 2.4">
        {segments.map((seg, i) => (
          <path key={i} d={seg.path} fill={seg.color} stroke="white" strokeWidth="0.04" />
        ))}
      </svg>
      <div style={{ fontSize: '12px' }}>
        {segments.map((seg, i) => (
          <div key={i} style={{ display: 'flex', gap: '8px', marginBottom: '4px', alignItems: 'center' }}>
            <div style={{ width: '12px', height: '12px', backgroundColor: seg.color, borderRadius: '2px' }} />
            <span style={{ color: '#666' }}>{seg.name}: {seg.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
