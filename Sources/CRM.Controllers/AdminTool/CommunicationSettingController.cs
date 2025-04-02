namespace CRM.Controllers.AdminTool;

using Constants;
using CRM.Models.AdminTool.CommunicationToolSetting;
using CRM.Services.Customer;
using Filters;
using Microsoft.AspNetCore.Mvc;
using Models;
using Services.AdminTool;
using Services.Interfaces;
using System.Threading.Tasks;
using static Fanex.NAP.Client.Helpers.Business.Constant;

[CrmPermission(FunctionKey = FunctionKey.DefaultCommunicationSetting, Policy = Policy.Read)]
public class CommunicationSettingController(
    ISettingService settingService,
    ICommunicationToolSettingService communicationToolService,
    ICustomerService customerService)
    : BaseController
{
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
        var communications = await communicationToolService.GetAllAsync(param);
        return Json(new { totalItems = param.TotalRows, data = communications });
    }

    public async Task<IActionResult> GetById(int id)
    {
        var communications = await communicationToolService.GetByIdAsync(id);
        if (communications == null)
        {
            return NotFound();
        }
        return Json(communications);
    }

    [HttpPost]
    [CrmPermission(FunctionKey = FunctionKey.DefaultCommunicationSetting, Policy = Policy.Host)]
    public async Task<IActionResult> Create([FromBody] CreateCommunicationToolSetting model)
    {
        var commandResult = await communicationToolService.CreateAsync(model);
        return Json(commandResult);
    }

    [HttpPost]
    [CrmPermission(FunctionKey = FunctionKey.DefaultCommunicationSetting, Policy = Policy.Host)]
    public async Task<IActionResult> Edit([FromBody] EditCommunicationToolSetting model)
    {
        var isHavePermissionEdit = await IsHavePermissionHostOnCustomer(model.DefaultCommId);
        if (!isHavePermissionEdit)
        {
            return Json(new CommandResult { Code = 1, Message = "No Permission" });
        }
        var commandResult = await communicationToolService.EditAsync(model);
        return Json(commandResult);
    }

    [HttpPost]
    [CrmPermission(FunctionKey = FunctionKey.DefaultCommunicationSetting, Policy = Policy.Host)]
    public async Task<IActionResult> Delete(int id)
    {
        var isHavePermissionDelete = await IsHavePermissionHostOnCustomer(id);
        if (!isHavePermissionDelete)
        {
            return Json(new CommandResult { Code = 1, Message = "No Permission" });
        }
        var commandResult = await communicationToolService.DeleteAsync(id);
        return Json(commandResult);
    }

    private async Task<bool> IsHavePermissionHostOnCustomer(int defaultCommunicationId)
    {
        var isHost = false;
        var communications = await communicationToolService.GetByIdAsync(defaultCommunicationId);
        if (communications is not null)
        {
            var username = communications.Username;
            var cust = await customerService.GetCustomerInfoAsync(new Criteria.Customer.GetCustomerInfoByUsernameCriteria { SearchInfo = username, IsCheckPermission = false });
            cust ??= await customerService.GetCustomerInfoAsync(new Criteria.Customer.GetCustomerInfoByUsernameCriteria { SearchInfo = username, IsCheckPermission = false, IsGuest = true });

            if (cust is not null)
            {
                isHost = await customerService.HasHostPermissionOnCustIdAsync(cust.CustId);
            }
        }
        return isHost;
    }
}