"use client";

import { useState } from "react";
import { Palette } from "lucide-react";
import { AgentChat } from "@/components/agent-chat";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { api } from "@/lib/api";

const quickActions = [
  "Post para Instagram 1080x1080",
  "Stories 1080x1920",
  "Banner para Facebook",
  "Carrossel 10 slides",
  "Logo e identidade visual",
  "Thumbnail YouTube",
];

export default function DesignPage() {
  const [brandColors, setBrandColors] = useState<string[]>([]);
  const [colorInput, setColorInput] = useState("");

  const addColor = () => {
    if (colorInput && !brandColors.includes(colorInput)) {
      setBrandColors([...brandColors, colorInput]);
      setColorInput("");
    }
  };

  const handleSend = async (message: string) => {
    const res = await api.createDesign(message, "instagram_feed", brandColors.length > 0 ? brandColors : undefined);
    return res.result;
  };

  return (
    <div className="p-8">
      <div className="mb-6 flex items-center gap-3">
        <div className="rounded-lg bg-pink-500/10 p-3">
          <Palette className="h-6 w-6 text-pink-500" />
        </div>
        <div>
          <h1 className="text-3xl font-bold">Design</h1>
          <p className="text-muted-foreground">
            Criacao visual, artes, banners e identidade
          </p>
        </div>
        <Badge className="ml-auto">Online</Badge>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
        <AgentChat
          department="design"
          departmentLabel="Design"
          placeholder="Descreva a arte que precisa criar..."
          onSend={handleSend}
        />

        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-sm">Acoes Rapidas</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-wrap gap-2">
              {quickActions.map((action) => (
                <Button
                  key={action}
                  variant="outline"
                  size="sm"
                  className="text-xs"
                >
                  {action}
                </Button>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-sm">Cores da Marca</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex gap-2">
                <Input
                  value={colorInput}
                  onChange={(e) => setColorInput(e.target.value)}
                  placeholder="#FF5733"
                  className="text-sm"
                  onKeyDown={(e) => e.key === "Enter" && addColor()}
                />
                <Button size="sm" onClick={addColor}>
                  +
                </Button>
              </div>
              <div className="mt-3 flex flex-wrap gap-2">
                {brandColors.map((color) => (
                  <div
                    key={color}
                    className="flex items-center gap-1 rounded-full border px-2 py-1 text-xs"
                  >
                    <div
                      className="h-3 w-3 rounded-full"
                      style={{ backgroundColor: color }}
                    />
                    {color}
                    <button
                      onClick={() =>
                        setBrandColors(brandColors.filter((c) => c !== color))
                      }
                      className="ml-1 text-muted-foreground hover:text-foreground"
                    >
                      x
                    </button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
