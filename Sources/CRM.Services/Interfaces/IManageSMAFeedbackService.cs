using System.Collections.Generic;
using System.Threading.Tasks;
using CRM.Models;
using CRM.Models.ManageSMAFeedback;

namespace CRM.Services.Interfaces
{
    public interface IManageSMAFeedbackService
    {
        Task<IEnumerable<SMAFeedbackInfo>> GetSMAFeedbackAsync(GetSMAFeedbackInfo param);

        Task<CommandResult> EditSMAFeedbackAsync(EditSMAFeedback param);
    }
}
