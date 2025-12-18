"use client";
import Image from "next/image";
import React from 'react';
import { CirclePlus } from 'lucide-react';
import { FaTwitter, FaFacebookF, FaYoutube } from "react-icons/fa";


const Footer = () => {

  const siteNavigationItems = [
    "Services We Provide",
    "Doctors List", 
    "News & Updates",
    "Book Appointment"
  ];

  const exploreMoreItems = [
    "Patients Stories",
    "Educational Support",
    "Contact Us",
    "ABA Therapy"
  ];

  return (
    <div className='bg-[#260e58] pt-8 md:pt-12 flex flex-col  bottom-0 left-0 right-0'>
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 px-4 sm:px-6 lg:px-24'>
        
        {/* autism care */}
        <div className='pt-2 flex flex-col'>
          <div className='flex items-center'>
            <Image
                src="/arcl_logo.jpg"   
                alt="Autism Care Logo"
                width={40}
                height={40}
                className="lg:w-10 md:w-8 rounded-full object-contain"
                />
            <div className='lg:ml-0 md:ml-3 sm:leading-0'>
              <h1 className='text-white text-sm ml-3 md:text-[18px] font-bold'>
                Autism<span className='text-yellow-400'>Resource</span>
              </h1>
              <p className='text-gray-300 lg:text-[13px] ml-3 sm:text-[13px] md:text-[12px] mt-1'>
                Centre Lahore
              </p>
            </div>
          </div>

          <p className='text-gray-200 text-[12px] md:text-sm pt-4 md:pt-6 lg:ml-2.5 leading-relaxed'>
            Ut enim adminim venaim, quis nostr lorem ipsum. Excepteur sint occaeca mollit 
            anim id est laborum.
          </p>
        </div>

        {/* Site Nav */}
        <div>
          <h1 className='flex items-center gap-x-1 text-white text-sm md:text-[15px] font-semibold mb-3 md:mb-4'>
            <CirclePlus className='w-4 md:w-5 text-orange-300 shrink-0' /> 
            <span>Site Navigation</span>
          </h1>
          <ul className='text-xs md:text-sm text-gray-200 space-y-2 md:space-y-3 font-semibold list-disc lg:ml-5.5 md:ml-7 sm:ml-5'>
            {siteNavigationItems.map((item, index) => (
              <li key={index} className='hover:text-orange-300'>
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* Explore More */}
        <div>
          <h1 className='flex items-center gap-x-1 text-white text-sm md:text-[15px] font-semibold mb-3 md:mb-4'>
            <CirclePlus className='w-4 md:w-5 text-orange-300 shrink-0' /> 
            <span>Explore More</span>
          </h1>
          <ul className='text-xs md:text-sm text-gray-300 space-y-2 md:space-y-3 font-semibold list-disc lg:ml-5.5 md:ml-7 sm:ml-5'>
            {exploreMoreItems.map((item, index) => (
              <li key={index} className='hover:text-orange-300'>
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* Information */}
        <div>
          <h1 className='flex items-center gap-x-1 text-white text-sm md:text-[15px] font-semibold'>
            <CirclePlus className='w-4 md:w-5 text-orange-300' />
            Information
          </h1>

          <div className='text-xs md:text-sm text-gray-300 mt-3 md:mt-4 space-y-2 md:space-y-3 font-semibold'>
            <div className='flex flex-col sm:flex-row gap-4'>
              <p>Contact No.</p>    
              <p>+123 456 7890</p>
            </div>
            <div className='flex flex-col sm:flex-row gap-4'>
              <p>Email ID:</p>    
              <p>info@example.com</p>
            </div>
            <p>1870 Alpaca Way Irvine, CA 92614. United States</p>
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className='mt-8 md:mt-12 py-4 md:py-6 text-white text-center bg-[#1b0a3e] px-4 sm:px-6'>
        <div className='flex flex-col md:flex-row justify-between items-center gap-4 text-sm'>
          <div>
            Copyright © 2025 -
            <span className='text-yellow-300'> Austism</span> -
            All Rights Reserved
          </div>

          <div className='flex items-center gap-x-3'>
            <span>Follow Us</span>
            <FaTwitter />
            <FaFacebookF />
            <FaYoutube />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
