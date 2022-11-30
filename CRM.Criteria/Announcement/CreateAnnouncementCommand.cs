
namespace CRM.Criteria.Announcement
{
    using System.Collections;
    using System.Collections.Generic;
    using Microsoft.AspNetCore.Http;
    public class CreateAnnouncementCommand
    {
        public IList<IFormFile> FormFile { get; set; } = new List<IFormFile>();
    }
}
