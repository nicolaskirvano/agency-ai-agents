"use client";

import { useState } from "react";
import { Share2 } from "lucide-react";
import { AgentChat } from "@/components/agent-chat";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { api } from "@/lib/api";

const platforms = [
  { id: "instagram", label: "Instagram", color: "bg-pink-500" },
  { id: "tiktok", label: "TikTok", color: "bg-black" },
  { id: "linkedin", label: "LinkedIn", color: "bg-blue-600" },
  { id: "facebook", label: "Facebook", color: "bg-blue-500" },
  { id: "youtube", label: "YouTube", color: "bg-red-500" },
];

const quickTopics = [
  "Calendario semanal",
  "Ideias de Reels",
  "Estrategia de Stories",
  "Carrossel educativo",
  "Tendencias do mes",
  "Hashtags para nicho",
];

export default function SocialMediaPage() {
  const [selectedPlatform, setSelectedPlatform] = useState("instagram");

  const handleSend = async (message: string) => {
    const res = await api.planSocialMedia(selectedPlatform, message, "1 semana");
    return res.result;
  };

  return (
    <div className="p-8">
      <div className="mb-6 flex items-center gap-3">
        <div className="rounded-lg bg-blue-500/10 p-3">
          <Share2 className="h-6 w-6 text-blue-500" />
        </div>
        <div>
          <h1 className="text-3xl font-bold">Social Media</h1>
          <p className="text-muted-foreground">
            Planejamento de conteudo e calendario editorial
          </p>
        </div>
        <Badge className="ml-auto">Online</Badge>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
        <AgentChat
          department="social_media"
          departmentLabel="Social Media"
          placeholder={`Planeje conteudo para ${selectedPlatform}...`}
          onSend={handleSend}
        />

        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-sm">Plataforma</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-wrap gap-2">
              {platforms.map((p) => (
                <Button
                  key={p.id}
                  variant={selectedPlatform === p.id ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedPlatform(p.id)}
                  className="text-xs"
                >
                  {p.label}
                </Button>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-sm">Topicos Rapidos</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-wrap gap-2">
              {quickTopics.map((topic) => (
                <Button
                  key={topic}
                  variant="outline"
                  size="sm"
                  className="text-xs"
                >
                  {topic}
                </Button>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
