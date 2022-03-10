namespace CRM.Controllers.Remark
{
    using System.Threading.Tasks;
    using CRM.Core.Constants;
    using CRM.Core.Filters;
    using CRM.Criteria.Remark;
    using CRM.Services.Remark;
    using CRM.ViewModels.Customer;
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

        public IActionResult Index(int custId)
        {
            var permission = new CustomerPermissionViewModel
            {
                CustomerInfoPolicy = userService.GetPermission(napSession.UserId, napSettings.SiteId, FunctionKey.CreateUpdateFeedbackAndCustomerInfo),
                Id = custId
            };
            return View(permission);
        }

        [HttpPost]
        public async Task<IActionResult> GetRemarks([FromBody] GetRemarkCriteria criteria)
        {
            var remarks = await remarkService.GetRemarkAsync(criteria);
            return Json(remarks);
        }

        [HttpPost]
        [CrmPermission(FunctionKey = FunctionKey.CreateUpdateFeedbackAndCustomerInfo, Policy = Policy.Host)]
        public async Task<IActionResult> EditRemarks([FromBody] EditRemarkCommand command)
        {
            command.UserId = napSession.UserId;
            command.IP = ClientIP;
            var result = await remarkService.EditRemarkAsync(command);
            return Json(result);
        }
    }
}
