
namespace CRM.Controllers.AdminTool
{
    using System.Threading.Tasks;
    using CRM.Core.Constants;
    using CRM.Core.Filters;
    using CRM.Core.Services;
    using CRM.Services;
    using Fanex.NAP.Client.Configuration;
    using Fanex.NAP.Client.Helpers.Web;
    using Fanex.NAP.Client.Services;
    using Microsoft.AspNetCore.Mvc;
    using static Fanex.NAP.Core.Business.Constant;

    //[CrmPermission(FunctionKey = FunctionKey.CreateUpdateFeedbackAndCustomerInfo, Policy = Policy.Read)]
    public class SettingLogController : Controller
    {
        private readonly INapSession napSession;
        private readonly INapSettings napSettings;
        private readonly IUserService userService;
        private readonly ISettingService settingService;
        private readonly IBaseService baseService;


        public SettingLogController(
            INapSession napSession,
            INapSettings napSettings,
            IUserService userService,
            ISettingService settingService,
            IBaseService baseService
            )
        {
            this.napSession = napSession;
            this.napSettings = napSettings;
            this.userService = userService;
            this.settingService = settingService;
            this.baseService = baseService;
        }

        //[CrmPermission(FunctionKey = FunctionKey.SettingLog, Policy = Policy.Read)]
        public IActionResult Index()
        {
            return View();
        }

        public async Task<IActionResult> GetActionLogAsync()
        {
            var logAction = await settingService.GetAllLogActionAsync(2);
            return Json(logAction);
        }
    }
}
