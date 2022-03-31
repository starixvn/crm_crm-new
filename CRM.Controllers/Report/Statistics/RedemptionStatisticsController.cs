using System.Threading.Tasks;
using CRM.Core;
using CRM.Core.Constants;
using CRM.Criteria.Report.RedemptionStatistics;
using CRM.Resources;
using CRM.Services;
using Fanex.NAP.Client.AspNetCore.Attributes;
using Fanex.NAP.Core.Business;
using Microsoft.AspNetCore.Mvc;

namespace CRM.Controllers.Report.Statistics
{
    public class RedemptionStatisticsController : Controller
    {
        private readonly ICommonService commonService;
        private readonly ISettingService settingService;
        private readonly IExportExcelService excelService;
        public RedemptionStatisticsController(
            ICommonService commonService,
            ISettingService settingService,
            IExportExcelService excelService)
        {
            this.commonService = commonService;
            this.settingService = settingService;
            this.excelService = excelService;
        }

        //[NapAuth(FunctionKey = FunctionKey.RedemptionStatistics, Policy = Constant.Policy.Read)]
        public IActionResult Index()
        {
            return View("../Report/RedemptionStatistics/Index");
        }

        public async Task<IActionResult> getAllSettings()
        {
            var statuses = await settingService.GetStatusAsync(ViewTypeConstants.Redemption);
            var currencies = await settingService.GetCurrencyRedemptionAsync();
            return Json(new
            {
                statuses,
                currencies
            });
        }
    }
}
