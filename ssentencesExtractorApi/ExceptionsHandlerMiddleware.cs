using System;
using System.Net;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Newtonsoft.Json;
using ssentencesExtractorApi.Entities;

namespace ssentencesExtractorApi
{
    public class ExceptionsHandlerMiddleware
    {
        private readonly RequestDelegate next;
        private static ILoggerService _loggerService;

        public ExceptionsHandlerMiddleware(RequestDelegate next,ILoggerService loggerService)
        {
            _loggerService = loggerService;
            this.next = next;
        }

        public async Task Invoke(HttpContext context)
        {
            try
            {
                await next(context);
            }
            catch (Exception ex)
            {
                await HandleExceptionAsync(context, ex);
            }
        }

        private static Task HandleExceptionAsync(HttpContext context, Exception ex)
        {
            var code = HttpStatusCode.InternalServerError;
            var recInfo = new RequestInfo(){
                ClientIPAddress = context.Connection.RemoteIpAddress,
                Message = ex.StackTrace
            };
            _loggerService.WriteRequestError(recInfo);
            var result = JsonConvert.SerializeObject(new { error = $"{code}: {ex.Message}", stackTrace = ex.StackTrace});
            context.Response.ContentType = "application/json";
            context.Response.StatusCode = (int)code;
            return context.Response.WriteAsync(result);
        }
    }
}