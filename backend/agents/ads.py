from crewai import Crew, Task
from .base_agent import create_agent


class AdsCrew:
    """Agente de Ads - gestão de tráfego pago e campanhas."""

    def __init__(self):
        self.agent = create_agent("ads_agent")

    def create_campaign(
        self,
        objective: str,
        platform: str = "meta",
        budget: str = "R$ 1.000/mês",
        audience: str = "",
    ) -> str:
        task = Task(
            description=f"""
            Crie uma estratégia completa de campanha de anúncios:

            Objetivo: {objective}
            Plataforma: {platform}
            Orçamento: {budget}
            Público-alvo: {audience}

            Estruture a campanha com:

            1. ESTRUTURA DA CAMPANHA
               - Nome da campanha e objetivo de otimização
               - Conjuntos de anúncios (ad sets) com segmentações diferentes
               - Quantidade de anúncios por conjunto

            2. SEGMENTAÇÃO DE PÚBLICO
               - Público frio (interesses, comportamentos, demográfico)
               - Público morno (lookalike 1-3%)
               - Público quente (retargeting: visitantes site, engajamento)
               - Exclusões recomendadas

            3. DISTRIBUIÇÃO DE ORÇAMENTO
               - % por conjunto de anúncios
               - Estratégia de lance (menor custo, custo-alvo, etc)
               - Fase de aprendizado e otimização

            4. CRIATIVOS
               - Formatos recomendados (imagem, vídeo, carrossel)
               - Quantidade de variações para teste A/B
               - Guidelines de copy para ads

            5. MÉTRICAS E KPIs
               - KPIs primários e secundários
               - Benchmarks esperados (CTR, CPC, CPM, CPA)
               - Critérios para escalar ou pausar

            6. CRONOGRAMA
               - Fase de teste (quanto tempo, quanto investir)
               - Fase de otimização
               - Fase de escala
            """,
            expected_output="""
            Plano completo de campanha com estrutura detalhada, públicos,
            distribuição de orçamento, tipos de criativos e KPIs esperados.
            """,
            agent=self.agent,
        )

        crew = Crew(agents=[self.agent], tasks=[task], verbose=True)
        result = crew.kickoff()
        return str(result)
