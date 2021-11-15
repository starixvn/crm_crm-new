namespace CRM.Services.ActionLog
{
    using System.Collections.Generic;
    using System.Threading.Tasks;
    using System.Linq;
    using System.Web;
    using CRM.Core;
    using CRM.Core.Services;
    using CRM.Criteria.ActionLog;
    using CRM.Models.ActionLog;
    using System;
    using System.Xml;
    using CRM.Core.Enumerables;

    public interface IActionLogService
    {
        Task<IEnumerable<ActionLogInfo>> GetActivityLogAsync(GetActivityLogCriteria criteria);
    }

    public class ActionLogService : IActionLogService
    {
        private readonly IBaseService baseService;
        private readonly ICommonService commonService;

        public ActionLogService(IBaseService baseService, ICommonService commonService)
        {
            this.baseService = baseService;
            this.commonService = commonService;
        }

        public async Task<IEnumerable<ActionLogInfo>> GetActivityLogAsync(GetActivityLogCriteria criteria)
        {
            var actionLogs = await baseService.GetDataAsync<ActionLogInfo>(criteria);
            foreach (var actionLog in actionLogs)
            {
                if (!string.IsNullOrWhiteSpace(actionLog.OldValues))
                {
                    actionLog.OldValues = actionLog.OldValues.Replace("<MSN>", "<Telegram>").Replace("</MSN>", "</Telegram>")
                                                                 .Replace("<Yahoo>", "<Letstalk>").Replace("</Yahoo>", "</Letstalk>")
                                                                 .Replace("<BBM>", "<Zalo>").Replace("</BBM>", "</Zalo>");
                }

                if (!string.IsNullOrWhiteSpace(actionLog.NewValues))
                {
                    actionLog.NewValues = actionLog.NewValues.Replace("<MSN>", "<Telegram>").Replace("</MSN>", "</Telegram>")
                                                                .Replace("<Yahoo>", "<Letstalk>").Replace("</Yahoo>", "</Letstalk>")
                                                                .Replace("<BBM>", "<Zalo>").Replace("</BBM>", "</Zalo>");
                }
            }
            return actionLogs;
        }

        //private static void FilterOldNewResults(ActionLogInfo log)
        //{
        //    string oldValue = log.OldValues;
        //    string newValue = log.NewValues;
        //    if (string.Equals(oldValue, newValue, StringComparison.OrdinalIgnoreCase))
        //    {
        //        return;
        //    }

        //    var oldResults = ParseXMLString(oldValue);
        //    var newResults = ParseXMLString(newValue);

        //    if (oldResults.Count == 0)
        //    {
        //        foreach (string key in newResults.Keys)
        //        {
        //            var fieldName = key;
        //            log.NewValuesList.Add(GetSettingValue(key, newResults[key], ref fieldName));
        //            log.FieldNames.Add(fieldName);
        //        }
        //    }

        //    if (oldResults.Count == newResults.Count)
        //    {
        //        foreach (string key in newResults.Keys)
        //        {
        //            var oldString = oldResults.ContainsKey(key) ? oldResults[key] : string.Empty;
        //            var newString = newResults[key];
        //            if (!string.Equals(oldString, newString, StringComparison.OrdinalIgnoreCase))
        //            {
        //                var fieldName = key;
        //                log.OldValuesList.Add(GetSettingValue(key, oldString, ref fieldName));
        //                log.NewValuesList.Add(GetSettingValue(key, newString, ref fieldName));
        //                log.FieldNames.Add(fieldName);
        //            }
        //        }
        //    }
        //}

        //private static IDictionary<string, string> ParseXMLString(string xml)
        //{
        //    var results = new Dictionary<string, string>();

        //    if (string.IsNullOrWhiteSpace(xml))
        //    {
        //        return results;
        //    }

        //    var document = new XmlDocument();
        //    document.LoadXml(xml);

        //    foreach (XmlNode node in document.ChildNodes[0].ChildNodes)
        //    {
        //        if (AppSession.CurrentUser.UserRole == UserRole.NormalStaff
        //            && string.Equals(node.Name, "ProvinceId", StringComparison.OrdinalIgnoreCase))
        //        {
        //            continue;
        //        }

        //        if (!results.ContainsKey(node.Name))
        //        {
        //            results.Add(node.Name, node.InnerText);
        //        }
        //        else
        //        {
        //            results[node.Name] += "<br/>" + node.InnerText;
        //        }
        //    }

        //    return results;
        //}

        //private static string GetSettingValue(string key, string value, ref string fieldName)
        //{
        //    string keyUpper = key.ToUpperInvariant();

        //    // Convert bit value (1/0) to Yes/No.
        //    if (AppSetting.ActionLogBoolValue.TryGetValue(keyUpper, out string[] boolValues))
        //    {
        //        if (int.TryParse(value, out int index) && index < 2)
        //        {
        //            return boolValues[index];
        //        }
        //    }

        //    // Value isn't in Setting hash.
        //    if (!AppSetting.ActionLogKey.ContainsKey(keyUpper))
        //    {
        //        return value;
        //    }

        //    // LanguageID can be stored multiple values.
        //    if (string.Equals(keyUpper, "LanguageID", StringComparison.OrdinalIgnoreCase))
        //    {
        //        fieldName = "Language";
        //        return GetMultipleSettingValue(value, fieldName);
        //    }

        //    fieldName = key.Replace("ID", string.Empty);
        //    return GetSettingValue(value, fieldName);
        //}

        //private static string GetSettingValue(string key, string settingType)
        //{
        //    if (string.Equals(key, "0", StringComparison.OrdinalIgnoreCase))
        //    {
        //        return "N/A";
        //    }

        //    if (!CacheManager.AllSettings.TryGetValue(key + settingType.ToUpperInvariant(), out string settingValue))
        //    {
        //        settingValue = key;
        //    }

        //    return settingValue;
        //}

        //private static string GetMultipleSettingValue(string value, string settingType)
        //{
        //    var valueList = value.Split(',');

        //    int keyCount = valueList.Length;
        //    for (int i = 0; i < keyCount; i++)
        //    {
        //        valueList[i] = GetSettingValue(valueList[i], settingType);
        //    }

        //    return string.Join(", ", valueList);
        //}
    }
}
