namespace CRM.Controllers.HeadlineNotification;

using System.Threading.Tasks;
using Constants;
using CRM.Criteria.SMAPersonalMessage;
using CRM.Models.SMAPersonalMessage;
using CRM.Services;
using Fanex.NAP.Client;
using Filters;
using Microsoft.AspNetCore.Mvc;
using Services.Interfaces;
using static Fanex.NAP.Client.Helpers.Business.Constant;

[CrmPermission(FunctionKey = FunctionKey.SMAPersonalMessage, Policy = Policy.Read)]
public class SMAPersonalMessageController(
    INapSession napSession,
    IBaseService baseService,
    ICommonService commonService)
    : BaseController
{
    [HttpPost]
    [CrmPermission(FunctionKey = FunctionKey.SMAPersonalMessage, Policy = Policy.Read)]
    public async Task<IActionResult> GetGridData([FromBody] GetPersonalMessageCriteria criteria)
    {
        var messageInfors = await baseService.GetDataAsync<SMAMessageInfor>(criteria);
        foreach(var message in messageInfors)
        {
            message.CreateTime = commonService.ConvertToClientDateTime(message.CreateTime);
        }

        return Json(new { totalItems = criteria.TotalRows, data = messageInfors });
    }

    [CrmPermission(FunctionKey = FunctionKey.SMAPersonalMessage, Policy = Policy.Host)]
    public async Task<IActionResult> CheckValidUsername([FromBody] CheckValidUsernameCommand command)
    {
        var commandResult = await baseService.ExecuteNonQueryAsync(command);
        return Json(new { data = commandResult, custList = command.CustList });
    }

    [HttpPost]
    [CrmPermission(FunctionKey = FunctionKey.SMAPersonalMessage, Policy = Policy.Host)]
    public async Task<IActionResult> CreateNewMessage([FromBody] AddPersonalMessageCommand command)
    {
        command.Creator = napSession.UserId;
        command.CreatorName = napSession.UserName;
        command.IP = ClientIP;
        var commandResult = await baseService.ExecuteNonQueryAsync(command);

        return Json(commandResult);
    }

    [CrmPermission(FunctionKey = FunctionKey.SMAPersonalMessage, Policy = Policy.Host)]
    public async Task<IActionResult> Delete(int id)
    {
        var command = new DeletePersonalMessageCommand
        {
            MessageID = id,
            IP = ClientIP
        };
        var commandResult = await baseService.ExecuteNonQueryAsync(command);
        return Json(commandResult);
    }
}