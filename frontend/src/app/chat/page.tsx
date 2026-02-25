"use client";

import { useState } from "react";
import { AgentChat } from "@/components/agent-chat";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { api } from "@/lib/api";
import {
  Palette,
  Share2,
  Target,
  PenTool,
  BarChart3,
  Bot,
} from "lucide-react";

const agents = [
  {
    id: "orchestrator",
    label: "Orquestrador",
    icon: Bot,
    placeholder: "Descreva sua demanda e o orquestrador vai direcionar para o departamento certo...",
  },
  {
    id: "design",
    label: "Design",
    icon: Palette,
    placeholder: "Descreva o que precisa de arte/design...",
  },
  {
    id: "social_media",
    label: "Social Media",
    icon: Share2,
    placeholder: "Qual plataforma e tipo de conteudo voce precisa planejar?",
  },
  {
    id: "ads",
    label: "Ads",
    icon: Target,
    placeholder: "Descreva o objetivo da campanha, plataforma e orcamento...",
  },
  {
    id: "copy",
    label: "Copy",
    icon: PenTool,
    placeholder: "Que tipo de texto voce precisa? (post, anuncio, email...)",
  },
  {
    id: "analytics",
    label: "Analytics",
    icon: BarChart3,
    placeholder: "Que tipo de relatorio ou analise voce precisa?",
  },
];

export default function ChatPage() {
  const [activeTab, setActiveTab] = useState("orchestrator");

  const handleSend = async (agentId: string, message: string): Promise<string> => {
    switch (agentId) {
      case "orchestrator": {
        const res = await api.analyzeDemand(message);
        return res.result;
      }
      case "design": {
        const res = await api.createDesign(message);
        return res.result;
      }
      case "social_media": {
        const res = await api.planSocialMedia("instagram", message);
        return res.result;
      }
      case "ads": {
        const res = await api.createAdsCampaign(message);
        return res.result;
      }
      case "copy": {
        const res = await api.writeCopy("post", message);
        return res.result;
      }
      case "analytics": {
        const res = await api.generateReport(message);
        return res.result;
      }
      default:
        return "Departamento nao encontrado";
    }
  };

  return (
    <div className="p-8">
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Chat com Agentes</h1>
        <p className="mt-1 text-muted-foreground">
          Converse diretamente com qualquer agente da sua equipe
        </p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-4 w-full justify-start">
          {agents.map((agent) => {
            const Icon = agent.icon;
            return (
              <TabsTrigger key={agent.id} value={agent.id} className="gap-2">
                <Icon className="h-4 w-4" />
                {agent.label}
              </TabsTrigger>
            );
          })}
        </TabsList>

        {agents.map((agent) => (
          <TabsContent key={agent.id} value={agent.id}>
            <AgentChat
              department={agent.id}
              departmentLabel={agent.label}
              placeholder={agent.placeholder}
              onSend={(msg) => handleSend(agent.id, msg)}
            />
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
