// lib/constants.ts
import React, { useState, useEffect, useRef } from 'react';
import { HiOutlineViewGrid, HiOutlineIdentification, HiOutlineCog, HiOutlineQuestionMarkCircle, HiOutlineCube } from 'react-icons/hi';


export interface LinkType {
	key: string;
	label: string;
	path?: string;
	icon: JSX.Element;
	subLinks?: { key: string; label: string; path: string }[];
}


export const DASHBOARD_SIDEBAR_LINKS: { [key: string]: LinkType[] } = {
	student: [
		{
			key: 'sv_dashboard',
			label: 'Trang chủ Sinh Viên',
			path: '/sinhvien/dashboard',
			icon: <HiOutlineViewGrid />
		},
		{
			key: 'sv_register',
			label: 'Đăng kí',
			path: '',
			icon: <HiOutlineCube />,
			subLinks: [
				{
					key: 'sv_register_hoanthi',
					label: 'Vắng thi',
					path: '/sinhvien/dashboard/vangthi',
				},
				{
					key: 'sv_register_vangthi',
					label: 'Hoãn thi',
					path: '/sinhvien/dashboard/hoanthi',
				},
			]
		}
	],
	faculty: [
		{
			key: 'k_dashboard',
			label: 'Trang chủ Khoa',
			path: '/khoa/dashboard',
			icon: <HiOutlineViewGrid />
		},
		{
			key: 'k_notification',
			label: 'Thông báo',
			path: '/khoa/dashboard/notification',
			icon: <HiOutlineIdentification />,
		}
	],
	examDept: [
		{
			key: 'kt_dashboard',
			label: 'Trang chủ Khảo Thí',
			path: '/khaothi/dashboard',
			icon: <HiOutlineViewGrid />
		},
		{
			key: 'kt_notification',
			label: 'Thông báo',
			path: '/khaothi/dashboard/notification',
			icon: <HiOutlineIdentification />,
		}
	]
};

export const DASHBOARD_SIDEBAR_BOTTOM_LINKS: LinkType[] = [
	{
		key: 'settings',
		label: 'Cài đặt',
		path: '/settings',
		icon: <HiOutlineCog />
	},
	{
		key: 'support',
		label: 'Giúp đỡ & Hỗ trợ',
		path: '/support',
		icon: <HiOutlineQuestionMarkCircle />
	}

];
