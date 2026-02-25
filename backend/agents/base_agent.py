import yaml
from pathlib import Path
from crewai import Agent

CONFIG_PATH = Path(__file__).parent.parent / "config" / "agents.yaml"


def load_agent_config(agent_key: str) -> dict:
    with open(CONFIG_PATH) as f:
        configs = yaml.safe_load(f)
    return configs[agent_key]


def create_agent(
    agent_key: str,
    tools: list | None = None,
    llm: str = "openai/gpt-4o",
    verbose: bool = True,
) -> Agent:
    config = load_agent_config(agent_key)
    return Agent(
        role=config["role"],
        goal=config["goal"],
        backstory=config["backstory"],
        tools=tools or [],
        llm=llm,
        verbose=verbose,
        allow_delegation=False,
    )
