namespace CRM.Models.InformHeadline;

using System;

public class EditInform
{
    private const int NeverTouchStatusId = 45006;

    private int _informHeadlineStatusId;

    public int HeadlineId { get; set; }

    public int GroupId { get; set; }

    public string Username { get; set; }

    public DateTime? UpdatedTime { get; set; }

    public string ClientUpdatedTime { get; set; }

    public int InformHeadlineStatusId
    {
        get => _informHeadlineStatusId == 0 ? NeverTouchStatusId : _informHeadlineStatusId;

        set => _informHeadlineStatusId = value;
    }

    public string Remark { get; set; }

    public string Handler { get; set; }

    public int Extension { get; set; }

    public int ProductStatus { get; set; }
}