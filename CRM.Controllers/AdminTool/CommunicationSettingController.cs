namespace CRM.Controllers
{
    using System.Collections.Generic;
    using System.Threading.Tasks;
    using CRM.Core.Constants;
    using CRM.Core.Filters;
    using CRM.Core.Models;
    using CRM.Criteria.Setting;
    using CRM.Models.AdminTool.CommunicationToolSetting;
    using CRM.Services;
    using Fanex.NAP.Client.Configuration;
    using Fanex.NAP.Client.Helpers.Web;
    using Fanex.NAP.Client.Services;
    using Microsoft.AspNetCore.Mvc;
    using static Fanex.NAP.Core.Business.Constant;

    [CrmPermission(FunctionKey = FunctionKey.DefaultCommunicationSetting, Policy = Policy.Read)]
    public class CommunicationSettingController : BaseController
    {
        private readonly INapSession napSession;
        private readonly INapSettings napSettings;
        private readonly IUserService userService;
        private readonly ISettingService settingService;
        private readonly ICommunicationToolSettingService communicationToolService;

        public CommunicationSettingController(
            INapSession napSession,
            INapSettings napSettings,
            IUserService userService,
            ISettingService settingService,
            ICommunicationToolSettingService communicationToolService)
        {
            this.napSession = napSession;
            this.napSettings = napSettings;
            this.userService = userService;
            this.settingService = settingService;
            this.communicationToolService = communicationToolService;
        }

        //public IActionResult Index()
        //{
        //    var isHost = userService.IsHavingPermission(napSession.UserId, napSettings.SiteId, FunctionKey.DefaultCommunicationSetting, Policy.Host);
        //    return View(isHost);
        //}

        public async Task<IActionResult> GetAllSettings()
        {
            var settings = new
            {
                CommunicationTools = await settingService.GetCommunicationToolAsync(SettingConstants.Active),
                MainCategories = await settingService.GetMainCategoryAsync(SettingConstants.Active),
                SubCategories = await settingService.GetSubCategoryAsync(active: SettingConstants.Active)
            };

            return Json(settings);
        }

        [HttpPost]
        public async Task<IActionResult> GetCommunicationToolSetting([FromBody] GetGridDataParam param)
        {
            IEnumerable<CommunicationToolSetting> communications = await communicationToolService.GetAllAsync(param);
            return Json(new { totalItems = param.TotalRows, data = communications });
        }

        public async Task<IActionResult> GetById(int id)
        {
            CommunicationToolSetting communications = await communicationToolService.GetByIdAsync(id);
            if (communications == null)
            {
                return NotFound();
            }
            return Json(communications);
        }

        [HttpPost]
        [CrmPermission(FunctionKey = FunctionKey.DefaultCommunicationSetting, Policy = Policy.Host)]
        public async Task<IActionResult> Create([FromBody]CreateCommunicationToolSetting model)
        {
            CommandResult commandResult = await communicationToolService.CreateAsync(model);
            return Json(commandResult);
        }

        [HttpPost]
        [CrmPermission(FunctionKey = FunctionKey.DefaultCommunicationSetting, Policy = Policy.Host)]
        public async Task<IActionResult> Edit([FromBody]EditCommunicationToolSetting model)
        {
            CommandResult commandResult = await communicationToolService.EditAsync(model);
            return Json(commandResult);
        }

        [HttpPost]
        [CrmPermission(FunctionKey = FunctionKey.DefaultCommunicationSetting, Policy = Policy.Host)]
        public async Task<IActionResult> Delete(int id)
        {
            CommandResult commandResult = await communicationToolService.DeleteAsync(id);
            return Json(commandResult);
        }
    }
}