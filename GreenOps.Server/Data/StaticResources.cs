using GreenOps.Server.Models;

namespace GreenOps.Server.Data
{
    public static class StaticResources
    {
        public static List<Resource> Resources = new List<Resource>
        {
            new AzurePipelineResource
            {
                Id = new Guid("fb939564-6776-47cb-a004-57467efc90a0"),
                Name = "Demo Azure Pipeline",
                Organization = Environment.GetEnvironmentVariable("DEMO_ORG") ?? "Demo Organization",
                Project = Environment.GetEnvironmentVariable("DEMO_PROJECT") ?? "Demo Project",
                Geography = "West Europe",
                PATToken = Environment.GetEnvironmentVariable("DEMO_PAT") ?? ""
            },
            new AzureCarbonOptimizerResource
            {
                Id = new Guid("b7188d6a-0ecf-48e7-bc56-e49e9545dd55"),
                Name = "Sample Carbon Optimizer",
                SubscriptionId = "00000000-0000-0000-0000-000000000000",
                TenantId = "11111111-1111-1111-1111-111111111111",
                ClientId = Environment.GetEnvironmentVariable("DEMO_CLIENT_ID") ?? "",
                ClientSecret = Environment.GetEnvironmentVariable("DEMO_CLIENT_SECRET") ?? ""
            }
        };
    }
}
