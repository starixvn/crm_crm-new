using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CRM.Criteria.ManageSMAFeedback;
using CRM.Models;
using CRM.Models.ManageSmaFeedback;
using CRM.Models.Setting;
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
                feedback.ReviewStatus = GetReviewStatusName(feedback.ReviewStatusID, param.ReviewStatusSettings);
            }

            return smaFeedbackInfos;
        }

        public static string GetReviewStatusName(int reviewStatusID, IEnumerable<SettingRelation> reviewStatusSettings)
        {
            var setting = reviewStatusSettings.FirstOrDefault(s => s.Id == reviewStatusID);
            return setting != null ? setting.Value : string.Empty;
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
                Comment = param.Comment
            };
            return await baseService.ExecuteNonQueryAsync(command);
        }
    }
}
