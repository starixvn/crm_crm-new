namespace CRM.Models.Feedback;

using System.Collections.Generic;
using CRM.Models.Customer;
using CRM.Models.Feedback.LatestFeedback;

public class CustomerFeedbackModel
{
    public IEnumerable<CustomerFeedback> CustomerFeedback { get; set; }
    public IEnumerable<LatestFeedbackCommunicationTool> FeedbackCommunicationTool { get; set; }
    public IEnumerable<FeedbackSettingRelation> FeedbackSettingRelation { get; set; }
    public IEnumerable<RelatedCustomerPermission> RelatedCustomerPermission { get; set; }
}