namespace CRM.BotService.Endpoint.Controllers
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Threading.Tasks;
    using CRM.BotService.Core.Criteria;
    using CRM.BotService.Core.Models.Letstalk;
    using CRM.BotService.Core.Services.Interfaces;
    using CRM.BotService.Endpoint.ViewModel;
    using CRM.Core.Constants;
    using CRM.Core.Enumerables;
    using CRM.Core.Models.BotServices;
    using CRM.Core.Services;
    using Microsoft.AspNetCore.Authentication.JwtBearer;
    using Microsoft.AspNetCore.Authorization;
    using Microsoft.AspNetCore.Mvc;

    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
    public class LetstalkController : Controller
    {
        private readonly Func<long, ILetstalkClientService> letstalkClientService;
        private readonly IBotCommonService botCommonService;
        private readonly ICRMLogService logService;

        public LetstalkController(Func<long, ILetstalkClientService> letstalkClientService,
            IBotCommonService botCommonService,
            ICRMLogService logService)
        {
            this.letstalkClientService = letstalkClientService;
            this.logService = logService;
            this.botCommonService = botCommonService;
        }

        [HttpPost]
        [Route("api/letstalk/get-user-profile")]
        public async Task<IActionResult> CheckPersonalProfileAsync([FromBody] LetstalkBotConversationViewModel model)
        {
            var profile = await letstalkClientService(model.BotId).GetProfileAsync(model.LetstalkId);
            return Ok(profile);
        }

        [HttpPost]
        [Route("api/letstalk/verify-on-group")]
        public async Task<IActionResult> VerifyUserOnGroupAsync([FromBody] VerifyUserOnGroupViewModel model)
        {
            var results = new List<object>();
            var roomList = await letstalkClientService(model.BotId).GetChatRoomList();
            bool isBotRemoved = !roomList.Any(room => room.Equals(model.ConversationGroupId, StringComparison.CurrentCultureIgnoreCase));
            if (!isBotRemoved)
            {
                var botFriends = await letstalkClientService(model.BotId).GetBotContactList();
                var roomData = await letstalkClientService(model.BotId).GetChatRoomData(model.ConversationGroupId);

                foreach (var letstalkId in model.BotAccountIds)
                {
                    results.Add(new
                    {
                        LetstalkId = letstalkId,
                        IsGroupMember = roomData.Members.Contains(letstalkId),
                        IsBotFriend = botFriends.Contains(letstalkId)
                    });
                }
            }

            return Ok(new
            {
                IsBotRemoved = isBotRemoved,
                Letstalks = results
            });
        }

        [HttpPost]
        [Route("api/letstalk/send-multiple")]
        public async Task<IActionResult> SendMultipleMessage([FromBody] IEnumerable<NotificationMessage> notifications)
        {
            var tasks = new List<Task<SendResult>>();

            if (notifications is not null && notifications.Any())
            {
                foreach (var notification in notifications)
                {
                    tasks.Add(
                        Task.Run(
                            () => SendLetstalkService(notification)
                            ));
                }
            }

            var results = (await Task.WhenAll(tasks)).ToList();

            return Ok(results);
        }

        [HttpPost]
        [Route("api/letstalk/send-single")]
        public async Task<IActionResult> SendSingleMessage(NotificationMessage notification)
        {
            var result = await SendLetstalkService(notification);
            return Ok(result);
        }

        private async Task<SendResult> SendLetstalkService(NotificationMessage notification)
        {
            var result = new SendResult
            {
                NotificationId = notification.NotificationId,
                ConversationGroupId = notification.ConversationGroupId,
            };

            if (!botCommonService.IsActiveChannel(notification.ChannelId))
            {
                result.SentTime = DateTime.UtcNow;
                result.ErrorCode = 1;
                result.ErrorMessage = $"Channel {notification.ChannelId} is current inactivated";
                result.IsIgnoreRetry = true;
                return result;
            }

            try
            {
                if (notification.ChatType == ChatType.Personal)
                {
                    await SendLetstalkPersonal(notification, result);
                }
                else
                {
                    await SendLetstalkGroup(notification, result);
                }
            }
            catch (Exception ex)
            {
                var writeLogCommand = new WriteLogMessageCommand
                {
                    BotId = notification.BotId,
                    ConversationId = notification.ConversationId,
                    Content = notification.Content,
                    IsSuccess = false,
                    IsBotBlocked = false,
                    ErrMsg = ex.Message
                };
                await botCommonService.WriteLogMessageAsyns(writeLogCommand);

                result.SentTime = DateTime.UtcNow;
                result.ErrorCode = 1;
                result.ErrorMessage = ex.Message;
                await logService.ErrorAsync(ex);
            }

            return result;
        }

        private async Task SendLetstalkPersonal(NotificationMessage notification, SendResult result)
        {
            var outGoingMsg = new OutgoingMessage
            {
                MessageType = notification.MessageType,
                Text = notification.Content
            };

            var sendResult = await letstalkClientService(notification.BotId).PushPersonalAsync(notification.ConversationId, outGoingMsg);

            if (notification.Images is not null && notification.Images.Length > 0 && sendResult.IsSuccess)
            {
                await SendImagesToPersonal(notification);
            }

            result.SentTime = DateTime.UtcNow;
            result.ErrorCode = sendResult.IsSuccess && !sendResult.BlockList.Any() ? 0 : 1;
            result.IsBlockedBot = sendResult.BlockList.Any(x => x.Equals(notification.ConversationId, StringComparison.CurrentCultureIgnoreCase));
            result.ErrorMessage = !sendResult.IsSuccess &&
                sendResult.FailList.Any(x => x.Equals(notification.ConversationId, StringComparison.CurrentCultureIgnoreCase))
                ? SendNotificationErrorMessage.LetstalkIdInvalid
                : string.Empty;

            var writeLogCommand = new WriteLogMessageCommand
            {
                BotId = notification.BotId,
                ConversationId = notification.ConversationId,
                Content = notification.Content,
                IsSuccess = sendResult.IsSuccess,
                IsBotBlocked = sendResult.BlockList.Any(),
                ErrMsg = sendResult.Message
            };
            await botCommonService.WriteLogMessageAsyns(writeLogCommand);
        }

        private async Task SendImagesToPersonal(NotificationMessage notification)
        {
            foreach (var img in notification.Images)
            {
                var outgoingMsg = new OutgoingMessage
                {
                    MessageType = NotificationMessageType.Image,
                    ImageUrl = img
                };

                var result = await letstalkClientService(notification.BotId).PushPersonalAsync(notification.ConversationId, outgoingMsg);
                var writeLogCommand = new WriteLogMessageCommand
                {
                    BotId = notification.BotId,
                    ConversationId = notification.ConversationId,
                    Content = img,
                    IsSuccess = result.IsSuccess,
                    IsBotBlocked = result.BlockList.Any(),
                    ErrMsg = result.Message
                };

                await botCommonService.WriteLogMessageAsyns(writeLogCommand);
            }
        }

        private async Task SendLetstalkGroup(NotificationMessage notification, SendResult result)
        {
            var outGoingMsg = new OutgoingMessage
            {
                MessageType = notification.MessageType,
                Text = notification.Content
            };

            var sendResult = await letstalkClientService(notification.BotId).PushRoomAsync(notification.ConversationId, outGoingMsg);

            if (notification.Images is not null && notification.Images.Length > 0 && sendResult.IsSuccess)
            {
                await SendImagesToGroup(notification);
            }

            result.SentTime = DateTime.UtcNow;
            result.ErrorCode = sendResult.IsSuccess ? 0 : 1;
            result.ErrorMessage = !sendResult.IsSuccess ? SendNotificationErrorMessage.BotServiceLetstalkErrorMsg : string.Empty;

            var writeLogCommand = new WriteLogMessageCommand
            {
                BotId = notification.BotId,
                ConversationId = notification.ConversationId,
                Content = notification.Content,
                IsSuccess = sendResult.IsSuccess,
                IsBotBlocked = sendResult.BlockList.Any(),
                ErrMsg = sendResult.Message
            };
            await botCommonService.WriteLogMessageAsyns(writeLogCommand);
        }

        private async Task SendImagesToGroup(NotificationMessage notification)
        {
            foreach (var img in notification.Images)
            {
                var outgoingMsg = new OutgoingMessage
                {
                    MessageType = NotificationMessageType.Image,
                    ImageUrl = img
                };

                var result = await letstalkClientService(notification.BotId).PushRoomAsync(notification.ConversationId, outgoingMsg);

                var writeLogCommand = new WriteLogMessageCommand
                {
                    BotId = notification.BotId,
                    ConversationId = notification.ConversationId,
                    Content = img,
                    IsSuccess = result.IsSuccess,
                    IsBotBlocked = result.BlockList.Any(),
                    ErrMsg = result.Message
                };

                await botCommonService.WriteLogMessageAsyns(writeLogCommand);
            }
        }
    }
}