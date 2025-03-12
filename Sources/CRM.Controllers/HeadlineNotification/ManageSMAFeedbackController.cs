using System.Threading.Tasks;
using CRM.Constants;
using CRM.Filters;
using CRM.Models.ManageSMAFeedback;
using CRM.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;
using static Fanex.NAP.Client.Helpers.Business.Constant;

namespace CRM.Controllers.HeadlineNotification
{
    [CrmPermission(FunctionKey = FunctionKey.ManageSMAFeedback, Policy = Policy.Read)]
    public class ManageSMAFeedbackController(IManageSMAFeedbackService manageSmaFeedbackService) : BaseController
    {

        [HttpPost]
        public async Task<IActionResult> GetSMAFeedback([FromBody] GetSMAFeedbackInfo param)
        {
            var feedbackSMAInfos = await manageSmaFeedbackService.GetSMAFeedbackAsync(param);
            return Json(new { totalItems = param.TotalRows, data = feedbackSMAInfos });
        }

        [HttpPost]
        [CrmPermission(FunctionKey = FunctionKey.ManageSMAFeedback, Policy = Policy.Host)]
        public async Task<IActionResult> EditSMAFeedback([FromBody] EditSMAFeedback param)
        {
            var commandResult = await manageSmaFeedbackService.EditSMAFeedbackAsync(param);
            return Json(commandResult);
        }
    }
}
