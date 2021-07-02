namespace CRM.Controllers
{
    using System.Threading.Tasks;
    using CRM.Services;
    using Microsoft.AspNetCore.Mvc;

    public class SettingController : BaseController
    {
        private readonly ISettingService settingService;

        public SettingController(ISettingService settingService)
        {
            this.settingService = settingService;
        }

        public async Task<ActionResult> GetNumberOfFeedbackSubjectTemplate()
        {
            var totalItems = await settingService.GetNumberOfFeedbackSubjectTemplateAsync();
            return Json(totalItems);
        }

        public async Task<ActionResult> GetFeedbackSubjectTemplateByPagingIndex(int id)
        {
            var feedbackSubjectTemplates = await settingService.GetFeedbackSubjectTemplateByPagingIndexAsync(id);
            return Json(feedbackSubjectTemplates);
        }
    }
}