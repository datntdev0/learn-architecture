namespace Learn.Azure.MicrosoftEntra.Identity.Service.Contracts
{
    public class AccountProfile
    {
        public Guid ObjectId { get; set; }
        public required string DisplayName { get; set; }
        public required string FirstName { get; set; }
        public required string LastName { get; set; }
        public required string Email { get; set; }
    }
}
