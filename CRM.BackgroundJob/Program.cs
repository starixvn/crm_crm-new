namespace Fanex.CRM.BackgroundJob
{
    using System;
    using global::CRM.BackgroundJob;
    using Microsoft.AspNetCore;
    using Microsoft.AspNetCore.Builder;
    using Microsoft.AspNetCore.Hosting;
    using Microsoft.Extensions.Hosting;
    using Serilog;

    public static class Program
    {
        public static void Main(string[] args)
        {
            Log.Information("Application start.");

            try
            {
                CreateWebHostBuilder(args).Build().Run();
            }
            catch (Exception ex)
            {
                Log.Fatal(ex, "Application terminated unexpectedly.");
            }
            finally
            {
                Log.CloseAndFlush();
            }
        }

        private static IWebHostBuilder CreateWebHostBuilder(string[] args) =>
            WebHost.CreateDefaultBuilder(args)
                .UseUrls($"http://*:5000")
                .UseStartup<Startup>();

        //.ConfigureLogging(logging =>
        //{
        //    logging.AddSerilog();
        //});
    }
}