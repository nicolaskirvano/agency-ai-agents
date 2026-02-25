"use client";

import { Settings } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

export default function SettingsPage() {
  return (
    <div className="p-8">
      <div className="mb-6 flex items-center gap-3">
        <div className="rounded-lg bg-muted p-3">
          <Settings className="h-6 w-6" />
        </div>
        <div>
          <h1 className="text-3xl font-bold">Configuracoes</h1>
          <p className="text-muted-foreground">
            Configure as chaves de API e preferencias do sistema
          </p>
        </div>
      </div>

      <div className="max-w-2xl space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>API Keys</CardTitle>
            <CardDescription>
              Configure as chaves de acesso para os servicos de AI e plataformas
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="mb-1.5 block text-sm font-medium">OpenAI API Key</label>
              <Input type="password" placeholder="sk-..." />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium">Anthropic API Key</label>
              <Input type="password" placeholder="sk-ant-..." />
            </div>
            <Separator />
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
              Configuracoes de conexao com o servidor
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="mb-1.5 block text-sm font-medium">API URL</label>
              <Input defaultValue="http://localhost:8000/api/v1" />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium">LLM Provider</label>
              <Input defaultValue="openai/gpt-4o" />
            </div>
          </CardContent>
        </Card>

        <Button className="w-full">Salvar Configuracoes</Button>
      </div>
    </div>
  );
}
