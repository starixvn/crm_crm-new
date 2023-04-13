namespace CRM.Letstalk.Core.Models.Letstalk
{
    using CRM.Core.Enumerables;
    using Newtonsoft.Json;

    public class OutgoingMessage
    {
        [JsonIgnore]
        public NotificationMessageType MessageType { get; set; }

        [JsonProperty(PropertyName = "type")]
        public string Type
        {
            get
            {
                switch (MessageType)
                {
                    case NotificationMessageType.Text:
                        return MulticastType.Text;

                    case NotificationMessageType.Image:
                        return MulticastType.Image;

                    case NotificationMessageType.FullImage:
                        return MulticastType.FullImage;

                    case NotificationMessageType.Html:
                        return MulticastType.HTML;

                    default:
                        return MulticastType.Text;
                }
            }
        }

        [JsonProperty(PropertyName = "text")]
        public string Text { get; set; }

        [JsonProperty(PropertyName = "imageUrl")]
        public string ImageUrl { get; set; }
    }

    internal static class MulticastType
    {
        public const string Text = "text";
        public const string HTML = "html";
        public const string Image = "image";
        public const string FullImage = "fullimage";
    }
}