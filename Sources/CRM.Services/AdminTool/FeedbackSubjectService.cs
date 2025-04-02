namespace CRM.Services.AdminTool;

using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Criteria.AdminTool.FeedbackSubject;
using Models;
using Models.AdminTool.FeedbackSubject;

public interface IFeedbackSubjectService
{
    Task<IEnumerable<FeedbackSubjectTemplate>> GetFeedbackSubjectTemplateAsync(GetFeedbackSubjectParam param);

    Task<IEnumerable<FeedbackSubjectTemplate>> GetAllActiveFeedbackSubjectTemplateAsync();

    Task<CommandResult> CreateFeedbackSubjectTemplateAsync(CreateFeedbackSubjectTemplate model);

    Task<CommandResult> EditFeedbackSubjectTemplateAsync(EditFeedbackSubjectTemplate model);

    Task<CommandResult> EditStatusFeedbackSubjectTemplateAsync(EditStatusFeedbackSubjectTemplate model);
}

public class FeedbackSubjectService(IBaseService baseService) : IFeedbackSubjectService
{
    public async Task<IEnumerable<FeedbackSubjectTemplate>> GetFeedbackSubjectTemplateAsync(GetFeedbackSubjectParam param)
    {
        var criteria = new GetFeedbackSubjectTemplateCriteria();

        var data = await baseService.GetDataAsync<FeedbackSubjectTemplate>(criteria);
        var templates = data.Where(item => IsCorrectTemplate(item, param.Subject, param.IsActive)).ToList();
        var startIndex = (param.PageIndex - 1) * param.PageSize;
        var feedbacks = templates.Skip(startIndex).Take(param.PageSize).ToList();
        param.TotalRows = templates.Count;
        return feedbacks;
    }

    public async Task<IEnumerable<FeedbackSubjectTemplate>> GetAllActiveFeedbackSubjectTemplateAsync()
    {
        var criteria = new GetFeedbackSubjectTemplateCriteria();
        var feedbackSubjects = await baseService.GetDataAsync<FeedbackSubjectTemplate>(criteria);
        var allActiveFeedback = feedbackSubjects.Where(item => IsCorrectTemplate(item, string.Empty, true)).ToList();
        return allActiveFeedback;
    }

    public async Task<CommandResult> CreateFeedbackSubjectTemplateAsync(CreateFeedbackSubjectTemplate model)
    {
        var command = new CreateFeedbackSubjectTemplateCommand
        {
            Subject = model.Subject
        };
        return await baseService.ExecuteNonQueryAsync(command);
    }

    public async Task<CommandResult> EditFeedbackSubjectTemplateAsync(EditFeedbackSubjectTemplate model)
    {
        var command = new EditFeedbackSubjectTemplateCommand
        {
            TemplateId = model.TemplateId,
            Subject = model.Subject
        };
        return await baseService.ExecuteNonQueryAsync(command);
    }

    public async Task<CommandResult> EditStatusFeedbackSubjectTemplateAsync(EditStatusFeedbackSubjectTemplate model)
    {
        var command = new EditStatusFeedbackSubjectTemplateCommand
        {
            TemplateId = model.TemplateId,
            IsActive = model.IsActive
        };
        return await baseService.ExecuteNonQueryAsync(command);
    }

    private static bool IsCorrectTemplate(FeedbackSubjectTemplate feedbackSubjectTemplate, string subject, bool? isActive = null)
    {
        return (string.IsNullOrEmpty(subject) || feedbackSubjectTemplate.Subject.ToLowerInvariant().Contains(subject.Trim().ToLowerInvariant()))
               && (!isActive.HasValue || feedbackSubjectTemplate.IsActive == isActive.Value);
    }
}