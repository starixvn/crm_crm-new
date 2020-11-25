namespace CRM.BackgroundJob.Services
{
    using System.IO;
    using CRM.BackgroundJob.Models;
    using CRM.Core.Extensions.XML;
    using Fanex.RemotingRef;
    using Microsoft.AspNetCore.Hosting;

    public interface ICommonFeedback
    {
        string GetProductName(string productId, string languageCode);
        FeedbackTemplate GetFeedbackTemplates(string fileXml);
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

        public FeedbackTemplate GetFeedbackTemplates(string fileXml)
        {
            const string path = "Format_Templates\\Company-WinLoss-Limit";
            var templateBlackLevelPath = Path.Combine(hostingEnvironment.ContentRootPath, path, fileXml);
            var listTemplate = XMLIO.DeserializeXMLFileToObject<FeedbackTemplate>(templateBlackLevelPath);
            return listTemplate;
        }
    }
}
