namespace CRM.Controllers.AdminTool;

using Constants;
using Filters;
using Microsoft.AspNetCore.Mvc;
using Models.AdminTool.FeedbackSubject;
using Services.AdminTool;
using System.Threading.Tasks;
using static Fanex.NAP.Client.Helpers.Business.Constant;

[CrmPermission(FunctionKey = FunctionKey.FeedbackSubject, Policy = Policy.Read)]
public class FeedbackSubjectManagementController(IFeedbackSubjectService feedbackSubjectService) : BaseController
{
    [HttpPost]
    public async Task<IActionResult> GetFeedbackSubject([FromBody] GetFeedbackSubjectParam param)
    {
        var feedbacks = await feedbackSubjectService.GetFeedbackSubjectTemplateAsync(param);
        return Json(new { totalItems = param.TotalRows, data = feedbacks });
    }

    [HttpGet]
    public async Task<IActionResult> GetAllActiveFeedbackSubject()
    {
        var allActiveFeedbackSubject = await feedbackSubjectService.GetAllActiveFeedbackSubjectTemplateAsync();
        return Json(allActiveFeedbackSubject);
    }

    [HttpPost]
    public async Task<IActionResult> CreateFeedbackSubject([FromBody] CreateFeedbackSubjectTemplate model)
    {
        var commandResult = await feedbackSubjectService.CreateFeedbackSubjectTemplateAsync(model);
        return Json(commandResult);
    }

    [HttpPost]
    [CrmPermission(FunctionKey = FunctionKey.FeedbackSubject, Policy = Policy.Host)]
    public async Task<IActionResult> EditFeedbackSubject([FromBody] EditFeedbackSubjectTemplate model)
    {
        var commandResult = await feedbackSubjectService.EditFeedbackSubjectTemplateAsync(model);
        return Json(commandResult);
    }

    [HttpPost]
    [CrmPermission(FunctionKey = FunctionKey.FeedbackSubject, Policy = Policy.Host)]
    public async Task<IActionResult> EditStatusFeedbackSubject([FromBody] EditStatusFeedbackSubjectTemplate model)
    {
        var commandResult = await feedbackSubjectService.EditStatusFeedbackSubjectTemplateAsync(model);
        return Json(commandResult);
    }
}