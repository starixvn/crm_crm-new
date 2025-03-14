using System.Collections.Generic;
using System.Threading.Tasks;
using CRM.Criteria.ManageSMAFeedback;
using CRM.Models;
using CRM.Models.ManageSmaFeedback;
using CRM.Services.Interfaces;

namespace CRM.Services.HeadlineNotification
{
    public class ManageSmaFeedbackService(IBaseService baseService, ICommonService commonService) : IManageSmaFeedbackService
    {
        public async Task<IEnumerable<SmaFeedbackInfo>> GetSmaFeedbackAsync(GetSmaFeedbackInfo param)
        {
            var criteria = new GetSmaFeedbackCriteria
            {
                FromDate = param.FromDate,
                ToDate = param.ToDate,
                PageIndex = param.PageIndex,
                PageSize = param.PageSize,
                ReviewStatus = param.ReviewStatus,
                Username = param.Username,

            };
            var smaFeedbackInfos = await baseService.GetDataAsync<SmaFeedbackInfo>(criteria);
            param.TotalRows = criteria.TotalRows;

            foreach (var feedback in smaFeedbackInfos)
            {
                feedback.CreateTime = commonService.ConvertToClientDateTime(feedback.CreateTime);
            }

            return smaFeedbackInfos;
        }

        public async Task<CommandResult> EditSmaFeedbackAsync(EditSmaFeedback param)
        {
            var command = new EditSmaFeedbackCommand
            {
                FeedbackId = param.FeedbackId,
                ReviewStatus = param.ReviewStatus,
                DiscussionSolution = param.DiscussionSolution,
            };
            return await baseService.ExecuteNonQueryAsync(command);
        }
    }
}
