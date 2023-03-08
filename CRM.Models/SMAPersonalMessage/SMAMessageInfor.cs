using System;

namespace CRM.Models.SMAPersonalMessage
{
    public class SMAMessageInfor
    {
        public int Id { get; set; }
        public DateTime CreatedDate { get; set; }
        public int MessageId { get; set; }
        public string Creator { get; set; }
        public string Title { get; set; }
        public string Username { get; set; }
        public string Content { get; set; }
    }
}
