using System.Threading.Tasks;
using CRM.Constants;
using CRM.Extensions;
using CRM.Filters;
using CRM.Models.ManageSMAFeedback;
using CRM.Resources;
using CRM.Services.ExportExcel;
using CRM.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;
using static Fanex.NAP.Client.Helpers.Business.Constant;

namespace CRM.Controllers.HeadlineNotification
{
    [CrmPermission(FunctionKey = FunctionKey.ManageSMAFeedback, Policy = Policy.Read)]
    public class ManageSMAFeedbackController(IManageSMAFeedbackService manageSmaFeedbackService, IExportExcelService excelService) : BaseController
    {

        [HttpPost]
        public async Task<IActionResult> GetSMAFeedback([FromBody] GetSMAFeedbackInfo param)
        {
            var smaFeedbackInfos = await manageSmaFeedbackService.GetSMAFeedbackAsync(param);
            return Json(new { totalItems = param.TotalRows, data = smaFeedbackInfos });
        }

        [HttpPost]
        [CrmPermission(FunctionKey = FunctionKey.ManageSMAFeedback, Policy = Policy.Host)]
        public async Task<IActionResult> EditSMAFeedback([FromBody] EditSMAFeedback param)
        {
            var commandResult = await manageSmaFeedbackService.EditSMAFeedbackAsync(param);
            return Json(commandResult);
        }

        [HttpPost]
        [CrmPermission(FunctionKey = FunctionKey.ManageSMAFeedback, Policy = Policy.Host)]
        public async Task<IActionResult> ExportExcel([FromBody] GetSMAFeedbackInfo param)
        {
            var smaFeedbackInfos = await manageSmaFeedbackService.GetSMAFeedbackAsync(param);
            var reportName = string.Format(ViewResources.ManageSMAFeedback_ExcelTile, param.FromDate.ToShortDateFormat(), param.ToDate.ToShortDateFormat());
            var bytes = excelService.ExportManageSMAFeedback(smaFeedbackInfos, reportName);
            return File(bytes, MimeType.XLSX, $"{reportName}.xlsx");
        }
    }
}