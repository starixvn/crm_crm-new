using CRM.Core.Constants;
using CRM.Core.Filters;
using CRM.Core.Models;
using CRM.Criteria.Report.CategoriesSummaryReport;
using CRM.Services;
using CRM.Services.Report.CategoriesSummaryReport;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using static Fanex.NAP.Core.Business.Constant;

namespace CRM.Controllers.Report
{
    //[CrmPermission(FunctionKey = FunctionKey.CategoriesSummaryReport, Policy = Policy.Read)]
    public class SummaryReportController : Controller
    {
        public IActionResult Index()
        {
            return Ok("OK");
        }


    }
}
