namespace CRM.Services;

using System;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;
using Enumerables;
using Fanex.NAP.Client.Configuration;
using Fanex.NAP.Client;
using Fanex.NAP.Client.Services;
using ONEbook.UM.Services;

public interface IAuthService
{
    Task<RecheckInStatus> GetRecheckInStatusAsync();

    string HashText(string plaintext);
}

public class AuthService(
    INapSession napSession,
    INapSettings napSettings,
    ISecurityService securityService,
    IMaintenanceService maintenanceService)
    : IAuthService
{
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

        var textBuffer = Encoding.UTF8.GetBytes(plaintext);
        var hashBuffer = SHA256.Create().ComputeHash(textBuffer);
        var hash = BitConverter.ToString(hashBuffer);

        return hash.Replace("-", string.Empty).ToLowerInvariant();
    }
}