using System.IO;
using System.Net;
using System.Reflection;
using System.Xml;
using log4net;
using log4net.Core;
using log4net.Repository;
using ssentencesExtractorApi.Entities;

namespace ssentencesExtractorApi
{
    public class LoggerService : ILoggerService
    {
        private static readonly ILog _log = log4net.LogManager.GetLogger(System.Reflection.MethodBase.GetCurrentMethod().DeclaringType);

        public LoggerService(){
            ILoggerRepository repository = log4net.LogManager.GetRepository(Assembly.GetCallingAssembly());
            var fileInfo = new FileInfo(@"log4net.config");
            log4net.Config.XmlConfigurator.Configure(repository, fileInfo);
        }
        
        public void WriteBaseRequestInfo(RequestInfo recInfo)
        {
            string message = string.Empty;
            message = $"{recInfo.ClientIPAddress.ToString()}: {recInfo.Message}";
            _log.Info(message);
        }

        public void WriteRequestError(RequestInfo recInfo)
        {
            string message = string.Empty;
            message = $"{recInfo.ClientIPAddress.ToString()}: {recInfo.Message}";
            _log.Error(message);
        }
    }
}