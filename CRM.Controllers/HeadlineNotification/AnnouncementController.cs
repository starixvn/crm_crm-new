namespace CRM.Controllers.HeadlineNotification
{
    using System;
    using System.IO;
    using System.Linq;
    using System.Threading.Tasks;
    using CRM.Core.Enumerables;
    using CRM.Core.Models;
    using CRM.Criteria.Announcement;
    using CRM.Criteria.PicAndHeadline;
    using CRM.Models;
    using CRM.Services;
    using CRM.Services.Interfaces;
    using Fanex.Data.Repository;
    using Fanex.NAP.Client.Helpers.Web;
    using Microsoft.AspNetCore.Hosting;
    using Microsoft.AspNetCore.Mvc;

    public class AnnouncementController : BaseController
    {
        private readonly IAnnouncementService announcementService;
        private readonly INapSession napSession;
        private readonly ISettingService settingService;
        private readonly ICommonService commonService;
        private readonly IWebHostEnvironment hostingEnvironment;
        private readonly string pathImages = "www/dist/css/images/announcement";

        public AnnouncementController(
            IAnnouncementService announcementService,
            INapSession napSession,
            ISettingService settingService,
            ICommonService commonService,
            IWebHostEnvironment hostingEnvironment
            )
        {
            this.announcementService = announcementService;
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
                var isExist = System.IO.File.Exists(path);
                var fileName = isExist ? $"{DateTime.Now.ToString("yyyyMMddHHmmss")}-{file.FileName}" : file.FileName;
                var pathFile = Path.Combine(hostingEnvironment.ContentRootPath, pathImages, fileName);
                using (Stream stream = new FileStream(pathFile, FileMode.Create))
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

        [HttpPost]
        public async Task<IActionResult> GetAnnouncement([FromBody]  GetAnnouncementCriteria criteria)
        {
            var announcements = await announcementService.GetAnnouncementAsync(criteria);
            var announcementsOrderBy = announcements.OrderBy(x => x.AnnouncementId);
            return Json(new
            {
                data = announcementsOrderBy,
                TotalItems = criteria.TotalRows
            });
        }

        public async Task<IActionResult> GetAnnouncementById(int id)
        {
            var (announcement, contents) = await announcementService.GetContentByIdAsync(id);
            return Json(new
            {
                data = announcement,
                contents = contents
            });
        }


        public async Task<IActionResult> AllSetting()
        {
            var sites = await settingService.GetSystemSiteAsync(new GetSystemSiteCriteria());
            var currency = (await settingService.GetCurrencyAsync()).OrderBy(c => c.Name);
            var allSetting = new
            {
                SiteList = sites,
                CurrencyList = currency,
                HeadlineTypeList = Enum.GetValues(typeof(HeadlineType)).Cast<HeadlineType>().Select(status => new BaseModel { Id = (int)status, Name = status.ToString() }),
            };

            return Json(allSetting);
        }
    }
}