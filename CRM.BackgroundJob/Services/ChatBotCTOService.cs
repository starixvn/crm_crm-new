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
        Task<CommandResult> ImportTOSMAInfoAsync(IEnumerable<TOSMAInfor> TOSMAInfors,
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

        public async Task<CommandResult> ImportTOSMAInfoAsync(IEnumerable<TOSMAInfor> TOSMAInfors,
                                         string Environment = Constants.DefaultEnviroment)
        {
            const string XmlTemplate = "<r LogId='{0}' CustId='{1}' Username='{2}' Recommend='{3}'" +
                " Mrecommend='{4}' Srecommend='{5}' CurrencyName='{6}'" +
                " RoleEN='{7}' RoleSC='{8}' RoleTH='{9}' RoleYN='{10}' " +
                " SportNameEN='{11}'  SportNameSC='{12}'  SportNameTH='{13}'  SportNameYN='{14}'" +
                " LeagueNameEN='{15}' LeagueNameSC='{16}' LeagueNameTH='{17}' LeagueNameYN ='{18}'" +
                " HomeNameEN ='{19}' HomeNameSC='{20}' HomeNameTH='{21}' HomeNameYN='{22}'" +
                " AwayNameEN='{23}' AwayNameSC='{24}' AwayNameTH='{25}' AwayNameYN='{26}' " +
                " Outstanding='{27}'> </r>";

            var stringBuilder = new StringBuilder(Constants.BeginRootTag.ToLowerInvariant());
            foreach (TOSMAInfor smaInfor in TOSMAInfors)
            {
                var sportNameEN = commonFeedback.GetSportName(smaInfor.Sporttype.ToString(), Language.en_US);
                var sportNameSC = commonFeedback.GetSportName(smaInfor.Sporttype.ToString(), Language.zh_CN);
                var sportNameTH = commonFeedback.GetSportName(smaInfor.Sporttype.ToString(), Language.th_TH);
                var sportNameYN = commonFeedback.GetSportName(smaInfor.Sporttype.ToString(), Language.vi_VN);

                var leagueNameEN = commonFeedback.GetLeagueName(smaInfor.LeagueId.ToString(), Language.en_US);
                var leagueNameSC = commonFeedback.GetLeagueName(smaInfor.LeagueId.ToString(), Language.zh_CN);
                var leagueNameTH = commonFeedback.GetLeagueName(smaInfor.LeagueId.ToString(), Language.th_TH);
                var leagueNameYN = commonFeedback.GetLeagueName(smaInfor.LeagueId.ToString(), Language.vi_VN);

                var homeNameEN = commonFeedback.GetTeamName(smaInfor.HomeId.ToString(), Language.en_US);
                var homeNameSC = commonFeedback.GetTeamName(smaInfor.HomeId.ToString(), Language.zh_CN);
                var homeNameTH = commonFeedback.GetTeamName(smaInfor.HomeId.ToString(), Language.th_TH);
                var homeNameYN = commonFeedback.GetTeamName(smaInfor.HomeId.ToString(), Language.vi_VN);

                var awayNameEN = commonFeedback.GetTeamName(smaInfor.AwayId.ToString(), Language.en_US);
                var awayNameSC = commonFeedback.GetTeamName(smaInfor.AwayId.ToString(), Language.zh_CN);
                var awayNameTH = commonFeedback.GetTeamName(smaInfor.AwayId.ToString(), Language.th_TH);
                var awayNameYN = commonFeedback.GetTeamName(smaInfor.AwayId.ToString(), Language.vi_VN);

                var smaLevelYN = GetSMALevel(smaInfor.RoleId, Language.en_US);
                var smaLevelEN = GetSMALevel(smaInfor.RoleId, Language.en_US);

                stringBuilder.AppendFormat(XmlTemplate,
                    smaInfor.LogId,
                    smaInfor.CustId,
                    smaInfor.UserName,
                    smaInfor.Recommend,
                    smaInfor.Mrecommend,
                    smaInfor.Srecommend,
                    smaInfor.CurrencyName,
                    smaLevelEN,
                    GetSMALevel(smaInfor.RoleId, Language.zh_CN),
                    GetSMALevel(smaInfor.RoleId, Language.th_TH),
                    smaLevelYN,
                    sportNameEN,
                    sportNameSC,
                    sportNameTH,
                    sportNameYN,
                    leagueNameEN,
                    leagueNameSC,
                    leagueNameTH,
                    leagueNameYN,
                    homeNameEN,
                    homeNameSC,
                    homeNameTH,
                    homeNameYN,
                    awayNameEN,
                    awayNameSC,
                    awayNameTH,
                    awayNameYN,
                    smaInfor.Outstanding
                    );
            }

            stringBuilder.Append(Constants.EndRootTag.ToLowerInvariant());
            var criteria = new TOControlImportCommand
            {
                XmlData = stringBuilder.ToString(),
                Environment = Environment
            };
            return await baseService.ExecuteNonQueryAsync(criteria);
        }

        protected internal virtual string GetSMALevel(int roleId, string language)
        {
            const byte SuperID = 4;
            const byte MasterID = 3;

            string smaLevel = "";
            switch (language)
            {
                case Language.en_US:
                    var isMasterUS = roleId == MasterID ? SMALevel.Master : SMALevel.Agent;
                    smaLevel = roleId == SuperID ? SMALevel.Super : isMasterUS;
                    break;
                case Language.zh_CN:
                    var isMasterSC = roleId == MasterID ? SMALevel.MasterSC : SMALevel.AgentSC;
                    smaLevel = roleId == SuperID ? SMALevel.SuperSC : isMasterSC;
                    break;
                case Language.th_TH:
                    var isMasterTH = roleId == MasterID ? SMALevel.MasterTH : SMALevel.AgentTH;
                    smaLevel = roleId == SuperID ? SMALevel.SuperTH : isMasterTH;
                    break;
                default:
                    smaLevel = "";
                    break;
            }
            return smaLevel;
        }
    }
}
