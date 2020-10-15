namespace CRM.Services
{
    using CRM.Core.Services;
    using CRM.Criteria.FeedbackSubject;
    using CRM.Models.FeedbackSubject;
    using System.Threading.Tasks;
    using System.Linq;
    using System.Collections.Generic;
    using CRM.Core.Models;

    public interface IFeedbackSubjectService
    {
        Task<IEnumerable<FeedbackSubjectTemplate>> GetFeedbackSubjectTemplateAsync(GetFeedbackSubjectParam param);
        Task<CommandResult> CreateFeedbackSubjectTemplateAsync(CreateFeedbackSubjectTemplate model);
        Task<CommandResult> EditFeedbackSubjectTemplateAsync(EditFeedbackSubjectTemplate model);
        Task<CommandResult> EditStatusFeedbackSubjectTemplateAsync(EditStatusFeedbackSubjectTemplate model);
        
    }

    public class FeedbackSubjectService : IFeedbackSubjectService
    {
        private readonly IBaseService baseService;

        public FeedbackSubjectService(IBaseService baseService)
        {
            this.baseService = baseService;
        }

        public async Task<IEnumerable<FeedbackSubjectTemplate>> GetFeedbackSubjectTemplateAsync(GetFeedbackSubjectParam param)
        {
            var criteria = new GetFeedbackSubjectTemplateCriteria();
           
            var data = await baseService.GetDataAsync<FeedbackSubjectTemplate>(criteria);
            var templates = data.Where(item => IsCorrectTemplate(item.Subject, param.Subject)).ToList();
            var startIndex = (param.PageIndex - 1) * param.PageSize;
            var feedbacks = templates.Skip(startIndex).Take(param.PageSize).ToList();
            param.TotalRows = templates.Count;
            return feedbacks;
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

        private static bool IsCorrectTemplate(string templateContent, string subject)
        {
            return string.IsNullOrEmpty(subject) ||
                 templateContent.ToLowerInvariant().Contains(subject.Trim().ToLowerInvariant());
        }
    }
}