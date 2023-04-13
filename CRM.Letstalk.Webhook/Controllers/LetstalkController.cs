namespace CRM.BotService.Endpoint.Controllers
{
    using System;
    using System.Collections.Generic;
    using System.Threading.Tasks;
    using CRM.BotService.Core.Services.Interfaces;
    using CRM.BotService.Endpoint.ViewModel;
    using Microsoft.AspNetCore.Authentication.JwtBearer;
    using Microsoft.AspNetCore.Authorization;
    using Microsoft.AspNetCore.Mvc;

    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
    public class LetstalkController : Controller
    {
        private readonly Func<int, ILetstalkClientService> letstalkClientService;

        public LetstalkController(Func<int, ILetstalkClientService> letstalkClientService)
        {
            this.letstalkClientService = letstalkClientService;
        }

        [HttpPost]
        [Route("api/letstalk/get-letstalk-name")]
        public async Task<IActionResult> CheckPersonalProfileAsync([FromBody] GetLetstalkDisplayNameViewModel profileInfo)
        {
            var profile = await letstalkClientService(profileInfo.BotId).GetProfileAsync(profileInfo.LetstalkId);
            string displayName = profile is not null ? profile.DisplayName : string.Empty;
            return Ok(displayName);
        }

        [HttpPost]
        [Route("api/letstalk/verify-on-group")]
        public async Task<IActionResult> VerifyUserOnGroupAsync([FromBody] VerifyUserOnGroupViewModel model)
        {
            var botFriends = await letstalkClientService(model.BotId).GetBotContactList();
            var roomData = await letstalkClientService(model.BotId).GetChatRoomData(model.ConversationGroupId);
            var results = new List<object>();
            foreach (var letstalkId in model.LetstalkIds)
            {
                results.Add(new
                {
                    LetstalkId = letstalkId,
                    IsGroupMember = roomData.Members.Contains(letstalkId),
                    IsBotFriend = botFriends.Contains(letstalkId)
                });
            }

            return Ok(results);
        }
    }
}