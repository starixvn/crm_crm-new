namespace CRM.Controllers.AdminTool
{
    using System.Collections.Generic;
    using System.Linq;
    using System.Threading.Tasks;
    using CRM.Core.Constants;
    using CRM.Core.Filters;
    using CRM.Core.Models;
    using CRM.Core.Services;
    using CRM.Criteria.AdminTool;
    using CRM.Criteria.Setting;
    using CRM.Models.Setting;
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
        public SettingRelationController(
            IBaseService baseService,
            ISettingService settingService,
            INapSession napSession)
        {
            this.baseService = baseService;
            this.settingService = settingService;
            this.napSession = napSession;
        }

        [NapAuth(FunctionKey = FunctionKey.SettingRelationManagement, Policy = Constant.Policy.Read)]
        public IActionResult Index()
        {
            return View();
        }

        public async Task<IActionResult> GetMainSettings()
        {
            var allSettings = await settingService.GetSettingAsync();
            var settingGroups = allSettings
                .GroupBy(x => new { Type = x.SettingName })
                .Select(group => new { group.Key, Count = group.Count() });
            var settingGroupByType = new List<Setting>();
            foreach (var group in settingGroups)
            {
                var subList = allSettings.Where(s => s.SettingName == group.Key.Type).Select(s => s).OrderBy(s => s.DisplayOrder).ToList();
                var setting = new Setting { SettingName = group.Key.Type, ChildSettings = subList };
                settingGroupByType.Add(setting);
            }
            var settingGroupOrder = settingGroupByType.OrderBy(s => s.DisplayOrder).ToList();
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
