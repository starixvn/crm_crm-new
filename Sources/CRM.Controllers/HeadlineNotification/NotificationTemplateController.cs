namespace CRM.Controllers.HeadlineNotification;

using System.Threading.Tasks;
using Constants;
using CRM.Models.NotificationTemplate;
using Filters;
using Microsoft.AspNetCore.Mvc;
using Services.HeadlineNotification;
using Services.Interfaces;
using static Fanex.NAP.Client.Helpers.Business.Constant;

[CrmPermission(FunctionKey = FunctionKey.NotificationTemplate, Policy = Policy.Read)]
public class NotificationTemplateController(
    INotificationTemplateService templateService,
    ISettingService settingService)
    : BaseController
{
    [HttpPost]
    public async Task<IActionResult> GetNotificationTemplate([FromBody] GetNotificationTemplateParam param)
    {
        var templates = await templateService.GetAsync(param);
        return Json(new { totalItems = param.TotalRows, data = templates });
    }

    [HttpPost]
    [CrmPermission(FunctionKey = FunctionKey.NotificationTemplate, Policy = Policy.Host)]
    public async Task<IActionResult> Create([FromBody] CreateNotificationTemplate model)
    {
        model.LoginIP = ClientIP;
        var commandResult = await templateService.CreateAsync(model);
        return Json(commandResult);
    }

    public async Task<IActionResult> GetById(int id)
    {
        var template = await templateService.GetByIdAsync(id);
        return Json(template);
    }

    [HttpPost]
    [CrmPermission(FunctionKey = FunctionKey.NotificationTemplate, Policy = Policy.Host)]
    public async Task<IActionResult> Edit([FromBody] EditNotificationTemplate model)
    {
        model.LoginIP = ClientIP;
        var commandResult = await templateService.EditAsync(model);
        return Json(commandResult);
    }

    [HttpPost]
    [CrmPermission(FunctionKey = FunctionKey.NotificationTemplate, Policy = Policy.Host)]
    public async Task<IActionResult> Delete([FromBody] DeleteNotificationTemplate model)
    {
        model.LoginIP = ClientIP;
        var commandResult = await templateService.DeleteAsync(model);
        return Json(commandResult);
    }

    public async Task<IActionResult> GetLanguages()
    {
        var settings = await settingService.GetSettingAsync(SettingName.NotificationTemplateLanguage, true);
        return Json(settings);
    }
}