from crewai import Crew, Task
from .base_agent import create_agent


class OrchestratorCrew:
    """Agente orquestrador que analisa demandas e delega para departamentos."""

    def __init__(self):
        self.agent = create_agent("orchestrator")

    def analyze_demand(self, demand: str, context: str | None = None) -> str:
        full_demand = demand
        if context:
            full_demand += f"\n\nContexto adicional: {context}"

        task = Task(
            description=f"""
            Analise a seguinte demanda e identifique quais departamentos precisam
            ser acionados: {full_demand}

            Classifique a demanda em uma ou mais categorias:
            - design: criação visual, artes, banners, identidade
            - social_media: planejamento de conteúdo, calendário, posts
            - ads: campanhas pagas, tráfego, Meta Ads, Google Ads
            - copy: textos, legendas, scripts, emails
            - analytics: relatórios, métricas, análise de dados

            Crie um plano de ação detalhado com:
            1. Departamentos envolvidos (em ordem de execução)
            2. Tarefas específicas para cada departamento
            3. Dependências entre tarefas
            4. Prioridade geral (alta/média/baixa)

            IMPORTANTE: Responda em formato JSON válido.
            """,
            expected_output="""
            JSON com estrutura:
            {
                "departments": ["design", "copy"],
                "priority": "alta",
                "action_plan": [
                    {"step": 1, "department": "copy", "task": "descrição", "depends_on": null},
                    {"step": 2, "department": "design", "task": "descrição", "depends_on": 1}
                ],
                "summary": "resumo da análise"
            }
            """,
            agent=self.agent,
        )

        crew = Crew(agents=[self.agent], tasks=[task], verbose=True)
        result = crew.kickoff()
        return str(result)
