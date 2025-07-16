import React from 'react'
import Image from "next/image";
import SidebarLink from './SidebarLink';
import { HomeIcon } from '@heroicons/react/24/solid';
import { 
  MagnifyingGlassIcon, 
  BellIcon, 
  InboxIcon, 
  BookmarkIcon, 
  ClipboardDocumentListIcon, 
  UserIcon, 
  EllipsisHorizontalCircleIcon
} from '@heroicons/react/24/outline';


function Sidebar() {
  return (
    <div className="hidden sm:flex flex-col items-center xl:items-start xl:w-[340px] p-2 fixed h-full">
      <div className="flex items-center justify-center w-14 h-14 hoverAnimation p-0 xl:ml-24">
        <Image src="/assets/logo.svg" alt="Sidebar logo" width={30} height={30} />
      </div>
      <div className="space-y-2.5 mt-4 mb-2.5 xl:ml-24">
        <SidebarLink text="Home" Icon={HomeIcon} active={true} />
        <SidebarLink text="Explore" Icon={MagnifyingGlassIcon} active={false} />
        <SidebarLink text="Notifications" Icon={BellIcon} active={false} />
        <SidebarLink text="Messages" Icon={InboxIcon} active={false} />
        <SidebarLink text="Bookmarks" Icon={BookmarkIcon} active={false} />
        <SidebarLink text="Lists" Icon={ClipboardDocumentListIcon} active={false} />
        <SidebarLink text="Profile" Icon={UserIcon} active={false} />
        <SidebarLink text="More" Icon={EllipsisHorizontalCircleIcon} active={false} />
      </div>

    </div>
  )
}

export default Sidebar