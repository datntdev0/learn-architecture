using Learn.Azure.MicrosoftEntra.Identity.Service.Registrars;
using Microsoft.AspNetCore.Mvc;

namespace Learn.Azure.MicrosoftEntra.Identity.Service
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            // Allow to access HttpContext from custom services
            builder.Services.AddBearerTokenProvider();

            // Add services to the container.
            builder.Services.AddMicrosoftIdentityAuthentication(builder.Configuration);
            builder.Services.AddMicrosoftGraphServiceClient(builder.Configuration);

            builder.Services.AddControllers(options =>
            {
                options.Filters.Add(new ProducesAttribute("application/json"));
            });

            // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
            builder.Services.AddSwaggerOpenApiExplorer();

            var app = builder.Build();

            // Configure the HTTP request pipeline.
            if (app.Environment.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI();
            }

            app.UseHttpsRedirection();

            app.UseAuthentication();
            app.UseAuthorization();

            app.MapControllers();

            app.Run();
        }
    }
}
