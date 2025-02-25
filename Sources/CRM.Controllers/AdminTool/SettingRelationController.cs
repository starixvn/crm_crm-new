namespace CRM.Controllers.AdminTool
{
    using System.Threading.Tasks;
    using CRM.Core.Constants;
    using CRM.Core.Filters;
    using CRM.Core.Models;
    using CRM.Core.Services;
    using CRM.Criteria.AdminTool;
    using CRM.Criteria.Setting;
    using CRM.Models.AdminTool.SettingLog;
    using CRM.Services;
    using CRM.ViewModels;
    using Fanex.NAP.Client;
    using Microsoft.AspNetCore.Mvc;
    using static Fanex.NAP.Client.Helpers.Business.Constant;

    [CrmPermission(FunctionKey = FunctionKey.SettingRelationManagement, Policy = Policy.Read)]
    public class SettingRelationController : BaseController
    {
        private readonly IBaseService baseService;
        private readonly ISettingService settingService;
        private readonly INapSession napSession;

        public SettingRelationController(
            IBaseService baseService,
            ISettingService settingService,
            INapSession napSession)
        {
            this.baseService = baseService;
            this.settingService = settingService;
            this.napSession = napSession;
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

        [HttpPost]
        public async Task<int> GetSettingRelationConfirm([FromBody] GetSettingRelationConfirm param)
        {
            var isHaveRemark = await settingService.GetSettingRelationConfirmAsync(param);
            return isHaveRemark;
        }
    }
}
