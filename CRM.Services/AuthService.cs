namespace CRM.Services
{
    using System;
    using System.Security.Cryptography;
    using System.Text;
    using System.Threading.Tasks;
    using CRM.Core.Enumerables;
    using Fanex.NAP.Client.Configuration;
    using Fanex.NAP.Client.Helpers.Web;
    using Fanex.NAP.Client.Services;
    using ONEbook.UM.Services;

    public interface IAuthService
    {
        Task<RecheckInStatus> GetRecheckInStatusAsync();

        string HashText(string plaintext);
    }

    public class AuthService : IAuthService
    {
        private readonly INapSession napSession;
        private readonly INapSettings napSettings;
        private readonly ISecurityService securityService;
        private readonly IMaintenanceService maintenanceService;

        public AuthService(
            INapSession napSession,
            INapSettings napSettings,
            ISecurityService securityService,
            IMaintenanceService maintenanceService)
        {
            this.napSession = napSession;
            this.napSettings = napSettings;
            this.securityService = securityService;
            this.maintenanceService = maintenanceService;
        }

        public async Task<RecheckInStatus> GetRecheckInStatusAsync()
        {
            RecheckInStatus recheckInStatus;
            if (await maintenanceService.IsUnderMaintenanceAsync())
            {
                recheckInStatus = RecheckInStatus.UnderMaintenance;
            }
            else if (!napSettings.EnableReCheckIn || napSession.OnUserId <= 0)
            {
                recheckInStatus = RecheckInStatus.Success;
            }
            else
            {
                recheckInStatus = (await securityService.ReCheckInAsync(napSession.OnUserId, napSettings.SiteId)) > 0 ? RecheckInStatus.KickOut : RecheckInStatus.Success;
            }

            return recheckInStatus;
        }

        public string HashText(string plaintext)
        {
            if (string.IsNullOrWhiteSpace(plaintext))
            {
                return string.Empty;
            }

            byte[] textBuffer = Encoding.UTF8.GetBytes(plaintext);
            byte[] hashBuffer = SHA256.Create().ComputeHash(textBuffer);
            string hash = BitConverter.ToString(hashBuffer);

            return hash.Replace("-", string.Empty).ToLowerInvariant();
        }
    }
}