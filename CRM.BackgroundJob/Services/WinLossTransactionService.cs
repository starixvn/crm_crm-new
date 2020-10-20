namespace CRM.BackgroundJob.Services
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Threading.Tasks;
    using CRM.BackgroundJob.Criteria.WinLossLimit;
    using CRM.BackgroundJob.Models.WinLossLimit;
    using global::CRM.Core.Extensions.XML;
    using CRM.Core.Services;
    using Fanex.CRM.BackgroundJob.Models;
    using System.Text;
    using Fanex.CRM.BackgroundJob.Constants;
    using System.Xml.Linq;

    public interface IWinLossTransactionService
    {
        Task<ValueTuple<IEnumerable<WinLimitFeedBackInfo>, IEnumerable<BettypeInfo>>> ImportWinLimitFeedbackInfoAsync(
           IEnumerable<CustomerWinLimit> cusWinLimit,
           IEnumerable<GroupHeadline> headlines);
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
                decimal settingAmount = 0;
                var hlname = "";
                var headlineId = 0;
                decimal TotalWinAmt = Decimal.Truncate(limitInfo.TotalWinAmt);
                decimal TotalWinAmt_RM = Decimal.Truncate(limitInfo.TotalWinAmt_RM);
                var BettypeIDList = limitInfo.BettypeIDList == null ? "" : limitInfo.BettypeIDList;
                if (limitInfo.MaxWinLimitSetting == null || limitInfo.MaxWinLimitSetting == string.Empty)
                {
                    settingAmount = 0;
                }
                else
                {
                    var element = XElement.Parse(limitInfo.MaxWinLimitSetting);
                    var setting = new MaxWinLimitSetting
                    {
                        Level1 = (decimal)element.Attribute("Level1"),
                        Level2 = (decimal)element.Attribute("Level2"),
                        Level3 = (decimal)element.Attribute("Level3"),
                        Level101 = (decimal)element.Attribute("Level101"),
                        Level102 = (decimal)element.Attribute("Level102")
                    };
                    settingAmount = getLimitSetting(setting, limitInfo.LevelID);
                }

                GroupHeadline headline = headlines.FirstOrDefault(x => x.CustId == limitInfo.CustID);
                headlineId = headline != null ? headline.HeadlineId : 0;
                hlname = headline != null ? headline.HeadlineName : "";

                stringBuilder.AppendFormat(XmlTemplate,
                    limitInfo.LogID,
                    limitInfo.CustID,
                    headlineId,
                    hlname,
                    limitInfo.CustID,
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

        protected internal virtual decimal getLimitSetting(MaxWinLimitSetting setting, int levelID)
        {
            decimal amount = 0;
            switch (levelID)
            {
                case Constants.Level1:
                    amount = setting.Level1;
                    break;
                case Constants.Level2:
                    amount = setting.Level2;
                    break;
                case Constants.Level3:
                    amount = setting.Level3;
                    break;
                case Constants.Level101:
                    amount = setting.Level101;
                    break;
                case Constants.Level102:
                    amount = setting.Level102;
                    break;
                default:
                    break;
            }
            return Decimal.Truncate(amount);

        }
    }
}
