//evals.ts

import { EvalConfig } from 'mcp-evals';
import { openai } from "@ai-sdk/openai";
import { grade, EvalFunction } from "mcp-evals";

const codePlannerToolEval: EvalFunction = {
    name: "Chargebee Code Planner Tool Evaluation",
    description: "Evaluates the correctness and completeness of Chargebee-based code planning",
    run: async () => {
        const result = await grade(openai("gpt-4"), "Provide a step-by-step plan for integrating Chargebee into a web application for managing subscriptions, including API calls and necessary configurations.");
        return JSON.parse(result);
    }
};

const documentationSearchToolEval: EvalFunction = {
  name: 'documentationSearchTool Evaluation',
  description: 'Evaluates the correctness of the Chargebee documentation search functionality',
  run: async () => {
    const result = await grade(openai("gpt-4"), "Where in the Chargebee documentation can I find steps to configure subscription renewal notifications?");
    return JSON.parse(result);
  }
};

const config: EvalConfig = {
    model: openai("gpt-4"),
    evals: [codePlannerToolEval, documentationSearchToolEval]
};
  
export default config;
  
export const evals = [codePlannerToolEval, documentationSearchToolEval];