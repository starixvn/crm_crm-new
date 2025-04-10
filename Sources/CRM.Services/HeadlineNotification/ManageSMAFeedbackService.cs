using System;
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
                FromDate = commonService.ConvertClientFromTimeToServerTime(param.FromDate),
                ToDate = commonService.ConvertClientToTimeToServerTime(param.ToDate),
                PageIndex = param.PageIndex,
                ItemsPerPage = param.PageSize,
                ListReviewStatusIDs = param.ListReviewStatusIDs,
                TestOnly = param.TestOnly,
                Username = param.Username,
                SitePermission = param.SitePermission,
                LicenseeType = param.LicenseeType
            };
            var smaFeedbackInfos = await baseService.GetDataAsync<SmaFeedbackInfo>(criteria);
            param.TotalRows = criteria.TotalRows;

            foreach (var feedback in smaFeedbackInfos)
            {
                feedback.CreatedDate = commonService.ConvertToClientDateTime(feedback.CreatedDate);
            }

            return smaFeedbackInfos;
        }

        public async Task<CommandResult> EditSmaFeedbackAsync(EditSmaFeedback param)
        {
            var command = new EditSmaFeedbackCommand
            {
                CustID = param.CustID,
                CreatedDate = commonService.ConvertToServerDateTime(param.CreatedDate),
                FunctionID = param.FunctionID,
                ReviewStatusID = param.ReviewStatusID,
                Discussion = param.Discussion,
            };
            return await baseService.ExecuteNonQueryAsync(command);
        }
    }
}
