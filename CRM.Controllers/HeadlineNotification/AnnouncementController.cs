namespace CRM.Controllers.HeadlineNotification
{
    using System;
    using System.Collections.Generic;
    using System.IO;
    using System.Linq;
    using System.Threading.Tasks;
    using CRM.Core.Enumerables;
    using CRM.Criteria.Announcement;
    using CRM.Criteria.PicAndHeadline;
    using CRM.Models;
    using CRM.Services;
    using CRM.Services.Interfaces;
    using Fanex.NAP.Client.Helpers.Web;
    using Microsoft.AspNetCore.Hosting;
    using Microsoft.AspNetCore.Http;
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

        public async Task<IActionResult> GetAnnouncementTemplate()
        {
            var (notificationTemplates, contents) = await announcementService.GetAnnouncementTemplateAsync();
            return Json(new
            {
                notificationTemplates,
                contents
            });
        }

        [HttpPost]
        public async Task<IActionResult> GetAnnouncement([FromBody] GetAnnouncementCriteria criteria)
        {
            var announcements = await announcementService.GetAnnouncementAsync(criteria);
            var announcementsOrderBy = announcements.OrderByDescending(x => x.AnnouncementId);
            return Json(new
            {
                data = announcementsOrderBy,
                TotalItems = criteria.TotalRows
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

        [HttpPost]
        public async Task<IActionResult> SaveFilesAndCreateAnnouncement([FromForm] CreateAnnouncementCommand command)
        {
            try
            {
                var origFileNames = string.Join(", ", command.FormFile.Select(x => x.FileName));
                var fileNames = string.Join(", ", command.FormFile.Select(x => GetFileNames(x)));
                command.OrigFileName = origFileNames;
                command.FileName = fileNames;
                command.UserId = napSession.UserId;
                command.LoginIP = ClientIP;
                var commandResult = await announcementService.NewAnnouncementAsync(command);
                if (commandResult.IsSuccessful)
                {
                    await SaveFile(command.FormFile);
                }
                return Json(commandResult);
            }
            catch (Exception e)
            {
                throw;
            }
            
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

        private string GetFileNames(IFormFile formFile)
        {
            string path = Path.Combine(hostingEnvironment.ContentRootPath, pathImages, formFile.FileName);
            var isExist = System.IO.File.Exists(path);
            var fileName = isExist ? $"{DateTime.Now.ToString("yyyyMMddHHmmss")}-{formFile.FileName}" : formFile.FileName;
            return fileName;
        }

        private async Task SaveFile(IList<IFormFile> formFiles)
        {
            foreach (var file in formFiles)
            {
                var fileName = GetFileNames(file);
                var pathFile = Path.Combine(hostingEnvironment.ContentRootPath, pathImages, fileName);
                using (Stream stream = new FileStream(pathFile, FileMode.Create))
                {
                    await file.CopyToAsync(stream);
                }
            }
        }
    }
}