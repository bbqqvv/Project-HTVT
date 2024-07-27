import React, { useState, useEffect, useRef } from 'react';
import classNames from 'classnames';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { HiChevronDown, HiChevronUp, HiOutlineMenu, HiOutlineX, HiOutlineLogout } from 'react-icons/hi';
import { DASHBOARD_SIDEBAR_LINKS, DASHBOARD_SIDEBAR_BOTTOM_LINKS, LinkType } from '../../lib/constants';

const linkClass = 'flex items-center gap-2 font-light px-3 py-2 hover:bg-neutral-700 hover:text-white hover:no-underline active:bg-neutral-600 rounded-sm text-base';

const Sidebar: React.FC = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const sidebarRef = useRef<HTMLDivElement>(null);
    const navigate = useNavigate();

    const handleLogout = () => {
        // Thực hiện các hành động logout ở đây (ví dụ: xóa token, gọi API logout, v.v.)

        // Điều hướng người dùng đến trang đăng nhập
        navigate('/logout');
    };

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    const handleClickOutside = (event: MouseEvent) => {
        if (sidebarRef.current && !sidebarRef.current.contains(event.target as Node)) {
            setIsSidebarOpen(false);
        }
    };

    useEffect(() => {
        if (isSidebarOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        } else {
            document.removeEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isSidebarOpen]);

    return (
        <>
            <div className="lg:hidden p-3">
                <button onClick={toggleSidebar} className="text-black">
                    {isSidebarOpen ? <HiOutlineX fontSize={24} /> : <HiOutlineMenu fontSize={24} />}
                </button>
            </div>
            <div
                ref={sidebarRef}
                className={classNames(
                    "z-50 bg-white p-3 flex flex-col fixed lg:static top-0 left-0 h-full lg:h-auto transition-transform transform lg:transform-none",
                    { "-translate-x-full": !isSidebarOpen, "translate-x-0": isSidebarOpen }
                )}
            >
                <div className="flex items-center gap-2 px-1 py-3">
                    <img className="size-16 h-auto" src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/1e/VKU_Verkehrsunfall_und_Fahrzeugtechnik_Logo.svg/531px-VKU_Verkehrsunfall_und_Fahrzeugtechnik_Logo.svg.png?20150911085140" alt="" />
                    <span className="font-semibold text-[0.8rem]">Xin chào,<p> BÙI QUỐC VĂN</p></span>
                </div>
                <div className="py-8 flex flex-1 flex-col gap-0.5">
                    {DASHBOARD_SIDEBAR_LINKS.map((link) => (
                        <SidebarLink key={link.key} link={link} />
                    ))}
                </div>
                <div className="flex flex-col gap-0.5 pt-2 border-t border-neutral-700">
                    {DASHBOARD_SIDEBAR_BOTTOM_LINKS.map((link) => (
                        <SidebarLink key={link.key} link={link} />
                    ))}
                    <div className={classNames(linkClass, 'cursor-pointer text-red-500')} onClick={handleLogout}>
                        <span className="text-xl">
                            <HiOutlineLogout />
                        </span>
                        Logout
                    </div>
                </div>
            </div>
        </>
    );
};

interface SidebarLinkProps {
    link: LinkType;
}

const SidebarLink: React.FC<SidebarLinkProps> = ({ link }) => {
    const { pathname } = useLocation();
    const [isOpen, setIsOpen] = useState(false);

    const handleDropdownToggle = () => {
        setIsOpen(!isOpen);
    };

    const hasSubLinks = link.subLinks && link.subLinks.length > 0;

    return (
        <div>
            <Link
                to={link.path || '#'}
                className={classNames(pathname === link.path ? 'bg-neutral-700 text-white' : 'text-black', linkClass)}
                onClick={hasSubLinks ? handleDropdownToggle : undefined}
            >
                <span className="text-xl">{link.icon}</span>
                {link.label}
                {hasSubLinks && (
                    <span className="ml-auto">
                        {isOpen ? <HiChevronUp /> : <HiChevronDown />}
                    </span>
                )}
            </Link>
            {isOpen && hasSubLinks && link.subLinks && (
                <div className="ml-4">
                    {link.subLinks.map((subLink) => (
                        <Link
                            key={subLink.key}
                            to={subLink.path}
                            className={classNames(pathname === subLink.path ? 'bg-neutral-700 text-white' : 'text-black', linkClass)}
                        >
                            {subLink.label}
                        </Link>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Sidebar;