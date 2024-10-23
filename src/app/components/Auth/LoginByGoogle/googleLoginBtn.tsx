

import { signIn } from "next-auth/react"
import { Image } from '@chakra-ui/react'





export default function GoogleLoginBtn() {
    return (
        <div className="flex flex-row  justify-center pb-4">
            <button className=" w-auto text-sm flex mx-5 rounded-lg border" onClick={() => { signIn('google', { callbackUrl: "/dashboard" }) }}>
                <Image className="w-6 h-6 " src='/images/google.svg' alt="" />
            </button>

            <button className=" w-auto text-sm flex rounded-lg border" onClick={() => { signIn('google', { callbackUrl: "/dashboard" }) }}>
                <Image className="w-6 h-6 " src='/images/facebook.svg' alt="" />
            </button>
        </div>
    )
}