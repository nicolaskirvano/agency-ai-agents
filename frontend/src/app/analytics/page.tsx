"use client";

import { useState } from "react";
import { BarChart3 } from "lucide-react";
import { AgentChat } from "@/components/agent-chat";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { api } from "@/lib/api";

const reportTypes = [
  "Relatorio Geral",
  "Performance de Ads",
  "Engajamento Social",
  "Analise de Conversao",
  "ROI por Canal",
  "Comparativo Mensal",
];

const periods = [
  { id: "ultima_semana", label: "Ultima Semana" },
  { id: "ultimo_mes", label: "Ultimo Mes" },
  { id: "ultimo_trimestre", label: "Ultimo Trimestre" },
  { id: "ultimo_ano", label: "Ultimo Ano" },
];

export default function AnalyticsPage() {
  const [selectedPeriod, setSelectedPeriod] = useState("ultimo_mes");

  const handleSend = async (message: string) => {
    const res = await api.generateReport(message, selectedPeriod);
    return res.result;
  };

  return (
    <div className="p-8">
      <div className="mb-6 flex items-center gap-3">
        <div className="rounded-lg bg-purple-500/10 p-3">
          <BarChart3 className="h-6 w-6 text-purple-500" />
        </div>
        <div>
          <h1 className="text-3xl font-bold">Analytics</h1>
          <p className="text-muted-foreground">
            Relatorios de performance e insights de dados
          </p>
        </div>
        <Badge className="ml-auto">Online</Badge>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
        <AgentChat
          department="analytics"
          departmentLabel="Analytics"
          placeholder="Que tipo de analise ou relatorio voce precisa?"
          onSend={handleSend}
        />

        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-sm">Periodo</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-wrap gap-2">
              {periods.map((p) => (
                <Button
                  key={p.id}
                  variant={selectedPeriod === p.id ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedPeriod(p.id)}
                  className="text-xs"
                >
                  {p.label}
                </Button>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-sm">Relatorios Rapidos</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-wrap gap-2">
              {reportTypes.map((type) => (
                <Button
                  key={type}
                  variant="outline"
                  size="sm"
                  className="text-xs"
                >
                  {type}
                </Button>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
