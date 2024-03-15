namespace CRM.Controllers.Report
{
    using System.Linq;
    using System.Threading.Tasks;
    using CRM.Core.Constants;
    using CRM.Core.Filters;
    using CRM.Models.Report.CustomerReport;
    using CRM.Resources;
    using CRM.Services;
    using CRM.Services.Report;
    using CRM.ViewModels.Customer;
    using Microsoft.AspNetCore.Mvc;
    using static Fanex.NAP.Client.Helpers.Business.Constant;

    [CrmPermission(FunctionKey = FunctionKey.CustomerReport, Policy = Policy.Read)]
    public class CustomerReportController : BaseController
    {
        private readonly ISettingService settingService;
        private readonly ICustomerReportService customerReportService;
        private readonly IExportExcelService excelService;

        public CustomerReportController(
            ISettingService settingService,
            ICustomerReportService customerReportService,
            IExportExcelService excelService
        )
        {
            this.settingService = settingService;
            this.customerReportService = customerReportService;
            this.excelService = excelService;
        }

        public async Task<IActionResult> GetCustomerReport([FromBody] GetCustomerReportParam param)
        {
            var customerReport = await customerReportService.GetCustomerReportAsync(param);
            return Json(customerReport);
        }

        public async Task<IActionResult> GetAllSettings()
        {
            var roles = await settingService.GetSettingRelationByNameAsync(SettingTypeConstants.Role);

            var allSettings = new CreateCustomerInfoViewModel
            {
                Roles = roles.Where(x => x.IsActive),
                Sites = await settingService.GetAllSitesWithGroupAsync(),
                Languages = await settingService.GetLanguageAsync(SettingConstants.Active, true)
            };

            return Json(allSettings);
        }

        [HttpPost]
        public async Task<IActionResult> ExportExcel([FromBody] GetCustomerReportParam param)
        {
            var customerReport = await customerReportService.GetCustomerReportAsync(param);
            var bytes = excelService.ExportCustomerReport(customerReport);
            string reportName = ViewResources.CustomerReportExcel;
            return File(bytes, MimeType.XLSX, $"{reportName}.xlsx");
        }
    }
}
