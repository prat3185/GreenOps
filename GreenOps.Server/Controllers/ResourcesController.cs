using Microsoft.AspNetCore.Mvc;
using GreenOps.Server.Data;
using GreenOps.Server.Models;

namespace GreenOps.Server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ResourcesController : ControllerBase
    {
        [HttpGet]
        public ActionResult<IEnumerable<Resource>> GetAllResources()
        {
            return Ok(StaticResources.Resources);
        }
    }
}
