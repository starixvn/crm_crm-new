namespace CRM.Website
{
    using Microsoft.AspNetCore;
    using Microsoft.AspNetCore.Hosting;
    using Microsoft.Extensions.Configuration;
    using NLog;
    using NLog.Web;
    using System;

    public static class Program
    {
        public static void Main(string[] args)
        {
            var logger = NLogBuilder.ConfigureNLog("NLog.config").GetCurrentClassLogger();
            try
            {
                CreateWebHostBuilder(args).Build().Run();
            }
            catch (Exception exception)
            {
                logger.Error(exception, "Stopped program because of exception");
                throw;
            }
            finally
            {
                LogManager.Shutdown();
            }
        }

        public static IWebHostBuilder CreateWebHostBuilder(string[] args)
        {
            bool isDevelopment = Environment.GetEnvironmentVariable("ASPNETCORE_ENVIRONMENT") == "Development";
            if (isDevelopment)
            {
                return WebHost.CreateDefaultBuilder(args)
                    .UseNLog()
                    .UseStartup<Startup>();
            }

            return WebHost.CreateDefaultBuilder(args)
                    .UseNLog()
                    .ConfigureAppConfiguration((hostingContext, config) =>
                    {
                        config.AddJsonFile("appsettings.json",
                            optional: true,
                            reloadOnChange: false);
                    })
                    .UseUrls($"http://*:5000")
                    .UseStartup<Startup>();
        }
    }
}