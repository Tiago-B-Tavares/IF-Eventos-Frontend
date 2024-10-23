
"use client"

import { Card, CardHeader, Heading, CardBody, CardFooter, Button } from "@chakra-ui/react";
import { useSession } from "next-auth/react";


export default function Dashboard() {

    const { data: session } = useSession();

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 w-full  mt-2">
           
        </div>

    )
}