export interface PipelineRunInfo {
  buildId: number;
  totalJobDuration: number;
}

export interface PipelineDefinitionInfo {
  pipelineId: number;
  pipelineName: string;
  runs: PipelineRunInfo[];
  totalCarbon: number;
}

export interface ProjectPipelineCarbonResponse {
  id: string;
  projectName: string;
  pipelines: PipelineDefinitionInfo[];
}

export const GeographyOptions: string[] = [
    "Australia",
    "Brazil",
    "Canada",
    "Asia Pacific",
    "Europe",
    "India",
    "United Kingdom",
    "United States"
];

export enum ResourceType {
    AzurePipeline,
    AzureCarbonOptimizer
}

export class Resource {
    id: string;
    name: string;
    type : ResourceType;
}

export class AzurePipelineResource extends Resource {
    override type: ResourceType = ResourceType.AzurePipeline;
    pipelineId: string;
    organization: string;
    project: string;
    geography: string;
}

export class AzureCarbonOptimizerResource extends Resource {
    override type: ResourceType = ResourceType.AzureCarbonOptimizer;
    subscriptionId: string;
    tenantId: string;
    clientId: string;
}
