namespace Learn.Azure.MicrosoftEntra.Identity.Service.Contracts
{
    public class UserGet
    {
        public Guid ObjectId { get; set; }
        public string DisplayName { get; set; } = string.Empty;
        public string FirstName { get; set; } = string.Empty;
        public string LastName { get; set; } = string.Empty;
        public string Username { get; set; } = string.Empty;
        public bool IsEnabled { get; set; } = false;

        public UserGet() { }
        
        public UserGet(Microsoft.Graph.Models.User user)
        {
            ObjectId = Guid.Parse(user.Id!);
            DisplayName = user.DisplayName ?? string.Empty;
            FirstName = user.GivenName ?? string.Empty;
            LastName = user.Surname ?? string.Empty;
            Username = user.UserPrincipalName ?? string.Empty;
            IsEnabled = user.AccountEnabled ?? false;
        }
    }
}
