namespace CRM.Controllers.Remark
{
    using CRM.Core.Constants;
    using CRM.Core.Filters;
    using CRM.Models.Customer;
    using CRM.Services.Remark;
    using Fanex.NAP.Client.Configuration;
    using Fanex.NAP.Client.Helpers.Web;
    using Fanex.NAP.Client.Services;
    using Microsoft.AspNetCore.Mvc;
    using static Fanex.NAP.Core.Business.Constant;

    [CrmPermission(FunctionKey = FunctionKey.CreateUpdateFeedbackAndCustomerInfo, Policy = Policy.Read)]
    public class RemarkController : BaseController
    {
        private readonly INapSession napSession;
        private readonly INapSettings napSettings;
        private readonly IUserService userService;
        private readonly IRemarkService remarkService;

        public RemarkController(
            INapSession napSession,
            INapSettings napSettings,
            IUserService userService,
            IRemarkService remarkService
        )
        {
            this.napSession = napSession;
            this.napSettings = napSettings;
            this.userService = userService;
            this.remarkService = remarkService;
        }

        public IActionResult Index()
        {
            var permission = new GetPermissionCustomer
            {
                CustomerInfoPolicy = userService.GetPermission(napSession.UserId, napSettings.SiteId, FunctionKey.CreateUpdateFeedbackAndCustomerInfo)
            };
            return View(permission);
        }
    }
}
