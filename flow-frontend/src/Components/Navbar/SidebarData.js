import React from 'react';
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import * as LuIcons from "react-icons/lu";
import * as SiIcons from "react-icons/si";
import * as PiIcons from "react-icons/pi";


export const SidebarData = [
    {
        title: 'Summary',
        path: "/",
        icon: <LuIcons.LuSparkles />,
        cName: 'nav-text'
    },
    {
        title: 'To-Do List',
        path: "/todo",
        icon: <FaIcons.FaHashtag />,
        cName: 'nav-text'
    },
    {
        title: 'Whiteboard',
        path: "/whiteboard",
        icon: <FaIcons.FaPencilAlt />,
        cName: 'nav-text'
    },
    {
        title: 'Calendar',
        path: "/calendar",
        icon: <LuIcons.LuCalendarCheck2 />,
        cName: 'nav-text'
    },
    {
        title: 'Progress',
        path: "/progress",
        icon: <AiIcons.AiOutlineLineChart />,
        cName: 'nav-text'
    },
    {
        title: 'Tools',
        path: "/tools",
        icon: <SiIcons.SiGraphql />,
        cName: 'nav-text'
    },
    {
        title: 'Settings',
        path: "/settings",
        icon: <PiIcons.PiGearBold />,
        cName: 'nav-text'
    }
]