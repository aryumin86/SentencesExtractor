using System;
using System.Collections.Generic;
using System.Web;
using Microsoft.AspNetCore.Mvc;
using ssentencesExtractorApi.Entities;
using ssentencesExtractorApi.Repos;

namespace ssentencesExtractorApi.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class LingvController : ControllerBase
    {
        private ILingvRepo _lingvRepo;
        private ILoggerService _loggerService;

        public LingvController(ILingvRepo lingvRepo, ILoggerService loggerService){
            _lingvRepo = lingvRepo;
            _loggerService = loggerService;
        }
        
        [Route("GetWordForms")]
        public IEnumerable<WordForm> GetWordForms(string wordForm){
            wordForm = HttpUtility.UrlDecode(wordForm);
            var reqInfo = new RequestInfo(){
                ClientIPAddress = HttpContext.Connection.RemoteIpAddress,
                Message = $"Word forms requested for word: '{wordForm}'"
            };
            _loggerService.WriteBaseRequestInfo(reqInfo);

            return _lingvRepo.GetWordForms(wordForm);
        }
        
        [Route("GetWordFormsById")]
        public IEnumerable<WordForm> GetWordFormsById(int wordFormId){
            var reqInfo = new RequestInfo(){
                ClientIPAddress = HttpContext.Connection.RemoteIpAddress,
                Message = $"Word forms requested for word id: '{wordFormId}'"
            };
            _loggerService.WriteBaseRequestInfo(reqInfo);

            return _lingvRepo.GetWordForms(wordFormId);
        }

        [Route("GetMainForm")]
        public WordForm GetMainForm(string wordForm){
            var reqInfo = new RequestInfo(){
                ClientIPAddress = HttpContext.Connection.RemoteIpAddress,
                Message = $"Main word form requested for word: '{wordForm}'"
            };
            _loggerService.WriteBaseRequestInfo(reqInfo);

            return _lingvRepo.GetMainForm(wordForm);
        }
        
        [Route("GetMainFormById")]
        public WordForm GetMainFormById(int formId){
            var reqInfo = new RequestInfo(){
                ClientIPAddress = HttpContext.Connection.RemoteIpAddress,
                Message = $"Main word form requested for word form id: '{formId}'"
            };
            _loggerService.WriteBaseRequestInfo(reqInfo);

            return _lingvRepo.GetMainForm(formId);
        }
    }
}