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
            criteria.TimeSpan = appSettings.TimeSpan * -1;
            var report = await GetWagerReportAsync(criteria);
            return Json(report);
        }

        [HttpPost]
        public async Task<IActionResult> ExportWagerReport([FromBody] GetWagerReportCriteria criteria)
        {
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
                    Month = "Jan",
                    SubCategory = "Accept",
                    NoOfIssues = 1
                },
                new WagerRawData
                {
                    Month = "Feb",
                    SubCategory = "Accept",
                    NoOfIssues = 1
                },
                new WagerRawData
                {
                    Month = "Mar",
                    SubCategory = "Accept",
                    NoOfIssues = 1
                },
                new WagerRawData
                {
                    Month = "Apr",
                    SubCategory = "Accept",
                    NoOfIssues = 1
                },
                new WagerRawData
                {
                    Month = "May",
                    SubCategory = "Void/Refund",
                    NoOfIssues = 1
                },
                new WagerRawData
                {
                    Month = "Jun",
                    SubCategory = "Accept",
                    NoOfIssues = 1
                },
                new WagerRawData
                {
                    Month = "Jul",
                    SubCategory = "Accept",
                    NoOfIssues = 1
                },
                new WagerRawData
                {
                    Month = "Aug",
                    SubCategory = "Void/Refund",
                    NoOfIssues = 1
                },
                new WagerRawData
                {
                    Month = "Sep",
                    SubCategory = "Accept",
                    NoOfIssues = 1
                },
                new WagerRawData
                {
                    Month = "Oct",
                    SubCategory = "Accept",
                    NoOfIssues = 1
                },
                new WagerRawData
                {
                    Month = "Nov",
                    SubCategory = "Accept",
                    NoOfIssues = 1
                },
                new WagerRawData
                {
                    Month = "Dec",
                    SubCategory = "Void/Refund",
                    NoOfIssues = 1
                },
                new WagerRawData
                {
                    Month = "Jan",
                    SubCategory = "Reject",
                    NoOfIssues = 1
                },
                new WagerRawData
                {
                    Month = "Feb",
                    SubCategory = "Reject",
                    NoOfIssues = 1
                },
                new WagerRawData
                {
                    Month = "Mar",
                    SubCategory = "Reject",
                    NoOfIssues = 1
                },
                new WagerRawData
                {
                    Month = "Apr",
                    SubCategory = "Reject",
                    NoOfIssues = 1
                },
                new WagerRawData
                {
                    Month = "Jun",
                    SubCategory = "Reject",
                    NoOfIssues = 1
                },
                new WagerRawData
                {
                    Month = "Jul",
                    SubCategory = "Reject",
                    NoOfIssues = 1
                },
                new WagerRawData
                {
                    Month = "Sep",
                    SubCategory = "Reject",
                    NoOfIssues = 1
                },
                new WagerRawData
                {
                    Month = "Oct",
                    SubCategory = "Reject",
                    NoOfIssues = 1
                },
                new WagerRawData
                {
                    Month = "Nov",
                    SubCategory = "Reject",
                    NoOfIssues = 1
                },
                new WagerRawData
                {
                    Month = "Dec",
                    SubCategory = "Reject",
                    NoOfIssues = 1
                },
                new WagerRawData
                {
                    Month = "Jan",
                    SubCategory = "Void/Refund",
                    NoOfIssues = 1
                },
                new WagerRawData
                {
                    Month = "Feb",
                    SubCategory = "Void/Refund",
                    NoOfIssues = 1
                },
                new WagerRawData
                {
                    Month = "Jun",
                    SubCategory = "Void/Refund",
                    NoOfIssues = 1
                },
                new WagerRawData
                {
                    Month = "Jul",
                    SubCategory = "Void/Refund",
                    NoOfIssues = 1
                },
                new WagerRawData
                {
                    Month = "Oct",
                    SubCategory = "Void/Refund",
                    NoOfIssues = 1
                },
                new WagerRawData
                {
                    Month = "Mar",
                    SubCategory = "Void/Refund",
                    NoOfIssues = 1
                },
                new WagerRawData
                {
                    Month = "Apr",
                    SubCategory = "Void/Refund",
                    NoOfIssues = 1
                },
                new WagerRawData
                {
                    Month = "Sep",
                    SubCategory = "Void/Refund",
                    NoOfIssues = 1
                },
                new WagerRawData
                {
                    Month = "Nov",
                    SubCategory = "Void/Refund",
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
