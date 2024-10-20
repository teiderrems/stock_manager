namespace backend.Dto
{
    public class UserDto(int id, string? username,
        string? firstname, string? lastname, string? email, string? profile,
        DateTime? createdAt, DateTime? updatedAt, List<string>? roles, string? phoneNumber)
    {
        public int Id { get; set; } = id;

        public string? Username { get; set; } = username;

        public string? Firstname { get; set; } = firstname;
        public string? Lastname { get; set; } = lastname;

        public string? Email { get; set; } = email;

        public string? Profile { get; set; } = profile;

        public DateTime? CreatedAt { get; set; } = createdAt;

        public DateTime? UpdatedAt { get; set; } = updatedAt;

        public List<string>? Roles { get; set; } = roles;

        public string? PhoneNumber { get; set; } = phoneNumber;
    }
}
