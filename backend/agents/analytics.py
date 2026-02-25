from crewai import Crew, Task
from .base_agent import create_agent


class AnalyticsCrew:
    """Agente de Analytics - análise de dados e relatórios de performance."""

    def __init__(self):
        self.agent = create_agent("analytics_agent")

    def generate_report(
        self,
        report_type: str,
        period: str = "ultimo_mes",
        data: str | None = None,
    ) -> str:
        data_context = ""
        if data:
            data_context = f"\nDados disponíveis:\n{data}"

        task = Task(
            description=f"""
            Gere um relatório de performance:

            Tipo: {report_type}
            Período: {period}
            {data_context}

            O relatório deve conter:

            1. RESUMO EXECUTIVO
               - Principais métricas do período
               - Destaques positivos e pontos de atenção
               - Comparativo com período anterior (se dados disponíveis)

            2. MÉTRICAS POR CANAL
               - Social Media: alcance, engajamento, crescimento de seguidores
               - Ads: investimento, ROAS, CPA, CTR, conversões
               - Site: sessões, bounce rate, tempo na página, conversões
               - Email: taxa de abertura, cliques, conversões

            3. ANÁLISE DE TENDÊNCIAS
               - Padrões identificados
               - Conteúdos que mais performaram
               - Públicos que mais converteram

            4. RECOMENDAÇÕES
               - Ações imediatas (quick wins)
               - Otimizações de médio prazo
               - Estratégias de longo prazo

            5. PRÓXIMOS PASSOS
               - Prioridades para o próximo período
               - Testes sugeridos
               - Metas recomendadas

            Se não houver dados reais, crie um template de relatório
            com placeholders indicando onde cada métrica seria inserida.
            """,
            expected_output="""
            Relatório completo com métricas, análises, gráficos descritivos,
            tendências identificadas e recomendações acionáveis.
            """,
            agent=self.agent,
        )

        crew = Crew(agents=[self.agent], tasks=[task], verbose=True)
        result = crew.kickoff()
        return str(result)
