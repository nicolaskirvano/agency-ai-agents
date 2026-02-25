from crewai import Crew, Task
from .base_agent import create_agent


class SocialMediaCrew:
    """Agente de Social Media - planejamento de conteúdo e estratégia."""

    def __init__(self, llm: str = "openai/gpt-4o"):
        self.agent = create_agent("social_media_agent", llm=llm)

    def plan_content(
        self,
        platform: str,
        topic: str,
        period: str = "1 semana",
    ) -> str:
        task = Task(
            description=f"""
            Crie um plano de conteúdo completo:

            Plataforma: {platform}
            Tema/Nicho: {topic}
            Período: {period}

            Inclua para cada post:
            1. Data e horário de publicação (melhores horários para {platform})
            2. Tipo de conteúdo (carrossel, reels, stories, post único, live)
            3. Hook de abertura (primeira frase que prende atenção)
            4. Resumo do conteúdo
            5. CTA (call to action)
            6. Hashtags estratégicas (mix de volume alto, médio e nicho)
            7. Formato e dimensões

            Também inclua:
            - Estratégia geral para o período
            - Mix de conteúdo (educativo, entretenimento, vendas, autoridade)
            - Tendências atuais relevantes para o nicho
            - Dicas de engajamento (enquetes, caixinhas, etc)
            """,
            expected_output="""
            Calendário editorial completo em formato de tabela com todos os
            posts detalhados, estratégia geral e recomendações de engajamento.
            """,
            agent=self.agent,
        )

        crew = Crew(agents=[self.agent], tasks=[task], verbose=True)
        result = crew.kickoff()
        return str(result)
