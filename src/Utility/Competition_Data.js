import {
    LuLayoutDashboard,
    LuUsers,
    LuClipboardCheck,
    LuSquarePlus,
    LuLogOut,
    LuHouse,
    LuCreativeCommons,
    LuBuilding,
    LuCreditCard,
    LuNewspaper,
} from "react-icons/lu";
import { FaTrophy } from "react-icons/fa"
import { LucideBarChart2, LucideHome } from "lucide-react";

import P1 from "../CodeCompetition/Layouts/Instructor/Icons/I1.svg"
import P2 from "../CodeCompetition/Layouts/Instructor/Icons/I2.svg"
import P3 from "../CodeCompetition/Layouts/Instructor/Icons/I3.svg"
import P4 from "../CodeCompetition/Layouts/Instructor/Icons/I4.svg"

export const SIDE_MENU_DATA = [
    {
        id: "01",
        label: "Home",
        icon: LuHouse,
        path: "/Instructor/Dashboard",
    },
    {
        id: "01",
        label: "Dashboard",
        icon: LuLayoutDashboard,
        path: "/Instructor/Competition/Dashboard",
    },
    {
        id: "05",
        label: "Create Challenge",
        icon: LuNewspaper,
        path: "/Instructor/Competition/Create",
    },

    {
        id: "02",
        label: "Manage Tasks",
        icon: LuClipboardCheck,
        path: "/Instructor/Competition/Manage",
    },
    {
        id: "03",
        label: "Leader Board",
        icon: LucideBarChart2,
        path: "/Instructor/Competition/Leaderboard",
    },

    {
        id: "04",
        label: "Logout",
        icon: LuLogOut,
        path: "logout",
    },
];

export const SIDE_MENU_DATA_User = [
    {
        id: "01",
        label: "Home",
        icon: LuHouse,
        path: "/Student/Dashboard",
    },
    {
        id: "01",
        label: "Dashboard",
        icon: LuLayoutDashboard,
        path: "/Student/Competition/Dashboard",
    },
    {
        id: "02",
        label: "My Performance",
        icon: LuClipboardCheck,
        path: "/Student/Competition/Performance",
    },
    {
        id: "03",
        label: "LeaderBoard ",
        icon: LucideBarChart2,
        path: "/Student/Competition/Leaderboard",
    },
    {
        id: "03",
        label: "Logout",
        icon: LuLogOut,
        path: "logout",
    },

];

export const LanguageIcons = [
    {
        label: "C",
        icons: P1,
    },
    {
        label: "C++",
        icons: P2,
    },
    {
        label: "Java",
        icons: P3,
    }
    ,
    {
        label: "Python",
        icons: P4,
    }


]

export const PRIORITY_DATA = [
    { label: "Low", value: "Low" },
    { label: "Medium", value: "Medium" },
    { label: "High", value: "High" },
];

export const STATUS_DATA = [
    { label: "Pending", value: "Pending" },
    { label: "In Progress", value: "In Progress" },
    { label: "Completed", value: "Completed" },
];

export const addThousandsSeparator = (num) => {
    if (num == null || isNaN(num)) return "";
    const [integerPart, fractionalPart] = num.toString().split(".");
    const formattedInteger = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return fractionalPart
        ? `${formattedInteger}.${fractionalPart}`
        : formattedInteger;
};