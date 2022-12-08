namespace CRM.Controllers.HeadlineNotification
{
    using System;
    using System.Collections.Generic;
    using System.IO;
    using System.Linq;
    using System.Threading.Tasks;
    using CRM.Core.Enumerables;
    using CRM.Core.Models;
    using CRM.Criteria.Announcement;
    using CRM.Criteria.PicAndHeadline;
    using CRM.Models;
    using CRM.Models.Announcement;
    using CRM.Services;
    using Fanex.NAP.Client.Helpers.Web;
    using Microsoft.AspNetCore.Hosting;
    using Microsoft.AspNetCore.Mvc;
    using OfficeOpenXml.FormulaParsing.Excel.Functions.DateTime;
    using OfficeOpenXml.FormulaParsing.Excel.Functions.Math;

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
        public async Task<IActionResult> GetAnnouncement([FromForm] GetAnnouncementCriteria criteria)
        {
            var result = new List<AnnouncementInfo>
            {
                new AnnouncementInfo
                {
                    AnnouncementId = 1,
                    NotificationTemplate = "Special Announcement",
                    CreatedBy = "Teddy",
                    SendDateString = "Jan 05, 2022",
                    SendTimeString = "11:01:53 AM",
                    Status = "Fail",
                    Title = "Voided Settled Tickets Template - Accounting PIC"
                }
            };
            return Json(new
            {
                data = result,
                TotalItems = 1
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
