import React, { useState } from 'react';
import { AiOutlineCheck } from 'react-icons/ai';
import Image from 'next/image';
// import techno from '../public/techno.png';
// import  emr from '../public/emr.jpg'
// import  antariksh from '../public/antariksh.jpg'
// import  mad from '../public/mad.png'
// import  hlad from '../public/hlad.png'
// import  elad from '../public/elad.png'
// import  colors from '../public/colors.png'
// import  photog from '../public/photog.png'
import { useEffect } from 'react';


const Club = ({onClick, club }) => {
  const [clicked, setClicked] = useState(false);
  const [imageDimensions, setImageDimensions] = useState({ width: 0, height: 0 });

  const handleClick = () => {
    setClicked(!clicked);
    onClick();
  };
//   useEffect(() => {
//     const img = new Image();
//     img.src = techno.src;
//     img.onload = () => {
//       setImageDimensions({ width: img.width, height: img.height });
//     };
//   }, []);

  return (
    <div className={`w-10 rounded-md relative flex ${clicked ? 'border-white' : ''}`}>
      <div
        className={`absolute hover:bg-c2/50 w-full h-full flex justify-center items-center ${
          clicked ? 'bg-c2/50' : ''
        }`}
        onClick={handleClick}
      >
        {clicked && <AiOutlineCheck size={25} className="backdrop w-full h-full m-0 bg-c2/50" />}
      </div>
      <Image 
      src={`/../public/${club.name}.png`}
        alt={club.name}
        className="rounded-md"
        height={40}
        width={40}
        
      />
    </div>
  );
};

export default Club;
