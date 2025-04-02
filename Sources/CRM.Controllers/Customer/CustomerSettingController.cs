namespace CRM.Controllers.Customer;

using System.Threading.Tasks;
using CRM.Criteria.Customer;
using CRM.Models.Customer;
using Microsoft.AspNetCore.Mvc;
using Services;

public class CustomerSettingController(IBaseService baseService, IPermissionService permissionService)
    : Controller
{
    [HttpPost]
    public async Task<IActionResult> VerifyUsername([FromBody] VerifyRelatedCustomerCriteria criteria)
    {
        criteria.LicenseeType = await permissionService.GetCurrentUserLicenseeTypeAsync();
        criteria.SitePermission = await permissionService.GetCurrentUserCreditPermissionsAsync();
        var customers = await baseService.GetDataAsync<RelatedCustomerPermission>(criteria);
        return Json(customers);
    }
}