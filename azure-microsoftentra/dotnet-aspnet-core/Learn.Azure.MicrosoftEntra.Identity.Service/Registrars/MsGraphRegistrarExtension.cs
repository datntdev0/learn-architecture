using Azure.Core;
using Azure.Identity;
using Learn.Azure.MicrosoftEntra.Identity.Service.Providers;
using Microsoft.Graph;

namespace Learn.Azure.MicrosoftEntra.Identity.Service.Registrars
{
    public enum MsGraphClientType
    {
        ClientSecret,
        OnBehalfOf,
    }

    public static class MsGraphRegistrarExtension
    {
        private readonly static string[] scopes = ["https://graph.microsoft.com/.default"];

        public static void AddMicrosoftGraphServiceClient(
            this IServiceCollection services, IConfiguration configuration)
        {
            services.AddKeyedTransient(MsGraphClientType.ClientSecret, (sp, key) =>
            {
                return CreateServiceClient(configuration, sp, (MsGraphClientType)key);
            });
            services.AddKeyedTransient(MsGraphClientType.OnBehalfOf, (sp, key) =>
            {
                return CreateServiceClient(configuration, sp, (MsGraphClientType)key);
            });
        }

        private static GraphServiceClient CreateServiceClient(
            IConfiguration configuration,
            IServiceProvider serviceProvider,
            MsGraphClientType type)
        {
            // Configure the Microsoft Graph SDK
            var tenantId = configuration["AzureAd:TenantId"];
            var clientId = configuration["AzureAd:ClientId"];
            var secret = configuration["AzureAd:ClientSecret"];

            TokenCredential? credential = null;

            if (type == MsGraphClientType.ClientSecret)
            {
                credential = new ClientSecretCredential(
                    tenantId, clientId, secret, new()
                    {
                        AuthorityHost = AzureAuthorityHosts.AzurePublicCloud,
                    });
            }

            if (type == MsGraphClientType.OnBehalfOf)
            {
                // This is the incoming token to exchange using on-behalf-of flow
                var tokenProvider = serviceProvider.GetRequiredService<BearerTokenProvider>();
                var token = tokenProvider.GetBearerToken();

                credential = new OnBehalfOfCredential(
                    tenantId, clientId, secret, token, new()
                    {
                        AuthorityHost = AzureAuthorityHosts.AzurePublicCloud,
                    });
            }

            return new GraphServiceClient(credential, scopes);
        }
    }
}
