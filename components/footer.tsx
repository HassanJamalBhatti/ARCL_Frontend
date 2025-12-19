"use client";
import Image from "next/image";
import { CirclePlus } from 'lucide-react';
import { FaTwitter, FaFacebookF, FaYoutube } from "react-icons/fa";

export default function Footer() {
  const siteNavigationItems = [
    "Home",
    "About Us",
    "Activities",
    "Gallery",
    "NewsLetter",
    "Admissions"
  ];

  return (
    <div className='bg-[#260e58] pt-8 md:pt-12 w-full'>
      <div className='max-w-7xl mx-auto'>
        {/* Grid with equal spacing and center alignment */}
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 px-4 sm:px-6 lg:px-8 justify-items-center'>
          
          {/* Column 1 - Logo & Description */}
          <div className='max-w-[280px] pt-2'>
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
              Autism Resource Center lahore (ARCL) was established in 2015 as a Not for Profit Company
              under the Societies Registration Act 1860.
            </p>
          </div>

          {/* Column 2 - Quick Links */}
          <div className='max-w-[280px]'>
            <h2 className='flex items-center gap-x-1 text-white text-sm md:text-[15px] font-semibold mb-3 md:mb-4'>
              <CirclePlus className='w-4 md:w-5 text-orange-300 shrink-0' /> 
              <span>Quick Links</span>
            </h2>
            <ul className='text-xs md:text-sm text-gray-200 space-y-2 md:space-y-3 font-semibold list-disc pl-5'>
              {siteNavigationItems.map((item, index) => (
                <li key={index} className='hover:text-orange-300 transition-colors'>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3 - Contact Info */}
          <div className='max-w-[280px]'>
            <h2 className='flex items-center gap-x-1 text-white text-sm md:text-[15px] font-semibold mb-3 md:mb-4'>
              <CirclePlus className='w-4 md:w-5 text-orange-300 shrink-0' />
              Get In Touch
            </h2>

            <div className='text-xs md:text-sm text-gray-300 space-y-2 md:space-y-3 font-semibold'>
              <div className='flex flex-col'>
                <p>Address</p>    
                <p className='text-white text-xs'>74 C2 Sector A, Phase 1, Engineers Town, Lahore.</p>
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

          {/* Column 4 - Newsletter */}
          <div className='max-w-[280px]'>
            <h2 className='flex items-center gap-x-1 text-white text-sm md:text-[15px] font-semibold mb-3 md:mb-4'>
              <CirclePlus className='w-4 md:w-5 text-orange-300 shrink-0' /> 
              <span>Newsletter</span>
            </h2>
            <input 
              className="bg-white text-black w-full py-2 pl-2 rounded-sm text-sm border border-gray-300" 
              placeholder="Your Name" 
              required 
            />
            <input 
              className="bg-white text-black w-full py-2 pl-2 mt-3 rounded-sm text-sm border border-gray-300" 
              placeholder="Your Email" 
              type="email" 
              required 
            />
            <button 
              className="w-full bg-red-600 hover:bg-red-400 text-white py-2 mt-3 font-light text-sm rounded-sm cursor-pointer transition-colors"
            >
              Submit Now
            </button>
          </div>
        </div>

        {/* Bottom section - Copyright */}
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