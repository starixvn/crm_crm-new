namespace CRM.Controllers.Remark;

using System;
using System.Linq;
using System.Threading.Tasks;
using Constants;
using CRM.Criteria.Customer;
using CRM.Criteria.NewRemark;
using CRM.Services;
using CRM.Services.Customer;
using CRM.Services.Remark;
using Fanex.NAP.Client.Configuration;
using Fanex.NAP.Client;
using Filters;
using Microsoft.AspNetCore.Mvc;
using Models;
using Services.Interfaces;
using static Fanex.NAP.Client.Helpers.Business.Constant;

[CrmPermission(FunctionKey = FunctionKey.Remarks, Policy = Policy.Read)]
public class NewRemarkController(
    INapSession napSession,
    INapSettings napSettings,
    IPermissionService permissionService,
    IRemarkService remarkService,
    ISettingService settingService,
    ICommonService commonService,
    ICustomerService customerService)
    : BaseController
{
    public async Task<IActionResult> GetRemarkTitles()
    {
        var remarkSettings = await settingService.GetSettingAsync(SettingName.RemarkTitles, true);
        var remarkSettingsOrder = remarkSettings.ToList();
        return Json(remarkSettingsOrder);
    }

    public async Task<IActionResult> GetAllSetting()
    {
        var userCriteria = new GetAllCustomersCriteria
        {
            SiteId = napSettings.SiteId
        };
        var users = await customerService.GetAllCustomerAsync(userCriteria);
        var extentions = await settingService.GetSettingRelationByNameAsync(SettingTypeConstants.Extension, SettingConstants.Active);
        return Json(new
        {
            extentions,
            users,
            userId = napSession.UserId
        });
    }

    public async Task<IActionResult> GetRelatedPicsByCustId([FromBody] GetRelatedPicsCriteria criteria)
    {
        var relatedPics = await remarkService.GetRelatedPicByCustIdAsync(criteria);
        return Json(relatedPics);
    }

    public async Task<IActionResult> GetNewRemarks([FromBody] GetNewRemarkCriteria criteria)
    {
        if (criteria.Fromdate is not null && criteria.Todate is not null)
        {
            criteria.Fromdate = commonService.ConvertClientFromTimeToServerTime(Convert.ToDateTime(criteria.Fromdate));
            criteria.Todate = commonService.ConvertClientToTimeToServerTime(Convert.ToDateTime(criteria.Todate));
        }
        criteria.LicenseeType = await permissionService.GetCurrentUserLicenseeTypeAsync();
        criteria.SitePermission = await permissionService.GetCurrentUserCreditPermissionsAsync();
        var (newRemarksData, newRemarksFilter) = await remarkService.GetNewRemarkAsync(criteria);
        foreach (var remark in newRemarksData)
        {
            remark.CreatedDate = commonService.ConvertToClientDateTime(remark.CreatedDate);
            remark.LastUpdate = commonService.ConvertToClientDateTime(remark.LastUpdate);
        }
        foreach (var remarkFilter in newRemarksFilter)
        {
            remarkFilter.FromDate = commonService.ConvertToClientDateTime(remarkFilter.FromDate);
            remarkFilter.ToDate = commonService.ConvertToClientDateTime(remarkFilter.ToDate);
        }
        return Json(new { data = newRemarksData, dataFilter = newRemarksFilter, totalItems = criteria.TotalRows });
    }

    [HttpPost]
    public async Task<IActionResult> ValidateUsername([FromBody] CustomerRemarkNewCheckCriteria command)
    {
        command.LicenseeType = await permissionService.GetCurrentUserLicenseeTypeAsync();
        command.SitePermission = await permissionService.GetCurrentUserCreditPermissionsAsync();

        var relatedCustomers = await remarkService.ValidateUsernameAsyn(command);
        return Json(relatedCustomers);
    }

    [HttpPost]
    [CrmPermission(FunctionKey = FunctionKey.Remarks, Policy = Policy.Host)]
    public async Task<IActionResult> Create([FromBody] CreateNewReamarkCommand command)
    {
        if (!await IsValidPermisionOnCustId(command.CustID))
        {
            return Json(new CommandResult
            {
                Message = Resources.ViewResources.NoPermission
            });
        }
        command.CreatorID = napSession.UserId;
        command.ModifierID = napSession.UserId;
        command.IP = ClientIP;
        var commandResult = await remarkService.CreateNewAsync(command);
        return Json(commandResult);
    }

    [HttpPost]
    [CrmPermission(FunctionKey = FunctionKey.Remarks, Policy = Policy.Host)]
    public async Task<IActionResult> Edit([FromBody] EditNewRemarkCommand command)
    {
        if (!await IsValidPermisionOnCustId(command.CustID))
        {
            return Json(new CommandResult
            {
                Message = Resources.ViewResources.NoPermission
            });
        }
        command.ModifierID = napSession.UserId;
        command.IP = ClientIP;
        var commandResult = await remarkService.EditNewAsync(command);
        return Json(commandResult);
    }

    private async Task<bool> IsValidPermisionOnCustId(int custId)
    {
        var isValid = false;
        var cust = await customerService.GetSiteTypeByCustIdAsync(custId);
        if (cust is not null)
        {
            isValid = await permissionService.IsHavingPermissionByPolicyAsync(cust.SitePermission);
        }
        return isValid;
    }

    [HttpPost]
    public async Task<IActionResult> GetNewRemarkHistory([FromBody] GetCustomerRemarkNewHistoryCriteria criteria)
    {
        var histories = await remarkService.GetCustomerNewRemarkHistoryAsync(criteria);
        foreach (var history in histories)
        {
            history.LastUpdate = commonService.ConvertToClientDateTime(history.LastUpdate);
        }
        return Json(new { data = histories, totalItems = criteria.TotalRows });
    }

    [HttpPost]
    [CrmPermission(FunctionKey = FunctionKey.Remarks, Policy = Policy.Host)]
    public async Task<IActionResult> Delete([FromBody] DeleteNewRemarkCommand command)
    {
        command.UserID = napSession.UserId;
        command.IP = ClientIP;
        var commandResult = await remarkService.DeleteNewAsync(command);
        return Json(commandResult);
    }

    [HttpPost]
    public async Task<IActionResult> GetLastRemark([FromBody] GetLastFiveRemarksCriteria criteria)
    {
        var remarks = await remarkService.GetLastFiveRemarkAsync(criteria);
        foreach (var remark in remarks)
        {
            remark.CreatedDate = commonService.ConvertToClientDateTime(remark.CreatedDate);
        }
        return Json(remarks);
    }
}