﻿using MimeKit;
using MailKit.Net.Smtp;

namespace backend.Dto
{
    public class Message
    {
        public List<MailboxAddress> To { get; set; }
        public string Subject { get; set; }
        public string Content { get; set; }

        public IFormFileCollection? Attachments { get; set; }

        public Message(IEnumerable<string> to, string subject, string content, IFormFileCollection? attachments)
        {
            To = new List<MailboxAddress>();

            To.AddRange(to.Select(x => new MailboxAddress("email",x)));
            Subject = subject;
            Content = content;
            Attachments = attachments;
        }
    }
}
