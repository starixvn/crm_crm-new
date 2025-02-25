namespace CRM.Controllers
{
    using System;
    using System.Collections.Generic;
    using System.Globalization;
    using System.Linq;
    using System.Security.Claims;
    using System.Threading.Tasks;
    using CRM.Core.Enumerables;
    using CRM.Core.Filters;
    using CRM.Core.Helpers;
    using CRM.Core.Models;
    using CRM.Models.Auth;
    using CRM.Resources;
    using Fanex.NAP.Client.Configuration;
    using Fanex.NAP.Client.Helpers.Web;
    using Fanex.NAP.Client.Models;
    using Fanex.NAP.Client.Models.ParameterObject;
    using Fanex.NAP.Client.Services;
    using Microsoft.AspNetCore.Authentication;
    using Microsoft.AspNetCore.Authentication.Cookies;
    using Microsoft.AspNetCore.Http;
    using Microsoft.AspNetCore.Mvc;
    using Microsoft.Extensions.Options;
    using ONEbook.UM.AspNetCore.Filters;

    [ServiceFilter(typeof(CheckUMFilterAttribute))]
    public class AuthController : Controller
    {
        private readonly IUserService userService;
        private readonly INapSession napSession;
        private readonly ISecurityService securityService;
        private readonly IGroupService groupService;
        private readonly INapSettings napSettings;
        private readonly AppSettings appSettings;

        public AuthController(
            IUserService userService,
            INapSession napSession,
            ISecurityService securityService,
            IGroupService groupService,
            INapSettings napSettings,
            IOptionsSnapshot<AppSettings> appSettings)
        {
            this.userService = userService;
            this.napSession = napSession;
            this.securityService = securityService;
            this.groupService = groupService;
            this.napSettings = napSettings;
            this.appSettings = appSettings.Value;
        }

        public IActionResult SignIn()
        {
            return View();
        }

        [HttpPost]
        public async Task<IActionResult> SignIn(SignIn model)
        {
            User user = await userService.GetAsync(model.Username);
            string errorMsg;
            if (user != null)
            {
                if (!IsValidPassword(user, model))
                {
                    errorMsg = ViewResources.WrongPassword;
                }
                else if (!await IsExistNapSite(user) || !await IsExistNapGroup(user))
                {
                    errorMsg = ViewResources.NoPermission;
                }
                else
                {
                    var onUserId = await LoginCheckIn(user);
                    await DoSignInAsync(user, onUserId);

                    return Redirect(!string.IsNullOrWhiteSpace(model.ReturnUrl) && Url.IsLocalUrl(model.ReturnUrl) ? model.ReturnUrl : "~/Home");
                }
            }
            else
            {
                errorMsg = ViewResources.UserNotExisted;
            }

            ViewBag.Message = errorMsg;
            return View();
        }

        [CrmAuthorize]
        [HttpPost]
        public async Task<ActionResult> CheckUserOnlineStatus()
        {
            var recheckInStatus = await RecheckIn();
            return Json(new
            {
                napSession.OnUserId,
                ErrCode = (int)recheckInStatus
            });
        }

        private async Task<RecheckInStatus> RecheckIn()
        {
            if (napSession.OnUserId <= 0)
            {
                return RecheckInStatus.KickOut;
            }
            else
            {
                if (!napSettings.EnableReCheckIn)
                {
                    return RecheckInStatus.Success;
                }

                var status = await securityService.ReCheckInAsync(napSession.OnUserId, napSettings.SiteId);

                return status > 0 ? RecheckInStatus.KickOut : RecheckInStatus.Success;
            }
        }

        private async Task<bool> IsExistNapSite(User user)
        {
            var siteLevels = await userService.GetSiteLevelAsync(user.Id, napSettings.Environment);

            return siteLevels.Any(s => s.SiteId == napSettings.SiteId && s.IsActive);
        }

        private async Task<bool> IsExistNapGroup(User user)
        {
            if (user.GroupId > 0)
            {
                var group = await groupService.GetAsync(user.GroupId);

                if (group != null && !group.IsActive)
                {
                    return false;
                }
            }

            return true;
        }

        private async Task<int> LoginCheckIn(User user)
        {
            var loginParam = new LoginParameter
            {
                UserId = user.Id,
                SiteId = napSettings.SiteId,
                Domain = HttpContext.Request?.Host.ToString(),
                Ip = GetClientIP(HttpContext),
                BrowserName = Request?.Headers["User-Agent"].ToString(),
                CountryCode = ResolveCountry(HttpContext.Request)?.GeoId.ToString(CultureInfo.CurrentCulture),
                NetSessionId = HttpContext.Session.Id,
                Platform = Environment.OSVersion.Platform.ToString(),
                LoginDate = DateTimeOffset.Now.DateTime
            };

            return await securityService.LoginAsync(loginParam);
        }

        private static string GetClientIP(HttpContext httpContext)
        {
            var clientIP = httpContext.Request?.Headers["x-forwarded-for"].ToString();
            if (string.IsNullOrWhiteSpace(clientIP))
            {
                clientIP = httpContext?.Connection?.RemoteIpAddress?.ToString();
            }

            return clientIP;
        }

        private static RegionInfo ResolveCountry(HttpRequest request)
        {
            var culture = ResolveCulture(request);

            if (culture != null)
            {
                return new RegionInfo(culture.LCID);
            }

            return null;
        }

        private static CultureInfo ResolveCulture(HttpRequest request)
        {
            var userLangs = request.Headers["Accept-Language"].ToString();
            var firstLang = userLangs.Split(',').FirstOrDefault();
            CultureInfo culture = new CultureInfo(firstLang);
            var isValidCulture = CultureInfo.GetCultures(CultureTypes.AllCultures).Contains(culture);
            return isValidCulture ? CultureInfo.CreateSpecificCulture(firstLang) : CultureInfo.CreateSpecificCulture("en");
        }

        [Route("UserLogin/SSO")]
        public async Task<IActionResult> SingleSignOn(SingleSignOn model)
        {
            var isValidTime = await IsValidTime(model.Time);

            if (isValidTime)
            {
                var userId = int.Parse(CryptographyHelper.DecryptPassword(model.UserId.Replace(" ", "+")));
                var onUserid = int.Parse(CryptographyHelper.DecryptPassword(model.OnUserId.Replace(" ", "+")));

                var newOnUserId = await SSOLogin(userId, onUserid);

                if (newOnUserId > 0)
                {
                    var user = await userService.GetAsync(userId);
                    if (user != null)
                    {
                        await DoSignInAsync(user, newOnUserId);

                        return Redirect(!string.IsNullOrWhiteSpace(model.RedirectUrl) && Url.IsLocalUrl(model.RedirectUrl) ? model.RedirectUrl : "~/Home");
                    }
                }
                else
                {
                    return new RedirectResult("~/Auth/SignIn");
                }
            }

            return new RedirectResult("~/Auth/SignIn");
        }

        private async Task<int> SSOLogin(int userId, int onuserId)
        {
            var ssoLoginParam = new SSOLoginParameter
            {
                UserId = userId,
                SiteId = napSettings.SiteId,
                Domain = HttpContext.Request?.Host.ToString(),
                CheckOnUserId = onuserId,
                IP = GetClientIP(HttpContext),
                BrowserName = Request?.Headers["User-Agent"].ToString(),
                CountryCode = ResolveCountry(HttpContext.Request)?.GeoId.ToString(CultureInfo.CurrentCulture),
                NetSessionId = HttpContext?.Session.Id,
                Platform = Environment.OSVersion.Platform.ToString(),
                LoginDate = DateTimeOffset.Now.DateTime
            };
            return await securityService.SSOLoginAsync(ssoLoginParam);
        }

        public async Task<IActionResult> Signout()
        {
            await DoSignOutAsync();

            return new RedirectToActionResult("SignIn", "Auth", false);
        }

        private static bool IsValidPassword(User user, SignIn signIn)
        {
            return string.Equals(signIn.Password, user.Password, StringComparison.CurrentCulture);
        }

        private async Task DoSignInAsync(User user, int onUserId)
        {
            napSession.UserId = user.Id;
            napSession.UserName = user.Username;
            napSession.OnUserId = onUserId;
            var menus = await GetMenuAsync(user.Id);
            napSession.MenuItemList = menus;
            var claims = new List<Claim>
            {
                new Claim(ClaimTypes.Name, user.Username),
                new Claim(ClaimTypes.NameIdentifier, user.Id.ToString())
            };

            var identity = new ClaimsIdentity(claims, CookieAuthenticationDefaults.AuthenticationScheme);
            await HttpContext.SignInAsync(CookieAuthenticationDefaults.AuthenticationScheme, new ClaimsPrincipal(identity));
        }

        private async Task<List<MenuItem>> GetMenuAsync(int userId)
        {
            var menus = await userService.GetMenuItemAsync(userId, napSettings.SiteId, napSettings.Environment, true);
            return menus.ToList();
        }

        #pragma warning disable S6580
        private async Task<bool> IsValidTime(string time)
        {
            DateTime.TryParse(CryptographyHelper.DecryptPassword(time.Replace(" ", "+")), out DateTime descryptTime1);
            DateTime.TryParse(await securityService.GetTimeAsync(), out DateTime descryptTime2);
            var expiration = descryptTime2 - descryptTime1;

            return expiration.TotalSeconds <= appSettings.SingleSignOnExpiredTime;
        }
        #pragma warning restore S6580

        private async Task DoSignOutAsync()
        {
            if (napSession.OnUserId != 0)
            {
                await securityService.LogoutAsync(napSession.OnUserId);
                napSession.ClearAll();
            }
            await HttpContext.SignOutAsync(CookieAuthenticationDefaults.AuthenticationScheme);
        }
    }
}