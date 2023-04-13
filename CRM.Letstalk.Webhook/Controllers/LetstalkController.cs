namespace CRM.Letstalk.Webhook.Controllers
{
    using System;
    using System.Collections.Generic;
    using System.Threading.Tasks;
    using CRM.Letstalk.Core.Services.Interfaces;
    using CRM.Letstalk.Webhook.ViewModel;
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
        [Route("api/letstalk/get-profile")]
        public async Task<IActionResult> CheckPersonalProfileAsync([FromBody] PersonalProfileViewModel profileInfo)
        {
            var profile = await letstalkClientService(profileInfo.BotId).GetProfileAsync(profileInfo.LetstalkId);

            return Ok(new
            {
                IsExisted = profile is not null,
                Contact = profile
            });
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