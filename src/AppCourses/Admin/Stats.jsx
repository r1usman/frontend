import React from "react";

import DashboardSummaryCard from "./Components/DashboardSummaryCard";
import { LuArchive, LuChartLine, LuCheckCheck, LuHeart } from "react-icons/lu";
import { Archive } from "lucide-react";

const Stat = ({ totalLikes = 0, totalViews = 0  , numberofblogs}) => {

    return (
        <div className="flex flex-col gap-3">
            <DashboardSummaryCard
                icon={<LuChartLine />}
                label="Views"
                value={totalViews || 0}
                bgColor="bg-sky-100/60"
                color="text-sky-500"
                />

            <DashboardSummaryCard
                icon={<LuHeart />}
                label="Likes"
                value={totalLikes || 0}
                bgColor="bg-sky-100/60"
                color="text-sky-500"
                />
            <DashboardSummaryCard

                icon={<LuArchive />}
                label="Blogs"
                value={numberofblogs || 0}
                bgColor="bg-sky-100/60"
                color="text-sky-500"
            />
            

        </div>
    );
};

export default Stat;
