import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer
} from "recharts";

export default function TopPredictions({ data }) {
  if (!data || data.length === 0) {
    return <p className="muted">Waiting for prediction…</p>;
  }

  return (
    <ResponsiveContainer width="100%" height={260}>
      <BarChart data={data} layout="vertical">
        <XAxis type="number" />
        <YAxis
          dataKey="label"
          type="category"
          width={140}
          tick={{ fill: "#e5e7eb", fontSize: 12 }}
        />
        <Tooltip />
        <Bar dataKey="confidence" fill="#facc15" />
      </BarChart>
    </ResponsiveContainer>
  );
}