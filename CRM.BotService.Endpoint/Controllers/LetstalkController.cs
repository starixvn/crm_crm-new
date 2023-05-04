namespace CRM.BotService.Endpoint.Controllers
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Threading.Tasks;
    using CRM.BotService.Core.Services.Interfaces;
    using CRM.BotService.Endpoint.ViewModel;
    using Microsoft.AspNetCore.Authentication.JwtBearer;
    using Microsoft.AspNetCore.Authorization;
    using Microsoft.AspNetCore.Mvc;

    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
    public class LetstalkController : Controller
    {
        private readonly Func<long, ILetstalkClientService> letstalkClientService;

        public LetstalkController(Func<long, ILetstalkClientService> letstalkClientService)
        {
            this.letstalkClientService = letstalkClientService;
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

                foreach (var letstalkId in model.LetstalkIds)
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
    }
}