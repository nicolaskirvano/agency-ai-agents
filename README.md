# Agency AI Agents

Sistema multi-agente AI para gestao de agencia digital com departamentos especializados.

## Arquitetura

```
                 ORQUESTRADOR
                     |
    +-------+--------+--------+--------+
    |       |        |        |        |
  DESIGN  SOCIAL   ADS     COPY   ANALYTICS
  Agent   MEDIA   Agent   Agent    Agent
          Agent
```

## Departamentos

| Agente | Funcao |
|--------|--------|
| Orquestrador | Analisa demandas e delega para o departamento correto |
| Design | Criacao visual, briefings de arte, banners, identidade |
| Social Media | Planejamento de conteudo, calendario editorial |
| Ads & Trafego | Campanhas Meta Ads, Google Ads, TikTok Ads |
| Copywriting | Textos persuasivos, headlines, CTAs |
| Analytics | Relatorios de performance, insights de dados |

## Stack

**Backend:** Python, CrewAI, FastAPI, LangChain
**Frontend:** Next.js 14, TypeScript, Tailwind CSS, shadcn/ui
**AI:** OpenAI GPT-4o / Anthropic Claude

## Setup

### Backend

```bash
cd backend
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
cp .env.example .env
# Edite .env com suas API keys
python main.py
```

O backend roda em `http://localhost:8000`

### Frontend

```bash
cd frontend
npm install
npm run dev
```

O frontend roda em `http://localhost:3000`

## API Endpoints

| Metodo | Endpoint | Descricao |
|--------|----------|-----------|
| GET | `/api/v1/health` | Health check |
| GET | `/api/v1/departments` | Lista departamentos |
| POST | `/api/v1/orchestrator/analyze` | Analisa demanda e direciona |
| POST | `/api/v1/design/create` | Cria briefing de design |
| POST | `/api/v1/social-media/plan` | Planeja conteudo social |
| POST | `/api/v1/ads/campaign` | Cria campanha de ads |
| POST | `/api/v1/copy/write` | Escreve copy |
| POST | `/api/v1/analytics/report` | Gera relatorio |
| POST | `/api/v1/campaign/full` | Campanha multi-departamento (SSE) |

## Licenca

MIT
