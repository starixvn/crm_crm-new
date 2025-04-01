using System.Threading.Tasks;
using CRM.Constants;
using CRM.Extensions;
using CRM.Filters;
using CRM.Models.ManageSmaFeedback;
using CRM.Resources;
using CRM.Services;
using CRM.Services.ExportExcel;
using CRM.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;
using static Fanex.NAP.Client.Helpers.Business.Constant;

namespace CRM.Controllers.HeadlineNotification
{
    [CrmPermission(FunctionKey = FunctionKey.ManageSMAFeedback, Policy = Policy.Read)]
    public class ManageSmaFeedbackController(
        IManageSmaFeedbackService manageSmaFeedbackService,
        IPermissionService permissionService,
        IExportExcelService excelService) : BaseController
    {

        [HttpPost]
        [CrmPermission(FunctionKey = $"{FunctionKey.Credit},{FunctionKey.Licensee}", Policy = Policy.Read)]
        public async Task<IActionResult> GetSmaFeedback([FromBody] GetSmaFeedbackInfo param)
        {
            param.LicenseeType = await permissionService.GetCurrentUserLicenseeTypeAsync();
            param.SitePermission = await permissionService.GetCurrentUserCreditPermissionsAsync();

            var smaFeedbackInfos = await manageSmaFeedbackService.GetSmaFeedbackAsync(param);
            return Json(new { totalItems = param.TotalRows, data = smaFeedbackInfos });
        }

        [HttpPost]
        [CrmPermission(FunctionKey = FunctionKey.ManageSMAFeedback, Policy = Policy.Host)]
        public async Task<IActionResult> EditSmaFeedback([FromBody] EditSmaFeedback param)
        {
            var commandResult = await manageSmaFeedbackService.EditSmaFeedbackAsync(param);
            return Json(commandResult);
        }

        [HttpPost]
        [CrmPermission(FunctionKey = $"{FunctionKey.Credit},{FunctionKey.Licensee}", Policy = Policy.Read)]
        public async Task<IActionResult> ExportExcel([FromBody] GetSmaFeedbackInfo param)
        {
            param.LicenseeType = await permissionService.GetCurrentUserLicenseeTypeAsync();
            param.SitePermission = await permissionService.GetCurrentUserCreditPermissionsAsync();

            var smaFeedbackInfos = await manageSmaFeedbackService.GetSmaFeedbackAsync(param);
            var reportName = string.Format(ViewResources.ManageSMAFeedback_ExcelTile, param.FromDate.ToString("MM_dd_yyyy"), param.ToDate.ToString("MM_dd_yyyy"));
            var bytes = excelService.ExportManageSMAFeedback(smaFeedbackInfos, reportName);
            return File(bytes, MimeType.XLSX, $"{reportName}.xlsx");
        }
    }
}