using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.Identity.Web;

namespace Learn.Azure.MicrosoftEntra.Identity.Service.Registrars
{
    public static class AuthenticationRegistrarExtension
    {
        public static void AddMicrosoftIdentityAuthentication(
            this IServiceCollection services, IConfiguration configuration)
        {
            var azureAdConfiguration = configuration.GetSection("AzureAd");
            services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
                .AddMicrosoftIdentityWebApi(azureAdConfiguration, JwtBearerDefaults.AuthenticationScheme);
        }
    }
}
