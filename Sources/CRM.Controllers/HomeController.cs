namespace CRM.Controllers;

using System.Threading.Tasks;
using Constants;
using Filters;
using Microsoft.AspNetCore.Mvc;
using ONEbook.UM.Filters;
using Services;
using static Fanex.NAP.Client.Helpers.Business.Constant;

[ServiceFilter(typeof(CheckUMFilterAttribute))]
[CrmAuthorize]
public class HomeController(IPermissionService permissionService) : Controller
{
    public async Task<IActionResult> Index()
    {
        var hasReadCreditPermission = await permissionService.IsHavingPermissionByPolicyAsync(FunctionKey.Credit);
        var hasReadLicenseePermission = await permissionService.IsHavingPermissionByPolicyAsync(FunctionKey.Licensee);

        var hasReadFeedbackInfoPermission = await permissionService.IsHavingPermissionByPolicyAsync(FunctionKey.CreateUpdateFeedback);
        var hasCreateFeedbackPermission = await permissionService.IsHavingPermissionByPolicyAsync(FunctionKey.CreateUpdateFeedback, Policy.Host);

        var hasReadSitePermission = hasReadCreditPermission || hasReadLicenseePermission;
        ViewBag.hasReadFeedbackPermission = hasReadFeedbackInfoPermission && hasReadSitePermission;
        ViewBag.hasReadSitePermission = hasReadSitePermission;
        ViewBag.hasReadCustomerInfo = await permissionService.IsHavingPermissionByPolicyAsync(FunctionKey.CustomerInfo);
        ViewBag.hasHeadlineInfoPermission = await permissionService.IsHavingPermissionByPolicyAsync(FunctionKey.Headlineinfo);
        ViewBag.hasReadLicenseePermission = hasReadLicenseePermission;
        ViewBag.hasReadCreditPermission = hasReadCreditPermission;

        var hasHostPicManagementPermission = await permissionService.IsHavingPermissionByPolicyAsync(FunctionKey.PICManagement);

        ViewBag.hasHostPicManagementPermission = hasHostPicManagementPermission;
        return View(hasCreateFeedbackPermission);
    }
}