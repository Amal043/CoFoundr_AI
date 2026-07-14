import { StartupProfile } from "@/lib/ai/services/orchestrator";
import { ResearchAgent } from "../research";
import { FinanceAgent } from "../finance";
import { MarketingAgent } from "../marketing";
import { ProductAgent } from "../product";
import { CeoAgent } from "../ceo";
import { AgentConfig, AgentLifecycleStatus } from "../types";

export interface WorkflowLog {
  timestamp: string;
  agentId: string;
  status: AgentLifecycleStatus;
  message: string;
}

export class WorkflowOrchestrator {
  private agents: Record<string, AgentConfig> = {
    research: ResearchAgent,
    finance: FinanceAgent,
    marketing: MarketingAgent,
    product: ProductAgent,
    ceo: CeoAgent,
  };

  private executionLogs: WorkflowLog[] = [];

  constructor() {
    this.resetStatuses();
  }

  public resetStatuses() {
    Object.keys(this.agents).forEach((key) => {
      this.agents[key].status = "ready";
      this.agents[key].startedAt = undefined;
      this.agents[key].completedAt = undefined;
      this.agents[key].duration = undefined;
    });
    this.executionLogs = [];
  }

  public getAgents(): AgentConfig[] {
    return Object.values(this.agents);
  }

  public getAgent(id: string): AgentConfig | undefined {
    return this.agents[id];
  }

  public getLogs(): WorkflowLog[] {
    return this.executionLogs;
  }

  private logEvent(agentId: string, status: AgentLifecycleStatus, message: string) {
    const time = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" });
    this.executionLogs.push({ timestamp: time, agentId, status, message });
    if (this.agents[agentId]) {
      this.agents[agentId].status = status;
      this.agents[agentId].lastUpdated = time;
    }
  }

  public async runOrchestrator(
    profile: StartupProfile,
    affectedAgents: string[],
    onProgress: (agentId: string, status: AgentLifecycleStatus, logs: WorkflowLog[]) => void
  ): Promise<Record<string, string>> {
    this.resetStatuses();
    const outputs: Record<string, string> = {};

    // Initialize statuses to waiting
    for (const key of Object.keys(this.agents)) {
      if (affectedAgents.includes(key) || key === "ceo") {
        this.agents[key].status = "waiting";
      }
    }

    // Step 1: Research Agent
    if (affectedAgents.includes("research")) {
      await this.executeAgentNode("research", profile, {}, outputs, onProgress);
    }

    // Step 2: Finance Agent
    if (affectedAgents.includes("finance")) {
      await this.executeAgentNode("finance", profile, { research: outputs.research || "" }, outputs, onProgress);
    }

    // Step 3: Marketing Agent
    if (affectedAgents.includes("marketing")) {
      await this.executeAgentNode("marketing", profile, { research: outputs.research || "" }, outputs, onProgress);
    }

    // Step 4: Product Agent
    if (affectedAgents.includes("product")) {
      await this.executeAgentNode(
        "product",
        profile,
        {
          research: outputs.research || "",
          finance: outputs.finance || "",
          marketing: outputs.marketing || "",
        },
        outputs,
        onProgress
      );
    }

    // Step 5: CEO Synthesis
    await this.executeAgentNode(
      "ceo",
      profile,
      {
        research: outputs.research || "",
        finance: outputs.finance || "",
        marketing: outputs.marketing || "",
        product: outputs.product || "",
      },
      outputs,
      onProgress
    );

    return outputs;
  }

  private async executeAgentNode(
    id: string,
    profile: StartupProfile,
    inputs: Record<string, string>,
    outputs: Record<string, string>,
    onProgress: (agentId: string, status: AgentLifecycleStatus, logs: WorkflowLog[]) => void
  ) {
    const startTime = Date.now();
    const agent = this.agents[id];
    if (!agent) return;

    // Preparing
    this.logEvent(id, "preparing", `${agent.name} is preparing context schema.`);
    onProgress(id, "preparing", this.executionLogs);
    await new Promise((resolve) => setTimeout(resolve, 400));

    // Running
    const startedTimeStr = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" });
    agent.startedAt = startedTimeStr;
    this.logEvent(id, "running", `${agent.name} is running reasoning prompts.`);
    onProgress(id, "running", this.executionLogs);

    try {
      const result = await agent.execute(profile, inputs);
      outputs[id] = result;

      // Reviewing
      this.logEvent(id, "reviewing", `${agent.name} is reviewing outputs.`);
      onProgress(id, "reviewing", this.executionLogs);
      await new Promise((resolve) => setTimeout(resolve, 400));

      // Completed
      const completedTimeStr = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" });
      const durationSec = ((Date.now() - startTime) / 1000).toFixed(1) + "s";
      agent.completedAt = completedTimeStr;
      agent.duration = durationSec;

      this.logEvent(id, "completed", `${agent.name} completed successfully.`);
      onProgress(id, "completed", this.executionLogs);
    } catch (err) {
      this.logEvent(id, "failed", `${agent.name} failed execution.`);
      onProgress(id, "failed", this.executionLogs);
      throw err;
    }
  }
}
