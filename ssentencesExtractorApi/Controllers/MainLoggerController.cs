using Microsoft.AspNetCore.Mvc;
using System;
using log4net;
using log4net.Core;
using ssentencesExtractorApi.Entities;
using Microsoft.AspNetCore.Http;

namespace ssentencesExtractorApi.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class MainLoggerController : ControllerBase
    {
        private IHttpContextAccessor _accessor;
        private ILoggerService _loggerService;

        public MainLoggerController(ILoggerService loggerService, IHttpContextAccessor accessor){
            this._loggerService = loggerService;
            this._accessor = accessor;
        }
        
        [HttpPost]
        [Route("WriteBaseRequestInfo")]
        public void WriteBaseRequestInfo(string info){
            var reqInfo = new RequestInfo(){
                ClientIPAddress = HttpContext.Connection.RemoteIpAddress,
                Message = info
            };
            _loggerService.WriteBaseRequestInfo(reqInfo);
        }
    }
}