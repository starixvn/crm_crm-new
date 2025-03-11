using System.Collections.Generic;
using System.Threading.Tasks;
using CRM.Criteria.ManageSMAFeedback;
using CRM.Models;
using CRM.Models.ManageSMAFeedback;
using CRM.Services.Interfaces;

namespace CRM.Services.HeadlineNotification
{
    public class ManageSMAFeedbackService(IBaseService baseService, ICommonService commonService) : IManageSMAFeedbackService
    {
        public async Task<IEnumerable<SMAFeedbackInfo>> GetSMAFeedbackAsync(GetSMAFeedbackInfo param)
        {
            var criteria = new GetSMAFeedbackCriteria
            {
                FromDate = param.FromDate,
                ToDate = param.ToDate,
                PageIndex = param.PageIndex,
                PageSize = param.PageSize,
                ReviewStatus = param.ReviewStatus,
                Username = param.Username,

            };
            var feedbackSMAInfos = await baseService.GetDataAsync<SMAFeedbackInfo>(criteria);
            param.TotalRows = criteria.TotalRows;

            foreach (var feedback in feedbackSMAInfos)
            {
                feedback.CreateTime = commonService.ConvertToClientDateTime(feedback.CreateTime);
            }

            return feedbackSMAInfos;
        }

        public async Task<CommandResult> EditSMAFeedbackAsync(EditSMAFeedback param)
        {
            var command = new EditSMAFeedbackCommand
            {
                FeedbackId = param.FeedbackId,
                ReviewStatus = param.ReviewStatus,
                DiscussionSolution = param.DiscussionSolution,
            };
            return await baseService.ExecuteNonQueryAsync(command);
        }
    }
}
