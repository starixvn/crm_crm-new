namespace CRM.Controllers.Report
{
    using System.Threading.Tasks;
    using CRM.Core.Constants;
    using CRM.Core.Filters;
    using CRM.Models.Report.CustomerReport;
    using CRM.Services;
    using CRM.Services.Report;
    using Microsoft.AspNetCore.Mvc;
    using static Fanex.NAP.Core.Business.Constant;

    [CrmPermission(FunctionKey = FunctionKey.CustomerReport, Policy = Policy.Read)]
    public class CustomerReportController : BaseController
    {
        private readonly ISettingService settingService;
        private readonly ICustomerReportService customerReportService;

        public CustomerReportController(
            ISettingService settingService,
            ICustomerReportService customerReportService
        )
        {
            this.settingService = settingService;
            this.customerReportService = customerReportService;
        }

        public IActionResult Index()
        {
            return View("../Report/Customer/Index");
        }

        public async Task<IActionResult> GetCustomerReport([FromBody] GetCustomerReportParam param)
        {
            var customerReport = await customerReportService.GetCustomerReportAsync(param);
            return Json(customerReport);
        }
    }
}
