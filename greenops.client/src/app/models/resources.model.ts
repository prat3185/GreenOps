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
        AzurePipeline = "Azure Pipeline",
        AzureCarbonOptimizer = "Azure Carbon Optimizer"
    }

    export class Resource {
        id: string;
        name: string;
        resourceType : ResourceType;
    }

    export class AzurePipelineResource extends Resource {
        override resourceType: ResourceType = ResourceType.AzurePipeline;
        pipelineId: string;
        organization: string;
        project: string;
        geography: string;
    }

    export class AzureCarbonOptimizerResource extends Resource {
        override resourceType: ResourceType = ResourceType.AzureCarbonOptimizer;
        subscriptionId: string;
        tenantId: string;
        clientId: string;
    }