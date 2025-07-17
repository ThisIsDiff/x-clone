import React from 'react'
import Image from "next/image";
import SidebarLink from './SidebarLink';
import { HomeIcon } from '@heroicons/react/24/solid';
import { 
  MagnifyingGlassIcon, 
  BellIcon, 
  EnvelopeIcon, 
  BookmarkIcon, 
  ClipboardDocumentListIcon, 
  UserIcon, 
  EllipsisHorizontalCircleIcon,
  EllipsisHorizontalIcon
} from '@heroicons/react/24/outline';


function Sidebar() {
  return (
    <div className="hidden sm:flex flex-col items-center xl:items-start xl:w-[340px] p-2 fixed h-full">
      <div className="flex items-center justify-center w-14 h-14 hoverAnimation p-0 xl:ml-26 ">
        <Image src="/assets/logo.svg" alt="Sidebar logo" width={30} height={30} />
      </div>
      <div className="space-y-2.5 mt-4 mb-2.5 xl:ml-24">
        <SidebarLink text="Home" Icon={HomeIcon} active={true} />
        <SidebarLink text="Explore" Icon={MagnifyingGlassIcon} active={false} />
        <SidebarLink text="Notifications" Icon={BellIcon} active={false} />
        <SidebarLink text="Messages" Icon={EnvelopeIcon} active={false} />
        <SidebarLink text="Bookmarks" Icon={BookmarkIcon} active={false} />
        <SidebarLink text="Lists" Icon={ClipboardDocumentListIcon} active={false} />
        <SidebarLink text="Profile" Icon={UserIcon} active={false} />
        <SidebarLink text="More" Icon={EllipsisHorizontalCircleIcon} active={false} />
      </div>
      <button className="hidden xl:inline ml-auto bg-[#eff3f4] text-black rounded-full w-56 h-[52px] text-lg font-bold shadow-md hover:bg-[#e1e8ed] mt-5 hoverAnimation">Post</button>
      <div className="text-[#e7e9ea] flex items-center justify-center hoverAnimation xl:ml-24 xl:mr-auto mt-auto xl:justify-start text-xl xl:space-x-3">
        <img 
          src="https://pbs.twimg.com/media/Gv24x4XWwAE-iVS?format=jpg&name=900x900" 
          alt="Profile image" 
          className="h-10 w-10 rounded-full xl:mr-2.5"/>
        <div className="hidden xl:inline leading-5">
          <h4 className="font-bold">x-user</h4>
          <p className="text-[#6e767d]">@x-user</p>
        </div>
        <EllipsisHorizontalIcon className="h-5 hidden xl:inline ml-10" />
      </div>
    </div>
  )
}

export default Sidebar