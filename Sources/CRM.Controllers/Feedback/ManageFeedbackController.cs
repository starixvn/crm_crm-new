namespace CRM.Controllers.Feedback
{
    using System.Collections.Generic;
    using System.Linq;
    using System.Threading.Tasks;
    using CRM.Core.Constants;
    using CRM.Core.Filters;
    using CRM.Core.Services;
    using CRM.Criteria.Feedback.ManageFeedback;
    using CRM.Models.Feedback;
    using CRM.Models.Setting;
    using CRM.Resources;
    using CRM.Services;
    using CRM.Services.Feedback;
    using Microsoft.AspNetCore.Mvc;
    using static Fanex.NAP.Client.Helpers.Business.Constant;

    [CrmPermission(FunctionKey = FunctionKey.CreateUpdateFeedback, Policy = Policy.Read)]
    public class ManageFeedbackController : BaseController
    {
        private readonly ISettingService settingService;
        private readonly IFeedbackService feedbackService;
        private readonly IExportExcelService exportExcelService;
        private readonly IPermissionService permissionService;

        public ManageFeedbackController(
            ISettingService settingService,
            IFeedbackService feedbackService,
            IExportExcelService exportExcelService,
            IPermissionService permissionService
            )
        {
            this.settingService = settingService;
            this.feedbackService = feedbackService;
            this.exportExcelService = exportExcelService;
            this.permissionService = permissionService;
        }

        public async Task<ActionResult> GetAllSettings()
        {
            var customerTypes = settingService.GetAllCustomerTypes();
            var responses = await settingService.GetSettingRelationByNameAsync(SettingTypeConstants.Response);
            var mainCategories = await settingService.GetMainCategoryAsync();
            var subCategories = await settingService.GetSubCategoryAsync();
            var communications = await settingService.GetCommunicationToolAsync(isIncludeNA: true);
            var status = await GetStatusListAsync();
            var settings = new
            {
                CustomerTypes = customerTypes,
                Responses = responses,
                MainCategories = mainCategories,
                SubCategories = subCategories,
                Communications = communications,
                Statuses = status
            };
            return Json(settings);
        }

        [HttpPost]
        [CrmPermission(FunctionKey = $"{FunctionKey.Credit},{FunctionKey.Licensee}", Policy = Policy.Read)]
        public async Task<ActionResult> SearchManageFeedback([FromBody] ManageFeedbackCriteria criteria)
        {
            criteria.LicenseeType = await permissionService.GetCurrentUserLicenseeTypeAsync();
            criteria.SitePermission = await permissionService.GetCurrentUserCreditPermissionsAsync();

            var feedbacksTask = feedbackService.GetManageFeedbackAsync(criteria);
            var mainCategoriesTask = settingService.GetMainCategoryWithSubCategoryAsync();
            await Task.WhenAll(feedbacksTask, mainCategoriesTask);

            IEnumerable<DeletedFeedback> feedbacks = feedbacksTask.Result;
            IEnumerable<Setting> mainCategories = mainCategoriesTask.Result;
            var feedbacksOrder = feedbacks.OrderByDescending(x => x.FeedbackDate).ThenByDescending(y => y.FeedbackId);
            return Json(new { data = feedbacksOrder, mainCategories, totalItems = criteria.TotalRows });
        }

        [HttpPost]
        [CrmPermission(FunctionKey = $"{FunctionKey.Credit},{FunctionKey.Licensee}", Policy = Policy.Read)]
        public async Task<IActionResult> ExportExcel([FromBody] ManageFeedbackCriteria criteria)
        {
            criteria.PageIndex = 0;
            criteria.LicenseeType = await permissionService.GetCurrentUserLicenseeTypeAsync();
            criteria.SitePermission = await permissionService.GetCurrentUserCreditPermissionsAsync();

            var feedbacksTask = feedbackService.GetManageFeedbackAsync(criteria);
            var mainCategoriesTask = settingService.GetMainCategoryWithSubCategoryAsync();
            await Task.WhenAll(feedbacksTask, mainCategoriesTask);
            IEnumerable<DeletedFeedback> feedbacks = feedbacksTask.Result;
            IEnumerable<Setting> mainCategories = mainCategoriesTask.Result;

            var feedbacksOrder = feedbacks.OrderByDescending(x => x.FeedbackDate).ThenByDescending(y => y.FeedbackId);

            string reportName = string.IsNullOrEmpty(criteria.Username) ? ViewResources.Feedback :
                                string.Format(ViewResources.FeedbackFromUsernameExcelFile, criteria.Username);
            string reportTitle = string.IsNullOrEmpty(criteria.Username) ? ViewResources.Feedback :
                                string.Format(ViewResources.FeedbackFromUsernameExcelName, criteria.Username);
            var bytes = exportExcelService.ExportManageFeedbackReport(feedbacksOrder, mainCategories, reportName, reportTitle);

            return File(bytes, MimeType.XLSX, $"{reportName}.xlsx");
        }

        private async Task<IEnumerable<FeedbackStatus>> GetStatusListAsync(bool isEdit = false)
        {
            var statuses = await settingService.GetStatusAsync(ViewTypeConstants.CommunicationTool);
            var isHostDeleteFbPermision = await permissionService.IsHavingPermissionByPolicyAsync(FunctionKey.DeleteFeedback, Policy.Host);

            if (!isEdit || !isHostDeleteFbPermision)
            {
                statuses = statuses.Where(x => x.StatusId != (int)Core.Enumerables.FeedbackStatus.Deleted);
            }

            return statuses;
        }
    }
}