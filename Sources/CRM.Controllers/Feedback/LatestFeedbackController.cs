namespace CRM.Controllers.Feedback
{
    using System.Collections.Generic;
    using System.Threading.Tasks;
    using CRM.Core.Constants;
    using CRM.Core.Filters;
    using CRM.Core.Services;
    using CRM.Criteria.Feedback;
    using CRM.Models.Feedback;
    using CRM.Models.LatestFeedback;
    using CRM.Models.Setting;
    using CRM.Resources;
    using CRM.Services;
    using CRM.Services.Feedback;
    using Microsoft.AspNetCore.Mvc;
    using static Fanex.NAP.Client.Helpers.Business.Constant;

    [CrmPermission(FunctionKey = FunctionKey.CreateUpdateFeedback, Policy = Policy.Read)]
    public class LatestFeedbackController : BaseController
    {
        private readonly ISettingService settingService;
        private readonly IExportExcelService excelService;
        private readonly IFeedbackService feedbackService;
        private readonly IPermissionService permissionService;

        public LatestFeedbackController(
            IExportExcelService excelService,
            ISettingService settingService,
            IFeedbackService feedbackService,
            IPermissionService permissionService)
        {
            this.settingService = settingService;
            this.excelService = excelService;
            this.feedbackService = feedbackService;
            this.permissionService = permissionService;
        }

        [HttpPost]
        public async Task<IActionResult> GetLatestFeedback([FromBody] GetLatestFeedbackCriteria criteria)
        {
            criteria.LicenseeType = await permissionService.GetCurrentUserLicenseeTypeAsync();
            criteria.SitePermission = await permissionService.GetCurrentUserCreditPermissionsAsync();
            var feedbacksTask = feedbackService.GetLatestFeedbackAsync(criteria);
            var mainCategoriesTask = settingService.GetMainCategoryWithSubCategoryAsync();

            await Task.WhenAll(feedbacksTask, mainCategoriesTask);

            IEnumerable<DeletedFeedback> feedbacks = await feedbacksTask;
            IEnumerable<Setting> mainCategories = await mainCategoriesTask;

            return Json(new { data = feedbacks, mainCategories });
        }

        [HttpPost]
        public async Task<IActionResult> GetLatestFeedbackByCustId([FromBody] GetLatestFeedbackByCustIdCriteria criteria)
        {
            criteria.SitePermission = await permissionService.GetCurrentUserCreditPermissionsAsync();
            criteria.LicenseeType = await permissionService.GetCurrentUserLicenseeTypeAsync();

            var feedbacksTask = feedbackService.GetLatestFeedbackAsync(criteria);
            var mainCategoriesTask = settingService.GetMainCategoryWithSubCategoryAsync();

            await Task.WhenAll(feedbacksTask, mainCategoriesTask);

            IEnumerable<DeletedFeedback> feedbacks = await feedbacksTask;
            IEnumerable<Setting> mainCategories = await mainCategoriesTask;

            return Json(new { data = feedbacks, mainCategories });
        }

        [HttpPost]
        public async Task<IActionResult> ExportExcel([FromBody] GetLatestFeedbackCriteria criteria)
        {
            criteria.LicenseeType = await permissionService.GetCurrentUserLicenseeTypeAsync();
            criteria.SitePermission = await permissionService.GetCurrentUserCreditPermissionsAsync();
            var feedbacksTask = feedbackService.GetLatestFeedbackAsync(criteria);
            var mainCategoriesTask = settingService.GetMainCategoryWithSubCategoryAsync();
            await Task.WhenAll(feedbacksTask, mainCategoriesTask);
            IEnumerable<DeletedFeedback> feedbacks = feedbacksTask.Result;
            IEnumerable<Setting> mainCategories = await mainCategoriesTask;

            var bytes = excelService.ExportLatestFeedbackReport(feedbacks, mainCategories, criteria.Top, string.Empty);
            string reportName = string.Format(ViewResources.LatestFeedbackReport_File, criteria.Top);
            return File(bytes, MimeType.XLSX, $"{reportName}.xlsx");
        }

        [HttpPost]
        public async Task<IActionResult> SearchByCustExportExcel([FromBody] GetLatestFeedbackParam param)
        {
            var criteria = new GetLatestFeedbackByCustIdCriteria
            {
                Top = param.Top,
                CustID = param.CustID,
                LicenseeType = await permissionService.GetCurrentUserLicenseeTypeAsync(),
                SitePermission = await permissionService.GetCurrentUserCreditPermissionsAsync()
            };
            var feedbacksTask = feedbackService.GetLatestFeedbackAsync(criteria);
            var mainCategoriesTask = settingService.GetMainCategoryWithSubCategoryAsync();
            await Task.WhenAll(feedbacksTask, mainCategoriesTask);
            IEnumerable<DeletedFeedback> feedbacks = await feedbacksTask;
            IEnumerable<Setting> mainCategories = await mainCategoriesTask;

            var bytes = excelService.ExportLatestFeedbackReport(feedbacks, mainCategories, param.Top, param.UserName);
            string reportName = string.Format(ViewResources.LatestFeedback_Report_ByCustId_File, param.Top, param.UserName);
            return File(bytes, MimeType.XLSX, $"{reportName}.xlsx");
        }
    }
}