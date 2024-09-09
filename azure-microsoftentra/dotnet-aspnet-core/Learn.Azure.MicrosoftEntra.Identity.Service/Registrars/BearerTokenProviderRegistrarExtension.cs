using Learn.Azure.MicrosoftEntra.Identity.Service.Providers;

namespace Learn.Azure.MicrosoftEntra.Identity.Service.Registrars
{
    public static class BearerTokenProviderRegistrarExtension
    {
        public static void AddBearerTokenProvider(this IServiceCollection services)
        {
            services.AddHttpContextAccessor();
            services.AddTransient<BearerTokenProvider>();
        }
    }
}
