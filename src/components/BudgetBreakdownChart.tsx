import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';

interface BudgetBreakdownChartProps {
  budgetBreakdown: string[];
}

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

const BudgetBreakdownChart: React.FC<BudgetBreakdownChartProps> = ({ budgetBreakdown }) => {
  const data = budgetBreakdown.map((item, index) => {
    const [name, value] = item.split(':');
    return {
      name: name.trim(),
      value: Number.parseFloat(value.replace(/[^0-9.-]+/g, "")),
      id: `cell-${index}`, // Add a unique id for each item
    };
  });

  return (
    <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          labelLine={false}
          outerRadius={80}
          fill="#8884d8"
          dataKey="value"
        >
          {data.map((entry) => (
            <Cell key={entry.id} fill={COLORS[data.indexOf(entry) % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  );
};

export default BudgetBreakdownChart;
