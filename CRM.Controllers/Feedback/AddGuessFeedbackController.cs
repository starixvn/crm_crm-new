using Microsoft.AspNetCore.Mvc;

namespace CRM.Controllers.Feedback
{
    public class AddGuessFeedbackController : BaseController
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}
