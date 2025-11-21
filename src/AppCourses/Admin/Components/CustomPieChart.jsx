import React from "react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from "recharts";
import CustomTitle from "../../../Collaboration/Pages/Instructors/Form/Components/CustomTitle";
import CustomTooltip from "./CustomTooltip";
import CustomLegend from "./CustomLegend";

const CustomPieChart = ({ data = [], colors = [] }) => {
  return (
    <ResponsiveContainer width="100%" height={325}>
        <PieChart>
            <Pie
            data={data}
            dataKey="count"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={130}
            innerRadius={100}
            labelLine={false}
            label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
            >
            {data.map((entry, index) => (
                <Cell
                key={`cell-${index}`}
                fill={colors[index % colors.length] || "#8884d8"}
                />
            ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
            <Legend content={<CustomLegend />} />
        </PieChart>
    </ResponsiveContainer>
  );
};

export default CustomPieChart;
