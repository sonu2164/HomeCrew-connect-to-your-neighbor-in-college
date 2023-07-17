import { useEffect, useRef } from 'react';
import { FaInstagram, FaTwitter, FaLinkedin, FaGithub } from 'react-icons/fa';


import user from '../public/user.png'
import techno from '../public/techno.png'
import chat from '../utils/chat.json';
import location from '../utils/location.json'
import Lottie from "lottie-react";
import Image from 'next/image';
import { router } from 'next/router';
import { useChatContext } from '@/context/chatContext';

import { useAuth } from '@/context/authContext';
import {
  deleteField,
  doc,
  getDoc,
  serverTimestamp,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { db } from "@/firebase/firebase";


  
const UserCard = ({ user }) => {
  const { users, dispatch } = useChatContext();
  // console.log("yaha se", users);
  const selectedUser=Object.values(users).filter((u)=> u.uid==user.uid)[0];
  // console.log("yahase", selectedUser);
  const {currentUser} =useAuth()
  

  
  const handleSelect = async (user) => {
    try {
        const combinedId =
            currentUser?.uid > user.uid
                ? currentUser?.uid + user.uid
                : user.uid + currentUser?.uid;
        const res = await getDoc(doc(db, "chats", combinedId));

        if (!res.exists()) {
            await setDoc(doc(db, "chats", combinedId), { messages: [] });

            const currentUserChatRef = await getDoc(
                doc(db, "userChats", currentUser.uid)
            );
            const userChatRef = await getDoc(
                doc(db, "userChats", user.uid)
            );

            if (!currentUserChatRef.exists()) {
                await setDoc(doc(db, "userChats", currentUser.uid), {});
            }
            await updateDoc(doc(db, "userChats", currentUser.uid), {
                [combinedId + ".userInfo"]: {
                    uid: user.uid,
                    displayName: user.displayName,
                    photoURL: user.photoURL || null,
                    color: user.color,
                },
                [combinedId + ".date"]: serverTimestamp(),
            });

            if (!userChatRef.exists()) {
                await setDoc(doc(db, "userChats", user.uid), {});
            }
            await updateDoc(doc(db, "userChats", user.uid), {
                [combinedId + ".userInfo"]: {
                    uid: currentUser.uid,
                    displayName: currentUser.displayName,
                    photoURL: currentUser.photoURL || null,
                    color: currentUser.color,
                },
                [combinedId + ".date"]: serverTimestamp(),
            });
        } else {
            await updateDoc(doc(db, "userChats", currentUser.uid), {
                [combinedId + ".chatDeleted"]: deleteField(),
            });
        }

        dispatch({ type: "CHANGE_USER", payload: user });
        router.push("/chats")
    } catch (error) {
        console.error(error);
    }
};


   
    return (
      <div className="flex justify-center items-center  ">
      <div className="bg-c2 text-white rounded-lg shadow-md p-6 relative">
        <div className="flex items-center mb-4">
          <Image
            src={selectedUser?.photoURL}
            alt="User"
            height={16}
            width={16}
            
            className="w-16 h-16 rounded-full mr-4"
          />
          <div>
            <h2 className="text-2xl font-bold text-center">{user.name}</h2>
           <div className='flex justify-between'>
            <p>{`${user.year}rd year`} </p>
            <p>{user.branch}</p>
           </div>
            <div className='flex justify-center items-center'>
            <Lottie animationData={location} className='w-10 '/>
            <p> {user.area} {user.distanceFromCurrentUser}km </p>

            </div>
          </div>
        </div>
        <div className="flex flex-col items-center mb-4">
          <div className="flex space-x-4 mb-4">
            <a
              href={"linkedin.com/"}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full bg-gradient-to-r from-purple-500 to-pink-500 p-2 hover:bg-gradient-to-r hover:from-pink-500 hover:to-purple-500 transition-all duration-300"
            >
              <FaInstagram className="text-white" />
            </a>
            <a
              href={"linkedin.com/"}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full bg-gradient-to-r from-purple-500 to-pink-500 p-2 hover:bg-gradient-to-r hover:from-pink-500 hover:to-purple-500 transition-all duration-300"
            >
              <FaTwitter className="text-white" />
            </a>
            <a
              href={"linkedin.com/"}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full bg-gradient-to-r from-purple-500 to-pink-500 p-2 hover:bg-gradient-to-r hover:from-pink-500 hover:to-purple-500 transition-all duration-300"
            >
              <FaLinkedin className="text-white" />
            </a>
            <a
              href={"linkedin.com/"}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full bg-gradient-to-r from-purple-500 to-pink-500 p-2 hover:bg-gradient-to-r hover:from-pink-500 hover:to-purple-500 transition-all duration-300"
            >
              <FaGithub className="text-white" />
            </a>
          </div>
          <div className='flex justify-end '>

          <div className="mb-4 w-1/2 flex flex-col justify-items-start items-start">
            <h3 className="text-lg font-bold mb-2 text-left">Clubs</h3>
            <ul className='flex flex-col gap-2'>
              {user?.clubs?.map((club, index) => (
                <li key={index} className="flex items-center">
                  <Image
                    src={`/../public/${club}.png`}
                    alt={club.name}
                    width={20}
                    height={20}
                    className="w-6 h-6 rounded-full mr-2"
                  />
                  <span>{club}</span>
                </li>
              ))}
            </ul>
          </div>
        <div className='w-1/2 flex justify-center gap-5 items-center flex-col'>
                
         
          <button className="bg-white rounded-full text-white py-2 px-4  shadow-md relative w-20" onClick={()=>handleSelect(selectedUser)}>
            <Lottie animationData={chat} />
          </button >
          <h2 className='text-2xl'>Start chat! <span className='text-3xl'>👋</span>  </h2>
        </div>
          </div>
        </div>
      </div>
      </div>
   
    );
  };

  export default UserCard
  