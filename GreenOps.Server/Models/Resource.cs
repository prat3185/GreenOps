namespace GreenOps.Server.Models
{
    public abstract class Resource
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public abstract ResourceType Type { get; }
    }

    public class AzurePipelineResource : Resource
    {
        public override ResourceType Type => ResourceType.AzurePipeline;
        public string PipelineId { get; set; }
        public string Organization { get; set; }
        public string AccessToken { get; set; }
    }

    public class AzureCarbonOptimizerResource : Resource
    {
        public override ResourceType Type => ResourceType.AzureCarbonOptimizer;
        public string SubscriptionId { get; set; }
        public string TenantId { get; set; }
        public string ClientId { get; set; }
        public string ClientSecret { get; set; }
    }

    public enum ResourceType
    {
        AzurePipeline,
        AzureCarbonOptimizer
    }
}
