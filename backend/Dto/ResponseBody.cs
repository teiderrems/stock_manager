namespace backend.Dto
{
    public class ResponseBody(bool s, string[] error)
    {
        public bool Succeded {  get; set; }=s;
        public string[] Error { get; set; } = error;
    }
}
