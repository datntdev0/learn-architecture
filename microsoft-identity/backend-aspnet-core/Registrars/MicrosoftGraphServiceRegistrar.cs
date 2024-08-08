using Microsoft.Graph;
using Microsoft.Identity.Client;
using System.Net.Http.Headers;

namespace backend_aspnet_core.Registrars
{
	public static class MicrosoftGraphServiceRegistrar
	{
		public static void AddMicrosoftGraphServiceClient(this WebApplicationBuilder builder)
		{
			// Configure the Microsoft Graph SDK
			var clientId = builder.Configuration["AzureAd:ClientId"];
			var clientSecret = builder.Configuration["AzureAd:ClientSecret"];
			var tenantId = builder.Configuration["AzureAd:TenantId"];

			var confidentialClientApplication = ConfidentialClientApplicationBuilder
			   .Create(clientId)
			   .WithClientSecret(clientSecret)
			   .WithTenantId(tenantId)
			   .Build();

			builder.Services.AddSingleton(sp =>
			{
				return new GraphServiceClient(new DelegateAuthenticationProvider(async (requestMessage) =>
				{
					var token = await confidentialClientApplication
						.AcquireTokenForClient(["https://graph.microsoft.com/.default"])
						.ExecuteAsync();
					requestMessage.Headers.Authorization = new AuthenticationHeaderValue("Bearer", token.AccessToken);
				}));
			});
		}
	}
}
