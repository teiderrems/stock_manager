namespace backend.Dto;

public class CreateUserDto
{
    public string? Username{get;set;}
    public string? Firstname{get;set;}
    public string? Lastname{get;set;}
    public string? Email{get;set;}

    public string? PhoneNumber{get;set;}

    public int PictureId{get;set;}
}