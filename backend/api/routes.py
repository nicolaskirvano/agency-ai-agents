import asyncio
import json
import uuid
from fastapi import APIRouter, HTTPException
from sse_starlette.sse import EventSourceResponse

from models.schemas import (
    DemandRequest,
    DesignRequest,
    SocialMediaRequest,
    AdsRequest,
    CopyRequest,
    AnalyticsRequest,
    CampaignRequest,
    AgentResponse,
    Department,
    TaskStatus,
)
from agents import (
    OrchestratorCrew,
    DesignCrew,
    SocialMediaCrew,
    AdsCrew,
    CopyCrew,
    AnalyticsCrew,
)

router = APIRouter()

# In-memory task store (swap for DB in production)
tasks_store: dict[str, dict] = {}


@router.get("/health")
async def health():
    import os

    return {
        "status": "ok",
        "service": "agency-ai-agents",
        "llm_provider": os.getenv("LLM_PROVIDER", "glm5"),
    }


@router.get("/llm/provider")
async def get_llm_provider():
    import os

    provider = os.getenv("LLM_PROVIDER", "glm5")
    providers = {
        "glm5": {
            "name": "GLM-5 (Zhipu AI)",
            "model": os.getenv("GLM_MODEL", "glm-5"),
            "base_url": os.getenv("GLM_BASE_URL", "https://api.z.ai/api/paas/v4/"),
        },
        "openai": {
            "name": "OpenAI",
            "model": os.getenv("OPENAI_MODEL", "gpt-4o"),
        },
        "anthropic": {
            "name": "Anthropic Claude",
            "model": "claude-sonnet-4-20250514",
        },
    }
    return {
        "active": provider,
        "config": providers.get(provider, {}),
        "available": list(providers.keys()),
    }


@router.get("/departments")
async def list_departments():
    return {
        "departments": [
            {
                "id": "design",
                "name": "Design",
                "icon": "palette",
                "description": "Criação visual, artes, banners e identidade",
                "status": "online",
            },
            {
                "id": "social_media",
                "name": "Social Media",
                "icon": "share-2",
                "description": "Planejamento de conteúdo e calendário editorial",
                "status": "online",
            },
            {
                "id": "ads",
                "name": "Ads & Tráfego",
                "icon": "target",
                "description": "Campanhas Meta Ads, Google Ads e TikTok Ads",
                "status": "online",
            },
            {
                "id": "copy",
                "name": "Copywriting",
                "icon": "pen-tool",
                "description": "Textos persuasivos para ads, posts e landing pages",
                "status": "online",
            },
            {
                "id": "analytics",
                "name": "Analytics",
                "icon": "bar-chart-3",
                "description": "Relatórios de performance e insights de dados",
                "status": "online",
            },
        ]
    }


@router.post("/orchestrator/analyze")
async def analyze_demand(request: DemandRequest):
    task_id = str(uuid.uuid4())[:8]
    tasks_store[task_id] = {"status": "em_andamento", "department": "orchestrator"}

    try:
        crew = OrchestratorCrew()
        result = crew.analyze_demand(request.demand, request.context)
        tasks_store[task_id]["status"] = "concluido"
        tasks_store[task_id]["result"] = result
        return {"task_id": task_id, "result": result}
    except Exception as e:
        tasks_store[task_id]["status"] = "falhou"
        raise HTTPException(status_code=500, detail=str(e))


@router.post("/orchestrator/analyze/stream")
async def analyze_demand_stream(request: DemandRequest):
    async def event_generator():
        yield {"event": "status", "data": json.dumps({"status": "analyzing"})}

        try:
            crew = OrchestratorCrew()
            result = await asyncio.to_thread(
                crew.analyze_demand, request.demand, request.context
            )
            yield {
                "event": "result",
                "data": json.dumps({"status": "completed", "result": result}),
            }
        except Exception as e:
            yield {
                "event": "error",
                "data": json.dumps({"status": "failed", "error": str(e)}),
            }

    return EventSourceResponse(event_generator())


@router.post("/design/create")
async def create_design(request: DesignRequest):
    task_id = str(uuid.uuid4())[:8]
    try:
        crew = DesignCrew()
        result = crew.create_visual_brief(
            request.brief, request.format, request.brand_colors
        )
        return AgentResponse(
            department=Department.DESIGN,
            status=TaskStatus.COMPLETED,
            result=result,
            task_id=task_id,
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.post("/social-media/plan")
async def plan_social_media(request: SocialMediaRequest):
    task_id = str(uuid.uuid4())[:8]
    try:
        crew = SocialMediaCrew()
        result = crew.plan_content(request.platform, request.topic, request.period)
        return AgentResponse(
            department=Department.SOCIAL_MEDIA,
            status=TaskStatus.COMPLETED,
            result=result,
            task_id=task_id,
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.post("/ads/campaign")
async def create_ads_campaign(request: AdsRequest):
    task_id = str(uuid.uuid4())[:8]
    try:
        crew = AdsCrew()
        result = crew.create_campaign(
            request.objective, request.platform, request.budget, request.audience
        )
        return AgentResponse(
            department=Department.ADS,
            status=TaskStatus.COMPLETED,
            result=result,
            task_id=task_id,
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.post("/copy/write")
async def write_copy(request: CopyRequest):
    task_id = str(uuid.uuid4())[:8]
    try:
        crew = CopyCrew()
        result = crew.write_copy(
            request.content_type, request.topic, request.tone, request.platform
        )
        return AgentResponse(
            department=Department.COPY,
            status=TaskStatus.COMPLETED,
            result=result,
            task_id=task_id,
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.post("/analytics/report")
async def generate_report(request: AnalyticsRequest):
    task_id = str(uuid.uuid4())[:8]
    try:
        crew = AnalyticsCrew()
        result = crew.generate_report(request.report_type, request.period, request.data)
        return AgentResponse(
            department=Department.ANALYTICS,
            status=TaskStatus.COMPLETED,
            result=result,
            task_id=task_id,
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.post("/campaign/full")
async def run_full_campaign(request: CampaignRequest):
    """Executa uma campanha completa passando por múltiplos departamentos."""
    task_id = str(uuid.uuid4())[:8]
    results = {}

    async def event_generator():
        for dept in request.departments:
            yield {
                "event": "progress",
                "data": json.dumps(
                    {"department": dept.value, "status": "em_andamento"}
                ),
            }

            try:
                result = await asyncio.to_thread(
                    _run_department, dept, request.details
                )
                results[dept.value] = result
                yield {
                    "event": "department_done",
                    "data": json.dumps(
                        {
                            "department": dept.value,
                            "status": "concluido",
                            "result": result,
                        }
                    ),
                }
            except Exception as e:
                yield {
                    "event": "department_error",
                    "data": json.dumps(
                        {
                            "department": dept.value,
                            "status": "falhou",
                            "error": str(e),
                        }
                    ),
                }

        yield {
            "event": "campaign_done",
            "data": json.dumps(
                {"task_id": task_id, "status": "concluido", "results": results}
            ),
        }

    return EventSourceResponse(event_generator())


@router.get("/tasks/{task_id}")
async def get_task(task_id: str):
    if task_id not in tasks_store:
        raise HTTPException(status_code=404, detail="Task not found")
    return tasks_store[task_id]


def _run_department(department: Department, details: dict) -> str:
    if department == Department.DESIGN:
        crew = DesignCrew()
        return crew.create_visual_brief(
            details.get("brief", ""),
            details.get("format", "instagram_feed"),
        )
    elif department == Department.SOCIAL_MEDIA:
        crew = SocialMediaCrew()
        return crew.plan_content(
            details.get("platform", "instagram"),
            details.get("topic", ""),
            details.get("period", "1 semana"),
        )
    elif department == Department.ADS:
        crew = AdsCrew()
        return crew.create_campaign(
            details.get("objective", ""),
            details.get("platform", "meta"),
            details.get("budget", "R$ 1.000/mês"),
            details.get("audience", ""),
        )
    elif department == Department.COPY:
        crew = CopyCrew()
        return crew.write_copy(
            details.get("content_type", "post"),
            details.get("topic", ""),
            details.get("tone", "profissional"),
            details.get("platform", "instagram"),
        )
    elif department == Department.ANALYTICS:
        crew = AnalyticsCrew()
        return crew.generate_report(
            details.get("report_type", "geral"),
            details.get("period", "ultimo_mes"),
            details.get("data"),
        )
    return ""
