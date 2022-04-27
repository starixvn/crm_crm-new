namespace CRM.Controllers.Remark
{
    using System.Linq;
    using System.Threading.Tasks;
    using CRM.Core.Constants;
    using CRM.Core.Filters;
    using CRM.Core.Models;
    using CRM.Criteria.Common;
    using CRM.Criteria.NewRemark;
    using CRM.Models.Setting;
    using CRM.Services;
    using CRM.Services.Customer;
    using CRM.Services.Remark;
    using Fanex.NAP.Client.Configuration;
    using Fanex.NAP.Client.Helpers.Web;
    using Fanex.NAP.Client.Services;
    using Microsoft.AspNetCore.Mvc;
    using static Fanex.NAP.Core.Business.Constant;

    [CrmPermission(FunctionKey = FunctionKey.CreateUpdateFeedbackAndCustomerInfo, Policy = Policy.Read)]
    public class NewRemarkController : BaseController
    {
        private readonly INapSession napSession;
        private readonly INapSettings napSettings;
        private readonly IUserService userService;
        private readonly IRemarkService remarkService;
        private readonly ISettingService settingService;
        private readonly ICommonService commonService;
        private readonly ICustomerService customerService;
        private const int PicOfHeadline = 8;


        public NewRemarkController(
            INapSession napSession,
            INapSettings napSettings,
            IUserService userService,
            IRemarkService remarkService,
            ISettingService settingService,
            ICommonService commonService,
            ICustomerService customerService
        )
        {
            this.napSession = napSession;
            this.napSettings = napSettings;
            this.userService = userService;
            this.remarkService = remarkService;
            this.settingService = settingService;
            this.commonService = commonService;
            this.customerService = customerService;
        }

        public IActionResult Index(string customerName = "")
        {
            var isHost = userService.IsHavingPermission(napSession.UserId, napSettings.SiteId, FunctionKey.CreateUpdateFeedbackAndCustomerInfo, Policy.Host);
            ViewBag.customerName = customerName;
            return View(isHost);
        }

        public async Task<IActionResult> GetRemarkTitles()
        {
            var remarkSettings = await settingService.GetSettingAsync(SettingName.RemarkTitles, true);
            var remarkSettingsOrder = remarkSettings.OrderBy(s => s.DisplayOrder).ToList();
            return Json(remarkSettingsOrder);
        }

        public async Task<IActionResult> GetAllSetting()
        {
            var relatedPics = await commonService.GetRecipientAsync(new GetRecipientsCriteria { RecipientType = PicOfHeadline });
            var users = await customerService.GetAllCustomerAsync();
            var extentions = await settingService.GetSettingRelationByNameAsync(SettingTypeConstants.Extension, SettingConstants.Active);
            return Json(new {
                relatedPics,
                extentions,
                users,
                userId = napSession.UserId 
            });
        }

        public async Task<IActionResult> GetNewRemarks([FromBody] GetNewRemarkCriteria criteria)
        {
            var newRemarks = await remarkService.GetNewRemarkAsync(criteria);
            return Json(new{data = newRemarks, totalItems = criteria.TotalRows});
        }

        [HttpPost]
        public async Task<IActionResult> ValidateUsername([FromBody] CustomerRemarkNewCheckCriteria command)
        {
            var relatedCustomers = await remarkService.ValidateUsernameAsyn(command);
            return Json(relatedCustomers);
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] CreateNewReamarkCommand command)
        {
            command.CreatorID = napSession.UserId;
            command.ModifierID = napSession.UserId;
            command.IP = ClientIP;
            CommandResult commandResult = await remarkService.CreateNewAsync(command);
            return Json(commandResult);
        }

        [HttpPost]
        public async Task<IActionResult> Edit([FromBody] EditNewRemarkCommand command)
        {
            command.ModifierID = napSession.UserId;
            command.IP = ClientIP;
            CommandResult commandResult = await remarkService.EditNewAsync(command);
            return Json(commandResult);
        }

        [HttpPost]
        public async Task<IActionResult> GetNewRemarkHistory([FromBody] GetCustomerRemarkNewHistoryCriteria criteria)
        {

            var history = await remarkService.GetCustomerNewRemarkHistoryAsync(criteria);
            return Json(new { data = history, totalItems = criteria.TotalRows });
        }

        [HttpPost]
        public async Task<IActionResult> Delete([FromBody] DeleteNewRemarkCommand command)
        {
            command.UserID = napSession.UserId;
            command.IP = ClientIP;
            CommandResult commandResult = await remarkService.DeleteNewAsync(command);
            return Json(commandResult);
        }

    }
}
