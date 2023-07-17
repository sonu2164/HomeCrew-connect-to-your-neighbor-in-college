import React, { useState, useEffect } from 'react';

import { useAuth } from '../context/authContext';
import { app, auth, db } from "../firebaseCon";
import { doc, getDoc } from "firebase/firestore";
import Loader from './Loader';

const Profile = () => {
  // const history = useHistory();
  // const [profile, setProfile] = useState(null);
  const { currentUser, isLoading } = useAuth();
 if(isLoading || !currentUser) return <Loader/>
  const handleEditProfile = () => {
    // history.push('/edit-profile');
  };

  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-white shadow">

      <div>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={handleEditProfile}
        >
          Edit Profile
        </button>
        <h2 className="text-2xl font-bold mb-4">User Profile</h2>
        <p className="mb-2 text-black">Welcome, {currentUser.displayName}!</p>
      </div>
    </div>

  );
};

export default Profile;