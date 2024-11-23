import "./MyProfile.css";

import { useQuery } from "@apollo/client";
import { GET_USER_PROFILE } from "../utils/queries";

function MyProfile() {
  const { loading, error, data } = useQuery(GET_USER_PROFILE);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error! {error.message}</p>;

  // this fetches from query GET USER PROFILE
  const profile = data?.getUserProfile;

  return (
    <div>
      <h1>My Profile</h1>
      {profile ? (
        <div>
          <h2>{profile.username}</h2>
          <img src={profile.avatar || "/default-avatar.png"} alt="Avatar" />
          <p>{profile.bio || "No bio available"}</p>
        </div>
      ) : (
        <p>No profile data found.</p>
      )}
    </div>
  );
}

export default MyProfile;
