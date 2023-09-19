namespace CRM.Controllers.Remark
{
    using System.Threading.Tasks;
    using CRM.Core.Constants;
    using CRM.Core.Filters;
    using CRM.Core.Models;
    using CRM.Criteria.Remark;
    using CRM.Resources;
    using CRM.Services;
    using CRM.Services.Customer;
    using CRM.Services.Remark;
    using Fanex.NAP.Client.Helpers.Web;
    using Microsoft.AspNetCore.Mvc;
    using static Fanex.NAP.Core.Business.Constant;

    [CrmMultiplePermission(FunctionKey = FunctionKey.Credit, Policy = Policy.Read)]
    [CrmMultiplePermission(FunctionKey = FunctionKey.Licensee, Policy = Policy.Read)]
    public class RemarkController : BaseController
    {
        private readonly INapSession napSession;
        private readonly IRemarkService remarkService;
        private readonly IPermissionService permissionService;
        private readonly ICustomerService customerService;

        public RemarkController(
            INapSession napSession,
            IRemarkService remarkService,
            IPermissionService permissionService,
            ICustomerService customerService
        )
        {
            this.napSession = napSession;
            this.remarkService = remarkService;
            this.permissionService = permissionService;
            this.customerService = customerService;
        }

        [HttpPost]
        public async Task<IActionResult> GetRemarks([FromBody] GetRemarkCriteria criteria)
        {
            var remarks = await remarkService.GetRemarkAsync(criteria);
            return Json(remarks);
        }

        [HttpPost]
        [CrmMultiplePermission(FunctionKey = FunctionKey.Credit, Policy = Policy.Host)]
        [CrmMultiplePermission(FunctionKey = FunctionKey.Licensee, Policy = Policy.Host)]
        public async Task<IActionResult> EditRemarks([FromBody] EditRemarkCommand command)
        {
            var result = new CommandResult();
            bool isHostCredit = await permissionService.IsHavingPermissionByPolicyAsync(FunctionKey.Credit, Policy.Host);
            bool isHostLicensee = await permissionService.IsHavingPermissionByPolicyAsync(FunctionKey.Licensee, Policy.Host);
            bool canEdit = await customerService.HasHostPermissionOnCustIdAsync(isHostCredit, isHostLicensee, command.CustomerId);
            if (canEdit)
            {
                command.UserId = napSession.UserId;
                command.IP = ClientIP;
                result = await remarkService.EditRemarkAsync(command);
            }
            else
            {
                result.Message = ViewResources.NoPermission;
            }

            return Json(result);
        }
    }
}