namespace CRM.Controllers.AdminTool
{
    using System.Threading.Tasks;
    using CRM.Core.Constants;
    using CRM.Core.Filters;
    using CRM.Core.Models;
    using CRM.Core.Services;
    using CRM.Criteria.AdminTool.SettingManagement;
    using CRM.Services;
    using CRM.ViewModels;
    using Fanex.NAP.Client.Configuration;
    using Fanex.NAP.Client.Helpers.Web;
    using Fanex.NAP.Client.Services;
    using Microsoft.AspNetCore.Mvc;
    using static Fanex.NAP.Core.Business.Constant;
    //[CrmPermission(FunctionKey = FunctionKey.SettingManagement, Policy = Policy.Read)]
    public class SettingManagementController : Controller
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
           // var isHost = userService.IsHavingPermission(napSession.UserId, napSettings.SiteId, FunctionKey.SettingManagement, Policy.Host);
            return View(true);
        }

        public async Task<IActionResult> GetMainSettings()
        {
            var mainSetting = await settingService.GetMainSettingAsync();
            return Json(mainSetting);
        }


        [HttpPost]
        public async Task<IActionResult> GetSettingByType([FromBody] SettingTypeViewModel settingType)
        {
            var settingByTypes = await settingService.GetSettingByTypes(settingType.SettingName);
            return Json(settingByTypes);
        }

        [HttpPost]
        public async Task<IActionResult> EditStatusSettingAsync([FromBody] UpdateStatusCommand command)
        {
            try
            {
                command.UserId = napSession.UserId;
                command.IP = "ClientIP";
                CommandResult commandResult = await baseService.ExecuteNonQueryAsync(command);
                return Json(commandResult);
            }
            catch (System.Exception e)
            {

                throw;
            }
        }
    }
}
