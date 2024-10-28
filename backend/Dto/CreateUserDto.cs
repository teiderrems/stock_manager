namespace backend.Dto;

public class CreateUserDto
{
    public string? Firstname{get;set;}
    public string? Lastname{get;set;}
    public string? Email{get;set;}
    public List<int>? Roles{get;set;}

    public string? PhoneNumber{get;set;}

    public int PictureId{get;set;}


    public override string ToString()
    {
        return $"{this.Firstname}--{this.Lastname}--{this.Email}--{this.PhoneNumber}--{this.PictureId}";
    }
}