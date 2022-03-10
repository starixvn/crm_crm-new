namespace CRM.Controllers.Redemption
{
    using System.Linq;
    using System.Threading.Tasks;
    using CRM.Core.Constants;
    using CRM.Core.Enumerables;
    using CRM.Core.Filters;
    using CRM.Core.Services;
    using CRM.Criteria.Redemption;
    using CRM.Services;
    using CRM.Services.Redemption;
    using CRM.ViewModels.Customer;
    using Fanex.NAP.Client.Configuration;
    using Fanex.NAP.Client.Helpers.Web;
    using Fanex.NAP.Client.Services;
    using Microsoft.AspNetCore.Mvc;
    using static Fanex.NAP.Core.Business.Constant;

    [CrmPermission(FunctionKey = FunctionKey.CreateUpdateFeedbackAndCustomerInfo, Policy = Policy.Read)]
    public class RedemptionController : BaseController
    {
        private readonly INapSession napSession;
        private readonly INapSettings napSettings;
        private readonly IUserService userService;
        private readonly IRedemptionService redemptionService;
        private readonly ISettingService settingService;
        private readonly IBaseService baseService;

        public RedemptionController(
            INapSession napSession,
            INapSettings napSettings,
            IUserService userService,
            IRedemptionService redemptionService,
            ISettingService settingService,
            IBaseService baseService
        )
        {
            this.napSession = napSession;
            this.napSettings = napSettings;
            this.userService = userService;
            this.redemptionService = redemptionService;
            this.settingService = settingService;
            this.baseService = baseService;
        }

        public IActionResult Index(int custid)
        {
            var permission = new CustomerPermissionViewModel
            {
                CustomerInfoPolicy = userService.GetPermission(napSession.UserId, napSettings.SiteId, FunctionKey.CreateUpdateFeedbackAndCustomerInfo),
                CreateUpdateFeedbackPermission = userService.GetPermission(napSession.UserId, napSettings.SiteId, FunctionKey.CreateUpdateFeedbackAndCustomerInfo),
                Id = custid
            };

            return View(permission);
        }

        public async Task<IActionResult> GetLogsByCustomerId([FromBody] GetLogsByCustomerIdCriteria criteria)
        {
            var logs = await redemptionService.GetLogsByCustomerIdAsync(criteria);
            return Json(logs);
        }

        public async Task<IActionResult> GetAllStatus(bool isEdit)
        {
            var statuses = await settingService.GetStatusAsync(ViewTypeConstants.Redemption);
            var currencies = await settingService.GetCurrencyRedemptionAsync();
            if (!isEdit)
            {
                statuses = statuses.Where(x => x.StatusId != (int)FeedbackStatus.Deleted);
            }
            return Json(new { statuses, currencies });
        }

        public async Task<IActionResult> GetLogById(int id)
        {
            var log = await redemptionService.GetLogByIdAsync(id);
            return Json(log);
        }

        [HttpPost]
        [CrmPermission(FunctionKey = FunctionKey.CreateUpdateFeedbackAndCustomerInfo, Policy = Policy.Host)]
        public async Task<IActionResult> EditRedemptionLog([FromBody] EditRedemptionLogCommand command)
        {
            command.UserId = napSession.UserId;
            command.IP = ClientIP;
            var commandResult = await baseService.ExecuteNonQueryAsync(command);
            return Json(commandResult);
        }

        [HttpPost]
        [CrmPermission(FunctionKey = FunctionKey.CreateUpdateFeedbackAndCustomerInfo, Policy = Policy.Host)]
        public async Task<IActionResult> CreateRedemptionLog([FromBody] CreateRedemptionLogCommand command)
        {
            command.UserId = napSession.UserId;
            command.IP = ClientIP;
            var commandResult = await baseService.ExecuteNonQueryAsync(command);
            return Json(commandResult);
        }
    }
}