namespace CRM.Controllers.AdminTool
{
    using CRM.Core.Constants;
    using CRM.Core.Filters;
    using CRM.Core.Services;
    using CRM.Services;
    using Fanex.NAP.Client.Configuration;
    using Fanex.NAP.Client.Helpers.Web;
    using Fanex.NAP.Client.Services;
    using Microsoft.AspNetCore.Mvc;
    using static Fanex.NAP.Core.Business.Constant;
    [CrmPermission(FunctionKey = FunctionKey.SettingManagement, Policy = Policy.Read)]
    public class SettingManagementController : BaseController
    {
        private readonly IBaseService baseService;
        private readonly ISettingService settingService;
        private readonly INapSession napSession;
        private readonly INapSettings napSettings;
        private readonly IUserService userService;
        public SettingManagementController(
            IBaseService baseService,
            ISettingService settingService,
            INapSession napSession,
            INapSettings napSettings,
            IUserService userService)
        {
            this.baseService = baseService;
            this.settingService = settingService;
            this.napSession = napSession;
            this.napSettings = napSettings;
            this.userService = userService;
        }

        public IActionResult Index()
        {
            var isHost = userService.IsHavingPermission(napSession.UserId, napSettings.SiteId, FunctionKey.FeedbackSubject, Policy.Host);
            return View();
        }
    }
}
