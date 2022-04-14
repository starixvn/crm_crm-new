namespace CRM.Controllers.Remark
{
    using System.Linq;
    using System.Threading.Tasks;
    using CRM.Core.Constants;
    using CRM.Core.Filters;
    using CRM.Core.Models;
    using CRM.Criteria.NewRemark;
    using CRM.Models.Setting;
    using CRM.Services;
    using CRM.Services.Remark;
    using Fanex.NAP.Client.Configuration;
    using Fanex.NAP.Client.Helpers.Web;
    using Fanex.NAP.Client.Services;
    using Microsoft.AspNetCore.Mvc;
    using static Fanex.NAP.Core.Business.Constant;

    //[CrmPermission(FunctionKey = FunctionKey.CreateUpdateFeedbackAndCustomerInfo, Policy = Policy.Read)]
    public class NewRemarkController : Controller
    {
        private readonly INapSession napSession;
        private readonly INapSettings napSettings;
        private readonly IUserService userService;
        private readonly IRemarkService remarkService;
        private readonly ISettingService settingService;


        public NewRemarkController(
            INapSession napSession,
            INapSettings napSettings,
            IUserService userService,
            IRemarkService remarkService,
            ISettingService settingService
        )
        {
            this.napSession = napSession;
            this.napSettings = napSettings;
            this.userService = userService;
            this.remarkService = remarkService;
            this.settingService = settingService;
        }

        public IActionResult Index()
        {
           //var isHost = userService.IsHavingPermission(napSession.UserId, napSettings.SiteId, FunctionKey.CreateUpdateFeedbackAndCustomerInfo, Policy.Host);
            return View(true);
        }

        public async Task<IActionResult> GetRemarkTitles()
        {
            var remarkSettings = await settingService.GetSettingAsync(SettingName.RemarkTitles, true);
            var remarkSettingsOrder = remarkSettings.OrderBy(s => s.DisplayOrder).ToList();
            return Json(remarkSettingsOrder);
        }

        public async Task<IActionResult> GetNewRemarks([FromBody] GetNewRemarkCriteria criteria)
        {
            var newRemarks = await remarkService.GetNewRemarkAsync(criteria);
            return Json(new{data = newRemarks, totalItems = criteria.TotalRows});
        }

        [HttpPost]
        public async Task<IActionResult> ValidateUsername([FromBody] CustomerRemarkNewCheckCommand command)
        {
            CommandResult commandResult = await remarkService.ValidateUsernameAsyn(command);
            return Json(commandResult);
        }

        [HttpPost]
        public async Task<IActionResult> Delete([FromBody] DeleteNewRemarkCommand command)
        {
           //command.UserID = napSession.UserId;
            command.UserID = 1;
            command.IP = "ClientIP";
            CommandResult commandResult = await remarkService.DeleteNewAsync(command);
            return Json(commandResult);
        }

    }
}
