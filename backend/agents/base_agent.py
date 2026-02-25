import os
import yaml
from pathlib import Path
from crewai import Agent, LLM

CONFIG_PATH = Path(__file__).parent.parent / "config" / "agents.yaml"


def load_agent_config(agent_key: str) -> dict:
    with open(CONFIG_PATH) as f:
        configs = yaml.safe_load(f)
    return configs[agent_key]


def get_llm() -> LLM:
    """Retorna o LLM configurado baseado nas variáveis de ambiente."""
    provider = os.getenv("LLM_PROVIDER", "glm5")

    if provider == "glm5":
        return LLM(
            model=os.getenv("GLM_MODEL", "glm-5"),
            base_url=os.getenv("GLM_BASE_URL", "https://api.z.ai/api/coding/paas/v4/"),
            api_key=os.getenv("GLM_API_KEY", ""),
            max_tokens=4096,
        )
    elif provider == "anthropic":
        return LLM(
            model="anthropic/claude-sonnet-4-20250514",
            api_key=os.getenv("ANTHROPIC_API_KEY", ""),
        )
    else:
        # OpenAI (default fallback)
        return LLM(
            model=os.getenv("OPENAI_MODEL", "openai/gpt-4o"),
            api_key=os.getenv("OPENAI_API_KEY", ""),
        )


def create_agent(
    agent_key: str,
    tools: list | None = None,
    llm: LLM | None = None,
    verbose: bool = True,
) -> Agent:
    config = load_agent_config(agent_key)
    return Agent(
        role=config["role"],
        goal=config["goal"],
        backstory=config["backstory"],
        tools=tools or [],
        llm=llm or get_llm(),
        verbose=verbose,
        allow_delegation=False,
    )
