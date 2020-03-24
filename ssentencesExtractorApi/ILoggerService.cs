using System.Net;
using ssentencesExtractorApi.Entities;

namespace ssentencesExtractorApi
{
    public interface ILoggerService
    {
         public void WriteBaseRequestInfo(RequestInfo recInfo);
         public void WriteRequestError(RequestInfo recInfo);
    }
}