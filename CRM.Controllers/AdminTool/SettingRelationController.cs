namespace CRM.Controllers.AdminTool
{
    using System.Threading.Tasks;
    using CRM.Core.Constants;
    using CRM.Core.Filters;
    using CRM.Core.Models;
    using CRM.Core.Services;
    using CRM.Criteria.AdminTool;
    using CRM.Criteria.Setting;
    using CRM.Services;
    using CRM.ViewModels;
    using Fanex.NAP.Client.AspNetCore.Attributes;
    using Fanex.NAP.Client.Configuration;
    using Fanex.NAP.Client.Helpers.Web;
    using Fanex.NAP.Client.Services;
    using Fanex.NAP.Core.Business;
    using Microsoft.AspNetCore.Mvc;
    using static Fanex.NAP.Core.Business.Constant;

    public class SettingRelationController : BaseController
    {
        private readonly IBaseService baseService;
        private readonly ISettingService settingService;
        private readonly INapSession napSession;
        private readonly INapSettings napSettings;
        private readonly IUserService userService;

        public SettingRelationController(
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

        [CrmPermission(FunctionKey = FunctionKey.SettingRelationManagement, Policy = Constant.Policy.Read)]
        public IActionResult Index()
        {
            var isHost = userService.IsHavingPermission(napSession.UserId, napSettings.SiteId, FunctionKey.SettingManagement, Policy.Host);
            return View(isHost);
        }

        public async Task<IActionResult> GetMainSettings()
        {
            var settingGroupOrder = await settingService.GetMainSettingAsync();
            return Json(settingGroupOrder);
        }

        [HttpPost]
        public async Task<IActionResult> GetSettingByType([FromBody] SettingTypeViewModel settingType)
        {
            var settingByTypes = await settingService.GetSettingByTypes(settingType.SettingName);
            return Json(settingByTypes);
        }

        [HttpPost]
        public async Task<IActionResult> GetMainSettingRelation([FromBody] GetSettingRelationByNameCriteria criteria)
        {
            criteria.Active = criteria.SettingName == "Site" ? SettingConstants.ActiveAndInactive : SettingConstants.Active;
            var mainRelations = await settingService.GetMainSettingRelationAsync(criteria);
            return Json(mainRelations);
        }

        [HttpPost]
        [CrmPermission(FunctionKey = FunctionKey.SettingRelationManagement, Policy = Policy.Host)]
        public async Task<IActionResult> Update([FromBody] UpdateSettingRelationCommand command)
        {
            command.Ip = ClientIP;
            command.UserId = napSession.UserId;
            CommandResult commandResult = await baseService.ExecuteNonQueryAsync(command);
            return Json(commandResult);
        }
    }
}
