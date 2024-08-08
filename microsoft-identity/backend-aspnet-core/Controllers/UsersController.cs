using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Graph;

namespace backend_aspnet_core.Controllers
{
	[Route("api/[controller]")]
	[ApiController]
	[Authorize]
	public class UsersController : ControllerBase
	{
		private readonly GraphServiceClient _graphServiceClient;

		public UsersController(IServiceProvider services)
		{
			_graphServiceClient = services.GetRequiredService<GraphServiceClient>();
		}

		[HttpPost]
		public async Task<IActionResult> CreateUser([FromBody] Contracts.User userContract)
		{
			var newUser = await _graphServiceClient.Users.Request().AddAsync(new()
			{
				AccountEnabled = true,
				DisplayName = userContract.DisplayName,
				GivenName = userContract.FirstName,
				Surname = userContract.LastName,
				UserPrincipalName = userContract.Email,
				MailNickname = userContract.Email.Split("@")[0],
				PasswordProfile = new PasswordProfile()
				{
					Password = userContract.Password,
				}
			});
			return CreatedAtAction(nameof(CreateUser), newUser);
		}
	}
}
