using CRM.Core.Constants;
using CRM.Criteria.Setting;
using CRM.Services;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace CRM.Controllers
{
    public class SettingController:BaseController
    {
        private readonly ISettingService settingService;

        public SettingController(ISettingService settingService)
        {
            this.settingService = settingService;
        }
        public async Task<ActionResult> NumberOfFeedbackSubjectTemplate()
        {
            var numberOfFeedbackSubjectTemplate = await settingService.NumberOfFeedbackSubjectTemplate();
            return Json(numberOfFeedbackSubjectTemplate);
        }

        public async Task<ActionResult> GetFeedbackSubjectTemplateByPagingIndex(int id)
        {
            var criteria = new GetFeedbackSubjectTemplateByPagingIndexCriteria
            {
                PagingIndex = id
            };

            var feedbackSubjectTemplateByPagingIndex = await settingService.GetFeedbackSubjectTemplateByPagingIndex(criteria);
            return Json(feedbackSubjectTemplateByPagingIndex);
        }

    }
}
