namespace backend.Dto
{
    public class UserDto
    {
        public int Id { get; set; }

        public string? Username { get; set; }

        public string? Firstname { get; set; }
        public string? Lastname { get; set; }

        public string? Email { get; set; }

        public string? Profile {  get; set; }

        public DateTime? CreatedAt { get; set; }

        public DateTime? UpdatedAt { get;set; }

        public List<string>? Roles { get; set; }

        public string? PhoneNumber { get; set; }

        public UserDto(int id, string? username, 
            string? firstname, string? lastname, string? email, string? profile, 
            DateTime? createdAt, DateTime? updatedAt, List<string>? roles, string? phoneNumber)
        {
            Id = id;
            Username = username;
            Firstname = firstname;
            Lastname = lastname;
            Email = email;
            Profile = profile;
            CreatedAt = createdAt;
            UpdatedAt = updatedAt;
            Roles = roles;
            PhoneNumber = phoneNumber;
        }
    }
}
