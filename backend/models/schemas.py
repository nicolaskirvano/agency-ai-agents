from pydantic import BaseModel
from enum import Enum
from typing import Optional


class Department(str, Enum):
    DESIGN = "design"
    SOCIAL_MEDIA = "social_media"
    ADS = "ads"
    COPY = "copy"
    ANALYTICS = "analytics"


class Priority(str, Enum):
    HIGH = "alta"
    MEDIUM = "media"
    LOW = "baixa"


class TaskStatus(str, Enum):
    PENDING = "pendente"
    IN_PROGRESS = "em_andamento"
    COMPLETED = "concluido"
    FAILED = "falhou"


class DemandRequest(BaseModel):
    demand: str
    context: Optional[str] = None


class DesignRequest(BaseModel):
    brief: str
    format: Optional[str] = "instagram_feed"
    brand_colors: Optional[list[str]] = None


class SocialMediaRequest(BaseModel):
    platform: str = "instagram"
    topic: str
    period: str = "1 semana"


class AdsRequest(BaseModel):
    objective: str
    platform: str = "meta"
    budget: str
    audience: str


class CopyRequest(BaseModel):
    content_type: str
    topic: str
    tone: str = "profissional"
    platform: str = "instagram"


class AnalyticsRequest(BaseModel):
    report_type: str
    period: str = "ultimo_mes"
    data: Optional[str] = None


class AgentResponse(BaseModel):
    department: Department
    status: TaskStatus
    result: str
    task_id: Optional[str] = None


class CampaignRequest(BaseModel):
    name: str
    description: str
    departments: list[Department]
    details: dict
