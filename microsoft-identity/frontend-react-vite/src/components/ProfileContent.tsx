import { TokenPayload } from "../contexts/AuthProvider";

const ProfileContent: React.FC<{ profile: TokenPayload }> = ({ profile }) => {
  return (
    <div id="profile-div">
      <p><strong>Name: </strong>{profile.name}</p>
      <p><strong>Email: </strong>{profile.email}</p>
    </div>
  );
}

export default ProfileContent;