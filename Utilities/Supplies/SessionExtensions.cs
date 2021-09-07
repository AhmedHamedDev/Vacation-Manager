using System;
using System.Collections.Generic;
using System.Text;
using Newtonsoft.Json;
using Microsoft.AspNetCore.Http;

namespace Utilities.Supplies
{
    public static class SessionExtensions
    {
        public static T GetComplexData<T>(this ISession session, string key)
        {
            T data = session.GetComplexData<T>(key);
            if (data == null)
            {
                return default(T);
            }
            return data;
        }



        public static void SetComplexData(this ISession session, string key, object value)
        {
            session.SetComplexData(key, JsonConvert.SerializeObject(value, Formatting.None,
                        new JsonSerializerSettings()
                        {
                            ReferenceLoopHandling = ReferenceLoopHandling.Ignore
                        }));
        }
    }
}
