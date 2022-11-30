namespace CRM.Controllers.HeadlineNotification
{
    using System.IO;
    using System.Threading.Tasks;
    using CRM.Core.Models;
    using CRM.Criteria.Announcement;
    using CRM.Services;
    using Fanex.NAP.Client.Helpers.Web;
    using Microsoft.AspNetCore.Hosting;
    using Microsoft.AspNetCore.Mvc;

    public class AnnouncementController : BaseController
    {
        private readonly INapSession napSession;
        private readonly ISettingService settingService;
        private readonly ICommonService commonService;
        private readonly IWebHostEnvironment hostingEnvironment;
        private readonly string pathImages = "www/dist/css/images/announcement";

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
        public async Task<IActionResult> Create([FromForm] CreateAnnouncementCommand command)
        {
            foreach (var file in command.FormFile)
            {
                string path = Path.Combine(hostingEnvironment.ContentRootPath, pathImages, file.FileName);
                using (Stream stream = new FileStream(path, FileMode.Create))
                {
                    await file.CopyToAsync(stream);
                }
            }
            var result = new CommandResult
            {
                Code = 0,
                Message = string.Empty
            };
            return Json(result);
        }
    }
}