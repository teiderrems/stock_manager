namespace backend.Dto
{
    public class CustomResponseBody(bool s, string[] error)
    {
        public bool Succeeded {  get; set; }=s;
        public string[] Error { get; set; } = error;
    }
}
