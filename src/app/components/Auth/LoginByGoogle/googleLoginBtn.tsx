

import { signIn } from "next-auth/react"
import { Image } from '@chakra-ui/react'





export default function GoogleLoginBtn() {
    return (
        <div className="flex flex-row  w-full justify-center pb-4 ">
            <button className=" w-full text-sm flex flex-row justify-center items-center mx-5 rounded-lg border-2 shadow-xl" onClick={() => { signIn('google', { callbackUrl: "/dashboard" }) }}>
                <Image className="w-6 h-6 " src='/images/google.svg' alt="" />
                Entrar com google
            </button>

           
        </div>
    )
}