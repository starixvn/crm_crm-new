namespace CRM.Controllers
{
    using CRM.Core.Filters;
    using Microsoft.AspNetCore.Mvc;
    using ONEbook.UM.AspNetCore.Filters;

    [ServiceFilter(typeof(CheckUMFilterAttribute))]
    [CrmAuthorize]
    public class BaseController : Controller
    {
        protected string ClientIP => HttpContext.Connection.RemoteIpAddress.MapToIPv4().ToString();
    }
}