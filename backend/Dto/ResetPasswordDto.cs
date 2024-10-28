namespace backend.Dto
{
    public class ResetPasswordDto
    {
        public required string Email {  get; set; }
        public required string NewPassword { get; set; }

        public required string ResetCode { get; set; }

    }
}
