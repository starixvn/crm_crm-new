using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CRM.BackgroundJob.Models.ResultAmendment;
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
        private readonly ICommonFeedback commonFeedback;
        private readonly ICRMLogService logService;

        public SiteMessageService(ICommonFeedback commonFeedback, ICRMLogService logService)
        {
            this.commonFeedback = commonFeedback;
            this.logService = logService;
        }
        public async Task PullMessageFromSiteMessage()
        {
            var amendmentDescTemplate = commonFeedback.GetFeedbackTemplates<AmendmentDescriptionTemplate>("AmendmentDescriptionTemplate.xml");
            logService.LogInformation(amendmentDescTemplate.NumberGame);
        }
    }
}
