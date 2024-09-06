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
    public class AccountsController : ControllerBase
    {
        private readonly IServiceProvider _serviceProvider;
        private readonly ILogger<AccountsController> _logger;

        public AccountsController(IServiceProvider serviceProvider)
        {
            _serviceProvider = serviceProvider;
            _logger = serviceProvider.GetRequiredService<ILogger<AccountsController>>();
        }

        [HttpGet("profile")]
        [ProducesResponseType(200, Type = typeof(AccountProfile))]
        public async Task<IActionResult> GetProfile()
        {
            var graphClient = _serviceProvider.GetRequiredKeyedService<GraphServiceClient>(MsGraphClientType.OnBehalfOf);
            var me = await graphClient.Me.GetAsync();

            if (me == null) return NotFound();

            return Ok(new AccountProfile()
            {
                DisplayName = me.DisplayName!,
                FirstName = me.GivenName!,
                LastName = me.Surname!,
                Email = me.UserPrincipalName!,
                ObjectId = Guid.Parse(me.Id!),
            });
        }
    }
}
