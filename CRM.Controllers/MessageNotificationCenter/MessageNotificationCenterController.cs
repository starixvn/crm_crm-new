namespace CRM.Controllers.MessageNotificationCenter
{
    using CRM.Core.Services;
    using Fanex.NAP.Client.Helpers.Web;

    public class MessageNotificationCenterController : BaseController
    {
        private readonly INapSession napSession;
        private readonly IBaseService baseService;

        public MessageNotificationCenterController(
            INapSession napSession,
            IBaseService baseService
        )
        {
            this.napSession = napSession;
            this.baseService = baseService;
        }
    }
}
