namespace CRM.BackgroundJob.Services
{
    using System.Collections.Generic;
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

        public async Task<CommandResult> ImportCWLLogInfoAsync(
            IEnumerable<TOSMAInfor> TOSMAInfors,
            IEnumerable<TOReachInfor> TOReachInfors,
            string Environment = Constants.DefaultEnviroment)
        {
            const string XmlTemplate = "<r LogId='{0}' CustId='{1}' CurrencyName='{2}' " +
                "Username='{3}' Recommend='{4}' Mrecommend='{5}' Srecommend='{6}' " +
                "Winloss='{7}' ProductNameEN='{8}' ProductNameSC='{9}' ProductNameTH='{10}' " +
                "ProductNameVN='{11}' LevelId='{12}' GroupId='{13}'/>";
            var stringBuilder = new StringBuilder(Constants.BeginRootTag.ToLowerInvariant());
            foreach (TOSMAInfor smaInfor in TOSMAInfors)
            {
                var productEN = GetProductName(cwl.ProductId.ToString(), "en-US");
                var productSC = GetProductName(cwl.ProductId.ToString(), "zh-CN");
                var productTH = GetProductName(cwl.ProductId.ToString(), "th-TH");
                var productVN = GetProductName(cwl.ProductId.ToString(), "vi-VN");

                stringBuilder.AppendFormat(XmlTemplate,
                    cwl.LogId,
                    cwl.CustId,
                    cwl.CurrencyName,
                    cwl.Username,
                    cwl.Recommend,
                    cwl.Mrecommend,
                    cwl.Srecommend,
                    cwl.Winloss,
                    productEN,
                    productSC,
                    productTH,
                    productVN,
                    cwl.LevelId,
                    cwl.GroupId);
            }

            stringBuilder.Append(Constants.EndRootTag.ToLowerInvariant());
            var criteria = new ImportCWLLogInfoCommand
            {
                XmlData = stringBuilder.ToString(),
                Environment = Environment
            };
            return await baseService.ExecuteNonQueryAsync(criteria);
        }
    }
}
