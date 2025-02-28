namespace CRM.Controllers.PicAndHeadline;

using System.Linq;
using System.Threading.Tasks;
using Constants;
using CRM.Criteria.PicAndHeadline;
using CRM.Resources;
using Fanex.NAP.Client;
using Filters;
using Microsoft.AspNetCore.Mvc;
using Models;
using Services.ExportExcel;
using Services.Interfaces;
using Services.PicAndHeadline;
using static Fanex.NAP.Client.Helpers.Business.Constant;

[CrmPermission(FunctionKey = FunctionKey.PICManagement, Policy = Policy.Read)]
public class PicManagementController(
    INapSession napSession,
    ISettingService settingService,
    IPicManagementService picManagementService,
    IExportExcelService excelService)
    : BaseController
{
    [HttpPost]
    public async Task<IActionResult> GetReport([FromBody] GetReportCriteria criteria)
    {
        var report = await picManagementService.GetReportAsync(criteria);
        return Json(report);
    }

    [HttpPost]
    public async Task<IActionResult> GetAllSetting()
    {
        var roles = await settingService.GetSettingAsync(SettingName.PicRole);
        var allSetting = new
        {
            RoleListWithInActive = roles,
            RoleList = roles.Where(role => role.IsActive),
            PicTypeList = await settingService.GetSettingAsync(SettingName.PicType, true), 
            CommunicationTools = await settingService.GetSettingAsync(SettingName.PicCommunicationTool, true),
            Languages = await settingService.GetSettingAsync(SettingName.Language, true),
            Countries = await settingService.GetCountryAsync(SettingConstants.Active)
        };
        return Json(allSetting);
    }

    public async Task<IActionResult> GetRolesByPic(int id)
    {
        var roles = await settingService.GetRolesByPicAsync(id);
        return Json(roles);
    }

    [HttpPost]
    public async Task<IActionResult> ExportExcel([FromBody] GetReportCriteria criteria)
    {
        criteria.PageIndex = 0;
        criteria.PageSize = 0;
        var communicationSetting = await settingService.GetSettingAsync(SettingName.PicCommunicationTool, true);
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
        var commandResult = await picManagementService.CreatePicAsync(criteria);
        return Json(commandResult);
    }

    [HttpPost]
    public async Task<IActionResult> ChangePicState([FromBody] ChangePicStateCriteria criteria)
    {
        criteria.UserId = napSession.UserId;
        criteria.LoginIP = ClientIP;
        var commandResult = await picManagementService.ChangePicStateAsync(criteria);
        return Json(commandResult);
    }

    [HttpPost]
    public async Task<IActionResult> EditPic([FromBody] EditPicCriteria criteria)
    {
        criteria.UserId = napSession.UserId;
        criteria.LoginIP = ClientIP;
        var commandResult = await picManagementService.EditPicAsync(criteria);
        return Json(commandResult);
    }

    [HttpPost]
    public async Task<IActionResult> ValidateEditPic([FromBody] ValidateEditPicCriteria criteria)
    {
        var result = await picManagementService.ValidateEditPicAsync(criteria);
        return Json(result);
    }
}