namespace CRM.Models.InformHeadline;

using System;

public class InformHeadlineModel
{
    public int TitleId { get; set; }

    public string Title { get; set; }

    public DateTime CreatedDate { get; set; }

    public string ClientCreatedDate { get; set; }

    public int Total { get; set; }

    public string Status { get; set; }

    public int Done { get; set; }

    public int RequestToCallBack { get; set; }

    public int NoNeedToCall { get; set; }

    public int NoReply { get; set; }

    public int Uncontactable { get; set; }

    public int InternalAccount { get; set; }

    public int NeverTouch { get; set; }

    public int KeptForReference { get; set; }
}