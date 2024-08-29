using Microsoft.AspNetCore.Authentication.JwtBearer;

namespace Learn.Azure.MicrosoftEntra.Identity.Service.Registrars
{
    public static class SwaggerRegistrarExtension
    {
        public static void AddSwaggerOpenApiExplorer(this IServiceCollection services)
        {
            services.AddEndpointsApiExplorer();
            services.AddSwaggerGen(options =>
            {
                options.AddSecurityDefinition(JwtBearerDefaults.AuthenticationScheme, new()
                {
                    Type = Microsoft.OpenApi.Models.SecuritySchemeType.Http,
                    In = Microsoft.OpenApi.Models.ParameterLocation.Header,
                    Description = "Please enter the access token",
                    Name = "Authorization",
                    BearerFormat = "JWT",
                    Scheme = JwtBearerDefaults.AuthenticationScheme
                });
                options.AddSecurityRequirement(new()
                {
                    {
                        new Microsoft.OpenApi.Models.OpenApiSecurityScheme()
                        {
                            Reference = new Microsoft.OpenApi.Models.OpenApiReference()
                            {
                                Id = JwtBearerDefaults.AuthenticationScheme,
                                Type = Microsoft.OpenApi.Models.ReferenceType.SecurityScheme,
                            },
                        },
                        Array.Empty<string>()
                    }
                });
            });
        }
    }
}
