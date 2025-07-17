import { ComponentType, SVGProps } from 'react';

interface SidebarLinkProps {
  text: string;
  Icon: ComponentType<SVGProps<SVGSVGElement>>;
  active?: boolean;
}

function SidebarLink({text, Icon, active}: SidebarLinkProps) {
  return (
    <div className={`text-[#eff3f4] flex items-center justify-center xl:justify-start text-xl xl:space-x-3 xl:w-fit hoverAnimation ${active && "font-bold"}`}>
        <Icon className="h-7"/>
        <span className="hidden xl:inline xl:ml-1.5 xl:mr-3.5">{text}</span>
    </div>
  )
}

export default SidebarLink
