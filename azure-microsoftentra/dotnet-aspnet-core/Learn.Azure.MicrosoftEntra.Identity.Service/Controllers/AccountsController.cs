using Learn.Azure.MicrosoftEntra.Identity.Service.Contracts;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Net;

namespace Learn.Azure.MicrosoftEntra.Identity.Service.Controllers
{
    [Authorize]
    [ApiController]
    [Route("[controller]")]
    public class AccountsController : ControllerBase
    {
        private readonly ILogger<AccountsController> _logger;

        public AccountsController(ILogger<AccountsController> logger)
        {
            _logger = logger;
        }

        [HttpGet("profile")]
        [ProducesResponseType(200, Type = typeof(AccountProfile))]
        public IActionResult GetProfile()
        {
            return Ok(new AccountProfile()
            {
                DisplayName = "Dat Nguyen",
                FirstName = "Dat",
                LastName = "Nguyen",
                Email = "datntdev@outlook.com",
                ObjectId = Guid.NewGuid(),
            });
        }
    }
}
