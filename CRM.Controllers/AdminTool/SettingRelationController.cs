namespace CRM.Controllers.AdminTool
{
    using System.Collections.Generic;
    using System.Linq;
    using System.Threading.Tasks;
    using CRM.Core.Constants;
    using CRM.Core.Services;
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

    public class SettingRelationController : Controller
    {
        private readonly ICommonService commonService;
        private readonly IBaseService baseService;
        private readonly ISettingService settingService;
        private readonly IExportExcelService excelService;
        private readonly INapSession napSession;
        private readonly INapSettings napSettings;
        private readonly IUserService userService;
        public SettingRelationController(
            ICommonService commonService,
            IBaseService baseService,
            ISettingService settingService,
            IExportExcelService excelService,
            INapSession napSession,
            INapSettings napSettings,
            IUserService userService)
        {
            this.commonService = commonService;
            this.baseService = baseService;
            this.settingService = settingService;
            this.excelService = excelService;
            this.napSession = napSession;
            this.napSettings = napSettings;
            this.userService = userService;
        }

        //[NapAuth(FunctionKey = FunctionKey.SettingRelationManagement, Policy = Constant.Policy.Read)]
        public IActionResult Index()
        {
            //var isHost = userService.IsHavingPermission(napSession.UserId, napSettings.SiteId, FunctionKey.SettingRelationManagement, Constant.Policy.Host);
            return View(true);
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
    }
}
