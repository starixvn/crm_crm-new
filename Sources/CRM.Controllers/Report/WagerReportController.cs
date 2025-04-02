namespace CRM.Controllers.Report;

using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Threading.Tasks;
using Constants;
using CRM.Criteria.Report.WagerReport;
using CRM.Models.Report.WagerReport;
using CRM.Resources;
using CRM.Services;
using Filters;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using Models;
using Services.ExportExcel;
using static Fanex.NAP.Client.Helpers.Business.Constant;

[CrmPermission(FunctionKey = FunctionKey.DirectCustomerReport, Policy = Policy.Read)]
public class WagerReportController(
    IExportExcelService exportExcelService,
    IOptionsSnapshot<AppSettings> appSettings,
    IBaseService baseService)
    : BaseController
{
    private readonly AppSettings appSettings = appSettings.Value;

    [HttpPost]
    public async Task<IActionResult> GetWagerReport([FromBody] GetWagerReportCriteria criteria)
    {
        criteria.TimeSpan = appSettings.TimeSpan * -1;
        var report = await GetWagerReportByYears(criteria);
        return Json(report);
    }

    [HttpPost]
    public async Task<IActionResult> ExportWagerReport([FromBody] GetWagerReportCriteria criteria)
    {
        criteria.TimeSpan = appSettings.TimeSpan * -1;
        var reports = await GetWagerReportByYears(criteria);
        var bytes = exportExcelService.ExportWagerReport(reports, criteria.Year);
        var reportName = string.Format(ViewResources.WagerReportExcelName, criteria.Year);
        return File(bytes, MimeType.XLSX, $"{reportName}.xlsx");
    }

    private async Task<WagerReportModel> GetWagerReportByYears(GetWagerReportCriteria criteria)
    {
        IList<WagerByMonth> wagerByMonths = new List<WagerByMonth>();
        IDictionary<string, Wager> grandTotalHash = new Dictionary<string, Wager>
        {
            { ViewResources.Accept, new Wager { Name = ViewResources.Accept, Amount = 0 } },
            { ViewResources.Reject, new Wager { Name = ViewResources.Reject, Amount = 0 } },
            { ViewResources.VoidRefund, new Wager { Name = ViewResources.VoidRefund, Amount = 0 } },
        };

        var grandTotal = 0;
        var rawData = await baseService.GetDataAsync<WagerRawData>(criteria);
        var dataList = rawData.GroupBy(w => w.Month);

        foreach (var month in dataList)
        {
            var wagerByMonth = new WagerByMonth
            {
                Month = month.Key.ToUpper(CultureInfo.InvariantCulture),
                Wagers = new List<Wager>(),
                Total = 0
            };

            foreach (var item in month)
            {
                var wager = new Wager
                {
                    Name = item.SubCategory,
                    Amount = item.NoOfIssues
                };

                wagerByMonth.Total += wager.Amount;
                wagerByMonth.Wagers.Add(wager);

                if (grandTotalHash.TryGetValue(wager.Name, out var value))
                {
                    value.Amount += wager.Amount;
                }
            }

            wagerByMonths.Add(wagerByMonth);
            grandTotal += wagerByMonth.Total;
        }

        return new WagerReportModel
        {
            WagerByMonths = wagerByMonths,
            GrandTotal = new WagerByMonth
            {
                Month = ViewResources.GrandTotal,
                Wagers = grandTotalHash.Values.ToList(),
                Total = grandTotal
            },
            ReportTitle = string.Format(ViewResources.WagerReportTitle, criteria.Year)
        };
    }
}