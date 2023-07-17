import { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import distance from '../utils/distance'; // Assuming you have a distance calculation library or function
import { useAuth } from '../context/authContext';
import { db } from '../firebase/firebase';
import { onSnapshot, doc, collection, getDoc } from 'firebase/firestore';
import ProfileCreation from './popup/ProfileCreation';
import Loader from './Loader';
import UserCard from './UserCard';
import { useChatContext } from '@/context/chatContext';
import Navbar from './Navbar'

const user = {
  name: 'John Doe',
  location: 'New York',
  photo: '../assets/user.png',
  year: '2023',
  branch: 'Computer Science',
  socialMedia: {
    instagram: 'https://www.instagram.com/johndoe',
    twitter: 'https://twitter.com/johndoe',
    linkedin: 'https://www.linkedin.com/in/johndoe',
    github: 'https://github.com/johndoe',
  },
  clubs: [
    {
      name: 'Club A',
      image: '../assets/techno.png',
    },
    {
      name: 'Club B',
      image: '../assets/techno.png',
    },
  ],
};



const Neighbor = () => {

  const {
    chats,
    setChats,
    selectedChat,
    setSelectedChat,
    users,
    setUsers,
    data,
    dispatch,
    resetFooterStates,
} = useChatContext();

  const [toastMessage, setToastMessage] = useState('');
  const { currentUser, isLoading, profileCreation, setProfileCreation } = useAuth();
  const [userDistanceList, setUserDistanceList] = useState([]);
  const [showProfileCreation, setShowProfileCreation] = useState(false);
  const [locations, setLocations] = useState({});

  useEffect(() => {
    const fetchLocations = async () => {

      const dref=doc(db, "locations",currentUser.uid);
      const userLocation = await getDoc(dref);
      if (!userLocation.exists()) {
        setShowProfileCreation(true);
      } else {
        setProfileCreation(userLocation.data());
        setShowProfileCreation(false);
      }
    };
    if(currentUser)
    fetchLocations();
  }, [currentUser, profileCreation]);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "users"), (snapshot) => {
        const updatedUsers = {};
        snapshot.forEach((doc) => {
            updatedUsers[doc.id] = doc.data();
        });
        setUsers(updatedUsers);
       
    });
    return unsubscribe;
}, []);

  useEffect(() => {
    const unsub = onSnapshot(collection(db, "locations"), (snapshot) => {
      let locations = {};
      snapshot.forEach((doc) => {
        locations[doc.id] = doc.data();
      });
      setLocations(locations);
    });
    return unsub;
  }, []);

  useEffect(() => {
    if (!isLoading && currentUser && profileCreation) {
      let currentUserLatitude = profileCreation.lat;
      let currentUserLongitude = profileCreation.lng;

      const usersWithDistance = Object.keys(locations).map((userId) => {
        const user = locations[userId];
        const distanceFromCurrentUser = distance(
          currentUserLatitude,
          currentUserLongitude,
          user.lat,
          user.lng
        );

        return {
          uid:userId,
          distanceFromCurrentUser,
          name: user.name,
          area: user.area,
          year: user.yearOfStudy,
          socialMedia: user.socialMedia,
          clubs: user.clubs,
          branch: user.branch
        };
      });

      usersWithDistance.sort((a, b) => a.distanceFromCurrentUser - b.distanceFromCurrentUser);

      setUserDistanceList(usersWithDistance);
    }
  }, [currentUser, locations, isLoading]);

  return (
    <>
    <Navbar/>
      {isLoading || !currentUser ? (
        <Loader />
      ) : showProfileCreation ? (
        <ProfileCreation  />
      ) : (
        <div>
          
          
          <h2 className="text-xl font-bold mb-4 text-center my-5 shadow-sm">Here are your neighbors 🎊</h2>
          <div className='grid grid-cols-2 gap-3 md:grid-cols-4'>
          {userDistanceList.map((user) => (
            <UserCard key={user.userId} user={user} />
          ))}
          </div>
         {/* <div className='flex gap-2'>
         <UserCard user={user} />
      <UserCard user={user} /> 
      <UserCard user={user} /> 
         </div> */}
      
   
        </div>
      )}
    </>
  );
  
};

export default Neighbor;
