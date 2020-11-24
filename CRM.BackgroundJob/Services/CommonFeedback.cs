namespace CRM.BackgroundJob.Services
{
    using System.IO;
    using Fanex.RemotingRef;
    using Microsoft.AspNetCore.Hosting;

    public interface ICommonFeedback
    {
        string GetProductName(string productId, string languageCode);
        string getFeedbackTemplates(string level);
    }
    public class CommonFeedback : ICommonFeedback
    {
        private readonly IHostingEnvironment hostingEnvironment;

        public CommonFeedback(IHostingEnvironment hostingEnvironment)
        {
            this.hostingEnvironment = hostingEnvironment;
        }

        public string GetProductName(string productId, string languageCode)
        {
            var productName = new RemotingRefService().GetResourceDataByRefIdAndResourceId("Product", productId, languageCode, string.Empty);
            return productName;
        }

        public string getFeedbackTemplates(string level)
        {
            const string path = "Format_Templates\\Company-WinLoss-Limit";
            var templateBlackLevelPath = Path.Combine(hostingEnvironment.ContentRootPath, path, level);
            var templateBlackLevel = File.ReadAllText(templateBlackLevelPath);
            return templateBlackLevel;
        }
    }
}
