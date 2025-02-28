namespace CRM.Controllers.Report;

using System.Linq;
using System.Threading.Tasks;
using Constants;
using CRM.Models.Report.CustomerReport;
using CRM.Resources;
using CRM.Services.Report;
using CRM.ViewModels.Customer;
using Filters;
using Microsoft.AspNetCore.Mvc;
using Services.ExportExcel;
using Services.Interfaces;
using static Fanex.NAP.Client.Helpers.Business.Constant;

[CrmPermission(FunctionKey = FunctionKey.CustomerReport, Policy = Policy.Read)]
public class CustomerReportController(
    ISettingService settingService,
    ICustomerReportService customerReportService,
    IExportExcelService excelService)
    : BaseController
{
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
        var reportName = ViewResources.CustomerReportExcel;
        return File(bytes, MimeType.XLSX, $"{reportName}.xlsx");
    }
}