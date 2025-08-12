using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Xml.Linq;
using CRM.Criteria.ManageSMAFeedback;
using CRM.Models;
using CRM.Models.Common;
using CRM.Models.ManageSmaFeedback;
using CRM.Models.Setting;
using CRM.Services.Interfaces;

namespace CRM.Services.HeadlineNotification;

public class ManageSmaFeedbackService(IBaseService baseService, ICommonService commonService) : IManageSmaFeedbackService
{
    public async Task<IEnumerable<SmaFeedbackInfo>> GetSmaFeedbackAsync(GetSmaFeedbackInfo param)
    {
        var sitePermissionXml = await commonService.GetSitePermissionXml(param.LicenseeType, param.SitePermission);
        var criteria = new GetSmaFeedbackCriteria
        {
            FromDate = commonService.ConvertClientFromTimeToServerTime(param.FromDate),
            ToDate = commonService.ConvertClientToTimeToServerTime(param.ToDate),
            PageIndex = param.PageIndex,
            ItemsPerPage = param.PageSize,
            ListReviewStatusIDs = param.ListReviewStatusIDs,
            TestOnly = param.TestOnly,
            Username = param.Username,
            SitePermission = sitePermissionXml,
            ListRate = param.Rating,
            IsGetAllFBs = param.AllFeedback
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

    public static string GetReviewStatusName(int? reviewStatusID, IEnumerable<SettingRelation> reviewStatusSettings)
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

    public async Task<CommandResult> WriteLogSmaFeedbackAsync(EditSmaFeedback param)
    {
        var oldValue = GetOldNewValueXml(false, param);
        var newValue = GetOldNewValueXml(true, param);
        var logInfo = new LogSPInfo
        {
            UserID = param.UserID,
            CustID = param.CustID,
            IP = param.IP,
            ActionID = 1022,
            OldValues = oldValue,
            NewValues = newValue,
        };

        return await commonService.WriteLogSPAsync(logInfo);
    }

    public string GetOldNewValueXml(bool isNewValue, EditSmaFeedback value)
    {
        var rootElement = new XElement("Acc_CRM_SMAFeedbackInfoUpd",
            new XElement("Site",
                new XAttribute("Custid", value.CustID),
                new XAttribute("CreatedDate", commonService.ConvertToServerDateTime(value.CreatedDate)),
                new XAttribute("FunctionID", value.FunctionID),
                new XAttribute("Comment", value.Comment),
                new XAttribute("ReviewStatusID", isNewValue ? value.ReviewStatusID : value.ReviewStatusID_Old?.ToString() ?? ""),
                new XAttribute("Discussion", isNewValue ? value.Discussion : value.Discussion_Old)
            )
        );

        return rootElement.ToString(SaveOptions.DisableFormatting);
    }
}