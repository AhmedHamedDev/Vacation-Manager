using System;
using System.Collections.Generic;
using System.IO;
using System.Text;
using Utilities.Contracts;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;

namespace Utilities.Handles
{
    public class Email : IEmail
    {
        private Contracts.IEmailSender _emailSender;
        private IConfiguration _configuration;
        public Email(Contracts.IEmailSender emailSender, IConfiguration configuration)
        {
            _emailSender = emailSender;
            _configuration = configuration;
        }
        public void SendRecoveryPasswordEmail(string ReseverEmail, int RecoveryCode, string CallBackUrl)
        {
            var pathToFile = _configuration.GetSection("EmailFilesPath:ForgetPassword").Value;

            string builder = string.Empty ;

            using (StreamReader SourceReader = System.IO.File.OpenText(pathToFile))
            {
                builder = SourceReader.ReadToEnd();
            }

            var subject = "Recover Password";

            string messageBody = string.Format(builder,
                 ReseverEmail,
                 RecoveryCode,
                 CallBackUrl
             );

            _emailSender.Send(ReseverEmail, subject, messageBody);
        }



        public void SendAccountActivationEmail(string ReseverEmail, string CallBackUrl)
        {
            var pathToFile = _configuration.GetSection("EmailFilesPath:ActivateAccount").Value;

            string builder = string.Empty;

            using (StreamReader SourceReader = System.IO.File.OpenText(pathToFile))
            {
                builder = SourceReader.ReadToEnd();
            }

            var subject = "Activate Account";

            string messageBody = string.Format(builder,
                 ReseverEmail,
                 CallBackUrl
             );

            _emailSender.Send(ReseverEmail, subject, messageBody);
        }
    }
}
