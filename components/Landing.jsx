import React from 'react';
import { useEffect, useState } from 'react';
import chatss from '../public/chatss.png'
import Image from 'next/image';

const Landing = () => {

    return (
        <div className="bg-gray-900 text-white">

            <header className="py-16 px-8">
                <div className="container mx-auto text-center flex flex-col md:flex-row justify-center gap-5">

                    <div className='flex flex-col gap-5 justify-center items-center'>
                        <h1 className="text-3xl md:text-4xl font-bold mb-4 text-start">
                            Connect with College Students from Your Hometown 😊
                        </h1>
                        <p className="text-sm mb-8 text-left">
                            Join our platform to connect, chat, and share with students from
                            your hometown or nearby places. 😄
                        </p>
                    </div>
                    <Image
                        src={chatss} // Replace with your own screenshot
                        alt={"Chat App Screenshot"}
                        className=" mb-8 overflow-hidden"
                    />
                </div>
            </header>
            <section id="Features" className="py-16 px-8">
                <div className="container mx-auto">
                    <h2 className="mb-8 text-2xl font-bold ">Our Features:</h2>
                    <h4>Explore what you can do with Hometown Connect</h4>
                    <ul class="list-disc list-inside ml-7 mt-2">
                        <li className='flex flex-col'><span>&#x2B;</span>&nbsp;&nbsp;<strong>Connect with students</strong> <span>Find and connect with students from your hometown or nearby places.
                        </span></li>
                        <li className='flex flex-col'><span>&#x2B;</span>&nbsp;&nbsp;<strong>Chat</strong> <span>Start conversations, make new friends, and stay in touch.

                        </span></li>

                    </ul>

                </div>
            </section>

            <section id="about" className="py-16 px-8">
                <div className="container mx-auto">
                    <h2 className="text-2xl font-bold mb-8">About</h2>
                    <p>
                        Project to help students and freshers connect with students/seniors.
                    </p>
                </div>
            </section>
        </div>
    );
};

export default Landing;
