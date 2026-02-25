from crewai import Crew, Task
from .base_agent import create_agent


class DesignCrew:
    """Agente de Design - cria briefings visuais e direção de arte."""

    def __init__(self, llm: str = "openai/gpt-4o"):
        self.agent = create_agent("design_agent", llm=llm)

    def create_visual_brief(
        self,
        brief: str,
        format: str = "instagram_feed",
        brand_colors: list[str] | None = None,
    ) -> str:
        colors_info = ""
        if brand_colors:
            colors_info = f"\nCores da marca: {', '.join(brand_colors)}"

        task = Task(
            description=f"""
            Crie um briefing detalhado de design para: {brief}

            Formato: {format}
            {colors_info}

            Inclua:
            1. Dimensões e especificações técnicas para o formato
            2. Paleta de cores (use as cores da marca se fornecidas)
            3. Estilo visual e referências
            4. Hierarquia dos elementos (título, subtítulo, CTA, imagem)
            5. Tipografia recomendada
            6. Variações necessárias (feed 1080x1080, stories 1080x1920, etc)
            7. Checklist de entregáveis

            Seja específico e prático - o briefing deve ser suficiente
            para um designer executar sem dúvidas.
            """,
            expected_output="""
            Briefing completo com especificações técnicas, diretrizes visuais,
            layout sugerido em formato descritivo, e checklist de entregáveis.
            """,
            agent=self.agent,
        )

        crew = Crew(agents=[self.agent], tasks=[task], verbose=True)
        result = crew.kickoff()
        return str(result)
