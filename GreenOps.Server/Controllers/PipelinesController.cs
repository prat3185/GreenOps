using Microsoft.AspNetCore.Mvc;
using GreenOps.Server.Data;
using GreenOps.Server.Models;
using GreenOps.Server.Services;
using Microsoft.TeamFoundation.Build.WebApi;
using Microsoft.VisualStudio.Services.Common;
using Microsoft.VisualStudio.Services.WebApi;

namespace GreenOps.Server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class PipelinesController : ControllerBase
    {

        public PipelinesController()
        {
        }

        [HttpGet]
        public async Task<IActionResult> GetAzurePipelinesCarbon()
        {
            var projects = new List<ProjectPipelineCarbonResponse>();
            var azureResources = StaticResources.Resources.OfType<AzurePipelineResource>();

            foreach (var resource in azureResources)
            {
                if (string.IsNullOrWhiteSpace(resource.PATToken))
                    continue;

                var connection = new VssConnection(
                    new Uri($"https://dev.azure.com/{resource.Organization}"),
                    new VssBasicCredential(string.Empty, resource.PATToken));

                var buildClient = connection.GetClient<BuildHttpClient>();
                var definitions = await buildClient.GetDefinitionsAsync(resource.Project, top: 3);
                var definitonDetails = new List<PipelineDefinitionInfo>();
                foreach (var def in definitions)
                {
                    var builds = await buildClient.GetBuildsAsync(resource.Project, new[] { def.Id });
                    var buildRuns = new List<PipelineRunInfo>();
                    double totalDuration = 0;
                    foreach (var build in builds)
                    {
                        if (!build.Queue.Pool.IsHosted)
                            continue;

                        var timeline = await buildClient.GetBuildTimelineAsync(resource.Project, build.Id);
                        double totalJobDuration = 0;
                        if (timeline?.Records != null)
                        {
                            var jobs = timeline.Records.Where(r => r.RecordType == "Job");
                            foreach (var job in jobs)
                            {
                                if (job.StartTime.HasValue && job.FinishTime.HasValue)
                                {
                                    var duration = (job.FinishTime.Value - job.StartTime.Value).TotalSeconds;
                                    totalJobDuration += duration;
                                }
                            }
                        }
                        buildRuns.Add(new PipelineRunInfo
                        {
                            BuildId = build.Id,
                            TotalJobDuration = totalJobDuration
                        });
                        totalDuration += totalJobDuration;
                    }
                    // Calculate total carbon for the definition (example: Microsoft-hosted, 2 CPU, 8GB RAM)
                    double totalCarbon = CarbonIntensityService.Calculate(
                        totalDuration,
                        resource.Geography);

                    definitonDetails.Add(new PipelineDefinitionInfo
                    {
                        PipelineId = def.Id,
                        PipelineName = def.Name,
                        Runs = buildRuns,
                        TotalCarbon = totalCarbon
                    });
                }
                projects.Add(new ProjectPipelineCarbonResponse
                {
                    Id = resource.Id,
                    ProjectName = resource.Project,
                    Pipelines = definitonDetails
                });
            }

            return Ok(projects);
        }
    }
}
