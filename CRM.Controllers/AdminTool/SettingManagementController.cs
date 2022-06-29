namespace CRM.Controllers.AdminTool
{
    using System;
    using System.Linq;
    using System.Threading.Tasks;
    using CRM.Core.Constants;
    using CRM.Core.Filters;
    using CRM.Core.Models;
    using CRM.Core.Services;
    using CRM.Criteria.AdminTool.SettingManagement;
    using CRM.Criteria.Setting;
    using CRM.Models.AdminTool;
    using CRM.Services;
    using CRM.ViewModels;
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
           var isHost = userService.IsHavingPermission(napSession.UserId, napSettings.SiteId, FunctionKey.SettingManagement, Policy.Host);
            return View(isHost);
        }

        public async Task<IActionResult> GetMainSettings()
        {
            var mainSetting = await settingService.GetMainSettingAsync();
            return Json(mainSetting);
        }

        public async Task<IActionResult> GetParentSettings()
        {
            var parents = await settingService.GetSettingAsync();
            return Json(parents);
        }

        public async Task<IActionResult> GetLicensees()
        {
            var criteria = new GetLicenseeCriteria();
            var licensees = await baseService.GetDataAsync<string>(criteria);
            return Json(licensees);
        }

        [HttpPost]
        public async Task<IActionResult> GetLicenseesMapping([FromBody] GetLicenseeMappingCriteria criteria)
        {
            var licenseesMapping = await baseService.GetDataAsync<LicenseeMapping>(criteria);
            return Json(licenseesMapping);
        }

        [HttpPost]
        public async Task<IActionResult> GetLicenseeManager([FromBody] GetLicenseeManagerCriteria criteria)
        {
            var licenseeManagers = await baseService.GetDataAsync<LicenseeManager>(criteria);
            return Json(licenseeManagers);
        }

        [HttpPost]
        public async Task<IActionResult> GetSettingByType([FromBody] SettingTypeViewModel settingType)
        {
            var settingByTypes = await settingService.GetSettingByTypes(settingType.SettingName);
            return Json(settingByTypes);
        }
        

        [HttpPost]
        public async Task<IActionResult> GetSourceMappingByType([FromBody] SettingTypeViewModel settingType)
        {
            var mappingByTypes = await settingService.GetSettingMappingAsync(settingType.SettingName);            
            return Json(mappingByTypes);
        }

        [HttpPost]
        public async Task<IActionResult> EditStatusSetting([FromBody] EditStatusCommand command)
        {
            command.UserId = napSession.UserId;
            command.IP = ClientIP;
            CommandResult commandResult = await baseService.ExecuteNonQueryAsync(command);
            return Json(commandResult);
        }

        [HttpPost]
        public async Task<IActionResult> InsertNewSetting([FromBody] AddNewSettingCommand command)
        {
            command.UserId = napSession.UserId;
            command.IP = ClientIP;
            CommandResult commandResult = await baseService.ExecuteNonQueryAsync(command);
            return Json(commandResult);

        }

        [HttpPost]
        public async Task<IActionResult> EditNewSetting([FromBody] EditNewSettingCommand command)
        {
            var criteria = new EditSourceSettingMappingCriteria
            {
                SettingID = command.SettingId,
                SettingSource = command.SettingSource,
                IP = command.IP
            };

            command.SettingSource = null;
            command.UserId = napSession.UserId;
            command.IP = ClientIP;

            CommandResult commandResult = await baseService.ExecuteNonQueryAsync(command);
            _ = await baseService.ExecuteNonQueryAsync(criteria);

            return Json(commandResult);
        }

        [HttpPost]
        public async Task<IActionResult> EditLicenseeMapping([FromBody] EditLicenseeMappingCommand command)
        {
            command.UserId = napSession.UserId;
            CommandResult commandResult = await baseService.ExecuteNonQueryAsync(command);
            return Json(commandResult);
        }
    }
}
