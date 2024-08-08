namespace backend_aspnet_core.Contracts
{
	public class User
	{
		public required string DisplayName { get; set; }
		public required string FirstName { get; set; }
		public required string LastName { get; set; }
		public required string Email { get; set; }
		public required string Password { get; set; }
	}
}
