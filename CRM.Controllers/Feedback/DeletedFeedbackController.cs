namespace CRM.Controllers.Feedback
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Threading.Tasks;
    using CRM.Core.Constants;
    using CRM.Core.Filters;
    using CRM.Models.Feedback;
    using CRM.Models.DeletedFeedback;
    using CRM.Models.Setting;
    using CRM.Resources;
    using CRM.Services;
    using CRM.Services.Feedback;
    using Fanex.NAP.Client.Configuration;
    using Fanex.NAP.Client.Helpers.Web;
    using Fanex.NAP.Client.Services;
    using Microsoft.AspNetCore.Mvc;
    using static Fanex.NAP.Core.Business.Constant;

    [CrmPermission(FunctionKey = FunctionKey.DeleteFeedback, Policy = Policy.Read)]
    public class DeletedFeedbackController : BaseController
    {
        private readonly INapSession napSession;
        private readonly INapSettings napSettings;
        private readonly IUserService userService;
        private readonly ISettingService settingService;
        private readonly IExportExcelService excelService;
        private readonly IFeedbackService feedbackService;

        public DeletedFeedbackController(
            INapSession napSession,
            INapSettings napSettings,
            IUserService userService,
            IExportExcelService excelService,
            ISettingService settingService,
            IFeedbackService feedbackService)
        {
            this.napSession = napSession;
            this.napSettings = napSettings;
            this.userService = userService;
            this.settingService = settingService;
            this.excelService = excelService;
            this.feedbackService = feedbackService;
        }

        public IActionResult Index()
        {
            var isHost = userService.IsHavingPermission(napSession.UserId, napSettings.SiteId, FunctionKey.DeleteFeedback, Policy.Host);
            return View(isHost);
        }

        public async Task<IActionResult> GetAllSettings()
        {
            var status = await settingService.GetStatusAsync(ViewTypeConstants.CommunicationTool);
            var settings = new
            {
                customerType = settingService.GetAllCustomerTypes(),
                review = settingService.GetReviews(),
                customerResponse = await settingService.GetSettingRelationByNameAsync(SettingTypeConstants.Response, SettingConstants.Active),
                mainCategory = await settingService.GetMainCategoryAsync(SettingConstants.Active),
                subCategory = await settingService.GetSubCategoryAsync(active: SettingConstants.Active),
                communication = await settingService.GetCommunicationToolAsync(SettingConstants.Active,true),
                status = status.Where(x => !string.Equals(x.Name, ViewResources.Deleted, StringComparison.OrdinalIgnoreCase))
            };

            return Json(settings);
        }

        [HttpPost]
        public async Task<IActionResult> SearchDeletedFeedback([FromBody] GetDeletedFeedbackParam param)
        {
            IEnumerable<DeletedFeedback> feedbacks = await feedbackService.GetDeletedFeedbackAsync(param);
            IEnumerable<Setting> mainCategories = await GetAllMainCategoriesFromAllSettings();

            return Json(new { data = feedbacks, mainCategories });
        }

        private async Task<IEnumerable<Setting>> GetAllMainCategoriesFromAllSettings()
        {
            var mainCategories = await settingService.GetSettingAsync(SettingName.MainCategory, true);
            var subCategories = await settingService.GetSubCategoryAsync();

            foreach (var category in mainCategories)
            {
                category.ChildSettings = subCategories.Where(x => x.MainCategoryID == category.SettingId).OrderBy(s => s.DisplayOrder).ToList();
            }

            return mainCategories;
        }
    }
}
