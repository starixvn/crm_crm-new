namespace CRM.Controllers.HeadlineNotification;

using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Constants;
using CRM.Criteria.ChatTypeMapping;
using CRM.Criteria.Common;
using CRM.Models.ChatTypeMapping;
using CRM.Resources;
using CRM.Services.BotServices.Interfaces;
using CRM.ViewModels.ChatTypeMapping;
using Enum;
using Fanex.NAP.Client;
using Filters;
using Microsoft.AspNetCore.Mvc;
using Models;
using Services.ExportExcel;
using Services.Interfaces;
using static Fanex.NAP.Client.Helpers.Business.Constant;

[CrmPermission(FunctionKey = FunctionKey.ChatTypeMapping, Policy = Policy.Read)]
public class ChatTypeMappingController(
    INapSession napSession,
    ISettingService settingService,
    ICommonService commonService,
    IChatTypeMappingService chatTypeMappingService,
    IExportExcelService excelService,
    ILetstalkApiService letstalkClientService,
    ITelegramApiService telegramClientService)
    : BaseController
{
    private const string UploadAnnouncement = "Upload Announcement";

    public async Task<IActionResult> GetSettings()
    {
        var bots = commonService.GetConversationBotAsync();
        var languages = settingService.GetSettingAsync(SettingName.NotificationTemplateLanguage, true);
        var recipientTypes = commonService.GetRecipientTypeAsync();
        var botServices = commonService.GetBotServicesAsync();

        await Task.WhenAll(bots, languages, recipientTypes, botServices);

        var result = new
        {
            ChatTypes = commonService.GetChatTypes(),
            MappingStatuses = commonService.GetMappingStatus(),
            Languages = (await languages).Select(l => new BaseModel { Id = l.SettingId, Name = l.SettingValue }),
            Bots = await bots,
            RecipientTypes = await recipientTypes,
            BotServices = await botServices
        };
        return Json(result);
    }

    [HttpPost]
    public async Task<IActionResult> GetChatTypeMapping([FromBody] ChatTypeFilterViewModel filter)
    {
        var criteria = new GetChatTypeMappingCriteria
        {
            ChatTypeId = filter.ChatType,
            ConversationGroupName = filter.Name,
            Headline = filter.GroupHeadline,
            RecipientName = filter.RecipientIds,
            ChannelId = filter.ChannelId,
            LetstalkIdOrUsername = filter.LetstalkIdOrUsername,
            IsActive = filter.IsActive,
            BotIds = filter.BotIds,
            MappingStatus = filter.MappingStatuses,
            PageIndex = filter.PageIndex,
            PageSize = filter.PageSize
        };

        var data = await chatTypeMappingService.GetChatTypeMappingAsync(criteria);
        return Json(new
        {
            data = data.Item1,
            TotalItems = data.Item2
        });
    }

    [HttpPost]
    [CrmPermission(FunctionKey = FunctionKey.ChatTypeMapping, Policy = Policy.Host)]
    public async Task<IActionResult> UpdateActiveStatus([FromBody] ActiveStatusModel groupInfo)
    {
        var commandResult = await chatTypeMappingService.EditActiveStatusAsync(groupInfo.ConversationGroupId, groupInfo.IsActive, napSession.UserId);

        return Json(commandResult);
    }

    [CrmPermission(FunctionKey = FunctionKey.ChatTypeMapping, Policy = Policy.Host)]
    public async Task<IActionResult> DeleteConversationGroup(int conversationId)
    {
        var commandResult = await chatTypeMappingService.DeleteConversationGroupAsync(conversationId, napSession.UserId);

        return Json(commandResult);
    }

    [HttpPost]
    [CrmPermission(FunctionKey = FunctionKey.ChatTypeMapping, Policy = Policy.Host)]
    public async Task<IActionResult> InsertPersonalMapping([FromBody] PersonalMappingViewModel data)
    {
        var result = new CommandResult();
        var userProfile = data.ChannelId == BotServiceTypeConstants.Letstalk ?
            await letstalkClientService.GetPersonalDisplayNameAsync(data.BotId, data.ConversationId.Trim()) :
            await telegramClientService.GetPersonalDisplayNameAsync(data.BotId, long.Parse(data.ConversationId));

        if (userProfile is not null && !string.IsNullOrWhiteSpace(userProfile.DisplayName))
        {
            var criteria = new InsertPersonalMappingCommand
            {
                BotId = data.BotId,
                ConversationGroupName = userProfile.DisplayName,
                ChatTypeId = (int)ChatType.Personal,
                RecipientTypeId = data.RecipientTypeId,
                HeadlineIds = data.GroupHeadlineIds,
                RecipientId = int.Parse(data.RecipientIds),
                ChannelId = data.ChannelId,
                Username = data.Username,
                ConversationId = data.ConversationId,
                LanguageId = data.LanguageId,
                Remark = data.Remark,
                UserId = napSession.UserId,
                IgnoredNotificationTypeList = data.IgnoredNotificationTypeList,
                IsTest = data.IsTest
            };
            result = await chatTypeMappingService.CreatePersonalMappingAsync(criteria);
        }
        else
        {
            result.Message = string.Format(ViewResources.LetstalkInvalidMessage, data.ConversationId);
        }

        return Json(result);
    }

    [HttpPost]
    [CrmPermission(FunctionKey = FunctionKey.ChatTypeMapping, Policy = Policy.Host)]
    public async Task<IActionResult> UpdatePersonalMapping([FromBody] PersonalMappingViewModel data)
    {
        var result = new CommandResult();
        var userProfile = data.ChannelId == BotServiceTypeConstants.Letstalk ?
            await letstalkClientService.GetPersonalDisplayNameAsync(data.BotId, data.ConversationId.Trim()) :
            await telegramClientService.GetPersonalDisplayNameAsync(data.BotId, long.Parse(data.ConversationId));

        if (userProfile is not null && !string.IsNullOrWhiteSpace(userProfile.DisplayName))
        {
            var criteria = new UpdateChatTypeMappingCommand
            {
                ConversationGroupId = data.ConversationGroupId,
                BotId = data.BotId,
                ConversationGroupName = userProfile.DisplayName,
                RecipientTypeId = data.RecipientTypeId,
                HeadlineIds = data.GroupHeadlineIds,
                RecipientIds = data.RecipientIds,
                Username = data.Username,
                ConversationId = data.ConversationId,
                LanguageId = data.LanguageId,
                Remark = data.Remark,
                UserId = napSession.UserId,
                IgnoredNotificationTypeList = data.IgnoredNotificationTypeList,
                IsTest = data.IsTest
            };
            result = await chatTypeMappingService.EditChatTypeMappingAsync(criteria);
        }
        else
        {
            result.Message = string.Format(ViewResources.LetstalkInvalidMessage, data.ConversationId);
        }

        return Json(result);
    }

    public async Task<IActionResult> GetRecipientByType(int recipientTypeId)
    {
        var (recipients, botInfo) = await commonService.GetRecipientAsync(new GetRecipientsCriteria { RecipientType = recipientTypeId });
        return Json(new { data = recipients, botInfo });
    }

    public async Task<string> GetTelegramDisplayName(long botId, long chatId)
    {
        var userProfile = await telegramClientService.GetPersonalDisplayNameAsync(botId, chatId);
        return userProfile is not null ? userProfile.DisplayName : string.Empty;
    }

    public async Task<string> GetGroupTelegramDisplayName(long botId, long chatId)
    {
        var userProfile = await telegramClientService.GetGroupDisplayNameAsync(botId, chatId);
        return userProfile is not null ? userProfile.DisplayGroupName : string.Empty;
    }

    public async Task<IActionResult> GetGroupHeadlineByRecipient(string recipientIds)
    {
        var headlines = await chatTypeMappingService.GetHeadlineByRecipientAsync(recipientIds);
        return Json(headlines);
    }

    public async Task<IActionResult> GetIgnoreNotificationType()
    {
        var notificationTypes = (await chatTypeMappingService.GetIgnoreNotificationTypeAsync())
            .Where(noti => noti.NotificationTypeName == UploadAnnouncement);
        return Json(notificationTypes);
    }

    [HttpPost]
    public async Task<IActionResult> UpdateGroupMapping([FromBody] PersonalMappingViewModel data)
    {
        var criteria = new UpdateChatTypeMappingCommand
        {
            ConversationGroupId = data.ConversationGroupId,
            BotId = data.BotId,
            ConversationGroupName = data.DisplayName,
            RecipientTypeId = data.RecipientTypeId,
            HeadlineIds = data.GroupHeadlineIds,
            RecipientIds = data.RecipientIds,
            ConversationId = data.ConversationId,
            LanguageId = data.LanguageId,
            Remark = data.Remark,
            UserId = napSession.UserId,
            IgnoredNotificationTypeList = data.IgnoredNotificationTypeList,
            IsTest = data.IsTest
        };
        var result = await chatTypeMappingService.EditChatTypeMappingAsync(criteria);

        return Json(result);
    }

    [HttpPost]
    [CrmPermission(FunctionKey = FunctionKey.ChatTypeMapping, Policy = Policy.Host)]
    public async Task<IActionResult> UpdateRemark([FromBody] PersonalMappingViewModel data)
    {
        var criteria = new UpdateChatTypeMappingRemarkCommand
        {
            ConversationGroupId = data.ConversationGroupId,
            Remark = data.Remark,
            UserId = napSession.UserId
        };
        var result = await chatTypeMappingService.EditChatTypeMappingRemarkAsync(criteria);

        return Json(result);
    }

    [HttpPost]
    [CrmPermission(FunctionKey = FunctionKey.ChatTypeMapping, Policy = Policy.Host)]
    public async Task<IActionResult> VerifyLetstalkInGroup([FromBody] LetstalkVerificationViewModel data)
    {
        if (data.BotId > 0 && !string.IsNullOrWhiteSpace(data.GroupConversationId))
        {
            var verificationData = await letstalkClientService.VerifyLetstalkOnGroup(data.BotId, data.GroupConversationId, data.Recipients);

            MappingResult(data.Recipients, verificationData.Letstalks);

            return Json(new { isBotRemoved = verificationData.IsBotRemoved, recipients = data.Recipients });
        }

        return Json(null);
    }

    [HttpPost]
    [CrmPermission(FunctionKey = FunctionKey.ChatTypeMapping, Policy = Policy.Host)]
    public async Task<IActionResult> VerifyTelegramInGroup([FromBody] TelegramVerificationViewModel model)
    {
        if (model.BotId > 0 && !string.IsNullOrWhiteSpace(model.GroupConversationId))
        {
            var verificationData = await telegramClientService.VerifyTelegramInGroup(model);

            return Json(verificationData is null ? null : new { isBotRemoved = verificationData.IsBotRemoved, recipients = verificationData.Telegrams });
        }

        return Json(null);
    }

    private static void MappingResult(List<RecipientLetstalk> letstalkRecipients, List<LetstalkAccountInGroup> accounts)
    {
        if (accounts is not null && accounts.Any())
        {
            foreach (var item in letstalkRecipients)
            {
                foreach (var letstalk in item.Letstalks)
                {
                    var account = accounts.Find(i => i.LetstalkId.Trim().Equals(letstalk.LetstalkId.Trim(), StringComparison.CurrentCultureIgnoreCase));
                    letstalk.IsGroupMember = account is not null && account.IsGroupMember;
                    letstalk.IsBotFriend = account is not null && account.IsBotFriend;
                }
            }
        }
    }

    public async Task<string> GetLetstalkDisplayName(long botId, string letstalkId)
    {
        var userProfile = await letstalkClientService.GetPersonalDisplayNameAsync(botId, letstalkId.Trim());
        return userProfile is not null ? userProfile.DisplayName : string.Empty;
    }

    [HttpPost]
    [CrmPermission(FunctionKey = FunctionKey.ChatTypeMapping, Policy = Policy.Read)]
    public async Task<IActionResult> ExportExcel([FromBody] ChatTypeFilterViewModel filter)
    {
        var criteria = new GetChatTypeMappingCriteria
        {
            ChatTypeId = filter.ChatType,
            ConversationGroupName = filter.Name,
            Headline = filter.GroupHeadline,
            RecipientName = filter.RecipientIds,
            ChannelId = filter.ChannelId,
            LetstalkIdOrUsername = filter.LetstalkIdOrUsername,
            IsActive = filter.IsActive,
            BotIds = filter.BotIds,
            MappingStatus = filter.MappingStatuses,
            PageIndex = 0,
            PageSize = 0
        };

        var data = await chatTypeMappingService.GetChatTypeMappingAsync(criteria);
        var bytes = excelService.ExportChatTypeMapping(data.Item1);
        return File(bytes, MimeType.XLSX, $"{ViewResources.ChatTypeMapping}.xlsx");
    }
}