namespace CRM.Controllers
{
    using System.Collections.Generic;
    using System.Threading.Tasks;
    using CRM.Core.Services;
    using CRM.Criteria.Customer;
    using CRM.Models.Customer;
    using Microsoft.AspNetCore.Mvc;

    public class CustomerSettingController : Controller
    {
        private readonly IBaseService baseService;
        private readonly IPermissionService permissionService;

        public CustomerSettingController(IBaseService baseService, IPermissionService permissionService)
        {
            this.baseService = baseService;
            this.permissionService = permissionService;
        }

        [HttpPost]
        public async Task<IActionResult> VerifyUsername([FromBody] VerifyRelatedCustomerCriteria criteria)
        {
            criteria.LicenseeType = await permissionService.GetCurrentUserLicenseeTypeAsync();
            criteria.SitePermission = await permissionService.GetCurrentUserCreditPermissionsAsync();
            IEnumerable<RelatedCustomerPermission> customers = await baseService.GetDataAsync<RelatedCustomerPermission>(criteria);
            return Json(customers);
        }
    }
}