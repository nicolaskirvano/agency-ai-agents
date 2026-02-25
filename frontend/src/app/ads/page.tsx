"use client";

import { useState } from "react";
import { Target } from "lucide-react";
import { AgentChat } from "@/components/agent-chat";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { api } from "@/lib/api";

const adPlatforms = [
  { id: "meta", label: "Meta Ads" },
  { id: "google", label: "Google Ads" },
  { id: "tiktok", label: "TikTok Ads" },
];

const objectives = [
  "Gerar leads",
  "Vendas no e-commerce",
  "Reconhecimento de marca",
  "Trafego para site",
  "Instalacao de app",
  "Engajamento",
];

export default function AdsPage() {
  const [selectedPlatform, setSelectedPlatform] = useState("meta");
  const [budget, setBudget] = useState("R$ 1.000/mes");

  const handleSend = async (message: string) => {
    const res = await api.createAdsCampaign(message, selectedPlatform, budget);
    return res.result;
  };

  return (
    <div className="p-8">
      <div className="mb-6 flex items-center gap-3">
        <div className="rounded-lg bg-orange-500/10 p-3">
          <Target className="h-6 w-6 text-orange-500" />
        </div>
        <div>
          <h1 className="text-3xl font-bold">Ads & Trafego</h1>
          <p className="text-muted-foreground">
            Campanhas Meta Ads, Google Ads e TikTok Ads
          </p>
        </div>
        <Badge className="ml-auto">Online</Badge>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
        <AgentChat
          department="ads"
          departmentLabel="Ads & Trafego"
          placeholder={`Crie campanha para ${selectedPlatform}...`}
          onSend={handleSend}
        />

        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-sm">Plataforma de Ads</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-wrap gap-2">
              {adPlatforms.map((p) => (
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
              <CardTitle className="text-sm">Orcamento</CardTitle>
            </CardHeader>
            <CardContent>
              <Input
                value={budget}
                onChange={(e) => setBudget(e.target.value)}
                placeholder="R$ 1.000/mes"
                className="text-sm"
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-sm">Objetivos</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-wrap gap-2">
              {objectives.map((obj) => (
                <Button
                  key={obj}
                  variant="outline"
                  size="sm"
                  className="text-xs"
                >
                  {obj}
                </Button>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
