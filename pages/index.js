// import { useEffect } from "react";

// import { useAuth } from "@/context/authContext";
// import { useRouter } from "next/router";

// import Chat from "@/components/Chat";
// import Sidebar from "@/components/Sidebar";
// import Loader from "@/components/Loader";
// import LeftNav from "@/components/LeftNav";
// import { useChatContext } from "@/context/chatContext";

// const Chat = () => {
//     const { currentUser, isLoading } = useAuth();
//     const router = useRouter();

//     const { data } = useChatContext();

//     useEffect(() => {
//         if (!isLoading && !currentUser) {
//             router.push("/login");
//         }
//     }, [currentUser, isLoading]);

//     return !currentUser ? (
//         <Loader />
//     ) : (
//         <div className="bg-c1 flex h-[100vh]">
//             <div className="flex w-full shrink-0">
//                 <LeftNav />
//                 <div className="flex bg-c2 grow">
//                     <Sidebar />
//                     {data.user && <Chat />}
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default Chat;
import Navbar from '@/components/Navbar'
import React from 'react'
import Landing from '@/components/Landing'

const Home = () => {
  return (
    <>
    <Navbar/>
    <div>
      <Landing/>
    </div>
    <div>Footer</div>
    </>
  )
}

export default Home
