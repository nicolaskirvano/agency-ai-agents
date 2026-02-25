"use client";

import { useState } from "react";
import { Settings } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";

const llmProviders = [
  {
    id: "glm5",
    name: "GLM-5 (Zhipu AI)",
    description: "744B params, ~5x mais barato, API compativel OpenAI",
    badge: "Recomendado",
    fields: [
      { key: "GLM_API_KEY", label: "GLM API Key", placeholder: "Sua chave Z.AI", type: "password" },
      { key: "GLM_BASE_URL", label: "Base URL", placeholder: "https://api.z.ai/api/paas/v4/", type: "text" },
      { key: "GLM_MODEL", label: "Modelo", placeholder: "glm-5", type: "text" },
    ],
  },
  {
    id: "openai",
    name: "OpenAI",
    description: "GPT-4o e familia GPT",
    fields: [
      { key: "OPENAI_API_KEY", label: "API Key", placeholder: "sk-...", type: "password" },
      { key: "OPENAI_MODEL", label: "Modelo", placeholder: "gpt-4o", type: "text" },
    ],
  },
  {
    id: "anthropic",
    name: "Anthropic Claude",
    description: "Claude Sonnet / Opus",
    fields: [
      { key: "ANTHROPIC_API_KEY", label: "API Key", placeholder: "sk-ant-...", type: "password" },
    ],
  },
];

export default function SettingsPage() {
  const [selectedProvider, setSelectedProvider] = useState("glm5");

  const activeProvider = llmProviders.find((p) => p.id === selectedProvider)!;

  return (
    <div className="p-8">
      <div className="mb-6 flex items-center gap-3">
        <div className="rounded-lg bg-muted p-3">
          <Settings className="h-6 w-6" />
        </div>
        <div>
          <h1 className="text-3xl font-bold">Configuracoes</h1>
          <p className="text-muted-foreground">
            Configure o provedor de AI e chaves de API
          </p>
        </div>
      </div>

      <div className="max-w-2xl space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Provedor de LLM</CardTitle>
            <CardDescription>
              Escolha qual modelo de AI vai alimentar os agentes
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-3">
              {llmProviders.map((provider) => (
                <button
                  key={provider.id}
                  onClick={() => setSelectedProvider(provider.id)}
                  className={`flex items-center justify-between rounded-lg border p-4 text-left transition-all ${
                    selectedProvider === provider.id
                      ? "border-primary bg-primary/5"
                      : "border-border hover:border-primary/50"
                  }`}
                >
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-medium">{provider.name}</span>
                      {"badge" in provider && provider.badge && (
                        <Badge variant="secondary" className="text-xs">
                          {provider.badge}
                        </Badge>
                      )}
                    </div>
                    <p className="mt-0.5 text-sm text-muted-foreground">
                      {provider.description}
                    </p>
                  </div>
                  <div
                    className={`h-4 w-4 rounded-full border-2 ${
                      selectedProvider === provider.id
                        ? "border-primary bg-primary"
                        : "border-muted-foreground"
                    }`}
                  />
                </button>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>{activeProvider.name} - Configuracao</CardTitle>
            <CardDescription>
              Preencha as credenciais para o provedor selecionado
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {activeProvider.fields.map((field) => (
              <div key={field.key}>
                <label className="mb-1.5 block text-sm font-medium">
                  {field.label}
                </label>
                <Input
                  type={field.type}
                  placeholder={field.placeholder}
                />
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Integracoes</CardTitle>
            <CardDescription>
              Chaves para plataformas de marketing e design
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="mb-1.5 block text-sm font-medium">Meta Ads Access Token</label>
              <Input type="password" placeholder="Token de acesso Meta" />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium">Meta Ads Account ID</label>
              <Input placeholder="act_..." />
            </div>
            <Separator />
            <div>
              <label className="mb-1.5 block text-sm font-medium">Canva API Key</label>
              <Input type="password" placeholder="Chave Canva" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Backend</CardTitle>
            <CardDescription>
              Configuracao de conexao com o servidor
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div>
              <label className="mb-1.5 block text-sm font-medium">API URL</label>
              <Input defaultValue="http://localhost:8000/api/v1" />
            </div>
          </CardContent>
        </Card>

        <Button className="w-full">Salvar Configuracoes</Button>
      </div>
    </div>
  );
}
