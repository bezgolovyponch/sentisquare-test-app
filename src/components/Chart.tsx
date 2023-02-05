import React, { useCallback, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Sector,
  PieChart,
  Pie,
} from "recharts";

export default function Chart({ data }) {
  const removedDuplicities = data
    .filter(
      (v, i, a) =>
        a.findIndex((v2) =>
          ["entityId", "matchedText"].every((k) => v2[k] === v[k])
        ) === i
    )
    .sort(({ confidenceScore: a }, { confidenceScore: b }) => b - a);
  return (
    <ResponsiveContainer width="100%" height={400}>
      <BarChart
        data={removedDuplicities}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="entityId" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="confidenceScore" fill="#8884d8" />
        <Bar dataKey="relevanceScore" fill="#82ca9d" />
      </BarChart>
    </ResponsiveContainer>
  );
}

const renderActiveShape = (props: any) => {
  const RADIAN = Math.PI / 180;
  const {
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    startAngle,
    endAngle,
    fill,
    payload,
    percent,
  } = props;
  const sin = Math.sin(-RADIAN * midAngle);
  const cos = Math.cos(-RADIAN * midAngle);
  const sx = cx + (outerRadius + 10) * cos;
  const sy = cy + (outerRadius + 10) * sin;
  const mx = cx + (outerRadius + 30) * cos;
  const my = cy + (outerRadius + 30) * sin;
  const ex = mx + (cos >= 0 ? 1 : -1) * 22;
  const ey = my;
  const textAnchor = cos >= 0 ? "start" : "end";

  return (
    <g>
      <text x={cx} y={cy} dy={8} textAnchor="middle" fill={fill}>
        {payload.entityId}
      </text>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />
      <Sector
        cx={cx}
        cy={cy}
        startAngle={startAngle}
        endAngle={endAngle}
        innerRadius={outerRadius + 6}
        outerRadius={outerRadius + 10}
        fill={fill}
      />
      <path
        d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`}
        stroke={fill}
        fill="none"
      />
      <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
      <text
        x={ex + (cos >= 0 ? 1 : -1) * 12}
        y={ey}
        dy={18}
        textAnchor={textAnchor}
        fill="#000000"
      >
        {`Rate ${(percent * 100).toFixed(2)}%`}
      </text>
    </g>
  );
};

export function CustomPieChart({ data }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const onPieEnter = useCallback(
    (_, index) => {
      setActiveIndex(index);
    },
    [setActiveIndex]
  );
  const countDuplicities = Object.values(
    data.reduce((a, { entityId, confidenceScore }) => {
      let key = `${entityId}`;
      a[key] = a[key] || { entityId, confidenceScore, count: 0 };
      a[key].count++;
      return a;
    }, {})
  );

  return (
    <ResponsiveContainer width="100%" height={420}>
      <PieChart 
        margin={{
          top: 5,
          left: 350,
          bottom: 5,
        }}
      >
        <Pie

          activeIndex={activeIndex}
          activeShape={renderActiveShape}
          data={countDuplicities}
          cx={200}
          cy={200}
          innerRadius={100}
          outerRadius={150}
          fill="#8884d8"
          dataKey="count"
          onMouseEnter={onPieEnter}
        />
      </PieChart>
    </ResponsiveContainer>
  );
}
