namespace CRM.BotService.Core.Services.EventHandler
{
    using CRM.BotService.Core.Constants;
    using CRM.BotService.Core.Criteria;
    using CRM.BotService.Core.Enum;
    using CRM.BotService.Core.Extensions;
    using CRM.BotService.Core.Extensions.Letstalk;
    using CRM.BotService.Core.Models;
    using CRM.BotService.Core.Models.Letstalk;
    using CRM.BotService.Core.Models.Letstalk.BotConfig;
    using CRM.BotService.Core.Services.Interfaces;
    using CRM.Core.Enumerables;
    using CRM.Core.Services;
    using Microsoft.AspNetCore.Http;
    using Newtonsoft.Json;
    using Newtonsoft.Json.Linq;
    using System;
    using System.Collections.Generic;
    using System.IO;
    using System.Threading.Tasks;

    public interface ILetstalkEventHandler
    {
        Task ReceiveAsync(HttpRequest request, int botId);
    }

    public class LetstalkEventHandler : ILetstalkEventHandler
    {
        private readonly IBaseService baseService;
        private readonly Func<long, ILetstalkClientService> letstalkService;
        private readonly ICRMLogService logService;
        private readonly List<LetstalkBotConfig> botConfigs;

        public LetstalkEventHandler(
            IBaseService baseService,
            ICRMLogService logService,
            Func<long, ILetstalkClientService> letstalkService,
            List<LetstalkBotConfig> botConfigs)
        {
            this.baseService = baseService;
            this.logService = logService;
            this.botConfigs = botConfigs;
            this.letstalkService = letstalkService;
        }

        public async Task ReceiveAsync(HttpRequest request, int botId)
        {
            CheckArgumentHelper.CheckValidBot(botConfigs, botId);
            logService.LogInformation($"======Receive Letstalk event: botId={botId}, listBot={JsonConvert.SerializeObject(botConfigs)}");
            string requestJson;
            var botConfig = botConfigs.Find(config => config.BotAccountId == botId);
            if (botConfig is not null)
            {
                using (TextReader reader = new StreamReader(request.Body))
                {
                    requestJson = await reader.ReadToEndAsync();
                }

                var rawData = JwtHelper.Decode(botConfig.SecureKey, requestJson.Trim());
                logService.LogInformation($"=======Letstalk event data: {rawData}");
                var data = JObject.Parse(rawData);
                var hookEvent = data.ToObject<HookEvent>();

                await EventHandlerAsync(hookEvent, botConfig);
            }
        }

        private async Task EventHandlerAsync(HookEvent hookEvent, LetstalkBotConfig botConfig)
        {
            switch (hookEvent.Type)
            {
                case EventType.JoinGroup:
                    await JoinGroupHandlerAsync(hookEvent, botConfig);
                    break;

                case EventType.KickOutGroup:
                    await KickOutBotHandlerAsync(hookEvent, botConfig);
                    break;

                case EventType.ChangeGroupName:
                    await ChangeGroupNameHandlerAsync(hookEvent, botConfig);
                    break;

                case EventType.Message:
                    await MessageHandlerAsync(hookEvent, botConfig);
                    break;

                case EventType.DeleteContact:
                case EventType.AddContact:
                    await UpdateContactHandlerAsync(hookEvent, botConfig);
                    break;

                default:
                    throw new KeyNotFoundException($"The event type {hookEvent.Type} have not implements!");
            }
        }

        #region Bot join group

        private async Task JoinGroupHandlerAsync(HookEvent hookEvent, LetstalkBotConfig botConfig)
        {
            var displayName = await GetChatRoomDisplayName(botConfig.BotAccountId, hookEvent.Source.GroupId);

            var command = new AddBotToGroupCommand
            {
                GroupName = displayName,
                ConversationId = hookEvent.Source.GroupId,
                BotId = botConfig.BotAccountId,
                BotName = botConfig.DisplayName,
                ChannelId = (byte)ConversationChannel.Letstalk,
                UpdatedBy = string.Empty
            };

            var result = await baseService.ExecuteNonQueryAsync(command);
            string greeting = $"Hi, I am {botConfig.DisplayName}, your ID: {hookEvent.Source.GroupId}";
            await letstalkService(botConfig.BotAccountId).PushRoomAsync(hookEvent.Source.GroupId, new OutgoingMessage
            {
                Text = greeting,
                MessageType = NotificationMessageType.PlainText
            });

            if (!result.IsSuccessful)
            {
                await logService.ErrorAsync(new Exception(result.Message));
            }
        }

        private async Task<string> GetChatRoomDisplayName(int botId, string groupId)
        {
            var roomData = await letstalkService(botId).GetChatRoomData(groupId);

            return roomData.Title;
        }

        #endregion Bot join group

        #region Kick out bot

        private async Task KickOutBotHandlerAsync(HookEvent hookEvent, LetstalkBotConfig botConfig)
        {
            var command = new RemoveBotFromGroupCommand
            {
                ConversationId = hookEvent.Source.GroupId,
                BotId = botConfig.BotAccountId,
                ChannelId = (byte)ConversationChannel.Letstalk,
                UpdatedBy = string.Empty
            };

            var result = await baseService.ExecuteNonQueryAsync(command);

            if (!result.IsSuccessful)
            {
                await logService.ErrorAsync(new Exception(result.Message));
            }
        }

        #endregion Kick out bot

        #region Change group name

        private async Task ChangeGroupNameHandlerAsync(HookEvent hookEvent, LetstalkBotConfig botConfig)
        {
            var roomData = await letstalkService(botConfig.BotAccountId).GetChatRoomData(hookEvent.Source.GroupId);

            var command = new UpdateGroupNameCommand
            {
                ConversationId = hookEvent.Source.GroupId,
                DisplayName = roomData.Title,
                UpdatedBy = string.Empty,
                ChannelId = (byte)ConversationChannel.Letstalk
            };

            var result = await baseService.ExecuteNonQueryAsync(command);

            if (!result.IsSuccessful)
            {
                await logService.ErrorAsync(new Exception(result.Message));
            }
        }

        #endregion Change group name

        #region Add/Delete contact

        private async Task UpdateContactHandlerAsync(HookEvent hookEvent, LetstalkBotConfig botConfig)
        {
            if (hookEvent.Type == EventType.AddContact)
            {
                await letstalkService(botConfig.BotAccountId).PushPersonalAsync(hookEvent.Source.UserId,
                    new OutgoingMessage
                    {
                        Text = $"Hi, I am {botConfig.DisplayName}",
                        MessageType = NotificationMessageType.PlainText
                    });
            }
        }

        #endregion Add/Delete contact

        #region Receive message

        private async Task MessageHandlerAsync(HookEvent hookEvent, LetstalkBotConfig botConfig)
        {
            hookEvent.PayloadObject = JsonConvert.DeserializeObject<Payload>(hookEvent.EncodedPayload);
            await letstalkService(botConfig.BotAccountId).PushPersonalAsync(hookEvent.Source.UserId,
                new OutgoingMessage
                {
                    Text = string.Format("Hello, I am Bot. Your ID: {0}", hookEvent.Source.UserId),
                    MessageType = NotificationMessageType.PlainText
                });
        }

        #endregion Receive message
    }
}