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
    public class SendMailController : ControllerBase
    {
        private IHttpContextAccessor _accessor;
        private ILoggerService _loggerService;
        
        public SendMailController(ILoggerService loggerService, IHttpContextAccessor accessor){
            this._loggerService = loggerService;
            this._accessor = accessor;
        }
        
        [HttpPost]
        [Route("SendFeedBack")]
        public void SendFeedBack([FromBody]UserLetter userLetter){
            //TODO - make sending email...
            var reqInfo = new RequestInfo(){
                ClientIPAddress = HttpContext.Connection.RemoteIpAddress,
                Message = $"Name: {userLetter.name}, Email: {userLetter.email}, comment: {userLetter.comment}"
            };
            _loggerService.WriteBaseRequestInfo(reqInfo);
        }
    }
}