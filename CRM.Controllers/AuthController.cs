namespace CRM.Controllers
{
    using System;
    using System.Collections.Generic;
    using System.Security.Claims;
    using System.Threading.Tasks;
    using CRM.Core.Enumerables;
    using CRM.Core.Filters;
    using CRM.Core.Models;
    using CRM.Models.Auth;
    using CRM.Services;
    using Fanex.Data;
    using Fanex.NAP.Client.Helpers.Web;
    using Fanex.NAP.Client.Models;
    using Fanex.NAP.Client.Services;
    using Microsoft.AspNetCore.Authentication;
    using Microsoft.AspNetCore.Authentication.Cookies;
    using Microsoft.AspNetCore.Http;
    using Microsoft.AspNetCore.Mvc;
    using Microsoft.Extensions.Options;

    public class AuthController : Controller
    {
        private readonly IUserService userService;
        private readonly INapSession napSession;
        private readonly ISecurityService securityService;
        private readonly IAuthService authService;
        private readonly AppSettings appSettings;
        private readonly IEnumerable<ExternalRedirectMapping> redirectMappings;

        public AuthController(
            IUserService userService,
            INapSession napSession,
            ISecurityService securityService,
            IAuthService authService,
            IOptionsSnapshot<AppSettings> appSettings,
            IOptionsSnapshot<List<ExternalRedirectMapping>> redirectMappings)
        {
            this.userService = userService;
            this.napSession = napSession;
            this.securityService = securityService;
            this.authService = authService;
            this.appSettings = appSettings.Value;
            this.redirectMappings = redirectMappings.Value;
        }

        public async Task<IActionResult> SignIn(SignIn model)
        {
            if (string.IsNullOrWhiteSpace(model.Username))
            {
                return View();
            }

            User user = await userService.GetAsync(model.Username);
            if (user != null && IsValidPassword(user, model))
            {
                int.TryParse(Cryptography.DecryptPassword(model.OnUserId.Replace(" ", "+")), out int onUserId);
                await DoSignInAsync(user, onUserId);
            }

            var mapping = GetExternalRedirectMapping();
            return new RedirectResult(mapping?.ExternalHomePageUrl, false);
        }

        public async Task<IActionResult> SingleSignOn(SingleSignOn model)
        {
            if (IsValidTime(model.Time))
            {
                int.TryParse(Cryptography.DecryptPassword(model.UserId.Replace(" ", "+")), out int userId);
                User user = await userService.GetAsync(userId);
                if (user != null)
                {
                    int.TryParse(Cryptography.DecryptPassword(model.OnUserId.Replace(" ", "+")), out int onUserId);
                    await DoSignInAsync(user, onUserId);
                }
            }

            var mapping = GetExternalRedirectMapping();
            return new RedirectResult(mapping?.ExternalHomePageUrl, false);
        }

        public async Task<IActionResult> SignOut()
        {
            await DoSignOutAsync();

            var mapping = GetExternalRedirectMapping();
            return new RedirectResult(mapping?.ExternalSignInUrl, false);
        }

        [CrmAuthorize]
        public IActionResult ReCheckIn()
        {
            return View();
        }

        [CrmAuthorize]
        [HttpPost]
        public async Task<IActionResult> CheckUserOnlineStatus()
        {
            RecheckInStatus recheckInStatus = await authService.GetRecheckInStatusAsync();
            if(recheckInStatus == RecheckInStatus.UnderMaintenance)
            {
                var mapping = GetExternalRedirectMapping();
                return new RedirectResult(mapping?.ExternalUnderMaintenanceUrl, false);
            }

            if (recheckInStatus != RecheckInStatus.Success)
            {
                await DoSignOutAsync();
                var mapping = GetExternalRedirectMapping();
                return new RedirectResult(mapping?.ExternalSignInUrl, false);
            }

            return Ok();
        }

        private ExternalRedirectMapping GetExternalRedirectMapping()
        {
            var request = HttpContext.Request;
            var roorUrl = Url.Content("~");
            roorUrl = roorUrl.EndsWith("/") ? roorUrl.Substring(0, roorUrl.Length - 1) : roorUrl;
            var config = new ExternalRedirectMapping();
            foreach (var element in redirectMappings)
            {
                var localPath = element.DomainUri.LocalPath.EndsWith("/")
                           ? element.DomainUri.LocalPath.Substring(0, element.DomainUri.LocalPath.Length - 1)
                           : element.DomainUri.LocalPath;
                if (element.DomainUri.Host.Equals(request.Host.Host, StringComparison.OrdinalIgnoreCase)
                    && (!element.IncludePort || element.DomainUri.Port == request.Host.Port)
                    && localPath.Equals(roorUrl, StringComparison.OrdinalIgnoreCase))
                {
                    config = element;
                }
            }

            return config;
        }

        private bool IsValidPassword(User user, SignIn signIn)
        {
            var hashPassword = authService.HashText(string.Format("{0}{1}", user.Password, signIn.Token));
            return string.Equals(signIn.Password, hashPassword, StringComparison.CurrentCulture);
        }

        private async Task DoSignInAsync(User user, int onUserId)
        {
            napSession.UserId = user.Id;
            napSession.UserName = user.Username;
            napSession.OnUserId = onUserId;

            var claims = new List<Claim>
            {
                new Claim(ClaimTypes.Name, user.Username),
                new Claim(ClaimTypes.NameIdentifier, user.Id.ToString())
            };

            var identity = new ClaimsIdentity(claims, CookieAuthenticationDefaults.AuthenticationScheme);
            await HttpContext.SignInAsync(CookieAuthenticationDefaults.AuthenticationScheme, new ClaimsPrincipal(identity));
        }

        private bool IsValidTime(string time)
        {
            DateTime.TryParse(Cryptography.DecryptPassword(time.Replace(" ", "+")), out DateTime descryptTime1);
            DateTime.TryParse(securityService.GetTime(), out DateTime descryptTime2);
            var expiration = descryptTime2 - descryptTime1;

            return expiration.TotalSeconds <= appSettings.SingleSignOnExpiredTime;
        }

        private async Task DoSignOutAsync()
        {
            await HttpContext.SignOutAsync(CookieAuthenticationDefaults.AuthenticationScheme);
        }
    }
}