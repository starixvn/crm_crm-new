namespace CRM.Controllers.AdminTool;

using System.Threading.Tasks;
using Constants;
using CRM.Criteria.AdminTool.SettingManagement;
using CRM.Models.AdminTool;
using CRM.Services;
using CRM.ViewModels;
using Fanex.NAP.Client;
using Filters;
using Microsoft.AspNetCore.Mvc;
using Services.Interfaces;
using static Fanex.NAP.Client.Helpers.Business.Constant;

[CrmPermission(FunctionKey = FunctionKey.SettingManagement, Policy = Policy.Read)]
public class SettingManagementController(
    IBaseService baseService,
    ISettingService settingService,
    INapSession napSession)
    : BaseController
{
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
    [CrmPermission(FunctionKey = FunctionKey.SettingManagement, Policy = Policy.Host)]
    public async Task<IActionResult> EditStatusSetting([FromBody] EditStatusCommand command)
    {
        command.UserId = napSession.UserId;
        command.IP = ClientIP;
        var commandResult = await baseService.ExecuteNonQueryAsync(command);
        return Json(commandResult);
    }

    [HttpPost]
    [CrmPermission(FunctionKey = FunctionKey.SettingManagement, Policy = Policy.Host)]
    public async Task<IActionResult> InsertNewSetting([FromBody] AddNewSettingCommand command)
    {
        command.UserId = napSession.UserId;
        command.IP = ClientIP;
        var commandResult = await baseService.ExecuteNonQueryAsync(command);
        return Json(commandResult);

    }

    [HttpPost]
    [CrmPermission(FunctionKey = FunctionKey.SettingManagement, Policy = Policy.Host)]
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

        var commandResult = await baseService.ExecuteNonQueryAsync(command);
        _ = await baseService.ExecuteNonQueryAsync(criteria);

        return Json(commandResult);
    }

    [HttpPost]
    [CrmPermission(FunctionKey = FunctionKey.SettingManagement, Policy = Policy.Host)]
    public async Task<IActionResult> EditLicenseeMapping([FromBody] EditLicenseeMappingCommand command)
    {
        command.UserId = napSession.UserId;
        var commandResult = await baseService.ExecuteNonQueryAsync(command);
        return Json(commandResult);
    }
}