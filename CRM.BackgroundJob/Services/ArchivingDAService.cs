using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using CRM.BackgroundJob.Models.ArchivingDA;
using CRM.BackgroundJob.Models.ProblemsAccount;
using CRM.Core.Services;
using Fanex.CRM.BackgroundJob.Constants;
using Fanex.CRM.BackgroundJob.Models;
using Fanex.CRM.BackgroundJob.Services;
using Microsoft.Extensions.Options;

namespace CRM.BackgroundJob.Services
{
    public interface IArchivingDAService
    {
        Task CreateFeedbackForArchivingDAAsync(ArchivingDASetting archivingDASetting, bool isUAT,
            DateTime LastRuntimeEnv, string LastRuntimeNameEnv, string JobStatusNameEnv, string Environment
        );
    }
    public class ArchivingDAService : IArchivingDAService
    {


        private readonly AppJobSettings appSettings;
        private readonly IBaseService baseService;
        private readonly ISettingService settingService;
        private readonly ICustomerService customerService;
        private readonly ICRMLogService logService;
        private readonly ICommonFeedback commonFeedback;
        private readonly IFeedbackTransactionService feedbackTransactionService;

        private readonly string templateXml = "ProblemsSolutionTemplate.xml";

        public ArchivingDAService(
            IOptions<AppJobSettings> appSettings,
            IBaseService baseService,
            ISettingService settingService,
            ICustomerService customerService,
            ICRMLogService logService,
            ICommonFeedback commonFeedback,
            IFeedbackTransactionService feedbackTransactionService
            )
        {
            this.appSettings = appSettings.Value;
            this.baseService = baseService;
            this.settingService = settingService;
            this.customerService = customerService;
            this.logService = logService;
            this.commonFeedback = commonFeedback;
            this.feedbackTransactionService = feedbackTransactionService;
        }

        public async Task CreateFeedbackForArchivingDAAsync(ArchivingDASetting archivingDASetting, bool isUAT,
            DateTime LastRuntimeEnv, string LastRuntimeNameEnv, string JobStatusNameEnv, string Environment
        )
        {
            await commonFeedback.EditSystemSettingAsyncByEnv(JobStatusNameEnv, LastRuntimeNameEnv, JobStatus.Running, Constants.ServiceName_ArchivingDA);
            var isStatgeOne = await feedbackTransactionService.GetArchivingDAStatus();
            //if (isStatgeOne)
            //{

            //}
            //else
            //{
            //    if (archivingDASetting.IsSyncArchivedAccount)
            //    {
            //        await commonFeedback.EditSystemSettingAsyncByEnv(JobStatusNameEnv, LastRuntimeNameEnv, JobStatus.Completed, Constants.ServiceName_ArchivingDA);
            //    }
            //    else
            //    {
            //        await commonFeedback.EditArchivingDAStatusSettingAsync(Constants.ServiceName_ArchivingDA);
            //    }
            //}
        }
    } 
}
