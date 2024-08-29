using System.ComponentModel.DataAnnotations;

namespace Learn.Azure.MicrosoftEntra.Identity.Service.Contracts
{
    public class AccountProfile
    {
        public Guid ObjectId { get; set; }
        [Required]
        public required string DisplayName { get; set; }
        [Required]
        public required string FirstName { get; set; }
        [Required]
        public required string LastName { get; set; }
        [Required, EmailAddress]
        public required string Email { get; set; }
    }
}
