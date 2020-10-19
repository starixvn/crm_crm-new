namespace CRM.Controllers
{
    using System.Collections.Generic;
    using System.Threading.Tasks;
    using CRM.Core.Services;
    using CRM.Criteria.Customer;
    using CRM.Models;
    using Microsoft.AspNetCore.Mvc;

    public class CustomerSettingController : Controller
    {
        private readonly IBaseService baseService;

        public CustomerSettingController(IBaseService baseService)
        {
            this.baseService = baseService;
        }

        [HttpPost]
        public async Task<IActionResult> VerifyUsername([FromBody] VerifyRelatedCustomerCriteria criteria)
        {
            IEnumerable<BaseModel> customers = await baseService.GetDataAsync<BaseModel>(criteria);
            return Json(customers);
        }
    }
}