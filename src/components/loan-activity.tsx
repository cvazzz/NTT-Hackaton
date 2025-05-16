
import React from "react";
import { Avatar } from "@/components/ui/avatar";
import { User } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface ActivityItem {
  id: number;
  user: string;
  action: string;
  amount?: number;
  currency?: string;
  date: string;
}

interface LoanActivityProps {
  activities: ActivityItem[];
}

export function LoanActivity({ activities }: LoanActivityProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Actividad Reciente</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.length > 0 ? (
            activities.map((activity) => (
              <div key={activity.id} className="flex items-start gap-3 pb-3 border-b last:border-b-0 last:pb-0">
                <Avatar>
                  <div className="bg-primary text-primary-foreground w-8 h-8 rounded-full flex items-center justify-center">
                    <User className="h-4 w-4" />
                  </div>
                </Avatar>
                <div className="space-y-1">
                  <div className="flex items-center gap-1">
                    <span className="font-medium">{activity.user}</span>
                    <span className="text-sm text-muted-foreground">{activity.action}</span>
                    {activity.amount && (
                      <span className="font-medium">
                        {activity.amount} {activity.currency}
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground">{activity.date}</p>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-muted-foreground py-6">
              No hay actividad reciente para mostrar.
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
