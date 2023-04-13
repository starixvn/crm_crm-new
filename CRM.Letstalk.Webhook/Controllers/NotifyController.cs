namespace CRM.BotService.Endpoint.Controllers
{
    using System.Collections.Generic;
    using System.Linq;
    using System.Threading.Tasks;
    using CRM.BotService.Core.Services.Interfaces;
    using CRM.Core.Services;
    using CRM.Models.BotServices;
    using Microsoft.AspNetCore.Authentication.JwtBearer;
    using Microsoft.AspNetCore.Authorization;
    using Microsoft.AspNetCore.Mvc;

    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
    public class NotifyController : Controller
    {
        private readonly IPushMessageService pushMessageService;
        private readonly ICRMLogService logService;

        public NotifyController(IPushMessageService pushMessageService, ICRMLogService logService)
        {
            this.pushMessageService = pushMessageService;
            this.logService = logService;
        }

        [HttpPost]
        [Route("api/multiple-notify")]
        public async Task<IActionResult> SendMessageMultipleAsync(IEnumerable<NotificationMessage> notifications)
        {
            var tasks = new List<Task<SendResult>>();

            if (notifications is not null && notifications.Any())
            {
                foreach (var notification in notifications)
                {
                    tasks.Add(
                        Task.Run(
                            () => pushMessageService.PushAsync(notification)
                            ));
                }
            }

            var results = (await Task.WhenAll(tasks)).ToList();

            return Ok(results);
        }

        [HttpPost]
        [Route("api/single-notify")]
        public async Task<IActionResult> SendMessageAsync(NotificationMessage notification)
        {
            var result = await pushMessageService.PushAsync(notification);
            return Ok(result);
        }
    }
}