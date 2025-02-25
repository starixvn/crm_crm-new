namespace CRM.Controllers
{
    using System.Collections.Generic;
    using System.Threading.Tasks;
    using CRM.Core.Constants;
    using CRM.Core.Filters;
    using CRM.Core.Models;
    using CRM.Models.NotificationTemplate;
    using CRM.Models.Setting;
    using CRM.Services;
    using Microsoft.AspNetCore.Mvc;
    using static Fanex.NAP.Client.Helpers.Business.Constant;

    [CrmPermission(FunctionKey = FunctionKey.NotificationTemplate, Policy = Policy.Read)]
    public class NotificationTemplateController : BaseController
    {
        private readonly INotificationTemplateService templateService;
        private readonly ISettingService settingService;

        public NotificationTemplateController(
            INotificationTemplateService templateService,
            ISettingService settingService)
        {
            this.templateService = templateService;
            this.settingService = settingService;
        }

        [HttpPost]
        public async Task<IActionResult> GetNotificationTemplate([FromBody] GetNotificationTemplateParam param)
        {
            IEnumerable<NotificationTemplate> templates = await templateService.GetAsync(param);
            return Json(new { totalItems = param.TotalRows, data = templates });
        }

        [HttpPost]
        [CrmPermission(FunctionKey = FunctionKey.NotificationTemplate, Policy = Policy.Host)]
        public async Task<IActionResult> Create([FromBody] CreateNotificationTemplate model)
        {
            model.LoginIP = ClientIP;
            CommandResult commandResult = await templateService.CreateAsync(model);
            return Json(commandResult);
        }

        public async Task<IActionResult> GetById(int id)
        {
            NotificationTemplate template = await templateService.GetByIdAsync(id);
            return Json(template);
        }

        [HttpPost]
        [CrmPermission(FunctionKey = FunctionKey.NotificationTemplate, Policy = Policy.Host)]
        public async Task<IActionResult> Edit([FromBody] EditNotificationTemplate model)
        {
            model.LoginIP = ClientIP;
            CommandResult commandResult = await templateService.EditAsync(model);
            return Json(commandResult);
        }

        [HttpPost]
        [CrmPermission(FunctionKey = FunctionKey.NotificationTemplate, Policy = Policy.Host)]
        public async Task<IActionResult> Delete([FromBody] DeleteNotificationTemplate model)
        {
            model.LoginIP = ClientIP;
            CommandResult commandResult = await templateService.DeleteAsync(model);
            return Json(commandResult);
        }

        public async Task<IActionResult> GetLanguages()
        {
            IEnumerable<Setting> settings = await settingService.GetSettingAsync(SettingName.NotificationTemplateLanguage, true);
            return Json(settings);
        }
    }
}