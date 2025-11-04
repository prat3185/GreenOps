using System.Text.Json.Serialization;

namespace GreenOps.Server.Models
{
    [JsonPolymorphic(TypeDiscriminatorPropertyName = "type")]
    [JsonDerivedType(typeof(AzurePipelineResource), "AzurePipeline")]
    [JsonDerivedType(typeof(AzureCarbonOptimizerResource), "AzureCarbonOptimizer")]
    public abstract class Resource
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public abstract ResourceType Type { get; }
    }

    public class AzurePipelineResource : Resource
    {
        public override ResourceType Type => ResourceType.AzurePipeline;
        public string Organization { get; set; }
        public string Project { get; set; } 
        public string Geography { get; set; }
        [JsonIgnore]
        public string PATToken { get; set; }
    }

    public class AzureCarbonOptimizerResource : Resource
    {
        public override ResourceType Type => ResourceType.AzureCarbonOptimizer;
        public string SubscriptionId { get; set; }
        public string TenantId { get; set; }
        [JsonIgnore]
        public string ClientId { get; set; }
        [JsonIgnore]
        public string ClientSecret { get; set; }
    }

    public enum ResourceType
    {
        AzurePipeline,
        AzureCarbonOptimizer
    }
}
