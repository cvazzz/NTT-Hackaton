
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

interface PaymentData {
  month: string;
  capital: number;
  interest: number;
}

interface LoanRepaymentChartProps {
  data: PaymentData[];
  currency: string;
}

export function LoanRepaymentChart({ data, currency }: LoanRepaymentChartProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Plan de Pagos</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={data}
              margin={{
                top: 10,
                right: 10,
                left: 0,
                bottom: 0,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis 
                dataKey="month" 
                tick={{ fontSize: 12 }}
              />
              <YAxis 
                tickFormatter={(value) => `${value} ${currency}`}
                tick={{ fontSize: 12 }}
              />
              <Tooltip 
                formatter={(value, name) => [
                  `${value} ${currency}`, 
                  name === "capital" ? "Capital" : "Interés"
                ]}
                labelFormatter={(label) => `Mes: ${label}`}
              />
              <Area 
                type="monotone" 
                dataKey="capital" 
                stackId="1" 
                stroke="#8884d8" 
                fill="#8884d8" 
                name="Capital"
              />
              <Area 
                type="monotone" 
                dataKey="interest" 
                stackId="1" 
                stroke="#82ca9d" 
                fill="#82ca9d" 
                name="Interés"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
        <div className="flex justify-between mt-4 text-sm">
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 bg-[#8884d8] rounded-full"></div>
            <span>Capital</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 bg-[#82ca9d] rounded-full"></div>
            <span>Interés</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
