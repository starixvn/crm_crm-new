namespace CRM.Controllers.Report
{
    using CRM.Core.Constants;
    using CRM.Core.Models;
    using CRM.Criteria.Report.WagerReport;
    using CRM.Models.Report.WagerReport;
    using CRM.Resources;
    using CRM.Services;
    using Microsoft.AspNetCore.Mvc;
    using Microsoft.Extensions.Options;
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Text;
    using System.Threading.Tasks;

    public class WagerReportController : Controller
    {
        private readonly IExportExcelService exportExcelService;
        private readonly AppSettings appSettings;

        public WagerReportController(
            IExportExcelService exportExcelService,
            IOptionsSnapshot<AppSettings> appSettings)
        {
            this.exportExcelService = exportExcelService;
            this.appSettings = appSettings.Value;
        }

        public IActionResult Index()
        {
            return View("../Report/Wager/Index");
        }

        [HttpPost]
        public async Task<IActionResult> GetWagerReport([FromBody] GetWagerReportCriteria criteria)
        {
            criteria.Year = 2022;
            criteria.TimeSpan = appSettings.TimeSpan * -1;
            var report = await GetWagerReportAsync(criteria);
            return Json(report);
        }

        [HttpGet]
        public async Task<IActionResult> ExportWagerReport(GetWagerReportCriteria criteria)
        {
            criteria.Year = 2022;
            criteria.TimeSpan = appSettings.TimeSpan * -1;
            var reports = await GetWagerReportAsync(criteria);
            var bytes = exportExcelService.ExportWagerReport(reports, criteria.Year);
            string reportName = string.Format(ViewResources.WagerReportExcelName,criteria.Year);
            return File(bytes, MimeType.XLSX, $"{reportName}.xlsx");
        }

        private async Task<WagerReportModel> GetWagerReportAsync(GetWagerReportCriteria criteria)
        {
            Wager wager = null;
            WagerByMonth wagerByMonth = null;
            IList<WagerByMonth> wagerByMonths = new List<WagerByMonth>();
            IDictionary<string, Wager> grandTotalHash = new Dictionary<string, Wager>
            {
                { ViewResources.Accept, new Wager { Name = ViewResources.Accept, Amount = 0 } },
                { ViewResources.Reject, new Wager { Name = ViewResources.Reject, Amount = 0 } },
                { ViewResources.VoidRefund, new Wager { Name = ViewResources.VoidRefund, Amount = 0 } },
            };
            int grandTotal = 0;

            var rawData = new List<WagerRawData>
            {
                new WagerRawData
                {
                    Month = "Feb",
                    SubCategory = "Super/Master/Agent",
                    NoOfIssues = 1
                },
                new WagerRawData
                {
                    Month = "Feb",
                    SubCategory = "Member",
                    NoOfIssues = 1
                },
                new WagerRawData
                {
                    Month = "Feb",
                    SubCategory = "N/A",
                    NoOfIssues = 1
                },
                new WagerRawData
                {
                    Month = "Mar",
                    SubCategory = "Match Information",
                    NoOfIssues = 1
                },
                new WagerRawData
                {
                    Month = "Apr",
                    SubCategory = "Problem Account",
                    NoOfIssues = 1
                }
            }.GroupBy(w => w.Month);

            //var rawData = await baseService.GetData<WagerRawData>(criteria)
            //    .GroupBy(w => w.Month);
            foreach (var month in rawData)
            {
                wagerByMonth = new WagerByMonth
                {
                    Month = month.Key.ToUpper(),
                    Wagers = new List<Wager>(),
                    Total = 0
                };

                foreach (var item in month)
                {
                    wager = new Wager
                    {
                        Name = item.SubCategory,
                        Amount = item.NoOfIssues
                    };

                    wagerByMonth.Total += wager.Amount;
                    wagerByMonth.Wagers.Add(wager);

                    if (grandTotalHash.ContainsKey(wager.Name))
                    {
                        grandTotalHash[wager.Name].Amount += wager.Amount;
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
}
