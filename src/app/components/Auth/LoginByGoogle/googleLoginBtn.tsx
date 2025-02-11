

import { signIn } from "next-auth/react"
import { Image } from '@chakra-ui/react'





export default function GoogleLoginBtn() {
    return (
        <div className="flex flex-row  w-full justify-center pb-4  ">
            <button className=" w-full text-sm flex flex-row justify-center items-center rounded-lg border-2 shadow-xl" onClick={() => { signIn('google', { callbackUrl: "/dashboard" }) }}>
                <Image className="  h-6 " src='/images/google.svg' alt="" />
                <span>Entrar com google</span>
            </button>

           
        </div>
    )
}