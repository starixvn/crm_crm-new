namespace CRM.Controllers.Remark
{
    using System.Threading.Tasks;
    using CRM.Core.Constants;
    using CRM.Core.Filters;
    using CRM.Criteria.Remark;
    using CRM.Services.Remark;
    using Fanex.NAP.Client.Configuration;
    using Fanex.NAP.Client.Helpers.Web;
    using Fanex.NAP.Client.Services;
    using Microsoft.AspNetCore.Mvc;
    using static Fanex.NAP.Core.Business.Constant;

    [CrmMultiplePermissionAttribute(FunctionKey = FunctionKey.Credit, Policy = Policy.Read)]
    [CrmMultiplePermissionAttribute(FunctionKey = FunctionKey.Licensee, Policy = Policy.Read)]
    [CrmPermissionAttribute(FunctionKey = FunctionKey.CreateUpdateFeedback, Policy = Policy.Read)]
    public class RemarkController : BaseController
    {
        private readonly INapSession napSession;
        private readonly IRemarkService remarkService;

        public RemarkController(
            INapSession napSession,
            IRemarkService remarkService
        )
        {
            this.napSession = napSession;
            this.remarkService = remarkService;
        }

        [HttpPost]
        public async Task<IActionResult> GetRemarks([FromBody] GetRemarkCriteria criteria)
        {
            var remarks = await remarkService.GetRemarkAsync(criteria);
            return Json(remarks);
        }

        [HttpPost]
        [CrmPermission(FunctionKey = FunctionKey.CreateUpdateFeedback, Policy = Policy.Host)]
        public async Task<IActionResult> EditRemarks([FromBody] EditRemarkCommand command)
        {
            command.UserId = napSession.UserId;
            command.IP = ClientIP;
            var result = await remarkService.EditRemarkAsync(command);
            return Json(result);
        }
    }
}
