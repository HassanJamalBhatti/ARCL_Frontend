"use client";
import Image from "next/image";
import { CirclePlus, ChevronRight } from 'lucide-react';
import { FaTwitter, FaFacebookF, FaYoutube } from "react-icons/fa";

export default function Footer() {
  const siteNavigationItems = [
    // "Services We Provide",
    // "Doctors List", 
    // "News & Updates",
    // "Book Appointment"
    "Home",
    "About Us",
    "Activities",
    "Gallery",
    "NewsLetter",
    "Admissions"

  ];

  const exploreMoreItems = [
    "Patients Stories",
    "Educational Support",
    "Contact Us",
    "ABA Therapy"
  ];

  return (
    <div className='bg-[#260e58] pt-8 md:pt-12 w-full'>
      <div className='max-w-7xl mx-auto'> {/* Added container for consistency */}
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 px-4 sm:px-6 lg:px-8'>
          
          {/* Autism care */}
          <div className='pt-2 flex flex-col'>
            <div className='flex items-center'>
              <Image
                src="/arcl_logo.jpg"   
                alt="Autism Resource Centre Lahore Logo"
                width={40}
                height={40}
                className="rounded-full object-contain"
                priority
              />
              <div className='ml-3'>
                <h1 className='text-white text-sm md:text-[18px] font-bold'>
                  Autism<span className='text-yellow-400'>Resource</span>
                </h1>
                <p className='text-gray-300 text-xs md:text-[13px] mt-1'>
                  Centre Lahore
                </p>
              </div>
            </div>

            <p className='text-gray-200 text-xs md:text-sm pt-4 md:pt-6 leading-relaxed'>
              Ut enim adminim venaim, quis nostr lorem ipsum. Excepteur sint occaeca mollit 
              anim id est laborum.
            </p>
          </div>

          {/* Site Navigation */}
          {/* <div>
            <h2 className='flex items-center gap-x-1 text-white text-sm md:text-[15px] font-semibold mb-3 md:mb-4'>
              <CirclePlus className='w-4 md:w-5 text-orange-300 shrink-0' /> 
              <span>Site Navigation</span>
            </h2>
            <ul className='text-xs md:text-sm text-gray-200 space-y-2 md:space-y-3 font-semibold list-disc ml-5'>
              {siteNavigationItems.map((item, index) => (
                <li key={index} className='hover:text-orange-300 transition-colors'>
                  {item}
                </li>
              ))}
            </ul>
          </div> */}
          <div>
            <h2 className='flex items-center gap-x-1 text-white text-sm md:text-[15px] font-semibold mb-3 md:mb-4'>
              <CirclePlus className='w-4 md:w-5 text-orange-300 shrink-0' /> 
              <span>Quick Links</span>
            </h2>
            <ul className='text-xs md:text-sm text-gray-200 lg:space-y-1.5 md:space-y-3 font-semibold list-disc'>
              {siteNavigationItems.map((item, index) => (
                <div key={index} className='hover:text-orange-300 transition-colors flex items-center'>
                  <ChevronRight />{item}
                </div>
              ))}
            </ul>
          </div>

          {/* Explore More */}
          {/* <div>
            <h2 className='flex items-center gap-x-1 text-white text-sm md:text-[15px] font-semibold mb-3 md:mb-4'>
              <CirclePlus className='w-4 md:w-5 text-orange-300 shrink-0' /> 
              <span>Explore More</span>
            </h2>
            <ul className='text-xs md:text-sm text-gray-300 space-y-2 md:space-y-3 font-semibold list-disc ml-5'>
              {exploreMoreItems.map((item, index) => (
                <li key={index} className='hover:text-orange-300 transition-colors'>
                  {item}
                </li>
              ))}
            </ul>
          </div> */}
          <div>
            <h2 className='flex items-center gap-x-1 text-white text-sm md:text-[15px] font-semibold'>
              <CirclePlus className='md:w-5 text-orange-300' />
              Get In Touch
            </h2>

            <div className='text-xs md:text-sm text-gray-300 lg:mt-3 md:mt-4 space-y-2 md:space-y-3 font-semibold'>
              <div className='flex flex-col'>
                <p>Address</p>    
                <p className='text-white'>74 C2 Sector A, Phase 1, Engineers Town,Lahore.</p>
              </div>
              <div className='flex flex-col'>
                <p>Email:</p>    
                <p className='text-white'>info@arcl.com</p>
              </div>
              <div className='flex flex-col'>
                <h1>Phone:</h1>
                <p className='text-white'>042-35248222</p>
                <p className='text-white'>0303-6655444</p>
                <p className='text-white'>0300-9575926</p>
              </div>
            </div>
          </div>

          {/* Information */}
          {/* <div>
            <h2 className='flex items-center gap-x-1 text-white text-sm md:text-[15px] font-semibold'>
              <CirclePlus className='w-4 md:w-5 text-orange-300' />
              Information
            </h2>

            <div className='text-xs md:text-sm text-gray-300 mt-3 md:mt-4 space-y-2 md:space-y-3 font-semibold'>
              <div className='flex flex-col'>
                <p>Contact No.</p>    
                <p className='text-white'>+123 456 7890</p>
              </div>
              <div className='flex flex-col'>
                <p>Email ID:</p>    
                <p className='text-white'>info@example.com</p>
              </div>
              <p>1870 Alpaca Way Irvine, CA 92614. United States</p>
            </div>
          </div> */}
          <div className="">
            <h2 className='flex items-center lg:gap-x-1 text-white text-sm md:text-[15px] font-semibold 
            lg:mb-3 md:mb-4'>
              <CirclePlus className='w-4 md:w-5 text-orange-300 shrink-0' /> 
              <span>Newsletter</span>
            </h2>
            <input className="bg-white text-black w-[240px] py-2 pl-2 rounded-sm text-sm" 
            placeholder="Your Name" required />
            <input className="bg-white text-black w-[240px] py-2 pl-2 mt-4 rounded-sm text-sm" 
            placeholder="Your Email" type="email" required />
            <button className="w-[240px] bg-red-700 hover:bg-red-400 text-white py-2 mt-4 font-light text-sm rounded-sm">Submit Now</button>
          </div>
        </div>

        {/* Bottom section */}
        <div className='mt-8 md:mt-12 py-4 md:py-6 text-white text-center bg-[#1b0a3e]'>
          <div className='max-w-7xl mx-auto px-4 sm:px-6'>
            <div className='flex flex-col md:flex-row justify-between items-center gap-4 text-sm'>
              <div>
                Copyright © 2025 -
                <span className='text-yellow-300'> Autism</span> -
                All Rights Reserved
              </div>

              <div className='flex items-center gap-x-3'>
                <span>Follow Us</span>
                <FaTwitter className='hover:text-blue-400 transition-colors cursor-pointer' />
                <FaFacebookF className='hover:text-blue-600 transition-colors cursor-pointer' />
                <FaYoutube className='hover:text-red-600 transition-colors cursor-pointer' />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}