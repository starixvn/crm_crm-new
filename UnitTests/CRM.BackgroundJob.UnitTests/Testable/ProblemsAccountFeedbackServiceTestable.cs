namespace CRM.BackgroundJob.UnitTests.Testable
{
    using CRM.BackgroundJob.Models.ProblemsAccount;
    using CRM.BackgroundJob.Services;
    using CRM.Core.Models;
    using CRM.Core.Services;
    using Fanex.CRM.BackgroundJob.Criteria;
    using Fanex.CRM.BackgroundJob.Models;
    using Fanex.CRM.BackgroundJob.Services;
    using Microsoft.Extensions.Options;
    using System;
    using System.Collections.Generic;
    using System.Threading.Tasks;

    public class ProblemsAccountFeedbackServiceTestable : ProblemsAccountFeedbackService
    {
        public ProblemsAccountFeedbackServiceTestable(IOptionsSnapshot<AppJobSettings> appSettings,
            IBaseService baseService,
            ISettingService settingService,
            ISystemSettingService systemSettingService,
            ICustomerService customerService,
            ICRMLogService logService,
            IWinLossTransactionService transactionService,
            ICommonFeedback commonFeedback)
        : base(appSettings,
                baseService,
                settingService,
                systemSettingService,
                customerService,
                logService,
                commonFeedback,
                transactionService
              )
        {
        }

        public async Task Public_CreateFeedbackForProblemsAccountAsync(
            ProblemsAccountSetting problemsAccountSetting, bool isUAT,
            DateTime LastRuntimeEnv, string LastRuntimeNameEnv,
            string JobStatusNameEnv, string Environment)
        {
            await base.CreateFeedbackForProblemsAccountAsync(problemsAccountSetting, isUAT,
            LastRuntimeEnv, LastRuntimeNameEnv,
            JobStatusNameEnv, Environment);
        }

        public async Task Public_CreateProblemsAccountFeedbackCreditAsync(
           IEnumerable<ProblemsAccountAutoFeedbackInfor> problemsAccounts,
           IEnumerable<SettingItem> settings,
           IEnumerable<SystemSettingMapping> settingMappings)
        {
            await base.CreateProblemsAccountFeedbackCreditAsync(problemsAccounts, settings, settingMappings);
        }

        public async Task Public_CheckValidParamsAndInsertFeedbackAsync(
            IEnumerable<ProblemsAccountAutoFeedbackInfor> problemsAccounts,
            CreateMutipleFeedbackCommand criteria)
        {
            await base.CheckValidParamsAndInsertFeedbackAsync(problemsAccounts, criteria);
        }

        public string Public_GetProductXml(IEnumerable<SettingItem> settings)
        {
            return base.GetProductXml(settings);
        }

        public string Public_GetRelatedCustomerXml(IEnumerable<ProblemsAccountAutoFeedbackInfor> problemsAccounts)
        {
            return base.GetRelatedCustomerXml(problemsAccounts);
        }

        public string Public_GetCustomerXml(IEnumerable<ProblemsAccountAutoFeedbackInfor> problemsAccounts)
        {
            return base.GetCustomerXml(problemsAccounts);
        }

        public SettingItem Public_GetProblemsSportsbookProduct(IEnumerable<SettingItem> settings)
        {
            return base.GetProblemsSportsbookProduct(settings);
        }

        public string Public_GetSolution(IEnumerable<ProblemsAccountAutoFeedbackInfor> problemsAccounts)
        {
            return base.GetSolution(problemsAccounts);
        }

        public string Public_GetDescription()
        {
            return base.GetDescription();
        }

        public async Task<CommandResult> Public_EditSystemSettingAsync(string JobStatusNameEnv,
            string LastRuntimeNameEnv, string JobStatusValue)
        {
            return await EditSystemSettingAsync(JobStatusNameEnv, LastRuntimeNameEnv, JobStatusValue);
        }

        public async Task<CommandResult> Public_EditSystemSettingUpdateLastLogIdAsync(string JobStatusNameEnv, string LastRuntimeNameEnv,
            string lastLogIdName, int maxLastLogId)
        {
            return await EditSystemSettingUpdateLastLogIdAsync(JobStatusNameEnv, LastRuntimeNameEnv,
            lastLogIdName, maxLastLogId);
        }
    }
}
