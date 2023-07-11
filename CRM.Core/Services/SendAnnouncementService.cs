namespace CRM.Core.Services
{
    using System.Threading.Tasks;

    public interface ISendAnnouncementService
    {
        Task ScanSendAnđUpateAnnouncementNotification();
    }

    public class SendAnnouncementService : ISendAnnouncementService
    {
        public async Task ScanSendAnđUpateAnnouncementNotification()
        {
            throw new System.NotImplementedException();
        }
    }
}