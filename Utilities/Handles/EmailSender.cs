using Independentsoft.Exchange;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Net;
using System.Text;
using System.Threading;
using Utilities.Contracts;

namespace Utilities.Handles
{
    public class EmailSender : IEmailSender
    {
        private string _exchangeWebService;
        private string _fromAddress;
        private string _username;
        private string _password;
        private string _domain;

        public EmailSender(IConfiguration configuration) // configuration is automatically added to DI in ASP.NET Core 3.0
        {
            _exchangeWebService = configuration["Email:ExchangeWebService"];
            _fromAddress = configuration["Email:FromAddress"];
            _username = configuration["Email:Username"];
            _password = configuration["Email:Password"];
            _domain = configuration["Email:Domain"];
        }

        public void Send(string toAddress, string subject, string body)
        {
            try
            {
                NetworkCredential credential = new NetworkCredential(_username, _password, _domain);
                Service service = new Service(_exchangeWebService, credential);
                service.RequestServerVersion = RequestServerVersion.Exchange2007SP1;

                Message message = new Message();
                message.Subject = subject;
                message.Body = new Body(body, BodyType.Text);
                message.From = new Mailbox(_fromAddress);
                message.ToRecipients.Add(new Mailbox(toAddress));

                service.Send(message);
            }
            catch (Exception e)
            {

            }
        }
    }
}
