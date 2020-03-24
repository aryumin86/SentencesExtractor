using System.Collections.Generic;
using ssentencesExtractorApi.Entities;

namespace ssentencesExtractorApi.Repos
{
    public interface ILingvRepo
    {
        public IEnumerable<WordForm> GetWordForms(string wordForm);
        public IEnumerable<WordForm> GetWordForms(int wordFormId);
        public WordForm GetMainForm(string wordForm);
        public WordForm GetMainForm(int formId);
    }
}