// lib/constants.ts
import React, { useState, useEffect, useRef } from 'react';

import {
	HiOutlineViewGrid,
	HiOutlineCube,
	HiOutlineQuestionMarkCircle,
	HiOutlineCog,
} from 'react-icons/hi';

export interface LinkType {
	key: string;
	label: string;
	path?: string;
	icon: JSX.Element;
	subLinks?: { key: string; label: string; path: string }[];
}

export const DASHBOARD_SIDEBAR_LINKS: LinkType[] = [
	{
		key: 'dashboard',
		label: 'Trang chủ',
		path: '/',
		icon: <HiOutlineViewGrid />
	},
	{
		key: 'products',
		label: 'Đăng kí',
		path: '',
		icon: <HiOutlineCube />,
		subLinks: [
			{
				key: 'listProducts',
				label: 'Hoãn thi',
				path: '/admin/hoanthi',
			},
			{
				key: 'gridProducts',
				label: 'Vắng thi',
				path: '/admin/vangthi',
			},
		]
	},
	{
		key: 'hoanthiVangThi',
		label: 'Đăng kí hoãn thi, vắng thi',
		path: '/admin/hoanthi-vangthi',
		icon: <HiOutlineViewGrid />
	},
];

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
