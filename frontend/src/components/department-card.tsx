"use client";

import Link from "next/link";
import {
  Palette,
  Share2,
  Target,
  PenTool,
  BarChart3,
} from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const iconMap: Record<string, React.ElementType> = {
  palette: Palette,
  "share-2": Share2,
  target: Target,
  "pen-tool": PenTool,
  "bar-chart-3": BarChart3,
};

const colorMap: Record<string, string> = {
  design: "text-pink-500 bg-pink-500/10",
  social_media: "text-blue-500 bg-blue-500/10",
  ads: "text-orange-500 bg-orange-500/10",
  copy: "text-green-500 bg-green-500/10",
  analytics: "text-purple-500 bg-purple-500/10",
};

const hrefMap: Record<string, string> = {
  design: "/design",
  social_media: "/social-media",
  ads: "/ads",
  copy: "/copy",
  analytics: "/analytics",
};

interface DepartmentCardProps {
  id: string;
  name: string;
  icon: string;
  description: string;
  status: string;
  tasksCount?: number;
}

export function DepartmentCard({
  id,
  name,
  icon,
  description,
  status,
  tasksCount = 0,
}: DepartmentCardProps) {
  const Icon = iconMap[icon] || Palette;
  const color = colorMap[id] || "text-gray-500 bg-gray-500/10";
  const href = hrefMap[id] || "/";

  return (
    <Link href={href}>
      <Card className="transition-all hover:border-primary/50 hover:shadow-lg cursor-pointer">
        <CardHeader className="flex flex-row items-center gap-4 space-y-0">
          <div className={`rounded-lg p-3 ${color}`}>
            <Icon className="h-6 w-6" />
          </div>
          <div className="flex-1">
            <div className="flex items-center justify-between">
              <CardTitle className="text-base">{name}</CardTitle>
              <Badge variant={status === "online" ? "default" : "secondary"}>
                {status === "online" ? "Online" : "Offline"}
              </Badge>
            </div>
            <CardDescription className="mt-1">{description}</CardDescription>
          </div>
        </CardHeader>
        {tasksCount > 0 && (
          <CardContent>
            <p className="text-sm text-muted-foreground">
              {tasksCount} {tasksCount === 1 ? "tarefa ativa" : "tarefas ativas"}
            </p>
          </CardContent>
        )}
      </Card>
    </Link>
  );
}
