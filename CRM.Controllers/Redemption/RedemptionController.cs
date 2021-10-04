namespace CRM.Controllers.Redemption
{
    using CRM.Core.Constants;
    using CRM.Core.Filters;
    using CRM.Core.Services;
    using CRM.Models.Customer;
    using CRM.Services;
    using CRM.Services.Redemption;
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

        public IActionResult Index()
        {
            var permission = new GetPermissionCustomer
            {
                CustomerInfoPolicy = userService.GetPermission(napSession.UserId, napSettings.SiteId, FunctionKey.CreateUpdateFeedbackAndCustomerInfo),
                CreateUpdateFeedbackPermission = userService.GetPermission(napSession.UserId, napSettings.SiteId, FunctionKey.CreateUpdateFeedbackAndCustomerInfo)
            };

            return View(permission);
        }
    }
}