namespace CRM.Core.Models
{
    public class CurrentCustomer
    {
        public string Name { get; set; }
        public bool IsGuest { get; set; }
        public bool HasCreateFeedbackPermission { get; set; } = false;
    }
}
