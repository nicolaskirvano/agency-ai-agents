"use client";

import { useState } from "react";
import { PenTool } from "lucide-react";
import { AgentChat } from "@/components/agent-chat";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { api } from "@/lib/api";

const contentTypes = [
  { id: "post", label: "Post Social" },
  { id: "ad", label: "Anuncio" },
  { id: "email", label: "Email Marketing" },
  { id: "landing_page", label: "Landing Page" },
  { id: "video_script", label: "Script de Video" },
  { id: "headline", label: "Headlines" },
];

const tones = [
  "Profissional",
  "Casual",
  "Urgente",
  "Inspiracional",
  "Humoristico",
  "Tecnico",
];

export default function CopyPage() {
  const [selectedType, setSelectedType] = useState("post");
  const [selectedTone, setSelectedTone] = useState("Profissional");

  const handleSend = async (message: string) => {
    const res = await api.writeCopy(selectedType, message, selectedTone.toLowerCase(), "instagram");
    return res.result;
  };

  return (
    <div className="p-8">
      <div className="mb-6 flex items-center gap-3">
        <div className="rounded-lg bg-green-500/10 p-3">
          <PenTool className="h-6 w-6 text-green-500" />
        </div>
        <div>
          <h1 className="text-3xl font-bold">Copywriting</h1>
          <p className="text-muted-foreground">
            Textos persuasivos para ads, posts e landing pages
          </p>
        </div>
        <Badge className="ml-auto">Online</Badge>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
        <AgentChat
          department="copy"
          departmentLabel="Copywriting"
          placeholder="Sobre o que voce precisa escrever?"
          onSend={handleSend}
        />

        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-sm">Tipo de Conteudo</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-wrap gap-2">
              {contentTypes.map((t) => (
                <Button
                  key={t.id}
                  variant={selectedType === t.id ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedType(t.id)}
                  className="text-xs"
                >
                  {t.label}
                </Button>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-sm">Tom de Voz</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-wrap gap-2">
              {tones.map((tone) => (
                <Button
                  key={tone}
                  variant={selectedTone === tone ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedTone(tone)}
                  className="text-xs"
                >
                  {tone}
                </Button>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
