namespace CRM.Controllers.Remark;

using System.Threading.Tasks;
using Constants;
using CRM.Criteria.Remark;
using CRM.Resources;
using CRM.Services.Customer;
using CRM.Services.Remark;
using Fanex.NAP.Client;
using Filters;
using Microsoft.AspNetCore.Mvc;
using Models;
using static Fanex.NAP.Client.Helpers.Business.Constant;

[CrmPermission(FunctionKey = $"{FunctionKey.Credit},{FunctionKey.Licensee}", Policy = Policy.Read)]
public class RemarkController(
    INapSession napSession,
    IRemarkService remarkService,
    ICustomerService customerService)
    : BaseController
{
    [HttpPost]
    public async Task<IActionResult> GetRemarks([FromBody] GetRemarkCriteria criteria)
    {
        var remarks = await remarkService.GetRemarkAsync(criteria);
        return Json(remarks);
    }

    [HttpPost]
    public async Task<IActionResult> EditRemarks([FromBody] EditRemarkCommand command)
    {
        var result = new CommandResult();

        var canEdit = await customerService.HasHostPermissionOnCustIdAsync(command.CustomerId);
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