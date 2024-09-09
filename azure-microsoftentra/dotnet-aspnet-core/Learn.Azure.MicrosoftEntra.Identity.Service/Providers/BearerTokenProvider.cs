namespace Learn.Azure.MicrosoftEntra.Identity.Service.Providers
{
    public class BearerTokenProvider
    {
        private readonly IHttpContextAccessor _httpContextAccessor;

        public BearerTokenProvider(IServiceProvider serviceProvider) 
        {
            _httpContextAccessor = serviceProvider.GetRequiredService<IHttpContextAccessor>();
        }

        public string? GetBearerToken()
        {
            var httpContext = _httpContextAccessor.HttpContext;
            var authorizationHeader = httpContext?.Request.Headers.Authorization;
            var token = authorizationHeader.ToString()?.Replace("Bearer ", "");
            return token;
        }
    }
}
