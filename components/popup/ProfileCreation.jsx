import React, { useState } from "react";
import getLocations from "../../utils/api";
import { db } from "../../firebase/firebase";
import { useAuth } from '../../context/authContext';
import { doc, getDoc, setDoc } from "firebase/firestore";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PopupWrapper from './PopupWrapper'
import { FaGithub, FaInstagram, FaLinkedin, FaTwitch, FaTwitter } from "react-icons/fa";
import Image from "next/image";



import Club from "../Club";
import { clubs } from "@/utils/constants";

const ProfileCreation = () => {
  const { currentUser, setProfileCreation } = useAuth();
  const [zipcode, setZipcode] = useState("");
  const [location, setLocation] = useState("");
  const [socialMedia, setSocialMedia] = useState([{ platform: "", username: "" }]);
  const [rollNo, setRollNo] = useState("");
  const [yearOfStudy, setYearOfStudy] = useState("");
  const [branch, setBranch] = useState("");
  const [locations, setLocations] = useState([]);
  const [selectedClubs, setSelectedClubs] = useState([]);

  const handleClubClick = (id) => {
    const isSelected = selectedClubs.includes(id);
    if (isSelected) {
      const updatedClubs = selectedClubs.filter((i) => i !== id);
      setSelectedClubs(updatedClubs);
    } else {
      setSelectedClubs([...selectedClubs, id]);

    }

  };


  const fetchLocations = async () => {
    if (zipcode.length === 6) {
      const loc = await getLocations(zipcode);
      const parsedLoc = JSON.parse(loc);

      const uniqueObjectsArray = parsedLoc.reduce((accumulator, currentObject) => {
        const isDuplicate = accumulator.some(obj => obj.area === currentObject.area);
        if (!isDuplicate) {
          accumulator.push(currentObject);
        }
        return accumulator;
      }, []);
      setLocations(uniqueObjectsArray);
    }
  };

  const handleZipcodeChange = (e) => {
    setZipcode(e.target.value);
  };

  const handleLocationChange = (e) => {
    setLocation(e.target.value);
  };

  const handleSocialMediaChange = (index, field, value) => {
    const updatedSocialMedia = [...socialMedia];
    updatedSocialMedia[index][field] = value;
    setSocialMedia(updatedSocialMedia);
    console.log(socialMedia);
  };

  const handleAddSocialMedia = () => {
    setSocialMedia([...socialMedia, { platform: "", username: "" }]);
  };

  const handleRollNoChange = (e) => {
    setRollNo(e.target.value);
  };

  const handleYearOfStudyChange = (e) => {
    setYearOfStudy(e.target.value);
  };

  const handleBranchChange = (e) => {
    setBranch(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let locDetails;
    if (zipcode && location) {
      locDetails = locations.filter((item) => item.area === location)[0];
    }

    try {
      await toast.promise(
        setDoc(doc(db, "locations", currentUser.uid), {
          uid: currentUser.uid,
          name: currentUser.displayName,

          area: location,
          yearOfStudy,
          branch,
          socialMedia,
          clubs: selectedClubs,
          lat: locDetails.lat,
          lng: locDetails.lng,
        }),
        {
          pending: "Updating profile.",
          success: "Profile updated successfully.",
          error: "Profile update failed.",
        }
      );

      const userDoc = await getDoc(doc(db, "locations", currentUser.uid));
      setProfileCreation(userDoc.data());
      console.log(ProfileCreation);
    } catch (error) {
      console.error(error);
    } finally {
      setZipcode("");
      setLocation("");
      setSocialMedia([{ platform: "", username: "" }]);
      setRollNo("");
      setYearOfStudy("");
      setBranch("");
    }
  };

  return (
    <PopupWrapper>
      <ToastContainer />
      <div>

        <form onSubmit={handleSubmit}>
          <div className="flex gap-2">
            <div className="w-1/2">
              <label htmlFor="zipcode" className="text-white/70">Zip Code</label>
              <input

                type="text"
                placeholder="Enter zip code"
                id="zipcode"
                required
                name="zipcode"
                onChange={handleZipcodeChange}
                className="w-full px-3 py-2 bg-c1 rounded focus:outline-none focus:bg-gray-600"

              />

            </div>
            <div className="w-1/2">
              <label htmlFor="location" className="block font-medium text-white/70">

                Location
              </label>
              <select
                id="location"
                name="location"
                value={location}
                onChange={handleLocationChange}
                onClick={fetchLocations}
                className="w-full px-3 py-2 bg-c1 rounded focus:outline-none focus:bg-gray-600"
              >
                <option value="" className="text-white/70">Select a location...</option>
                {locations &&
                  locations.map((loc) => (
                    <option key={loc.area} value={loc.area} className="w-full px-3 py-2 bg-gray-700 rounded focus:outline-none focus:bg-gray-600">
                      {loc.area}
                    </option>
                  ))}
              </select>
            </div>
          </div>
          <div className="flex gap-2">

            <div>
              <label htmlFor="yearOfStudy" className="block font-medium text-white/70">
                Year of Study
              </label>
              <input
                type="text"
                id="yearOfStudy"
                name="yearOfStudy"
                value={yearOfStudy}
                onChange={handleYearOfStudyChange}
                className="w-full px-3 py-2 bg-c1 rounded focus:outline-none focus:bg-gray-600"
              />
            </div >
            <div >
              <label htmlFor="branch" className="block font-medium text-white/70">
                Branch
              </label>
              <input
                type="text"
                id="branch"
                name="branch"
                value={branch}
                onChange={handleBranchChange}
                className="w-full px-3 py-2 bg-c1 rounded focus:outline-none focus:bg-gray-600"
              />
            </div>
          </div>
          <div className="flex gap-2">
            <div className="w-1/2" >
              <label className="block font-medium text-white/70">Social Media</label>
              {socialMedia.map((sm, index) => (
                <div key={index} className="flex mb-3 gap-2">
                  <select
                    onChange={(e) => handleSocialMediaChange(index, "platform", e.target.value)}
                    value={socialMedia[index].platform}
                    className="w-full px-3 py-2 bg-c1 rounded focus:outline-none focus:bg-gray-600"

                  >
                    <option>
                      Select Social media

                    </option>
                    <option>
                      Github

                    </option>
                    <option>

                      Linkedin

                    </option>
                    <option>
                      Instagram

                    </option>
                    <option>
                      Twitter

                    </option>
                  </select>

                  <input
                    type="text"
                    placeholder="Username"
                    value={sm.username}
                    onChange={(e) => handleSocialMediaChange(index, "username", e.target.value)}
                    className="w-full px-3 py-2 bg-c1 rounded focus:outline-none focus:bg-gray-600"
                  />
                </div>
              ))}
              <button type="button" onClick={handleAddSocialMedia} className=" px-3 py-2 bg-c1  focus:outline-none focus:bg-gray-600 rounded-full  ">
                Add
              </button>
            </div>
            <div className="w-1/2" >
              <label className="text-white/70">Clubs (Click on Icons)</label>
              <div className="grid grid-cols-4 gap-2">
                {clubs.map((club) => (
                  <Club
                    key={club.id}
                    club={club}
                    onClick={() => handleClubClick(club.name)}
                    className="h-20"

                  />
                ))}


              </div>
            </div>

          </div>
          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-indigo-500 text-white px-4 py-2 rounded hover:bg-indigo-600 transition-colors duration-300"
            >
              Submit
            </button>
            </div>
        </form>
      </div >
    </PopupWrapper >
    // <div className="fixed inset-0 z-50 flex items-center justify-center">
    // <div className="fixed inset-0 bg-black opacity-50"></div>
    // <div className="relative bg-gray-800 text-white w-96 p-8 rounded shadow-lg">
    //   <ToastContainer />
    //   <form onSubmit={handleSubmit} className="max-w-md mx-auto bg-white p-8 border border-gray-300 rounded shadow-sm">
    //   <h2 className="text-2xl font-bold mb-6">Profile Creation</h2>
    //       <div className="mb-6">
    //         <label htmlFor="zipcode" className="block font-medium text-gray-700">
    //           Zip Code
    //         </label>
    //         <input
    //           type="text"
    //           id="zipcode"
    //           name="zipcode"
    //           value={zipcode}
    //           onChange={handleZipcodeChange}
    //           className="w-full px-3 py-2 bg-gray-700 rounded focus:outline-none focus:bg-gray-600"
    //         />
    //       </div>
    //       <div className="mb-6">
    //         <label htmlFor="location" className="block font-medium text-gray-700">
    //           Location
    //         </label>
    //         <select
    //           id="location"
    //           name="location"
    //           value={location}
    //           onChange={handleLocationChange}
    //           onClick={fetchLocations}
    //           className="w-full px-3 py-2 bg-gray-700 rounded focus:outline-none focus:bg-gray-600"
    //         >
    //           <option value="">Select a location</option>
    //           {locations &&
    //             locations.map((loc) => (
    //               <option key={loc.area} value={loc.area} className="w-full px-3 py-2 bg-gray-700 rounded focus:outline-none focus:bg-gray-600">
    //                 {loc.area}
    //               </option>
    //             ))}
    //         </select>
    //       </div>
    //       <div className="mb-6">
    //         <label className="block font-medium text-gray-700">Social Media</label>
    //         {socialMedia.map((sm, index) => (
    //           <div key={index} className="flex mb-3 gap-2">
    //             <input
    //               type="text"
    //               placeholder="Platform"
    //               value={sm.platform}
    //               onChange={(e) => handleSocialMediaChange(index, "platform", e.target.value)}
    //               className="w-full px-3 py-2 bg-gray-700 rounded focus:outline-none focus:bg-gray-600"
    //             />
    //             <input
    //               type="text"
    //               placeholder="Username"
    //               value={sm.username}
    //               onChange={(e) => handleSocialMediaChange(index, "username", e.target.value)}
    //               className="w-full px-3 py-2 bg-gray-700 rounded focus:outline-none focus:bg-gray-600"
    //             />
    //           </div>
    //         ))}
    //         <button type="button" onClick={handleAddSocialMedia} className=" px-3 py-2 bg-gray-700  focus:outline-none focus:bg-gray-600 rounded-full  ">
    //           Add
    //         </button>
    //       </div>
    //       <div className="mb-6">
    //         <label htmlFor="rollNo" className="block font-medium text-gray-700">
    //           Roll No
    //         </label>
    //         <input
    //           type="text"
    //           id="rollNo"
    //           name="rollNo"
    //           value={rollNo}
    //           onChange={handleRollNoChange}
    //           className="w-full px-3 py-2 bg-gray-700 rounded focus:outline-none focus:bg-gray-600"
    //         />
    //       </div>
    //       <div className="mb-6">
    //         <label htmlFor="yearOfStudy" className="block font-medium text-gray-700">
    //           Year of Study
    //         </label>
    //         <input
    //           type="text"
    //           id="yearOfStudy"
    //           name="yearOfStudy"
    //           value={yearOfStudy}
    //           onChange={handleYearOfStudyChange}
    //           className="w-full px-3 py-2 bg-gray-700 rounded focus:outline-none focus:bg-gray-600"
    //         />
    //       </div>
    //       <div className="mb-6">
    //         <label htmlFor="branch" className="block font-medium text-gray-700">
    //           Branch
    //         </label>
    //         <input
    //           type="text"
    //           id="branch"
    //           name="branch"
    //           value={branch}
    //           onChange={handleBranchChange}
    //           className="w-full px-3 py-2 bg-gray-700 rounded focus:outline-none focus:bg-gray-600"
    //         />
    //       </div>
    //       <div className="flex justify-end">
    //         <button
    //           type="submit"
    //           className="bg-indigo-500 text-white px-4 py-2 rounded hover:bg-indigo-600 transition-colors duration-300"
    //         >
    //           Submit
    //         </button>
    //       </div>
    //     </form>
    // </div>
    // </div>


  );
};

export default ProfileCreation;


// import React from 'react';
// import dynamic from 'next/dynamic';

// const isBrowser = typeof window !== 'undefined';

// const DynamicAddressAutofill = dynamic(
//   () => import('@mapbox/search-js-react').then((module) => module.AddressAutofill),
//   { ssr: false }
// );

// function ProfileCreation() {
//   return isBrowser ? (
//     <form className="bg-black text-white p-4">
//       <DynamicAddressAutofill accessToken="pk.eyJ1Ijoic29udTIxNjQiLCJhIjoiY2xqY203c2ttMHFwYzNrcWhremVrcTRxZCJ9.ME2c1hGAGUpVVRiOu98aHw">
//         <input
//           name="address"
//           placeholder="Address"
//           type="text"
//           autoComplete="address-line1"
//           className="bg-transparent text-white placeholder-white outline-none focus:outline-none border-b border-white mb-4"
//         />
//       </DynamicAddressAutofill>
//       <input
//         name="apartment"
//         placeholder="Apartment number"
//         type="text"
//         autoComplete="address-line2"
//         className="bg-transparent text-white placeholder-white outline-none focus:outline-none border-b border-white mb-4"
//       />
//       <input
//         name="city"
//         placeholder="City"
//         type="text"
//         autoComplete="address-level2"
//         className="bg-transparent text-white placeholder-white outline-none focus:outline-none border-b border-white mb-4"
//       />
//       <input
//         name="state"
//         placeholder="State"
//         type="text"
//         autoComplete="address-level1"
//         className="bg-transparent text-white placeholder-white outline-none focus:outline-none border-b border-white mb-4"
//       />
//       <input
//         name="country"
//         placeholder="Country"
//         type="text"
//         autoComplete="country"
//         className="bg-transparent text-white placeholder-white outline-none focus:outline-none border-b border-white mb-4"
//       />
//       <input
//         name="postcode"
//         placeholder="Postcode"
//         type="text"
//         autoComplete="postal-code"
//         className="bg-transparent text-white placeholder-white outline-none focus:outline-none border-b border-white mb-4"
//       />
//     </form>
//   ) : null;
// }

// export default ProfileCreation;
