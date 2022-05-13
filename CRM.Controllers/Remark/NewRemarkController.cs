namespace CRM.Controllers.Remark
{
    using System.Linq;
    using System.Threading.Tasks;
    using CRM.Core.Constants;
    using CRM.Core.Filters;
    using CRM.Core.Models;
    using CRM.Criteria.NewRemark;
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

        public IActionResult Index(int? custId, string customerName = "", bool? isGuest = false, bool? isLastFiveRemark = false)
        {
            var isHost = userService.IsHavingPermission(napSession.UserId, napSettings.SiteId, FunctionKey.CreateUpdateFeedbackAndCustomerInfo, Policy.Host);
            ViewBag.customerName = customerName;
            ViewBag.isGuest = isGuest;
            ViewBag.isLastFiveRemark = isLastFiveRemark;
            ViewBag.custId = custId;
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
            var users = await customerService.GetAllCustomerAsync();
            var extentions = await settingService.GetSettingRelationByNameAsync(SettingTypeConstants.Extension, SettingConstants.Active);
            return Json(new {
                extentions,
                users,
                userId = napSession.UserId 
            });
        }

        public async Task<IActionResult> GetRelatedPicsByCustId([FromBody] GetRelatedPicsCriteria criteria)
        {
            var relatedPics = await remarkService.GetRelatedPicByCustIdAsync(criteria);
            return Json(relatedPics);
        }

        public async Task<IActionResult> GetNewRemarks([FromBody] GetNewRemarkCriteria criteria)
        {
            criteria.Fromdate = commonService.ConvertClientFromTimeToServerTime(criteria.Fromdate);
            criteria.Todate = commonService.ConvertClientToTimeToServerTime(criteria.Todate);
            var newRemarks = await remarkService.GetNewRemarkAsync(criteria);
            foreach(var remark in newRemarks)
            {
                remark.CreatedDate = commonService.ConvertToClientDateTime(remark.CreatedDate);
                remark.LastUpdate = commonService.ConvertToClientDateTime(remark.LastUpdate);
            }
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

            var histories = await remarkService.GetCustomerNewRemarkHistoryAsync(criteria);
            foreach(var history in histories)
            {
                history.LastUpdate = commonService.ConvertToClientDateTime(history.LastUpdate);
            }
            return Json(new { data = histories, totalItems = criteria.TotalRows });
        }

        [HttpPost]
        public async Task<IActionResult> Delete([FromBody] DeleteNewRemarkCommand command)
        {
            command.UserID = napSession.UserId;
            command.IP = ClientIP;
            CommandResult commandResult = await remarkService.DeleteNewAsync(command);
            return Json(commandResult);
        }

        [HttpPost]
        public async Task<IActionResult> GetLastFiveRemark([FromBody] GetLastFiveRemarksCriteria criteria)
        {
            var remarks = await remarkService.GetLastFiveRemarkAsync(criteria);
            foreach (var remark in remarks)
            {
                remark.CreatedDate = commonService.ConvertToClientDateTime(remark.CreatedDate);
            }
            return Json(remarks);
        }
    }
}
