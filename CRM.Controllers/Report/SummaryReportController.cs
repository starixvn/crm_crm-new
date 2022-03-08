namespace CRM.Controllers.Report
{
    using CRM.Core.Constants;
    using CRM.Core.Models;
    using CRM.Criteria.Report.CategoriesSummaryReport;
    using CRM.Services;
    using CRM.Services.Report.CategoriesSummaryReport;
    using Microsoft.AspNetCore.Mvc;
    using Microsoft.Extensions.Options;
    using System.Collections.Generic;
    using System.Threading.Tasks;
    //[CrmPermission(FunctionKey = FunctionKey.CategoriesSummaryReport, Policy = Policy.Read)]
    public class SummaryReportController : Controller
    {
        private readonly ISummaryReportService summaryReportService;
        private readonly ISettingService settingService;
        //private readonly AppSettings appSettings;



        public SummaryReportController(
            ISummaryReportService summaryReportService, 
            ISettingService settingService
            )
        {
            this.summaryReportService = summaryReportService;
            this.settingService = settingService;
            //this.appSettings = appSettings.Value;
        }

        public IActionResult Index()
        {
            GetSummaryReportCriteria a = new GetSummaryReportCriteria()
            {
                Year = 2022,
                SiteType = 0,
                Categories = "3000,3001,3002,3003,3014,3016,3018,3019,3020,3023,3024,3025,3027,3028,3029,3030,3033,3034,3035,3036,3037,3038,3040,3041,3056,3057,3058,3059,3060,3061,3062,3063,3064,3065"
            };

            summaryReportService.GetSummaryReportAsyncdemo(a);

            return Ok("OK");
        }

        public async Task<IActionResult> getAllSettings()
        {
            var sites = await settingService.GetAllSitesWithGroupAsync();           
            var mainCategories = await settingService.GetMainCategoryAsync(SettingConstants.Active);
            return Json(new
            {
                sites,
                mainCategories                
            });
        }

        //[HttpPost]
        //public async Task<IActionResult> GetSummaryReport([FromBody] GetSummaryReportCriteria criteria)
        //{
        //    criteria.TimeSpan = appSettings.TimeSpan * -1;
        //    var logs = await settlementReportService.GetSettlementReportAsync(criteria);
        //    return Json(logs);
        //}
    }
}
