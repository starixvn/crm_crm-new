namespace CRM.BackgroundJob.Services
{
    using System;
    using System.Collections.Generic;
    using System.IO;
    using System.Linq;
    using System.Text;
    using CRM.BackgroundJob.Models;
    using CRM.BackgroundJob.Models.TurnoverControll;
    using CRM.Core.Extensions.XML;
    using Fanex.CRM.BackgroundJob.Constants;
    using Fanex.CRM.BackgroundJob.Criteria;
    using Fanex.CRM.BackgroundJob.Models;
    using Fanex.RemotingRef;
    using Microsoft.AspNetCore.Hosting;

    public interface ICommonFeedback
    {
        string GetProductName(string productId, string languageCode);

        string GetSportName(string sportTypeId, string languageCode);

        string GetLeagueName(string leagueId, string languageCode);

        string GetTeamName(string teamId, string languageCode);

        string GetBettypeName(string betTypeId, string languageCode);

        T GetFeedbackTemplates<T>(string fileXml);

        ValueTuple<bool, string> CheckFeedbackValidParams(CreateMutipleFeedbackCommand criteria);

        Tuple<int, int, string> GetCategorySubCategoryCWL(IEnumerable<SettingItem> settings, string settingValueName);
    }
    public class CommonFeedback : ICommonFeedback
    {
        private readonly IHostingEnvironment hostingEnvironment;

        private const string path = "Format_Templates\\Company-WinLoss-Limit";

        public CommonFeedback(IHostingEnvironment hostingEnvironment)
        {
            this.hostingEnvironment = hostingEnvironment;
        }

        public string GetProductName(string productId, string languageCode)
        {
            var productName = new RemotingRefService().GetResourceDataByRefIdAndResourceId("Product", productId, languageCode, string.Empty);
            return productName;
        }

        public string GetSportName(string sportTypeId, string languageCode)
        {
            var sportName = new RemotingRefService().GetSportName(sportTypeId, languageCode, string.Empty);
            return sportName;
        }

        public string GetLeagueName(string leagueId, string languageCode)
        {
            var leagueName = new RemotingRefService().GetLeagueName(leagueId, languageCode, string.Empty);
            return leagueName;
        }

        public string GetTeamName(string teamId, string languageCode)
        {
            var teamName = new RemotingRefService().GetTeamName(teamId, languageCode, string.Empty);
            return teamName;
        }

        public string GetBettypeName(string betTypeId, string languageCode)
        {
            var betTypeName = new RemotingRefService().GetBetTypeName(betTypeId, languageCode);
            return betTypeName;
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
    }
}
