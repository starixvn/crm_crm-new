namespace CRM.BackgroundJob.Services
{
    using System.Collections.Generic;
    using System.Linq;
    using System.Text;
    using System.Threading.Tasks;
    using CRM.BackgroundJob.Criteria.ChatBot_CTO;
    using CRM.BackgroundJob.Models.ChatBotCTO;
    using CRM.Core.Extensions.XML;
    using CRM.Core.Models;
    using CRM.Core.Services;
    using Fanex.CRM.BackgroundJob.Constants;

    public interface IChatBotCTOService
    {
        Task<IEnumerable<TOReachInfor>> GetChatbotCTOSettingInfoAsync(int LastLogId, int BatchSize);
        Task<IEnumerable<TOSMAInfor>> GetChatbotCTOSMAInfoAsync(IEnumerable<TOReachInfor> TOReachInfors);
        Task<CommandResult> ImportCWLLogInfoAsync(IEnumerable<TOSMAInfor> TOSMAInfors,
                                                  string Environment = Constants.DefaultEnviroment);
    }
    public class ChatBotCTOService : IChatBotCTOService
    {
        private readonly IBaseService baseService;
        private readonly ICommonFeedback commonFeedback;

        public ChatBotCTOService(
            IBaseService baseService,
            ICommonFeedback commonFeedback)
        {
            this.baseService = baseService;
            this.commonFeedback = commonFeedback;
        }
        public async Task<IEnumerable<TOReachInfor>> GetChatbotCTOSettingInfoAsync(int LastLogId, int BatchSize)
        {
            var criteria = new GetTOControlSettingByLastLogIdCriteria
            {
                LastLogId = LastLogId,
                BatchSize = BatchSize
            };
            return await baseService.GetDataAsync<TOReachInfor>(criteria);
        }

        public async Task<IEnumerable<TOSMAInfor>> GetChatbotCTOSMAInfoAsync(IEnumerable<TOReachInfor> TOReachInfors)
        {
            var criteria = new GetTOControlSMAInfroCriteria
            {
                XML = TOReachInfors.ToXML("root").ToString()
            };
            return await baseService.GetDataAsync<TOSMAInfor>(criteria);
        }

        public async Task<CommandResult> ImportCWLLogInfoAsync(IEnumerable<TOSMAInfor> TOSMAInfors,
                                         string Environment = Constants.DefaultEnviroment)
        {
            const string XmlTemplate = "<r LogId='0' CustId='1' Username='2' Recommend='3'" +
                " Mrecommend='4' Srecommend='5' CurrencyName='6'" +
                " RoleEN='7' RoleSC='8' RoleTH='9' RoleYN='10' " +
                " SportNameEN='11'  SportNameSC='12'  SportNameTH='13'  SportNameYN='14'" +
                " LeagueNameEN='15' LeagueNameSC='16' LeagueNameTH='17' LeagueNameYN ='18'" +
                " HomeNameEN ='19' HomeNameSC='20' HomeNameTH='21' HomeNameYN='22'" +
                " AwayNameEN='23' AwayNameSC='24' AwayNameTH='25' AwayNameYN='26' " +
                " Outstanding='27'> </r>";
            var stringBuilder = new StringBuilder(Constants.BeginRootTag.ToLowerInvariant());
            foreach (TOSMAInfor smaInfor in TOSMAInfors)
            {
                var sportNameEN = commonFeedback.GetSportName(smaInfor.Sporttype.ToString(), "en-US");
                var sportNameSC = commonFeedback.GetSportName(smaInfor.Sporttype.ToString(), "zh-CN");
                var sportNameTH = commonFeedback.GetSportName(smaInfor.Sporttype.ToString(), "th-TH");
                var sportNameVN = commonFeedback.GetSportName(smaInfor.Sporttype.ToString(), "vi-VN");

                var leagueNameEN = commonFeedback.GetLeagueName(smaInfor.LeagueId.ToString(), "en-US");
                var leagueNameSC = commonFeedback.GetLeagueName(smaInfor.LeagueId.ToString(), "zh-CN");
                var leagueNameTH = commonFeedback.GetLeagueName(smaInfor.LeagueId.ToString(), "th-TH");
                var leagueNameVN = commonFeedback.GetLeagueName(smaInfor.LeagueId.ToString(), "vi-VN");

                var homeNameEN = commonFeedback.GetTeamName(smaInfor.HomeId.ToString(), "en-US");
                var homeNameSC = commonFeedback.GetTeamName(smaInfor.HomeId.ToString(), "zh-CN");
                var homeNameTH = commonFeedback.GetTeamName(smaInfor.HomeId.ToString(), "th-TH");
                var homeNameVN = commonFeedback.GetTeamName(smaInfor.HomeId.ToString(), "vi-VN");

                var awayNameEN = commonFeedback.GetTeamName(smaInfor.AwayId.ToString(), "en-US");
                var awayNameSC = commonFeedback.GetTeamName(smaInfor.AwayId.ToString(), "zh-CN");
                var awayNameTH = commonFeedback.GetTeamName(smaInfor.AwayId.ToString(), "th-TH");
                var awayNameVN = commonFeedback.GetTeamName(smaInfor.AwayId.ToString(), "vi-VN");

                stringBuilder.AppendFormat(XmlTemplate,
                    smaInfor.LogId,
                    smaInfor.CustId,
                    smaInfor.UserName,
                    smaInfor.Recommend,
                    smaInfor.Mrecommend,
                    smaInfor.Srecommend,
                    smaInfor.CurrencyName,
                    SMALevel.
                    smaInfor
                    )
                    
            }

            stringBuilder.Append(Constants.EndRootTag.ToLowerInvariant());
            var criteria = new TOControlImportCommand
            {
                XmlData = stringBuilder.ToString(),
                Environment = Environment
            };
            return await baseService.ExecuteNonQueryAsync(criteria);
        }
    }
}
