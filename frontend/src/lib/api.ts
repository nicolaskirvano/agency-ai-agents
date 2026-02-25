const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8001/api/v1";

async function request<T>(path: string, options?: RequestInit): Promise<T> {
  const res = await fetch(`${API_BASE}${path}`, {
    headers: { "Content-Type": "application/json" },
    ...options,
  });
  if (!res.ok) {
    const error = await res.json().catch(() => ({ detail: res.statusText }));
    throw new Error(error.detail || "Request failed");
  }
  return res.json();
}

export const api = {
  getDepartments: () => request<DepartmentsResponse>("/departments"),

  analyzeDemand: (demand: string, context?: string) =>
    request<AnalyzeResponse>("/orchestrator/analyze", {
      method: "POST",
      body: JSON.stringify({ demand, context }),
    }),

  createDesign: (brief: string, format?: string, brand_colors?: string[]) =>
    request<AgentResponse>("/design/create", {
      method: "POST",
      body: JSON.stringify({ brief, format, brand_colors }),
    }),

  planSocialMedia: (platform: string, topic: string, period?: string) =>
    request<AgentResponse>("/social-media/plan", {
      method: "POST",
      body: JSON.stringify({ platform, topic, period }),
    }),

  createAdsCampaign: (
    objective: string,
    platform?: string,
    budget?: string,
    audience?: string
  ) =>
    request<AgentResponse>("/ads/campaign", {
      method: "POST",
      body: JSON.stringify({ objective, platform, budget, audience }),
    }),

  writeCopy: (
    content_type: string,
    topic: string,
    tone?: string,
    platform?: string
  ) =>
    request<AgentResponse>("/copy/write", {
      method: "POST",
      body: JSON.stringify({ content_type, topic, tone, platform }),
    }),

  generateReport: (report_type: string, period?: string, data?: string) =>
    request<AgentResponse>("/analytics/report", {
      method: "POST",
      body: JSON.stringify({ report_type, period, data }),
    }),

  streamDemandAnalysis: (demand: string, context?: string) => {
    return new EventSource(
      `${API_BASE}/orchestrator/analyze/stream?` +
        new URLSearchParams({ demand, ...(context ? { context } : {}) })
    );
  },
};

// Types
export interface Department {
  id: string;
  name: string;
  icon: string;
  description: string;
  status: string;
}

export interface DepartmentsResponse {
  departments: Department[];
}

export interface AgentResponse {
  department: string;
  status: string;
  result: string;
  task_id?: string;
}

export interface AnalyzeResponse {
  task_id: string;
  result: string;
}
