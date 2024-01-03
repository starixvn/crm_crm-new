namespace CRM.Models.Customer
{
    public class RelatedCustomerPermission : RelatedCustomer
    {
        public bool IsAuthorized { get; set; }
    }
}