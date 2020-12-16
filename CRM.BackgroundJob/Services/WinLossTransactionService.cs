namespace CRM.BackgroundJob.Services
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Threading.Tasks;
    using CRM.BackgroundJob.Criteria.WinLossLimit;
    using CRM.BackgroundJob.Models.WinLossLimit;
    using CRM.Core.Services;
    using Fanex.CRM.BackgroundJob.Models;
    using System.Text;
    using Fanex.CRM.BackgroundJob.Constants;
    using System.Xml.Linq;
    using CRM.Core.Models;
    using CRM.BackgroundJob.Models.TurnoverControll;
    using CRM.BackgroundJob.Criteria.TurnoverControll;
    using System.Web;

    public interface IWinLossTransactionService
    {
        Task<ValueTuple<IEnumerable<WinLimitFeedBackInfo>, IEnumerable<BettypeInfo>>> ImportWinLimitFeedbackInfoAsync(
               IEnumerable<CustomerWinLimit> cusWinLimit,
               IEnumerable<GroupHeadline> headlines);

        Task<CommandResult> EditFeedbackWinLossInfoAsync(
               int LogID,
               string status,
               string description);

        Task<IEnumerable<TOControlFeedbackInfor>>ImportTOControllFeedbackInfoAsync(
             IEnumerable<GroupHeadline> headlines,
             IEnumerable<CustOutStanding> custOutStandings,
             IEnumerable<TONotification> custNotifications);

        Task<CommandResult> EditTOControlFeedbackInfoAsync(
               string LogID,
               string status,
               string description);

    }
    public class WinLossTransactionService : IWinLossTransactionService
    {
        private readonly IBaseService baseService;
        public WinLossTransactionService(
            IBaseService baseService)
        {
            this.baseService = baseService;
        }
        public async Task<ValueTuple<IEnumerable<WinLimitFeedBackInfo>, IEnumerable<BettypeInfo>>> ImportWinLimitFeedbackInfoAsync(
           IEnumerable<CustomerWinLimit> cusWinLimit,
           IEnumerable<GroupHeadline> headlines)
        {
            const string XmlTemplate = "<r logid='{0}' custid='{1}' hl='{2}' hlname='{3}' related='{4}' product='{5}' group='{6}' level='{7}' " +
                                       "limitsetting='{8}' winamount='{9}' winamountRM='{10}' time='{11}' bettype='{12}'/>";
            var stringBuilder = new StringBuilder(Constants.BeginRootTag);
            foreach (var limitInfo in cusWinLimit)
            {
                double settingAmount = 0;
                var hlname = "";
                var headlineId = 0;
                double TotalWinAmt = limitInfo.TotalWinAmt;
                double TotalWinAmt_RM = limitInfo.TotalWinAmt_RM;
                var BettypeIDList = limitInfo.BettypeIDList ?? limitInfo.BettypeIDList;
                if (limitInfo.MaxWinLimitSetting == null || limitInfo.MaxWinLimitSetting == string.Empty)
                {
                    settingAmount = 0;
                }
                else
                {
                    var element = XElement.Parse(limitInfo.MaxWinLimitSetting);
                    var setting = new MaxWinLimitSetting
                    {
                        Level1 = (double)element.Attribute("Level1"),
                        Level2 = (double)element.Attribute("Level2"),
                        Level3 = (double)element.Attribute("Level3"),
                        Level101 = (double)element.Attribute("Level101"),
                        Level102 = (double)element.Attribute("Level102")
                    };
                    settingAmount = GetLimitSetting(setting, limitInfo.LevelID);
                }

                GroupHeadline headline = headlines.FirstOrDefault(x => x.CustId == limitInfo.CustId);
                headlineId = headline != null ? headline.HeadlineId : 0;
                hlname = headline != null ? headline.HeadlineName : "";
                var custId = limitInfo.CustId;
                var related = limitInfo.CustId;

                stringBuilder.AppendFormat(XmlTemplate,
                    limitInfo.LogID,
                    custId,
                    headlineId,
                    hlname,
                    related,
                    limitInfo.ProductID,
                    limitInfo.ProductGroup,
                    limitInfo.Level,
                    settingAmount,
                    TotalWinAmt,
                    TotalWinAmt_RM,
                    limitInfo.ReachedTime,
                    BettypeIDList);
            }
            stringBuilder.Append(Constants.EndRootTag);
            var criteria = new ImportWinLossFeedbackInfoCriteria
            {
                xml = stringBuilder.ToString()
            };
            var WinLossInfo = await baseService.FetchMultipleAsync<WinLimitFeedBackInfo, BettypeInfo>(criteria);
            return new ValueTuple<IEnumerable<WinLimitFeedBackInfo>, IEnumerable<BettypeInfo>>(WinLossInfo.Item1, WinLossInfo.Item2);
        }

        protected internal virtual double GetLimitSetting(MaxWinLimitSetting setting, int levelID)
        {
            double amount = 0;
            const int Level1 = 1;
            const int Level2 = 2;
            const int Level3 = 3;
            const int Level101 = 101;
            const int Level102 = 102;

            switch (levelID)
            {
                case Level1:
                    amount = setting.Level1;
                    break;
                case Level2:
                    amount = setting.Level2;
                    break;
                case Level3:
                    amount = setting.Level3;
                    break;
                case Level101:
                    amount = setting.Level101;
                    break;
                case Level102:
                    amount = setting.Level102;
                    break;
                default:
                    amount = 0;
                    break;
            }
            return amount;
        }

        public async Task<CommandResult> EditFeedbackWinLossInfoAsync(
           int LogID,
           string status,
           string description)
        {
            var criteria = new EditFeedbackWinLossInfoCommand
            {
                LogID = LogID,
                Status = status,
                Description = description
            };
            return await baseService.ExecuteNonQueryAsync(criteria);
        }

        public async Task<IEnumerable<TOControlFeedbackInfor>> ImportTOControllFeedbackInfoAsync(
             IEnumerable<GroupHeadline> headlines,
             IEnumerable<CustOutStanding> custOutStandings,
             IEnumerable<TONotification> custNotifications)
        {
            const string XmlTemplate = "<r custid='{0}' matchid='{1}' profileID='{2}' hl='{3}' hlname='{4}' related='{5}' profileName='{6}' maxTO='{7}' " +
                                       "houseTO='{8}' totalTO='{9}' outstanding='{10}' time='{11}' bettype='{12}' level='{13}'/>";
            var stringBuilder = new StringBuilder(Constants.BeginRootTag);
            foreach (TONotification TO in custNotifications)
            {
                var hlname = "";
                var headlineId = 0;
                double outstanding = 0;

                CustOutStanding custOutST = custOutStandings.FirstOrDefault(x => x.CustID == TO.CustID && x.MatchID == TO.MatchID);
                outstanding = custOutST != null ? custOutST.Outstanding : 0;

                GroupHeadline headline = headlines.FirstOrDefault(x => x.CustId == TO.CustID);
                headlineId = headline != null ? headline.HeadlineId : 0;
                hlname = headline != null ? headline.HeadlineName : "";

                var custId = TO.CustID;
                var related = TO.CustID;

                stringBuilder.AppendFormat(XmlTemplate,
                    custId,
                    TO.MatchID,
                    TO.ProfileID,
                    headlineId,
                    hlname,
                    related,
                    HttpUtility.HtmlEncode(TO.ProfileName),
                    TO.MaxTurnOver,
                    TO.HouseTurnover,
                    TO.TotalTurnover,
                    outstanding,
                    TO.LastNotifiedDate,
                    TO.Bettype,
                    TO.ReachLevel
                    );
            }
            stringBuilder.Append(Constants.EndRootTag);
            var criteria = new InsertTOControl_AutoFeedbackInfoCommand
            {
                xml = stringBuilder.ToString()
            };
            return await baseService.GetDataAsync<TOControlFeedbackInfor>(criteria);
        }

        public async Task<CommandResult> EditTOControlFeedbackInfoAsync(
           string LogID,
           string status,
           string description)
        {
            var criteria = new EditTOControlAutoFeedbackInfoUpdCommand
            {
                LogID = LogID,
                Status = status,
                Description = description
            };
            return await baseService.ExecuteNonQueryAsync(criteria);
        }
    }
}
