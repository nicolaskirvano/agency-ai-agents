"use client";

import { DepartmentCard } from "@/components/department-card";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Zap,
  TrendingUp,
  CheckCircle,
  Clock,
} from "lucide-react";

const departments = [
  {
    id: "design",
    name: "Design",
    icon: "palette",
    description: "Criacao visual, artes, banners e identidade",
    status: "online",
    tasksCount: 0,
  },
  {
    id: "social_media",
    name: "Social Media",
    icon: "share-2",
    description: "Planejamento de conteudo e calendario editorial",
    status: "online",
    tasksCount: 0,
  },
  {
    id: "ads",
    name: "Ads & Trafego",
    icon: "target",
    description: "Campanhas Meta Ads, Google Ads e TikTok Ads",
    status: "online",
    tasksCount: 0,
  },
  {
    id: "copy",
    name: "Copywriting",
    icon: "pen-tool",
    description: "Textos persuasivos para ads, posts e landing pages",
    status: "online",
    tasksCount: 0,
  },
  {
    id: "analytics",
    name: "Analytics",
    icon: "bar-chart-3",
    description: "Relatorios de performance e insights de dados",
    status: "online",
    tasksCount: 0,
  },
];

const stats = [
  { label: "Agentes Ativos", value: "5", icon: Zap, color: "text-chart-1" },
  { label: "Tasks Concluidas", value: "0", icon: CheckCircle, color: "text-green-500" },
  { label: "Em Andamento", value: "0", icon: Clock, color: "text-yellow-500" },
  { label: "Performance", value: "--", icon: TrendingUp, color: "text-chart-2" },
];

export default function Dashboard() {
  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="mt-1 text-muted-foreground">
          Visao geral dos departamentos da sua agencia AI
        </p>
      </div>

      <div className="mb-8 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.label}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {stat.label}
                </CardTitle>
                <Icon className={`h-4 w-4 ${stat.color}`} />
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold">{stat.value}</p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="mb-4">
        <h2 className="text-xl font-semibold">Departamentos</h2>
        <p className="text-sm text-muted-foreground">
          Clique em um departamento para interagir com o agente
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {departments.map((dept) => (
          <DepartmentCard key={dept.id} {...dept} />
        ))}
      </div>
    </div>
  );
}
