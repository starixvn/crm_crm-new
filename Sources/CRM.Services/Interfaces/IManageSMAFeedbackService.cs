using System.Collections.Generic;
using System.Threading.Tasks;
using CRM.Models;
using CRM.Models.ManageSmaFeedback;

namespace CRM.Services.Interfaces
{
    public interface IManageSmaFeedbackService
    {
        Task<IEnumerable<SmaFeedbackInfo>> GetSmaFeedbackAsync(GetSmaFeedbackInfo param);

        Task<CommandResult> EditSmaFeedbackAsync(EditSmaFeedback param);
    }
}
