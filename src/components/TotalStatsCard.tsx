
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Activity } from "lucide-react";

const TotalStatsCard = () => {
  return (
    <Card className="mb-8">
      <CardContent className="pt-6">
        <div className="flex items-start gap-4">
          <div className="bg-primary/10 p-3 rounded-full">
            <Activity className="w-6 h-6 text-primary" />
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-semibold mb-2">Depuis que tu es MoHero</h3>
            <div className="space-y-2 text-muted-foreground">
              <p className="flex items-center gap-2">
                <span className="font-medium text-foreground">1560</span> squats réalisés
              </p>
              <p className="flex items-center gap-2">
                <span className="font-medium text-foreground">44</span> minutes de respiration
              </p>
              <p className="flex items-center gap-2">
                <span className="font-medium text-foreground">27</span> minutes en planche
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default TotalStatsCard;
