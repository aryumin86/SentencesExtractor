namespace ssentencesExtractorApi.Entities
{
    public class WordForm
    {
        public int Id {get; set;}
        public int MainFormId {get; set;}
        public bool IsMainForm {get; set;}
        public string Raw {get; set;}
    }
}