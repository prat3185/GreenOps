namespace GreenOps.Server.Models
{
    public class PipelineRunInfo
    {
        public int BuildId { get; set; }
        public double TotalJobDuration { get; set; }
    }

    public class PipelineDefinitionInfo
    {
        public int PipelineId { get; set; }
        public string PipelineName { get; set; }
        public List<PipelineRunInfo> Runs { get; set; } = new();
        public double TotalCarbon { get; set; }
    }

    public class ProjectPipelineCarbonResponse
    {
        public Guid Id { get; set; }
        public string ProjectName { get; set; }
        public List<PipelineDefinitionInfo> Pipelines { get; set; } = new();
    }
}