using Learn.Azure.MicrosoftEntra.Identity.Service.Contracts;
using Learn.Azure.MicrosoftEntra.Identity.Service.Registrars;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Graph;

namespace Learn.Azure.MicrosoftEntra.Identity.Service.Controllers
{
    [Authorize]
    [ApiController]
    [Route("[controller]")]
    public class UsersController : ControllerBase
    {
        private readonly string[] SELECT = ["id", "displayName", "givenName", "surname", "userPrincipalName", "accountEnabled"];

        private readonly ILogger<UsersController> _logger;
        private readonly GraphServiceClient _graphClient;

        public UsersController(IServiceProvider serviceProvider)
        {
            _logger = serviceProvider.GetRequiredService<ILogger<UsersController>>();
            _graphClient = serviceProvider.GetRequiredKeyedService<GraphServiceClient>(MsGraphClientType.ClientSecret);
        }

        [HttpGet("{userId:required:guid}")]
        [ProducesResponseType(typeof(UserGet), 200)]
        public async Task<IActionResult> GetAsync([FromRoute] Guid userId)
        {
            var result = await _graphClient.Users[userId.ToString()].GetAsync(config =>
            {
                config.QueryParameters.Select = SELECT;
            });

            if (result == null) return NotFound();

            return Ok(new UserGet(result));
        }

        [HttpGet]
        [ProducesResponseType(typeof(UserGet[]), 200)]
        public async Task<IActionResult> GetListAsync()
        {
            var result = await _graphClient.Users.GetAsync(config =>
            {
                config.QueryParameters.Select = SELECT;
            });
            
            if (result == null) return StatusCode(500);

            var userList = result.Value?.Select(x => new UserGet(x)) ?? [];

            return Ok(userList);
        }
    }
}
