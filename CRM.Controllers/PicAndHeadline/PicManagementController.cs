namespace CRM.Controllers
{
    using System;
    using System.Linq;
    using System.Threading.Tasks;
    using CRM.Core.Constants;
    using CRM.Core.Filters;
    using CRM.Core.Models;
    using CRM.Criteria.PicAndHeadline;
    using CRM.Criteria.Setting;
    using CRM.Models;
    using CRM.Models.Setting;
    using CRM.Resources;
    using CRM.Services;
    using Fanex.NAP.Client.Configuration;
    using Fanex.NAP.Client.Helpers.Web;
    using Fanex.NAP.Client.Services;
    using Microsoft.AspNetCore.Mvc;
    using static Fanex.NAP.Core.Business.Constant;

    [CrmPermission(FunctionKey = FunctionKey.PICManagement, Policy = Policy.Read)]
    public class PicManagementController : BaseController
    {
        private readonly INapSession napSession;
        private readonly ISettingService settingService;
        private readonly IUserService userService;
        private readonly INapSettings napSettings;
        private readonly IPicManagementService picManagementService;
        private readonly IExportExcelService excelService;

        public PicManagementController(
            INapSession napSession,
            ISettingService settingService,
            IUserService userService,
            INapSettings napSettings,
            IPicManagementService picManagementService,
            IExportExcelService excelService)
        {
            this.napSession = napSession;
            this.settingService = settingService;
            this.userService = userService;
            this.napSettings = napSettings;
            this.picManagementService = picManagementService;
            this.excelService = excelService;
        }

        public IActionResult Index()
        {
            var isHost = userService.IsHavingPermission(napSession.UserId, napSettings.SiteId, FunctionKey.PICManagement, Policy.Host);
            return View(isHost);
        }

        [HttpPost]
        public async Task<IActionResult> GetReport([FromBody] GetReportCriteria criteria)
        {
            var report = await picManagementService.GetReportAsync(criteria);
            return Json(report);
        }

        [HttpPost]
        public async Task<IActionResult> GetAllSetting()
        {
            var roles = await settingService.GetAsync(new GetSettingParam { SettingName = SettingName.PicRole, UserRole = Constants.UserRole });
            var allSetting = new
            {
                RoleListWithInActive = roles,
                RoleList = roles.Where(role => role.IsActive),
                CommunicationTools = await settingService.GetAsync(new GetSettingParam { IsActive = true, SettingName = SettingName.PicCommunicationTool, UserRole = Constants.UserRole }),
                Languages = await settingService.GetAsync(new GetSettingParam {
                    IsActive = true, SettingName = SettingName.Language, UserRole = Constants.UserRole }),
                Countries = await settingService.GetAllCountryAsync(new GetAllCountryCriteria())
            };
            return Json(allSetting);
        }

        [HttpPost]
        public async Task<IActionResult> ExportExcel([FromBody] GetReportCriteria criteria)
        {
            criteria.PageIndex = 0;
            criteria.PageSize = 0;
            var communicationSetting = await settingService.GetAsync(new GetSettingParam { IsActive = true, SettingName = SettingName.PicCommunicationTool });
            var communicationTools = communicationSetting.Select(x => new BaseModel { Id = x.SettingId, Name = x.SettingValue });
            var report = await picManagementService.GetReportAsync(criteria);
            var bytes = excelService.ExportPICManagement(communicationTools, report);
            return File(bytes, MimeType.XLSX, $"{ViewResources.PICManagement}.xlsx");
        }

        [HttpPost]
        public async Task<IActionResult> CreatePic([FromBody] CreatePicCriteria criteria)
        {
            criteria.UserId = napSession.UserId;
            criteria.LoginIP = ClientIP;
            CommandResult commandResult = await picManagementService.CreatePicAsync(criteria);
            return Json(commandResult);
        }

        [HttpPost]
        public async Task<IActionResult> ChangePicState([FromBody] ChangePicStateCriteria criteria)
        {
            criteria.UserId = napSession.UserId;
            criteria.LoginIP = ClientIP;
            CommandResult commandResult = await picManagementService.ChangePicStateAsync(criteria);
            return Json(commandResult);
        }

        [HttpPost]
        public async Task<IActionResult> EditPic([FromBody] EditPicCriteria criteria)
        {
            criteria.UserId = napSession.UserId;
            criteria.LoginIP = ClientIP;
            CommandResult commandResult = await picManagementService.EditPicAsync(criteria);
            return Json(commandResult);
        }

        [HttpPost]
        public async Task<IActionResult> ValidateEditPic([FromBody] ValidateEditPicCriteria criteria)
        {
            var result = await picManagementService.ValidateEditPicAsync(criteria);
            return Json(result);
        }
    }
}