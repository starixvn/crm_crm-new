namespace Fanex.CRM.BackgroundJob.Services
{
    using System.Collections.Generic;
    using System.Text;
    using System.Threading.Tasks;
    using Fanex.CRM.BackgroundJob.Criteria;
    using Fanex.CRM.BackgroundJob.Models;
    using Fanex.CRM.BackgroundJob.Repositories;
    using global::CRM.BackgroundJob.Criteria.TurnoverControll;
    using global::CRM.BackgroundJob.Criteria.WinLossLimit;
    using global::CRM.BackgroundJob.Models.TurnoverControll;
    using global::CRM.BackgroundJob.Models.WinLossLimit;
    using global::CRM.Core.Services;
    using Microsoft.Extensions.Configuration;

    public interface ICustomerService
    {
        Task<CustomerInfo> GetCustomerInfoAsync(string username, bool isGuest);

        Task<IEnumerable<GroupHeadline>> GetGroupHeadlineAsync(IEnumerable<int> custIds);

        Task<IEnumerable<CustomerWinLimit>> GetListCustReachLimitAsync(WinLossSystemSetting setting);

        Task<IEnumerable<TONotification>> GetListSMANotificationAsync(WinLossSystemSetting turnOverSetting);

        Task<IEnumerable<CustOutStanding>> GetListCustOutStandingAsync(IEnumerable<TONotification> custNotifications);
    }

    public class CustomerService : ICustomerService
    {
        private readonly ICustomerRepository repository;
        private readonly IBaseService baseService;

        private readonly string Enviroment;

        private const string DefaultEnviroment = Constants.Constants.DefaultEnviroment;

        public CustomerService(
            ICustomerRepository repository,
            IBaseService baseService,
            IConfiguration configuration)
        {
            this.repository = repository;
            this.baseService = baseService;
            Enviroment = string.IsNullOrEmpty(configuration.GetValue<string>("SiteEnvironment")) ? DefaultEnviroment : configuration.GetValue<string>("SiteEnvironment");
        }

        public async Task<CustomerInfo> GetCustomerInfoAsync(string username, bool isGuest)
        {
            var criteria = new GetCustomerInfoByUsernameCriteria
            {
                Username = username,
                IsGuest = isGuest
            };
            return await repository.GetCustomerInfoByUsernameAsync(criteria);
        }

        public async Task<IEnumerable<GroupHeadline>> GetGroupHeadlineAsync(IEnumerable<int> custIds)
        {
            var criteria = new GetGroupHeadlineCriteria
            {
                CustIds = string.Join(",", custIds)
            };
            return await baseService.GetDataAsync<GroupHeadline>(criteria);
        }

        public async Task<IEnumerable<CustomerWinLimit>> GetListCustReachLimitAsync(WinLossSystemSetting setting)
        {
            var criteria = new GetListCustomerReachLimitCriteria
            {
                BatchSize = setting.BatchSize,
                ConfigUAT = setting.ConfigUAT,
                ConfigPRO = setting.ConfigPRO,
                LastLogID = setting.LastLogID,
                IsCredit = setting.IsCredit,
                IsDeposit = setting.IsDeposit
            };
            return await baseService.GetDataAsync<CustomerWinLimit>(criteria);
        }

        public async Task<IEnumerable<TONotification>> GetListSMANotificationAsync(WinLossSystemSetting turnOverSetting)
        {
            var criteria = new GetTOControlCustNotificationSelCriteria
            {
                LastNotifiedDate = turnOverSetting.LastNotifiedDate,
                BatchSize = turnOverSetting.BatchSize,
                ConfigUAT = turnOverSetting.ConfigUAT,
                ConfigPRO = turnOverSetting.ConfigPRO,
                IsCredit = turnOverSetting.IsCredit,
                IsDeposit = turnOverSetting.IsDeposit,
                Enviroment = Enviroment
            };
            return await baseService.GetDataAsync<TONotification>(criteria);
        }

        public async Task<IEnumerable<CustOutStanding>> GetListCustOutStandingAsync(IEnumerable<TONotification> custNotifications)
        {
            const string XmlTemplate = "<r custid='{0}' matchid='{1}'/>";
            var stringBuilder = new StringBuilder("<Root>");
            foreach (TONotification custNoti in custNotifications)
            {
                stringBuilder.AppendFormat(XmlTemplate, custNoti.CustID, custNoti.MatchID);
            }
            stringBuilder.Append("</Root>");
            var criteria = new GetTOControllCustOutstandingCriteria
            {
                xml = stringBuilder.ToString()
            };
            return await baseService.GetDataAsync<CustOutStanding>(criteria);
        }
    }
}