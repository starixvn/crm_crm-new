namespace CRM.Controllers.NotificationCenter;

using Constants;
using CRM.Models.NotificationCenter;
using CRM.Resources;
using CRM.Services;
using CRM.Services.NotificationCenter;
using CRM.ViewModels.NotificationCenter;
using Extensions;
using Filters;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Services.ExportExcel;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using static Fanex.NAP.Client.Helpers.Business.Constant;

[CrmPermission(FunctionKey = FunctionKey.NotificationCenter, Policy = Policy.Read)]
public class NotificationCenterController(
    INotificationCenterService notificationCenterService,
    IExportExcelService excelService,
    IPermissionService permissionService,
    IWebHostEnvironment hostingEnvironment)
    : BaseController
{
    private const string ImagePath = "www/dist/images/notification-center";

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

    [HttpGet]
    [CrmPermission(FunctionKey = $"{FunctionKey.Credit},{FunctionKey.Licensee}", Policy = Policy.Read)]
    public async Task<IActionResult> GetReasonSettingOptions()
    {
        var settings = await notificationCenterService.GetReasonListSettingAsync();
        var settingOptions = settings.Select(i =>
            new
            {
                Id = i.SettingId,
                Name = i.SettingValue
            });
        return Json(settingOptions);
    }

    [HttpPost]
    [CrmPermission(FunctionKey = FunctionKey.NotificationCenter, Policy = Policy.Host)]
    public async Task<IActionResult> EditResultAdmNotificationReason([FromBody] UpdateNotificationReasonViewModel viewModel)
    {
        var commandResult = await notificationCenterService.EditResultAdmReasonAsync(viewModel.NotificationId, viewModel.ReasonSettingId);

        return Json(commandResult);
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
        var commandResult = await notificationCenterService.EditResultAdmNotificationAsync(param);
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
        var commandResult = await notificationCenterService.EditResultAdmStatusAsync(param);
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
        var siteTickets = await notificationCenterService.GetSiteTicketsByIdAsync(param.NotificationId, sitePermission, licenseeType);
        var eventTime = param.EventTime.ToShortDateFormatDash();
        var bytes = excelService.ExportSiteTicket(siteTickets, eventTime, param.EventName);
        var reportName = string.Format(ViewResources.MncAffectedTicketFileName, eventTime);
        return File(bytes, MimeType.XLSX, $"{reportName}.xlsx");
    }

    private async Task<(string sitePermission, short licenseeType)> GetDataPermission()
    {
        var sitePermission = await permissionService.GetCurrentUserCreditPermissionsAsync();
        var licenseeType = await permissionService.GetCurrentUserLicenseeTypeAsync();
        return (sitePermission, licenseeType);
    }

    private string GetPathFile(string folder, string fileName = "")
        => Path.Combine(hostingEnvironment.ContentRootPath, ImagePath, folder, fileName);

    private string EnsureFileFolderExists(int notificationId)
    {
        var fileFolder = notificationId.ToString();
        var folderPath = GetPathFile(fileFolder) ?? string.Empty;
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
            var fileFolder = EnsureFileFolderExists(notificationId);
            var filePath = GetPathFile(fileFolder, file.FileName);
            await using Stream stream = new FileStream(filePath, FileMode.Create, FileAccess.ReadWrite, FileShare.ReadWrite);
            await file.CopyToAsync(stream);
        }
    }

    private void DeleteFiles(IList<string> fileNames, int notificationId)
    {
        foreach (var file in fileNames)
        {
            var fileFolder = notificationId.ToString();
            var filePath = GetPathFile(fileFolder, file);

            if (System.IO.File.Exists(filePath))
            {
                using (var fileStream = System.IO.File.Open(filePath, FileMode.Open, FileAccess.Read, FileShare.None))
                {
                    fileStream.Close();
                }
                System.IO.File.Delete(filePath);
            }
        }
    }
}