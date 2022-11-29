namespace CRM.Controllers.HeadlineNotification
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Text;
    using System.Threading.Tasks;
    using CRM.Letstalk.Client.Services.Interfaces;
    using CRM.Services;
    using Fanex.NAP.Client.Helpers.Web;

    public class AnnouncementController : BaseController
    {
        private readonly INapSession napSession;
        private readonly ISettingService settingService;
        private readonly ICommonService commonService;

        public AnnouncementController(
           INapSession napSession,
           ISettingService settingService,
           ICommonService commonService
            )
        {
            this.napSession = napSession;
            this.settingService = settingService;
            this.commonService = commonService;
        }
    }
}
