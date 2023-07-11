namespace CRM.BotService.Endpoint.Controllers.Telegram
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Threading.Tasks;
    using CRM.BotService.Core.Criteria;
    using CRM.BotService.Core.Models;
    using CRM.BotService.Core.Services.Interfaces;
    using CRM.BotService.Endpoint.ViewModel;
    using CRM.Core.Constants;
    using CRM.Core.Models.BotServices;
    using CRM.Core.Services;
    using Fanex.Logging.Extensions;
    using Fanex.Logging.Extensions.Database;
    using global::Telegram.Bot.Types.Enums;
    using Microsoft.AspNetCore.Authentication.JwtBearer;
    using Microsoft.AspNetCore.Authorization;
    using Microsoft.AspNetCore.Http;
    using Microsoft.AspNetCore.Mvc;
    using Newtonsoft.Json;

    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
    public class MessageController : Controller
    {
        private readonly ICRMLogService logService;
        private readonly Func<long, ITelegramBotService> telegramBotService;
        private readonly IBotCommonService botCommonService;

        public MessageController(
            ICRMLogService logService,
            Func<long, ITelegramBotService> telegramBotService,
            IBotCommonService botCommonService)
        {
            this.logService = logService;
            this.telegramBotService = telegramBotService;
            this.botCommonService = botCommonService;
        }

        [HttpPost]
        [Route("api/telegram/send-message")]
        public async Task<ObjectResult> SendMessage([FromBody] ConversationInfo conversationInfo)
        {
            var errorMessage = string.Empty;
            try
            {
                _ = long.TryParse(conversationInfo.BotConversationId, out long botId);
                _ = long.TryParse(conversationInfo.ConversationId, out long chatId);
                logService.LogInformation(string.Format("Start SendMessage: botId: {0} chatId: {1}.", botId, chatId));
                await telegramBotService(botId).SendTextMessageAsync(botId, chatId, conversationInfo.Message);
                logService.LogInformation("End SendMessage!!!");
            }
            catch (Exception ex)
            {
                errorMessage = ex.Message;
                await WriteLogAsync(ex);
            }

            return Ok(errorMessage);
        }

        [HttpPost]
        [Route("api/telegram/send-image")]
        public async Task<ObjectResult> SendImage([FromBody] ConversationInfo conversationInfo)
        {
            var errorMessage = string.Empty;
            try
            {
                _ = long.TryParse(conversationInfo.BotConversationId, out long botId);
                _ = long.TryParse(conversationInfo.ConversationId, out long chatId);
                logService.LogInformation(string.Format("Start SendImage: botId: {0} chatId: {1} imageUrl: {2}.", botId, chatId, conversationInfo.ImageUrl));
                await telegramBotService(botId).SendImageAsync(botId, chatId, conversationInfo.ImageUrl);
                logService.LogInformation("End SendImage!!!");
            }
            catch (Exception ex)
            {
                errorMessage = ex.Message;
                await WriteLogAsync(ex);
            }

            return Ok(errorMessage);
        }

        [HttpPost]
        [Route("api/telegram/send-multiple")]
        public async Task<IActionResult> SendMultipleMessage([FromBody] IEnumerable<NotificationMessage> notifications)
        {
            logService.LogInformation("Start SendMultipleMessage: " + JsonConvert.SerializeObject(notifications, Formatting.Indented));
            var tasks = new List<Task<SendResult>>();
            if (notifications is not null && notifications.Any())
            {
                foreach (var notification in notifications)
                {
                    tasks.Add(
                        Task.Run(
                            () => SendTelegramService(notification)
                    ));
                }
            }

            var results = (await Task.WhenAll(tasks)).ToList();
            logService.LogInformation("End Start SendMultipleMessage: " + JsonConvert.SerializeObject(results, Formatting.Indented));
            return Ok(results);
        }

        [HttpPost]
        [Route("api/telegram/send-single")]
        public async Task<IActionResult> SendSingleMessage(NotificationMessage notification)
        {
            var result = await SendTelegramService(notification);
            return Ok(result);
        }

        private async Task<SendResult> SendTelegramService(NotificationMessage notification)
        {
            logService.LogInformation("Start SendTelegramService!!!");
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
                logService.LogInformation(result.ErrorMessage);
                return result;
            }

            try
            {
                logService.LogInformation(string.Format("Start SendNotifyAysnc: botId: {0} chatId: {1}.", notification.BotId, notification.ConversationId));
                await telegramBotService(notification.BotId).SendNotifyAsync(notification, result);
                logService.LogInformation("end SendNotifyAysnc!!!");
            }
            catch (Exception ex)
            {
                result.ErrorCode = 1;
                result.SentTime = DateTime.UtcNow;
                result.ErrorMessage = SendNotificationErrorMessage.BotServiceTelegramErrorMsg;
                var writeLogCommand = new WriteLogMessageCommand
                {
                    ReferenceId = notification.NotificationId,
                    BotId = notification.BotId,
                    ConversationId = notification.ConversationId,
                    Content = notification.Content,
                    IsSuccess = false,
                    IsBotBlocked = false,
                    ErrMsg = ex.Message
                };
                await botCommonService.WriteLogMessageAsyns(writeLogCommand);
                await logService.ErrorAsync(ex);
            }

            return result;
        }

        [HttpPost]
        [Route("api/telegram/bot/get-user-profile")]
        public async Task<IActionResult> CheckPersonalProfileAsync([FromBody] TelegramBotConversationViewModel model)
        {
            try
            {
                var profile = await telegramBotService(model.BotId).GetChatAsync(model.BotId, model.ChatId);
                return Ok(profile);
            }
            catch (Exception ex)
            {
                await logService.ErrorAsync(ex);
                return Ok();
            }
        }

        [HttpPost]
        [Route("api/telegram/bot/verify-on-group")]
        public async Task<IActionResult> VerifyUserOnGroupAsync([FromBody] VerifyUserOnGroupViewModel model)
        {
            try
            {
                var results = new List<object>();
                _ = long.TryParse(model.ConversationGroupId, out long chatGroupId);

                var chatGroup = await telegramBotService(model.BotId).GetChatAsync(model.BotId, chatGroupId);
                var isBotRemoved = chatGroup is null;

                if (!isBotRemoved && model.BotAccountIds is not null && model.BotAccountIds.Any())
                {
                    foreach (var botAccountId in model.BotAccountIds)
                    {
                        _ = long.TryParse(botAccountId, out long chatMemberId);

                        var chatMember = await telegramBotService(model.BotId).GetChatMemberAsync(model.BotId, chatGroupId, chatMemberId);
                        results.Add(new
                        {
                            ChatId = botAccountId,
                            IsGroupMember = chatMember is not null && chatMember.Status != ChatMemberStatus.Left && chatMember.Status != ChatMemberStatus.Kicked,
                        });
                    }
                }

                return Ok(new
                {
                    IsBotRemoved = isBotRemoved,
                    Telegrams = results
                });
            }
            catch (Exception exception)
            {
                await logService.ErrorAsync(exception);
                return handleExceptionVerifyGroup(exception);
            }
        }

        private IActionResult handleExceptionVerifyGroup(Exception exception)
        {
            return exception.Message.Contains("bot was kicked from the supergroup chat", StringComparison.InvariantCultureIgnoreCase)
               || exception.Message.Contains("bot was kicked from the group chat", StringComparison.InvariantCultureIgnoreCase)
               || exception.Message.Contains("chat not found", StringComparison.InvariantCultureIgnoreCase)
                ? Ok(new
                {
                    IsBotRemoved = true,
                    Telegrams = new List<object>()
                })
                : (IActionResult)Ok(null);
        }

        private async Task WriteLogAsync(Exception exception, IDictionary<string, object> param = null)
        {
            var logMessage = new LogMessage(exception.Message)
                        .AddSection("Database Info", DatabaseInfoGetters.GetDbExceptionInfo(exception))
                        .AddSection("Server Info", CommonInfoGetters.GetServerInfo())
                        .AddSection("Exception Info", CommonInfoGetters.GetExceptionInfo(exception));
            if (param != null)
            {
                logMessage.AddSection("Params", param);
            }

            await logService.ErrorMessageAsync(logMessage.ToString());
        }
    }
}