using System;
using System.Collections.Generic;
using System.Text;

namespace Utilities.Contracts
{
    public interface IEmailSender
    {
        void Send(string toAddress, string subject, string body);
    }
}
