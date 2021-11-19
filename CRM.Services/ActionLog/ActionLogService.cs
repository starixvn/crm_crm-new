namespace CRM.Services.ActionLog
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Threading.Tasks;
    using System.Xml;
    using CRM.Core.Constants;
    using CRM.Core.Models;
    using CRM.Core.Services;
    using CRM.Criteria.ActionLog;
    using CRM.Models.ActionLog;
    using CRM.Models.Setting;
    using CRM.Resources;
    using Microsoft.Extensions.Options;

    public interface IActionLogService
    {
        Task<IEnumerable<ActionLogInfo>> GetActivityLogAsync(GetActivityLogCriteria criteria);
    }

    public class ActionLogService : IActionLogService
    {
        private readonly IBaseService baseService;
        private readonly ICommonService commonService;
        private readonly ISettingService settingService;
        private readonly IDictionary<string,string> allSetting;
        private readonly AppSettings appSettings;
        private IDictionary<string, bool> actionLogKeyHash = null;
        private IDictionary<string, string[]> actionLogBoolValueHash = null;

        public ActionLogService(
            IBaseService baseService,
            ICommonService commonService,
            ISettingService settingService,
            IOptionsSnapshot<AppSettings> appSettings
        )
        {
            this.baseService = baseService;
            this.commonService = commonService;
            this.settingService = settingService;
            this.appSettings = appSettings.Value;
            allSetting = GetAllSettings().Result;
        }

        public async Task<IEnumerable<ActionLogInfo>> GetActivityLogAsync(GetActivityLogCriteria criteria)
        {
            var actionLogs = await baseService.GetDataAsync<ActionLogInfo>(criteria);
            actionLogs = actionLogs.Where(x => !string.Equals(x.OldValues, x.NewValues, StringComparison.OrdinalIgnoreCase));

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

                actionLog.LogDate = commonService.ConvertToClientDateTime(actionLog.LogDate);

                FilterOldNewResults(actionLog);
            }

            return actionLogs;
        }

        public void FilterOldNewResults(ActionLogInfo log)
        {
            string oldValue = log.OldValues;
            string newValue = log.NewValues;
            if (string.Equals(oldValue, newValue, StringComparison.OrdinalIgnoreCase))
            {
                return;
            }

            var oldResults = ParseXMLString(oldValue);
            var newResults = ParseXMLString(newValue);

            if (oldResults.Count == 0)
            {
                foreach (string key in newResults.Keys)
                {
                    var fieldName = key;
                    log.NewValuesList.Add(GetSettingValue(key, newResults[key], ref fieldName));
                    log.FieldNames.Add(fieldName);
                }
            }

            if (oldResults.Count == newResults.Count)
            {
                foreach (string key in newResults.Keys)
                {
                    var oldString = oldResults.ContainsKey(key) ? oldResults[key] : string.Empty;
                    var newString = newResults[key];
                    if (!string.Equals(oldString, newString, StringComparison.OrdinalIgnoreCase))
                    {
                        var fieldName = key;
                        log.OldValuesList.Add(GetSettingValue(key, oldString, ref fieldName));
                        log.NewValuesList.Add(GetSettingValue(key, newString, ref fieldName));
                        log.FieldNames.Add(fieldName);
                    }
                }
            }
        }

        public IDictionary<string, string> ParseXMLString(string xml)
        {
            var results = new Dictionary<string, string>();

            if (string.IsNullOrWhiteSpace(xml))
            {
                return results;
            }

            var document = new XmlDocument();
            document.LoadXml(xml);

            foreach (XmlNode node in document.ChildNodes[0].ChildNodes)
            {
                if (string.Equals(node.Name, "ProvinceId", StringComparison.OrdinalIgnoreCase))
                {
                    continue;
                }

                if (!results.ContainsKey(node.Name))
                {
                    results.Add(node.Name, node.InnerText);
                }
                else
                {
                    results[node.Name] += "<br/>" + node.InnerText;
                }
            }

            return results;
        }

        public string GetSettingValue(string key, string value, ref string fieldName)
        {
            string keyUpper = key.ToUpperInvariant();

            //// Convert bit value (1/0) to Yes/No.
            if (ActionLogBoolValue.TryGetValue(keyUpper, out string[] boolValues))
            {
                if (int.TryParse(value, out int index) && index < 2)
                {
                    return boolValues[index];
                }
            }

            // Value isn't in Setting hash.
            if (!ActionLogKey.ContainsKey(keyUpper))
            {
                return value;
            }

            // LanguageID can be stored multiple values.
            if (string.Equals(keyUpper, "LanguageID", StringComparison.OrdinalIgnoreCase))
            {
                fieldName = "Language";
                return GetMultipleSettingValue(value, fieldName);
            }

            fieldName = key.Replace("ID", string.Empty);
            return GetSettingValue(value, fieldName);
        }

        public string GetSettingValue(string key, string settingType)
        {
            if (string.Equals(key, "0", StringComparison.OrdinalIgnoreCase))
            {
                return "N/A";
            }

            if (!allSetting.TryGetValue(key + settingType.ToUpperInvariant(), out string settingValue))
            {
                settingValue = key;
            }

            return settingValue;
        }

        public string GetMultipleSettingValue(string value, string settingType)
        {
            var valueList = value.Split(',');

            int keyCount = valueList.Length;
            for (int i = 0; i < keyCount; i++)
            {
                valueList[i] = GetSettingValue(valueList[i], settingType);
            }

            return string.Join(", ", valueList);
        }

        public async Task<IDictionary<string, string>> GetAllSettings()
        {
            var countries = await settingService.GetCountryAsync(SettingConstants.Active);
            var newCountries = countries.Select(c => new Setting { SettingId = c.Id, SettingValue = c.Name, SettingName = "Country" }).ToList();

            var currencies = await settingService.GetCurrencyAsync();
            var newCurrencies = currencies.Select(c => new Setting { SettingId = c.Id, SettingValue = c.Name, SettingName = "Currency" }).ToList();

            var settings = await settingService.GetSettingAsync("");
            var settingList = (List<Setting>)settings;
            settingList.AddRange(newCountries);
            settingList.AddRange(newCurrencies);

            // Add default N/A
            settingList.ToList().Add(new Setting { SettingId = 0, SettingValue = ViewResources.Symbol_NotApply, SettingName = string.Empty });

            return settingList.GroupBy(x => x.SettingId).Select(x => x.First())
                .ToDictionary(x => x.SettingId + x.SettingName.ToUpperInvariant(), x => x.SettingValue);
        }

        public IDictionary<string, bool> ActionLogKey
        {
            get
            {
                if (actionLogKeyHash == null)
                {
                    actionLogKeyHash = new Dictionary<string, bool>();

                    var stringArray = appSettings.CRMActionLogKey
                        .Split(new[] { ',', ';' }, StringSplitOptions.RemoveEmptyEntries);
                    foreach (string item in stringArray)
                    {
                        var upperKey = item.ToUpperInvariant();
                        if (!actionLogKeyHash.ContainsKey(upperKey))
                        {
                            actionLogKeyHash.Add(upperKey, true);
                        }
                    }
                }

                return actionLogKeyHash;
            }
        }

        public IDictionary<string, string[]> ActionLogBoolValue
        {
            get
            {
                if (actionLogBoolValueHash == null)
                {
                    actionLogBoolValueHash = new Dictionary<string, string[]>();

                    var boolValue = new[] { "No", "Yes" };
                    var stringArray = appSettings.CRMActionLogBoolValue
                        .Split(new[] { ',', ';' }, StringSplitOptions.RemoveEmptyEntries);
                    foreach (string item in stringArray)
                    {
                        var upperKey = item.ToUpperInvariant();
                        if (!actionLogBoolValueHash.ContainsKey(upperKey))
                        {
                            actionLogBoolValueHash.Add(upperKey, boolValue);
                        }
                    }
                }

                return actionLogBoolValueHash;
            }
        }
    }
}
