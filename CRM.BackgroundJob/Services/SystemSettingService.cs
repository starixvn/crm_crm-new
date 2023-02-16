namespace Fanex.CRM.BackgroundJob.Services
{
    using System.Collections.Generic;
    using System.Threading.Tasks;
    using Fanex.CRM.BackgroundJob.Constants;
    using Fanex.CRM.BackgroundJob.Criteria;
    using Fanex.CRM.BackgroundJob.Criteria.ChatBot;
    using Fanex.CRM.BackgroundJob.Models;
    using global::CRM.BackgroundJob.Criteria.ArchivingDA;
    using global::CRM.BackgroundJob.Criteria.ProblemsAccount;
    using global::CRM.BackgroundJob.Criteria.ResultAmendment;
    using global::CRM.BackgroundJob.Criteria.TurnoverControll;
    using global::CRM.BackgroundJob.Criteria.VoidingSettledTickets;
    using global::CRM.BackgroundJob.Criteria.WinLossLimit;
    using global::CRM.BackgroundJob.Models.ArchivingDA;
    using global::CRM.BackgroundJob.Models.ProblemsAccount;
    using global::CRM.BackgroundJob.Models.ResultAmendment;
    using global::CRM.BackgroundJob.Models.WinLossLimit;
    using global::CRM.Core.Extensions.XML;
    using global::CRM.Core.Models;
    using global::CRM.Core.Services;

    public interface ISystemSettingService
    {
        Task<AbnormalBetSystemSetting> GetAbnormalBetSettingAsync(string serviceName);

        Task<CommandResult> EditSystemSettingAsync(
            IEnumerable<SystemSettingItem> settings, 
            string serviceName = Constants.ServiceName_AutoFB);

        Task<CommandResult> EditJobStatusAsync(string status);

        Task<AbnormalBetSystemSetting> GetChatBotSystemSettingAsync(
            string serviceName, 
            string Environment = Constants.DefaultEnvironment);

        Task<WinLossSystemSetting> GetWinLossSettingAsync();

        Task<WinLossSystemSetting> GetTurnoverSettingAsync();

        Task<ProblemsAccountSetting> GetProblemsAccountSettingAsync();

        Task<ResultAmendmentSetting> GetResultAmendmentSettingAsync();

        Task<ResultAmendmentSetting> GetVoidingSettledTicketsSettingAsync();

        Task<ArchivingDASetting> GetArchivingDASettingAsync();
    }

    public class SystemSettingService : ISystemSettingService
    {
        private readonly IBaseService baseService;

        public SystemSettingService(IBaseService baseService)
        {
            this.baseService = baseService;
        }

        public async Task<AbnormalBetSystemSetting> GetAbnormalBetSettingAsync(string serviceName)
        {
            var criteria = new GetSystemSettingByServiceNameCriteria
            {
                ServiceName = serviceName
            };
            return await baseService.GetDataEntityAsync<AbnormalBetSystemSetting>(criteria);
        }

        public async Task<CommandResult> EditSystemSettingAsync(
            IEnumerable<SystemSettingItem> settings,
            string serviceName = Constants.ServiceName_AutoFB)
        {
            var criteria = new EditSystemSettingCommand
            {
                Settings = settings.ToXML("ROOT").ToString(),
                ServiceName = serviceName
            };
            return await baseService.ExecuteNonQueryAsync(criteria);
        }

        public async Task<CommandResult> EditJobStatusAsync(string status)
        {
            var settings = new List<SystemSettingItem>
            {
                new SystemSettingItem { SettingName = SystemSettingName.JobStatus, Value = status }
            };
            return await EditSystemSettingAsync(settings);
        }

        public async Task<AbnormalBetSystemSetting> GetChatBotSystemSettingAsync(
            string serviceName, 
            string Environment = Constants.DefaultEnvironment)
        {
            var criteria = new GetChatBotSystemSettingCriteria
            {
                ServiceName = serviceName,
                Environment = Environment
            };
            return await baseService.GetDataEntityAsync<AbnormalBetSystemSetting>(criteria);
        }

        public async Task<WinLossSystemSetting> GetWinLossSettingAsync()
        {
            var criteria = new GetWinLossSystemSettingCriteria();
            return await baseService.GetDataEntityAsync<WinLossSystemSetting>(criteria);
        }

        public async Task<WinLossSystemSetting> GetTurnoverSettingAsync()
        {
            var criteria = new GetTOControllSystemSettingCriteria();
            return await baseService.GetDataEntityAsync<WinLossSystemSetting>(criteria);
        }

        public async Task<ProblemsAccountSetting> GetProblemsAccountSettingAsync()
        {
            var criteria = new GetProblemsAccountSystemSettingCriteria();
            return await baseService.GetDataEntityAsync<ProblemsAccountSetting>(criteria);
        }
        
        public async Task<ResultAmendmentSetting> GetResultAmendmentSettingAsync()
        {
            var criteria = new GetResultAmendmentSystemSettingCriteria();
            return await baseService.GetDataEntityAsync<ResultAmendmentSetting>(criteria);
        }

        public async Task<ResultAmendmentSetting> GetVoidingSettledTicketsSettingAsync()
        {
            var criteria = new GetVoidingSettledTicketsSettingCriteria();
            return await baseService.GetDataEntityAsync<ResultAmendmentSetting>(criteria);
        }

        public async Task<ArchivingDASetting> GetArchivingDASettingAsync()
        {
            var criteria = new GetSystemSettingByServiceNameCriteria
            {
                ServiceName = Constants.ServiceName_ArchivingDA
            };
            return await baseService.GetDataEntityAsync<ArchivingDASetting>(criteria);
        }

    }
}