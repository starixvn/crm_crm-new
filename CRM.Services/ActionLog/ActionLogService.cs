namespace CRM.Services.ActionLog
{
    using System;
    using System.Collections.Generic;
    using System.IO;
    using System.Linq;
    using System.Text;
    using System.Text.RegularExpressions;
    using System.Threading.Tasks;
    using System.Xml;
    using System.Xml.Serialization;
    using CRM.Core.Constants;
    using CRM.Core.Models;
    using CRM.Core.Services;
    using CRM.Criteria.ActionLog;
    using CRM.Criteria.AdminTool.LogSetting;
    using CRM.Models.ActionLog;
    using CRM.Models.AdminTool.SettingLog;
    using CRM.Models.Setting;
    using CRM.Resources;
    using Microsoft.Extensions.Options;

    public interface IActionLogService
    {
        Task<IEnumerable<ActionLogInfo>> GetActivityLogAsync(GetActivityLogCriteria criteria);

        Task<IEnumerable<SettingLogInfo>> GetSettingLogsAsync(GetSettingLogCriteria criteria);
    }

    public class ActionLogService : IActionLogService
    {
        private readonly IBaseService baseService;
        private readonly ICommonService commonService;
        private readonly ISettingService settingService;
        private IDictionary<string, string> allSetting;
        private readonly AppSettings appSettings;
        private IDictionary<string, bool> actionLogKeyHash;
        private IDictionary<string, string[]> actionLogBoolValueHash;
        private const int NUMBER_OF_INDEX = 2;
        private const string ActionUpdateJobSettingLog = "Update Job Setting";

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
        }

        public async Task<IEnumerable<ActionLogInfo>> GetActivityLogAsync(GetActivityLogCriteria criteria)
        {
            criteria.FromDate = commonService.ConvertClientFromTimeToServerTime(criteria.FromDate);
            criteria.ToDate = commonService.ConvertClientToTimeToServerTime(criteria.ToDate);
            var actionLogs = await baseService.GetDataAsync<ActionLogInfo>(criteria);
            if (actionLogs.Any())
            {
                actionLogs = actionLogs.Where(x => !string.Equals(x.OldValues, x.NewValues, StringComparison.OrdinalIgnoreCase));
                allSetting = await GetAllSettings();

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
            }
            return actionLogs;

        }

        public static bool IsCategoryRemark(IDictionary<string, string> oldResults, IDictionary<string, string> newResults)
        {
            const string remarkKey = "Remark";
            var oldRemark = oldResults.ContainsKey(remarkKey) ? oldResults[remarkKey] : string.Empty;
            var newRemark = newResults.ContainsKey(remarkKey) ? newResults[remarkKey] : string.Empty;

            if (!string.Equals(oldRemark, newRemark, StringComparison.OrdinalIgnoreCase))
            {
                return true;
            }
            return false;
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
                    if (!string.Equals(oldString, newString, StringComparison.OrdinalIgnoreCase) || IsCategoryRemark(oldResults, newResults))
                    {
                        var fieldName = key;
                        log.OldValuesList.Add(GetSettingValue(key, oldString, ref fieldName));
                        log.NewValuesList.Add(GetSettingValue(key, newString, ref fieldName));
                        log.FieldNames.Add(fieldName);
                    }
                }
            }
        }

        public static IDictionary<string, string> ParseXMLString(string xml)
        {
            var results = new Dictionary<string, string>();
            StringBuilder bld = new StringBuilder();

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
                    results.Add(node.Name, node.InnerXml);
                }
                else
                {
                    bld.Append("<br/>" + node.InnerXml);
                    results[node.Name] = bld.ToString();
                }
            }

            return results;
        }

        private string GetSettingValue(string key, string value, ref string fieldName)
        {
            string keyUpper = key.ToUpperInvariant();

            //// Convert bit value (1/0) to Yes/No.
            if (ActionLogBoolValue.TryGetValue(keyUpper, out string[] boolValues) && int.TryParse(value, out int index) && index < NUMBER_OF_INDEX)
            {
                return boolValues[index];
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

            var settings = await settingService.GetSettingAsync();
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

        public async Task<IEnumerable<SettingLogInfo>> GetSettingLogsAsync(GetSettingLogCriteria criteria)
        {
            criteria.FromDate = commonService.ConvertToServerDateTime(criteria.FromDate);
            criteria.ToDate = commonService.ConvertToServerDateTime(commonService.GetEndOfDate(criteria.ToDate));
            var settingLogs = await baseService.GetDataAsync<SettingLogInfo>(criteria);
            var settingLogsFilter = settingLogs.Where(x => !string.Equals(x.OldValues, x.NewValues, StringComparison.OrdinalIgnoreCase));

            foreach (var log in settingLogsFilter)
            {
                log.LogDate = commonService.ConvertToClientDateTime(log.LogDate);
                if (log.ActionName == ActionUpdateJobSettingLog)
                {
                    var oldSettingLog = ParseLogOldNewUpdateJobSetting(log.OldValues);
                    var newSettingLog = ParseLogOldNewUpdateJobSetting(log.NewValues);
                    FilterOldNewJobSettingResults(log, oldSettingLog, newSettingLog);
                }
                else
                {
                    FilterOldNewResults(log);
                }
            }

            return settingLogsFilter;
        }

        private static void FilterOldNewJobSettingResults(SettingLogInfo log, JobSettingLog oldSettingLog, JobSettingLog newSettingLog)
        {
            var fieldNames = new List<string>();
            var oldValuesList = new List<string>();
            var newValuesList = new List<string>();
            for (var i = 0; i < newSettingLog.updateConfigs.Count; i++)
            {
                var newJobSettingLog = newSettingLog.updateConfigs[i];
                var fieldName = $"{newJobSettingLog.ServiceName} - {newJobSettingLog.SettingName}";
                fieldNames.Add(fieldName);

            }
            var oldVal = oldSettingLog.updateConfigs.Select(x => x.Value);
            oldValuesList.AddRange(oldVal);
            log.OldValuesList = oldValuesList;
            var newVal = newSettingLog.updateConfigs.Select(x => x.Value);
            newValuesList.AddRange(newVal);
            log.NewValuesList = newValuesList;
            log.FieldNames = fieldNames;
        }

        private static JobSettingLog ParseLogOldNewUpdateJobSetting(string xml)
        {
            var regexStart = new Regex(@"<\s*[A-Za-z]");
            var matchStart = regexStart.Match(xml);
            var regexEnd = new Regex(@"[_A-Za-z0-9][^_A-Za-z0-9]");
            var matchEnd = regexEnd.Match(xml);
            var root = xml.Substring(matchStart.Index + matchStart.Length - 1, matchEnd.Index);
            XmlSerializer serializer = new XmlSerializer(typeof(JobSettingLog), new XmlRootAttribute(root));

            using (var stringReader = new StringReader(xml))
            {
                return (JobSettingLog)serializer.Deserialize(stringReader);
            }
        }
    }
}