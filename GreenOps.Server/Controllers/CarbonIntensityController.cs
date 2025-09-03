using Microsoft.AspNetCore.Mvc;
using GreenOps.Server.Models;
using System.Text.Json;
using System.Text.Json.Serialization;

namespace GreenOps.Server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CarbonIntensityController : ControllerBase
    {
        private static readonly List<Resource> Resources = new();

        [HttpGet("resources")]
        public ActionResult<IEnumerable<Resource>> GetResources()
        {
            return Ok(Resources);
        }

        [HttpPost("resources")]
        public ActionResult<Resource> RegisterResource([FromBody] JsonElement resourceJson)
        {
            if (!resourceJson.TryGetProperty("type", out var typeProp))
                return BadRequest("Missing resource type");

            Resource resource = typeProp.GetString() switch
            {
                nameof(ResourceType.AzurePipeline) => JsonSerializer.Deserialize<AzurePipelineResource>(resourceJson),
                nameof(ResourceType.AzureCarbonOptimizer) => JsonSerializer.Deserialize<AzureCarbonOptimizerResource>(resourceJson),
                _ => null
            };

            if (resource == null)
                return BadRequest("Invalid resource type or payload");

            resource.Id = Guid.NewGuid();
            Resources.Add(resource);
            return Ok(resource);
        }

        [HttpGet("intensity/{id}")]
        public ActionResult<double> GetCarbonIntensity(Guid id)
        {
            var resource = Resources.FirstOrDefault(r => r.Id == id);
            if (resource == null)
                return NotFound();

            double intensity = resource.Type switch
            {
                ResourceType.AzurePipeline => 42.0, // TODO: Replace with real calculation
                ResourceType.AzureCarbonOptimizer => 24.0, // TODO: Replace with real API call
                _ => 0.0
            };
            return Ok(intensity);
        }
    }
}
