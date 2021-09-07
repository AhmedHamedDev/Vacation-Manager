using System;
using System.Collections.Generic;
using System.Text;

namespace Utilities.Contracts
{
    public interface IJwt
    {
        string GenerateToken(int userId);
        bool ValidateCurrentToken(string token);
        string GetId(string token);
    }
}
