using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CRM.Core.Services;
using Fanex.CRM.BackgroundJob.Services;

namespace CRM.BackgroundJob.Services.Test
{
    public interface ISiteMessageService
    {
        Task PullMessageFromSiteMessage();
    }

    public class SiteMessageService : ISiteMessageService
    {
        private readonly IAutoFeedbackService autoFeedbackService;
        public SiteMessageService(IAutoFeedbackService autoFeedbackService)
        {
            this.autoFeedbackService = autoFeedbackService;
        }
        public async Task PullMessageFromSiteMessage()
        {
            await autoFeedbackService.ResultAmendmentExecuteJobAsync();
        }
    }
}
