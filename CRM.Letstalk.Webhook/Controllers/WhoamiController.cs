namespace CRM.Letstalk.Webhook.Controllers
{
    using System;
    using System.Collections.Generic;
    using System.Threading.Tasks;
    using CRM.Core.Extensions;
    using CRM.Letstalk.Client.Models.Results;
    using CRM.Letstalk.Client.Services.Interfaces;
    using Microsoft.AspNetCore.Authorization;
    using Microsoft.AspNetCore.Mvc;

    public class WhoamiController : Controller
    {
        private readonly Func<int, ILetstalkService> letstalkService;

        public WhoamiController(Func<int, ILetstalkService> letstalkService)
        {
            this.letstalkService = letstalkService;
        }

        [Route("Whoami")]
        [Route("Whoami.aspx")]
        [AllowAnonymous]
        public IActionResult Whoami()
        {
            return Content(WhoamiHelper.GetContent(HttpContext));
        }

        [Route("send")]
        [AllowAnonymous]
        public async Task<IActionResult> SendImage()
        {
            var url = "https://pngimg.com/uploads/batman/batman_PNG13.png";
            var result = new PushMessageResult();
            try
            {
                result = await letstalkService(100035).PushAsync(new List<string> { "t381023" },
                    "Hello");
            }
            catch (System.Exception ex)
            {
                throw;
            }

            return Json(result);
        }
    }
}