"use client";

import { Badge } from "@/components/ui/badge";
import {
  Palette,
  Share2,
  Target,
  PenTool,
  BarChart3,
  ArrowRight,
  AlertCircle,
  CheckCircle,
} from "lucide-react";

const deptConfig: Record<string, { label: string; icon: React.ElementType; color: string }> = {
  design: { label: "Design", icon: Palette, color: "text-pink-500 bg-pink-500/10 border-pink-500/20" },
  social_media: { label: "Social Media", icon: Share2, color: "text-blue-500 bg-blue-500/10 border-blue-500/20" },
  ads: { label: "Ads & Trafego", icon: Target, color: "text-orange-500 bg-orange-500/10 border-orange-500/20" },
  copy: { label: "Copywriting", icon: PenTool, color: "text-green-500 bg-green-500/10 border-green-500/20" },
  analytics: { label: "Analytics", icon: BarChart3, color: "text-purple-500 bg-purple-500/10 border-purple-500/20" },
};

interface OrchestratorResponse {
  departments: string[];
  priority: string;
  action_plan: { step: number; department: string; task: string; depends_on: number | null }[];
  summary: string;
}

function tryParseOrchestratorJSON(text: string): OrchestratorResponse | null {
  try {
    // Remove markdown code block wrapper if present
    const cleaned = text.replace(/^```json?\s*\n?/i, "").replace(/\n?```\s*$/i, "").trim();
    const parsed = JSON.parse(cleaned);
    if (parsed.departments && parsed.action_plan !== undefined && parsed.summary) {
      return parsed as OrchestratorResponse;
    }
  } catch {
    // not JSON
  }
  return null;
}

function OrchestratorCard({ data }: { data: OrchestratorResponse }) {
  const priorityColor =
    data.priority === "alta"
      ? "bg-red-500/10 text-red-500 border-red-500/20"
      : data.priority === "media" || data.priority === "média"
        ? "bg-yellow-500/10 text-yellow-500 border-yellow-500/20"
        : "bg-green-500/10 text-green-500 border-green-500/20";

  return (
    <div className="space-y-3">
      {/* Summary */}
      <p className="text-sm leading-relaxed">{data.summary}</p>

      {/* Priority + Departments */}
      <div className="flex flex-wrap items-center gap-2">
        <Badge variant="outline" className={priorityColor}>
          Prioridade: {data.priority}
        </Badge>
        {data.departments.map((dept) => {
          const config = deptConfig[dept];
          if (!config) return <Badge key={dept} variant="secondary">{dept}</Badge>;
          const Icon = config.icon;
          return (
            <Badge key={dept} variant="outline" className={config.color}>
              <Icon className="mr-1 h-3 w-3" />
              {config.label}
            </Badge>
          );
        })}
      </div>

      {/* Action Plan */}
      {data.action_plan.length > 0 && (
        <div className="rounded-lg border border-border bg-background/50 p-3">
          <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Plano de Acao
          </p>
          <div className="space-y-2">
            {data.action_plan.map((step, i) => {
              const config = deptConfig[step.department];
              const Icon = config?.icon || AlertCircle;
              return (
                <div key={i} className="flex items-start gap-2">
                  <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/10 text-[10px] font-bold text-primary">
                    {step.step}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-1.5">
                      <Icon className={`h-3.5 w-3.5 ${config?.color.split(" ")[0] || "text-muted-foreground"}`} />
                      <span className="text-xs font-medium">{config?.label || step.department}</span>
                      {step.depends_on && (
                        <span className="text-[10px] text-muted-foreground">
                          (apos etapa {step.depends_on})
                        </span>
                      )}
                    </div>
                    <p className="mt-0.5 text-xs text-muted-foreground">{step.task}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Empty departments warning */}
      {data.departments.length === 0 && (
        <div className="flex items-center gap-2 rounded-lg border border-yellow-500/20 bg-yellow-500/5 p-3 text-sm text-yellow-500">
          <AlertCircle className="h-4 w-4 shrink-0" />
          <span>Nenhum departamento identificado. Tente detalhar melhor a demanda.</span>
        </div>
      )}
    </div>
  );
}

function FormattedText({ text }: { text: string }) {
  // Simple markdown-like rendering without heavy deps
  const lines = text.split("\n");

  return (
    <div className="space-y-1.5 text-sm leading-relaxed">
      {lines.map((line, i) => {
        const trimmed = line.trim();
        if (!trimmed) return <div key={i} className="h-1" />;

        // Headers
        if (trimmed.startsWith("### "))
          return <h4 key={i} className="mt-3 font-semibold text-xs uppercase tracking-wider text-muted-foreground">{trimmed.slice(4)}</h4>;
        if (trimmed.startsWith("## "))
          return <h3 key={i} className="mt-3 font-semibold">{trimmed.slice(3)}</h3>;
        if (trimmed.startsWith("# "))
          return <h2 key={i} className="mt-3 text-base font-bold">{trimmed.slice(2)}</h2>;

        // Numbered list
        if (/^\d+\.\s/.test(trimmed))
          return (
            <div key={i} className="flex gap-2 pl-1">
              <span className="shrink-0 font-medium text-primary">{trimmed.match(/^\d+/)?.[0]}.</span>
              <span>{trimmed.replace(/^\d+\.\s*/, "").replace(/\*\*(.*?)\*\*/g, "$1")}</span>
            </div>
          );

        // Bullet list
        if (trimmed.startsWith("- ") || trimmed.startsWith("* ") || trimmed.startsWith("• "))
          return (
            <div key={i} className="flex gap-2 pl-3">
              <ArrowRight className="mt-1 h-3 w-3 shrink-0 text-muted-foreground" />
              <span>{trimmed.slice(2).replace(/\*\*(.*?)\*\*/g, "$1")}</span>
            </div>
          );

        // Sub-bullet
        if (trimmed.startsWith("  - ") || trimmed.startsWith("  * "))
          return (
            <div key={i} className="flex gap-2 pl-7">
              <span className="text-muted-foreground">-</span>
              <span className="text-muted-foreground">{trimmed.trim().slice(2)}</span>
            </div>
          );

        // Regular text - handle bold
        const formatted = trimmed.replace(/\*\*(.*?)\*\*/g, "«$1»");
        if (formatted.includes("«")) {
          const parts = formatted.split(/«|»/);
          return (
            <p key={i}>
              {parts.map((part, j) =>
                j % 2 === 1 ? <strong key={j}>{part}</strong> : <span key={j}>{part}</span>
              )}
            </p>
          );
        }

        return <p key={i}>{trimmed}</p>;
      })}
    </div>
  );
}

export function AgentResponse({ content }: { content: string }) {
  // Try to parse as orchestrator JSON
  const orchestratorData = tryParseOrchestratorJSON(content);
  if (orchestratorData) {
    return <OrchestratorCard data={orchestratorData} />;
  }

  // Otherwise render as formatted text
  // Strip markdown code block wrappers if present
  const cleaned = content
    .replace(/^```(?:json|markdown|text)?\s*\n?/i, "")
    .replace(/\n?```\s*$/i, "")
    .trim();

  return <FormattedText text={cleaned} />;
}
