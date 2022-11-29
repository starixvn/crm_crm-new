namespace CRM.Controllers.HeadlineNotification
{
    using System;
    using System.Collections.Generic;
    using System.IO;
    using System.Linq;
    using System.Text;
    using System.Threading.Tasks;
    using CRM.Core.Constants;
    using CRM.Core.Filters;
    using CRM.Core.Models;
    using CRM.Criteria.Announcement;
    using CRM.Criteria.NotificationList;
    using CRM.Letstalk.Client.Services.Interfaces;
    using CRM.Services;
    using Fanex.NAP.Client.Helpers.Web;
    using Microsoft.AspNetCore.Hosting;
    using Microsoft.AspNetCore.Mvc;
    using Microsoft.Extensions.Hosting.Internal;
    using static Fanex.NAP.Core.Business.Constant;

    public class AnnouncementController : BaseController
    {
        private readonly INapSession napSession;
        private readonly ISettingService settingService;
        private readonly ICommonService commonService;
        private readonly IWebHostEnvironment hostingEnvironment;


        public AnnouncementController(
           INapSession napSession,
           ISettingService settingService,
           ICommonService commonService,
           IWebHostEnvironment hostingEnvironment
            )
        {
            this.napSession = napSession;
            this.settingService = settingService;
            this.commonService = commonService;
            this.hostingEnvironment = hostingEnvironment;
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] CreateAnnouncementCommand command)
        {
                string path = Path.Combine(hostingEnvironment.ContentRootPath, command.FormFiles.FileName);
                using (Stream stream = new FileStream(path, FileMode.Create))
                {
                    await command.FormFiles.CopyToAsync(stream);
                }
                var result = new CommandResult
                {
                    Code = 0
                };
                return Json(result);
        }
    }
}
