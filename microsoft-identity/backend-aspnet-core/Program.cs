using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.Identity.Web;
using backend_aspnet_core.Registrars;

namespace backend_aspnet_core
{
	public class Program
	{
		public static void Main(string[] args)
		{
			var builder = WebApplication.CreateBuilder(args);

			// Add services to the container.
			builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
				.AddMicrosoftIdentityWebApi(builder.Configuration.GetSection("AzureAd"));

			builder.AddMicrosoftGraphServiceClient();

			builder.Services.AddRouting(x => x.LowercaseUrls = true);
			builder.Services.AddControllers();

			builder.AddSwaggerApiExplorerGeneration();

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
