namespace CRM.Controllers
{
    using System.Collections.Generic;
    using System.Threading.Tasks;
    using CRM.Criteria.Customer;
    using CRM.Models;
    using CRM.Services;
    using Microsoft.AspNetCore.Mvc;

    public class CustomerSettingController : Controller
    {
        private readonly ICustomerService customerService;

        public CustomerSettingController(ICustomerService customerService)
        {
            this.customerService = customerService;
        }

        [HttpPost]
        public async Task<IActionResult> VerifyUsername([FromBody] VerifyRelatedCustomerCriteria criteria)
        {
            IEnumerable<BaseModel> customers = await customerService.VerifyUsernameAsync(criteria);
            return Json(customers);
        }
    }
}