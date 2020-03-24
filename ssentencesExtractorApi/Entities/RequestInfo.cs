using System.Net;
using System;

namespace ssentencesExtractorApi.Entities
{
    public class RequestInfo
    {
        public IPAddress ClientIPAddress {get; set;}
        public DateTime When {get {
            return DateTime.Now;
        }}
        public string Message {get; set;}
    }
}