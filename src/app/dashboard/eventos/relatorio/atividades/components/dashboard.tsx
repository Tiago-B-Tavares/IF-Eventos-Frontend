"use client";
import ActivityParticipationChart from "@/app/components/charts/ActivityParticipation";
import EventChart from "@/app/components/charts/BarChart";
import CheckInsRateChart from "@/app/components/charts/CheckInsRateChart";
import CheckInChart from "@/app/components/charts/chsckinAtividade";

import GenderDistributionChart from "@/app/components/charts/genderDistribuition";

import React from "react";

export  function DashboardAtividades() {
    
  



    return (
        <div className="w-full flex flex-col gap-5">
           
                
            <div className="w-full grid grid-cols-2 justify-evenly gap-5">
                <CheckInChart  data={[]}/>
               <GenderDistributionChart/>
                {/* <ActivityParticipationChart data={data || []} /> */}
                <CheckInsRateChart/>
            </div>
        </div>
    )
}