from crewai import Crew, Task
from .base_agent import create_agent


class CopyCrew:
    """Agente de Copywriting - textos persuasivos para todas as plataformas."""

    def __init__(self):
        self.agent = create_agent("copy_agent")

    def write_copy(
        self,
        content_type: str,
        topic: str,
        tone: str = "profissional",
        platform: str = "instagram",
    ) -> str:
        task = Task(
            description=f"""
            Escreva copy profissional:

            Tipo de conteúdo: {content_type}
            Tema: {topic}
            Tom de voz: {tone}
            Plataforma: {platform}

            Diretrizes:
            1. Use técnicas de copywriting adequadas ao formato:
               - Posts: AIDA (Atenção, Interesse, Desejo, Ação)
               - Anúncios: PAS (Problema, Agitação, Solução)
               - Landing pages: BAB (Before, After, Bridge)
               - Emails: Hook + Story + Offer

            2. Adapte ao formato da plataforma:
               - Instagram: até 2.200 caracteres, emojis estratégicos
               - Facebook: copies mais longas permitidas
               - Google Ads: headlines 30 chars, descrição 90 chars
               - Meta Ads: texto principal + headline + descrição

            3. Inclua:
               - 3 variações de headline para teste A/B
               - Copy principal
               - CTA (call to action) claro
               - Gatilhos mentais relevantes (escassez, prova social, etc)

            4. Mantenha o tom de voz: {tone}
            """,
            expected_output="""
            Copies prontas para uso com variações A/B, incluindo
            headlines, body copy, CTAs e notas sobre gatilhos utilizados.
            """,
            agent=self.agent,
        )

        crew = Crew(agents=[self.agent], tasks=[task], verbose=True)
        result = crew.kickoff()
        return str(result)
