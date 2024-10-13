import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';

interface BudgetBreakdownChartProps {
  budgetBreakdown: string[];
}

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

const BudgetBreakdownChart: React.FC<BudgetBreakdownChartProps> = ({ budgetBreakdown }) => {
  const data = budgetBreakdown.map(item => {
    const [name, value] = item.split(':');
    return {
      name: name.trim(),
      value: parseFloat(value.replace(/[^0-9.-]+/g, ""))
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
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  );
};

export default BudgetBreakdownChart;