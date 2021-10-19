using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CRM.Core.Services;

namespace CRM.BackgroundJob.Services.Test
{
    public interface ISiteMessageService
    {
        Task PullMessageFromSiteMessage();
    }

    public class SiteMessageService : ISiteMessageService
    {
        private readonly ICRMLogService logService;
        public SiteMessageService(ICRMLogService logService)
        {
            this.logService = logService;
        }
        public async Task PullMessageFromSiteMessage()
        {
            logService.LogInformation("test base woker");
        }
    }
}
