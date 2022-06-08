namespace CRM.Letstalk.Webhook
{
    using Microsoft.AspNetCore;
    using Microsoft.AspNetCore.Hosting;
    using Serilog;

    public static class Program
    {
        public static void Main(string[] args)
        {
            CreateWebHostBuilder(args).Build().Run();
        }

        public static IWebHostBuilder CreateWebHostBuilder(string[] args) =>
            WebHost.CreateDefaultBuilder(args)
            .UseUrls($"http://*:5000")
            .UseSerilog((hostingContext, loggerConfiguration) => loggerConfiguration.ReadFrom.Configuration(hostingContext.Configuration))
            .UseStartup<Startup>();
    }
}