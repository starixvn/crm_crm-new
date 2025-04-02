namespace CRM.Controllers;

using System.Linq;
using Filters;
using Microsoft.AspNetCore.Mvc;
using ONEbook.UM.Filters;

[ServiceFilter(typeof(CheckUMFilterAttribute))]
[CrmAuthorize]
public class BaseController : Controller
{
    protected string ClientIP
    {
        get
        {
            var xForwarded = HttpContext.Request.Headers["x-forwarded-for"].ToString();
            return !string.IsNullOrEmpty(xForwarded) ? xForwarded.Split(",", System.StringSplitOptions.RemoveEmptyEntries).FirstOrDefault() : HttpContext.Connection.RemoteIpAddress.ToString();
        }
    }
}