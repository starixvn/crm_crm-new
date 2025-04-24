namespace CRM.Controllers.HeadlineNotification;

using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Constants;
using CRM.Criteria.Announcement;
using CRM.Criteria.PicAndHeadline;
using CRM.Models;
using CRM.Services;
using CRM.Services.Interfaces;
using Enum;
using Fanex.NAP.Client;
using Filters;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using static Fanex.NAP.Client.Helpers.Business.Constant;

[CrmPermission(FunctionKey = FunctionKey.Announcement, Policy = Policy.Read)]
public class AnnouncementController(
    IAnnouncementService announcementService,
    INapSession napSession,
    ISettingService settingService,
    IWebHostEnvironment hostingEnvironment,
    ISendAnnouncementService sendAnnouncementService)
    : BaseController
{
    private const string pathImages = "www/dist/images/announcement";

    public async Task<IActionResult> GetAnnouncementTemplate()
    {
        var (notificationTemplates, contents) = await announcementService.GetAnnouncementTemplateAsync();
        return Json(new
        {
            notificationTemplates,
            contents
        });
    }

    public async Task<IActionResult> GetLanguages()
    {
        var settings = await settingService.GetSettingAsync(SettingName.NotificationTemplateLanguage, true);
        return Json(settings);
    }

    [HttpPost]
    public async Task<IActionResult> GetAnnouncement([FromBody] GetAnnouncementCriteria criteria)
    {
        var announcements = await announcementService.GetAnnouncementAsync(criteria);
        return Json(new
        {
            data = announcements,
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
            HeadlineTypeList = Enum.GetValues<HeadlineType>().Select(status => new BaseModel { Id = (int)status, Name = status.ToString() })
        };

        return Json(allSetting);
    }

    [CrmPermission(FunctionKey = FunctionKey.Announcement, Policy = Policy.Host)]
    [HttpPost]
    public async Task<IActionResult> SaveFilesAndCreate([FromForm] CreateAnnouncementCommand command)
    {
        command.UserId = napSession.UserId;
        command.LoginIP = ClientIP;
        var commandResult = await announcementService.NewAnnouncementAsync(command);
        if (commandResult.IsSuccessful)
        {
            if (command.FormFile.Count > 0 && command.AnnouncementId > 0)
            {
                await SaveFile(command.FormFile, command.AnnouncementId);
            }
            if (command.CloneAnnouncementId > 0)
            {
                await CopyOldFileToNewFileAsync(command.FileString, command.CloneAnnouncementId, command.AnnouncementId);
            }
        }
        return Json(commandResult);
    }

    [CrmPermission(FunctionKey = FunctionKey.Announcement, Policy = Policy.Host)]
    [HttpGet]
    public async Task<IActionResult> SendMessageAnnouncementToBotEndpoint()
    {
        try
        {
            await sendAnnouncementService.ScanSendAndUpdateAnnouncementNotification();
            return Ok("Send Successful !!!");
        }
        catch (Exception err)
        {
            return Ok(err.Message);
        }
    }

    [CrmPermission(FunctionKey = FunctionKey.Announcement, Policy = Policy.Host)]
    [HttpPost]
    public async Task<IActionResult> Edit([FromForm] EditAnnouncementCommand command)
    {
        command.UserId = napSession.UserId;
        command.LoginIP = ClientIP;
        var commandResult = await announcementService.EditAnnouncementAsync(command);
        if (commandResult.IsSuccessful)
        {
            if (command.FormFile.Count > 0 && command.AnnouncementId > 0)
            {
                await SaveFile(command.FormFile, command.AnnouncementId);
            }
            if (command.FileStringRemove.Count > 0)
            {
                DeleteFile(command.FileStringRemove, command.AnnouncementId);
            }
        }
        return Json(commandResult);
    }

    public async Task<IActionResult> GetAnnouncementById(int id)
    {
        var (announcement, contents) = await announcementService.GetContentByIdAsync(id);
        return Json(new
        {
            data = announcement,
            contents
        });
    }

    [CrmPermission(FunctionKey = FunctionKey.Announcement, Policy = Policy.Host)]
    public async Task<IActionResult> Cancel(int id, string status)
    {
        var command = new CancelAnnouncementCommand
        {
            AnnouncementId = id,
            Status = status,
            UserId = napSession.UserId
        };
        var commandResult = await announcementService.CancelAnnouncementAsync(command);
        return Json(commandResult);
    }

    private async Task CopyOldFileToNewFileAsync(IList<string> files, int cloneAnnouncementId, int announcementId)
    {
        foreach (var file in files)
        {
            var targetFolder = GetPathFile(announcementId.ToString());
            var isExist = System.IO.File.Exists(targetFolder);
            if (!isExist)
            {
                Directory.CreateDirectory(targetFolder);
            }
            var targetFile = GetPathFile(announcementId.ToString(), file);
            var sourceStreamFile = Path.Combine(hostingEnvironment.ContentRootPath, pathImages, cloneAnnouncementId.ToString(), file);
            await Task.Run(() => System.IO.File.Copy(sourceStreamFile, targetFile, true));
        }
    }

    private async Task SaveFile(IList<IFormFile> formFiles, int announcementId)
    {
        foreach (var file in formFiles)
        {
            var fileFolder = GetFileFolder(announcementId);
            var pathFile = GetPathFile(fileFolder, file.FileName);
            await using Stream stream = new FileStream(pathFile, FileMode.Create, FileAccess.ReadWrite, FileShare.ReadWrite);
            await file.CopyToAsync(stream);
        }
    }

    private void DeleteFile(IList<string> filesString, int announcementId)
    {
        foreach (var file in filesString)
        {
            var fileFolder = announcementId.ToString();
            var filePath = GetPathFile(fileFolder, file);
            var isExist = System.IO.File.Exists(filePath);
            if (isExist)
            {
                using (var fileStream = System.IO.File.Open(filePath, FileMode.Open, FileAccess.Read, FileShare.None))
                {
                    fileStream.Close();
                }
                System.IO.File.Delete(filePath);
            }
        }
    }

    private string GetPathFile(string folder, string fileName = "")
        => Path.Combine(hostingEnvironment.ContentRootPath, pathImages, folder, fileName);

    private string GetFileFolder(int announcementId)
    {
        var fileFolder = announcementId.ToString();
        var path = GetPathFile(fileFolder);
        var isExist = System.IO.File.Exists(path);
        if (!isExist)
        {
            Directory.CreateDirectory(path);
        }
        return fileFolder;
    }

    [CrmPermission(FunctionKey = FunctionKey.Announcement, Policy = Policy.Host)]
    [HttpPost]
    public async Task<IActionResult> ValidateAnnouncement([FromForm] ValidateAnnouncementCommand command)
    {
        var (announcements, commandResult) = await announcementService.ValidateAnnouncementAsync(command);

        return commandResult.IsSuccessful ? Json(announcements) : Json(commandResult);
    }
}