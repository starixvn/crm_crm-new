namespace CRM.Controllers
{
    using System;
    using System.Linq;
    using System.Threading.Tasks;
    using CRM.Core.Constants;
    using CRM.Core.Enumerables;
    using CRM.Core.Filters;
    using CRM.Core.Models;
    using CRM.Criteria.ChatTypeMapping;
    using CRM.Criteria.Common;
    using CRM.Letstalk.Client.Services.Interfaces;
    using CRM.Models;
    using CRM.Resources;
    using CRM.Services;
    using CRM.ViewModels.ChatTypeMapping;
    using Fanex.NAP.Client.Helpers.Web;
    using Microsoft.AspNetCore.Mvc;
    using static Fanex.NAP.Core.Business.Constant;

    [CrmPermission(FunctionKey = FunctionKey.ChatTypeMapping, Policy = Policy.Read)]
    public class ChatTypeMappingController : BaseController
    {
        private readonly INapSession napSession;
        private readonly ISettingService settingService;
        private readonly ICommonService commonService;
        private readonly IChatTypeMappingService chatTypeMappingService;
        private readonly Func<int, ILetstalkService> letstalkService;
        private readonly IExportExcelService excelService;

        public ChatTypeMappingController(
            INapSession napSession,
            ISettingService settingService,
            ICommonService commonService,
            IChatTypeMappingService chatTypeMappingService,
            Func<int, ILetstalkService> letstalkService,
            IExportExcelService excelService)
        {
            this.napSession = napSession;
            this.settingService = settingService;
            this.commonService = commonService;
            this.chatTypeMappingService = chatTypeMappingService;
            this.letstalkService = letstalkService;
            this.excelService = excelService;
        }

        public async Task<IActionResult> GetSettings()
        {
            var bots = commonService.GetConversationBotAsync();
            var languages = settingService.GetSettingAsync(SettingName.NotificationTemplateLanguage, true);
            var recipientTypes = commonService.GetRecipientTypeAsync();

            await Task.WhenAll(bots, languages, recipientTypes);

            var result = new
            {
                ChatTypes = commonService.GetChatTypes(),
                MappingStatuses = commonService.GetMappingStatus(),
                Languages = (await languages).Select(l => new BaseModel { Id = l.SettingId, Name = l.SettingValue }),
                Bots = await bots,
                RecipientTypes = await recipientTypes,
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
                LetstalkId = filter.LetstalkId,
                LanguageId = filter.LanguageId,
                IsActive = filter.IsActive,
                BotId = filter.BotId,
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
            var contactDetail = await letstalkService(data.BotId).GetProfileAsync(data.LetstalkId.Trim());
            if (contactDetail.Item2)
            {
                var criteria = new InsertPersonalMappingCommand
                {
                    BotId = data.BotId,
                    ConversationGroupName = contactDetail.Item1.DisplayName,
                    ChatTypeId = (int)ChatType.Personal,
                    RecipientTypeId = data.RecipientTypeId,
                    HeadlineIds = data.GroupHeadlineIds,
                    RecipientId = int.Parse(data.RecipientIds),
                    LetstalkId = data.LetstalkId,
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
                result.Message = string.Format(ViewResources.LetstalkInvalidMessage, data.LetstalkId);
            }

            return Json(result);
        }

        [HttpPost]
        [CrmPermission(FunctionKey = FunctionKey.ChatTypeMapping, Policy = Policy.Host)]
        public async Task<IActionResult> UpdatePersonalMapping([FromBody] PersonalMappingViewModel data)
        {
            var result = new CommandResult();
            var contactDetail = await letstalkService(data.BotId).GetProfileAsync(data.LetstalkId.Trim());
            if (contactDetail.Item2)
            {
                var criteria = new UpdateChatTypeMappingCommand
                {
                    ConversationGroupId = data.ConversationGroupId,
                    BotId = data.BotId,
                    ConversationGroupName = contactDetail.Item1.DisplayName,
                    RecipientTypeId = data.RecipientTypeId,
                    HeadlineIds = data.GroupHeadlineIds,
                    RecipientIds = data.RecipientIds,
                    LetstalkId = data.LetstalkId,
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
                result.Message = string.Format(ViewResources.LetstalkInvalidMessage, data.LetstalkId);
            }

            return Json(result);
        }

        public async Task<IActionResult> GetRecipientByType(int recipientTypeId)
        {
            var recipients = await commonService.GetRecipientAsync(new GetRecipientsCriteria { RecipientType = recipientTypeId });
            return Json(recipients);
        }

        public async Task<IActionResult> GetGroupHeadlineByRecipient(string recipientIds)
        {
            var headlines = await chatTypeMappingService.GetHeadlineByRecipientAsync(recipientIds);
            return Json(headlines);
        }

        public async Task<IActionResult> GetIgnoreNotificationType()
        {
            var notificationTypes = await chatTypeMappingService.GetIgnoreNotificationTypeAsync();
            return Json(notificationTypes);
        }


        [HttpPost]
        public async Task<IActionResult> UpdateGroupMapping([FromBody] PersonalMappingViewModel data)
        {
            var criteria = new UpdateChatTypeMappingCommand
            {
                ConversationGroupId = data.ConversationGroupId,
                BotId = data.BotId,
                ConversationGroupName = data.Name,
                RecipientTypeId = data.RecipientTypeId,
                HeadlineIds = data.GroupHeadlineIds,
                RecipientIds = data.RecipientIds,
                LetstalkId = data.LetstalkId,
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
        public async Task<IActionResult> VerifyLetstalkInGroup([FromBody] LetstalkVerification data)
        {
            if (data.BotId > 0 && !string.IsNullOrWhiteSpace(data.GroupConversationId))
            {
                var roomList = await letstalkService(data.BotId).GetChatRoomList();
                bool isBotRemoved = true;

                if (roomList.Contains(data.GroupConversationId))
                {
                    isBotRemoved = false;
                    await VerifyRecipients(data);
                }

                return Json(new { isBotRemoved, recipients = data.Recipients });
            }

            return Json(null);
        }

        private async Task VerifyRecipients(LetstalkVerification data)
        {
            var botFriends = await letstalkService(data.BotId).GetBotContactList();
            var roomData = await letstalkService(data.BotId).GetChatRoomData(data.GroupConversationId);
            foreach (var recipient in data.Recipients)
            {
                foreach (var letstalk in recipient.Letstalks)
                {
                    letstalk.IsGroupMember = roomData.Members.Contains(letstalk.LetstalkId.Trim());
                    letstalk.IsBotFriend = botFriends.Contains(letstalk.LetstalkId.Trim());
                }
            }
        }

        public async Task<string> GetLetstalkDisplayName(int botId, string letstalkId)
        {
            var contactDetail = await letstalkService(botId).GetProfileAsync(letstalkId.Trim());
            return contactDetail.Item2 ? contactDetail.Item1.DisplayName : string.Empty;
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
                LetstalkId = filter.LetstalkId,
                LanguageId = filter.LanguageId,
                IsActive = filter.IsActive,
                BotId = filter.BotId,
                MappingStatus = filter.MappingStatuses,
                PageIndex = 0,
                PageSize = 0
            };

            var data = await chatTypeMappingService.GetChatTypeMappingAsync(criteria);
            var bytes = excelService.ExportChatTypeMapping(data.Item1);
            return File(bytes, MimeType.XLSX, $"{ViewResources.ChatTypeMapping}.xlsx");
        }
    }
}