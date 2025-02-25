using System.IO;
using CRM.Core.Extensions;
using CRM.Core.Middlewares;
using CRM.Services.Extensions;
using CRM.Website;
using Fanex.Data;
using Fanex.Logging.Sentry.RavenClient;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.FileProviders;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using NLog.Web;
using ONEbook.UM.DependencyInjection;

var builder = WebApplication.CreateBuilder(args);
var services = builder.Services;
var configuration = builder.Configuration;
NLogBuilder.ConfigureNLog("NLog.config");

builder.Logging.ClearProviders();
builder.Host.UseNLog();

services.ConfigureCrmOptions(configuration);
services.AddFanexData(configuration);
services.AddFanexLogSentry(configuration);
services.AddOneBookUmForWeb(configuration);
services.AddNapClient(configuration);
services.AddCoreServices(configuration);
services.AddCrmServices();
services.AddCrmHttpClient(configuration);
services.AddCrmAuthentication(configuration);
services.AddHealthChecks();

services.AddControllersWithViews(
    mvcOption => mvcOption.Filters.Add(new AutoValidateAntiforgeryTokenAttribute())
).AddNewtonsoftJson();


var app = builder.Build();
var env = app.Environment;
if (env.IsDevelopment())
{
    app.UseDeveloperExceptionPage();
    app.UseForwardedHeaders();
}
else
{
    app.UseMiddleware<ErrorHandler>();
    app.UseForwardedHeaders();
    app.UseHsts();
}

app.UseStaticFiles();
app.UseStaticFiles(new StaticFileOptions
{
    FileProvider = new PhysicalFileProvider(Path.Combine(env.ContentRootPath, "www", "dist")),
    RequestPath = ""
});

app.UseRouting();
app.UseCors(x => x.AllowAnyOrigin().AllowAnyMethod());
app.UseAuthentication();
app.UseAuthorization();
app.UseCookiePolicy();
app.UseSession();
app.UseHealthChecks("/Whoami");
app.MapControllerRoute(
    "default",
    "{controller=Home}/{action=Index}/{id?}");
app.MapFallbackToController("Index", "Home");

await app.RunAsync();