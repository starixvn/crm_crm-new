namespace CRM.Controllers.NotificationCenter
{
    using System.Collections.Generic;
    using System.IO;
    using System.Threading.Tasks;
    using CRM.Core;
    using CRM.Core.Constants;
    using CRM.Core.Filters;
    using CRM.Core.Models;
    using CRM.Core.Services;
    using CRM.Models.NotificationCenter;
    using CRM.Resources;
    using CRM.Services;
    using CRM.Services.NotificationCenter;
    using Microsoft.AspNetCore.Hosting;
    using Microsoft.AspNetCore.Http;
    using Microsoft.AspNetCore.Mvc;
    using static Fanex.NAP.Client.Helpers.Business.Constant;

    [CrmPermission(FunctionKey = FunctionKey.NotificationCenter, Policy = Policy.Read)]
    public class NotificationCenterController : BaseController
    {
        private readonly INotificationCenterService notificationCenterService;
        private readonly IExportExcelService excelService;
        private readonly IPermissionService permissionService;
        private readonly IWebHostEnvironment hostingEnvironment;
        private readonly string pathImages = "www/dist/images/notification-center";

        public NotificationCenterController(
            INotificationCenterService notificationCenterService,
            IExportExcelService excelService,
            IPermissionService permissionService,
            IWebHostEnvironment hostingEnvironment
        )
        {
            this.notificationCenterService = notificationCenterService;
            this.excelService = excelService;
            this.permissionService = permissionService;
            this.hostingEnvironment = hostingEnvironment;
        }

        [HttpPost]
        [CrmPermission(FunctionKey = $"{FunctionKey.Credit},{FunctionKey.Licensee}", Policy = Policy.Read)]
        public async Task<IActionResult> GetResultAdmNotification([FromBody] GetResultAdmNotification param)
        {
            var (sitePermission, licenseeType) = await GetDataPermission();
            param.SitePermission = sitePermission;
            param.LicenseeType = licenseeType;

            var (notifications, allSite) = await notificationCenterService.GetResultAdmNotificationAsync(param);
            return Json(new { totalItems = param.TotalRows, data = notifications, allSite });
        }

        [CrmPermission(FunctionKey = $"{FunctionKey.Credit},{FunctionKey.Licensee}", Policy = Policy.Read)]
        public async Task<IActionResult> GetResultAdmNotificationById(int id)
        {
            var (sitePermission, licenseeType) = await GetDataPermission();
            var (notificationDetails, sites) = await notificationCenterService.GetResultAdmNotificationByIdAsync(id, sitePermission, licenseeType);
            return Json(new { notificationDetails, sites });
        }

        [HttpPost]
        [CrmPermission(FunctionKey = FunctionKey.NotificationCenter, Policy = Policy.Host)]
        public async Task<IActionResult> EditResultAdmNotification([FromForm] EditResultAdmNotification param)
        {
            CommandResult commandResult = await notificationCenterService.EditResultAdmNotificationAsync(param);
            if (commandResult.IsSuccessful)
            {
                if (param.FormFile.Count > 0 && param.NotificationId > 0)
                {
                    await SaveFilesAsync(param.FormFile, param.NotificationId);
                }
                if (param.FileStringRemove.Count > 0)
                {
                    DeleteFiles(param.FileStringRemove, param.NotificationId);
                }
            }
            return Json(commandResult);
        }

        [HttpPost]
        [CrmPermission(FunctionKey = FunctionKey.NotificationCenter, Policy = Policy.Host)]
        public async Task<IActionResult> EditResultAdmStatus([FromBody] EditResultAdmNotiStatus param)
        {
            CommandResult commandResult = await notificationCenterService.EditResultAdmStatusAsync(param);
            return Json(commandResult);
        }

        [CrmPermission(FunctionKey = $"{FunctionKey.Credit},{FunctionKey.Licensee}", Policy = Policy.Read)]
        public async Task<IActionResult> GetSiteTicketsById(int id)
        {
            var (sitePermission, licenseeType) = await GetDataPermission();
            var siteTickets = await notificationCenterService.GetSiteTicketsByIdAsync(id, sitePermission, licenseeType);
            return Json(siteTickets);
        }

        [HttpPost]
        [CrmPermission(FunctionKey = $"{FunctionKey.Credit},{FunctionKey.Licensee}", Policy = Policy.Read)]
        public async Task<IActionResult> ExportExcel([FromBody] ExcelSiteTicket param)
        {
            var (sitePermission, licenseeType) = await GetDataPermission();
            IEnumerable<AdmSiteTicket> siteTickets = await notificationCenterService.GetSiteTicketsByIdAsync(param.NotificationId, sitePermission, licenseeType);
            var eventTime = param.EventTime.ToShortDateFormatDash();
            var bytes = excelService.ExportSiteTicket(siteTickets, eventTime, param.EventName);
            string reportName = string.Format(ViewResources.MncAffectedTicketFileName, eventTime);
            return File(bytes, MimeType.XLSX, $"{reportName}.xlsx");
        }

        private async Task<(string sitePermission, short licenseeType)> GetDataPermission()
        {
            var sitePermission = await permissionService.GetCurrentUserCreditPermissionsAsync();
            var licenseeType = await permissionService.GetCurrentUserLicenseeTypeAsync();
            return (sitePermission, licenseeType);
        }

        private string GetPathFile(string folder, string fileName = "")
        {
            return Path.Combine(hostingEnvironment.ContentRootPath, pathImages, folder, fileName);
        }

        private string EnsureFileFolderExists(int notificationId)
        {
            string fileFolder = notificationId.ToString();
            string folderPath = GetPathFile(fileFolder);
            var isExistFolderPath = Directory.Exists(folderPath);

            if (!isExistFolderPath)
            {
                Directory.CreateDirectory(folderPath);
            }
            return fileFolder;
        }

        private async Task SaveFilesAsync(IList<IFormFile> formFiles, int notificationId)
        {
            foreach (var file in formFiles)
            {
                string fileFolder = EnsureFileFolderExists(notificationId);
                string filePath = GetPathFile(fileFolder, file.FileName);
                using (Stream stream = new FileStream(filePath, FileMode.Create, FileAccess.ReadWrite, FileShare.ReadWrite))
                {
                    await file.CopyToAsync(stream);
                }
            }
        }

        private void DeleteFiles(IList<string> fileNames, int notificationId)
        {
            foreach (var file in fileNames)
            {
                string fileFolder = notificationId.ToString();
                string filePath = GetPathFile(fileFolder, file);

                if (System.IO.File.Exists(filePath))
                {
                    using (FileStream fileStream = System.IO.File.Open(filePath, FileMode.Open, FileAccess.Read, FileShare.None))
                    {
                        fileStream.Close();
                    }
                    System.IO.File.Delete(filePath);
                }
            }
        }
    }
}
