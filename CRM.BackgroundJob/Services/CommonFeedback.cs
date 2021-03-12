namespace CRM.BackgroundJob.Services
{
    using System;
    using System.Collections.Generic;
    using System.IO;
    using System.Linq;
    using System.Text;
    using System.Threading.Tasks;
    using CRM.Core.Extensions.XML;
    using CRM.Core.Models;
    using Fanex.CRM.BackgroundJob.Constants;
    using Fanex.CRM.BackgroundJob.Criteria;
    using Fanex.CRM.BackgroundJob.Models;
    using Fanex.CRM.BackgroundJob.Services;
    using Fanex.RemotingRef;
    using Microsoft.AspNetCore.Hosting;

    public interface ICommonFeedback
    {
        string GetProductName(string productId, string languageCode);

        string GetSportName(string sportTypeId, string languageCode);

        string GetLeagueName(string leagueId, string languageCode);

        string GetTeamName(string teamId, string languageCode);

        string GetBettypeName(string betTypeId, string languageCode);

        string GetMatchCode(string matchCode, string languageCode);
        
        string GetCategogyName(string categoryId, string languageCode);
        

        T GetFeedbackTemplates<T>(string fileXml);

        ValueTuple<bool, string> CheckFeedbackValidParams(CreateMutipleFeedbackCommand criteria);

        Tuple<int, int, string> GetCategorySubCategoryCWL(IEnumerable<SettingItem> settings, string settingValueName);

        Task<CommandResult> EditFeedbackSystemSettingAsync(long LastLogID, string ServiceName);

        Task<CommandResult> EditAmendmentFeedbackSystemSettingAsync(int LastTicketID, string ServiceName);
    }
    public class CommonFeedback : ICommonFeedback
    {
        private readonly IHostingEnvironment hostingEnvironment;
        private readonly IRemotingRefService remotingRefService;
        private readonly ISystemSettingService systemSetting;

        private const string path = "Format_Templates\\AutoCreateFeedback";

        public CommonFeedback(
            IHostingEnvironment hostingEnvironment,
            IRemotingRefService remotingRefService,
            ISystemSettingService systemSetting
            )
        {
            this.hostingEnvironment = hostingEnvironment;
            this.remotingRefService = remotingRefService;
            this.systemSetting = systemSetting;
        }

        public string GetProductName(string productId, string languageCode)
        {
            var productName = remotingRefService.GetResourceDataByRefIdAndResourceId("Product", productId, languageCode, string.Empty);
            return productName;
        }

        public string GetSportName(string sportTypeId, string languageCode)
        {
            var sportName = remotingRefService.GetSportName(sportTypeId, languageCode, string.Empty);
            return sportName;
        }

        public string GetLeagueName(string leagueId, string languageCode)
        {
            var leagueName = remotingRefService.GetLeagueName(leagueId, languageCode, string.Empty);
            return leagueName;
        }

        public string GetTeamName(string teamId, string languageCode)
        {
            var teamName = remotingRefService.GetTeamName(teamId, languageCode, string.Empty);
            return teamName;
        }

        public string GetBettypeName(string betTypeId, string languageCode)
        {
            var betTypeName = remotingRefService.GetBetTypeName(betTypeId, languageCode);
            return betTypeName;
        }

        public string GetMatchCode(string matchCode, string languageCode)
        {
            var betTypeName = remotingRefService.GetBetRadarMatchCodeFormat(matchCode, languageCode);
            return betTypeName;
        }

        public string GetCategogyName(string categoryId, string languageCode)
        {
            var categoryName = remotingRefService.GetResourceDataByRefIdAndResourceId("Category", categoryId, languageCode, string.Empty);
            return categoryName;
        }
     
        public T GetFeedbackTemplates<T>(string fileXml)
        {
            var templatePath = Path.Combine(hostingEnvironment.ContentRootPath, path, fileXml);
            var template = XMLIO.DeserializeXMLFileToObject<T>(templatePath);
            return (T)Convert.ChangeType(template, typeof(T));
        }

        public Tuple<int, int, string> GetCategorySubCategoryCWL(IEnumerable<SettingItem> settings, string settingValueName)
        {
            var category = settings.FirstOrDefault(x => x.SettingName.Equals(SettingName.MainCategory, StringComparison.OrdinalIgnoreCase)
                && x.SettingValue.Equals(DefaultValue.Special_Notification, StringComparison.OrdinalIgnoreCase));
            var subCategoryId = 0;

            if (category != null)
            {
                var subCategory = settings.FirstOrDefault(x => x.SettingName.Equals(SettingName.SubCategory, StringComparison.OrdinalIgnoreCase)
                    && x.ParentIds.Any(y => y == category.SettingId)
                    && x.SettingValue.Equals(settingValueName, StringComparison.OrdinalIgnoreCase));
                subCategoryId = subCategory != null ? subCategory.SettingId : 0;
            }

            return new Tuple<int, int, string>(
                category != null ? category.SettingId : 0, subCategoryId,
                string.Format(DefaultValue.CategoryXml,
                    category != null ? category.SettingId : 0,
                    subCategoryId));
        }

        public ValueTuple<bool, string> CheckFeedbackValidParams(CreateMutipleFeedbackCommand criteria)
        {
            var stringBuilder = new StringBuilder();
            const string invalid = "{0} is null.";
            var invalidParamsCategoryStr = string.IsNullOrEmpty(criteria.CategoryIds) ? "CategoryIds" : "";
            var invalidParamsCategory = string.IsNullOrEmpty(criteria.CategoryXml) ? "CategoryXml" : "";
            var invalidParamsProduct = string.IsNullOrEmpty(criteria.ProductXml) ? "Products" : "";
            var invalidParamsSubCategory = string.IsNullOrEmpty(criteria.SubCategoryIds) ? "SubCategoryIds" : "";
            var invalidParamsResponse = criteria.ResponseId == 0 ? "ResponseId" : "";
            var invalidParamsStation = string.IsNullOrEmpty(criteria.StationId) ? "StationId" : "";
            var invalidParamsStatus = criteria.StatusId == 0 ? "StatusId" : "";
            var invalidParams = invalidParamsCategoryStr + invalidParamsCategory + invalidParamsProduct
            + invalidParamsSubCategory + invalidParamsResponse + invalidParamsStation + invalidParamsStatus;
            return string.IsNullOrEmpty(invalidParams) ?
                new ValueTuple<bool, string>(true, "") :
                new ValueTuple<bool, string>(false, stringBuilder.AppendFormat(invalid, invalidParams).ToString());
        }

        public async Task<CommandResult> EditFeedbackSystemSettingAsync(long LastLogID, string ServiceName)
        {
            var settingJobStatus = new List<SystemSettingItem>
            {
                new SystemSettingItem { SettingName = SystemSettingName.JobStatus, Value = JobStatus.Completed },
                new SystemSettingItem { SettingName = SystemSettingName.LastRuntime, Value = DateTime.Now.ToString("yyyy-MM-dd hh:mm:ss.fff tt") },
                new SystemSettingItem { SettingName = SystemSettingName.LastLogID, Value = LastLogID.ToString() }
            };
            return await systemSetting.EditSystemSettingAsync(settingJobStatus, ServiceName);
        }

        public async Task<CommandResult> EditAmendmentFeedbackSystemSettingAsync(int LastTicketID, string ServiceName)
        {
            var settingJobStatus = new List<SystemSettingItem>
            {
                new SystemSettingItem { SettingName = SystemSettingName.JobStatus, Value = JobStatus.Completed },
                new SystemSettingItem { SettingName = SystemSettingName.LastRuntime, Value = DateTime.Now.ToString("yyyy-MM-dd hh:mm:ss.fff tt") },
                new SystemSettingItem { SettingName = SystemSettingName.LastTicketID, Value = LastTicketID.ToString() }
            };
            return await systemSetting.EditSystemSettingAsync(settingJobStatus, ServiceName);
        }
    }
}
