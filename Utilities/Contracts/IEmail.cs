using System;
using System.Collections.Generic;
using System.Text;

namespace Utilities.Contracts
{
    public interface IEmail
    {
        void SendRecoveryPasswordEmail(string ReseverEmail, int RecoveryCode, string CallBackUrl);
        void SendAccountActivationEmail(string ReseverEmail, string CallBackUrl);
    }
}
