"use client"


import { signIn } from "next-auth/react";
import { Input, Box, Divider, AbsoluteCenter, Heading, Text, Image } from '@chakra-ui/react'

import { Highlight } from '@chakra-ui/react'
import Link from "next/link";
import GoogleLoginBtn from "./components/Auth/LoginByGoogle/googleLoginBtn";

export default function Home() {

  async function login(e: React.FormEvent<HTMLFormElement>) {
    try {
      e.preventDefault()
      const formData = new FormData(e.currentTarget)

      let email = formData.get("email") as string;

      email = email.trim().toLowerCase();

      const password = formData.get("password")

      const data = {
        email: email,
        password: password
      }
      signIn("credentials", {
        ...data,
        callbackUrl: "/dashboard"
      })

    } catch (error) {

    }
  }




  return (
    <main className=" w-screen  h-screen flex flex-col items-center justify-center py-12 px-4">


      <div className='w-full lg:w-1/4 flex flex-col items-center justify-around gap-10 shadow-xl border rounded-xl'>
        <svg xmlns="http://www.w3.org/2000/svg" className="rounded-t-xl" viewBox="0 0 1440 320"><path fill="000000" fill-opacity="0.8" d="M0,192L24,181.3C48,171,96,149,144,144C192,139,240,149,288,138.7C336,128,384,96,432,101.3C480,107,528,149,576,176C624,203,672,213,720,224C768,235,816,245,864,224C912,203,960,149,1008,112C1056,75,1104,53,1152,85.3C1200,117,1248,203,1296,245.3C1344,288,1392,288,1416,288L1440,288L1440,0L1416,0C1392,0,1344,0,1296,0C1248,0,1200,0,1152,0C1104,0,1056,0,1008,0C960,0,912,0,864,0C816,0,768,0,720,0C672,0,624,0,576,0C528,0,480,0,432,0C384,0,336,0,288,0C240,0,192,0,144,0C96,0,48,0,24,0L0,0Z"></path></svg>
        <Heading as='h2' fontSize="4xl" className=" text-black flex-1 p-6">
          <Highlight query='login' styles={{ px: '2', py: '1', rounded: 'lg', bg: '#0c0b0b', color: '#fff' }}>
            Faça seu login
          </Highlight>
        </Heading>


        <form onSubmit={login} className='flex items-center flex-col gap-6 md:gap-10 md:px-10 sm:px-4 sm:w-full md:w-1/2 lg:w-full lg:px-10'>
          <Input
            type="email"
            placeholder="Email"
            _placeholder={{ color: 'black', opacity: 0.9 }}
            name="email"
            size="md"
            border={'none'}
            borderBottom={'2px solid black'}
            focusBorderColor='#000'

          />

          <Input

            type="password"
            placeholder="Senha"
            _placeholder={{ color: 'black', opacity: 0.9 }}
            name="password"
            size="md"
            border={'none'}
            borderBottom={'2px solid black'}
            focusBorderColor='#000'
          />
          <button className="text-white bg-[#0c0b0b] hover:bg-gray-700 py-2 px-4 rounded-md" type="submit">Entrar</button>
        </form>
        <div className="sm:px-4 sm:w-full md:w-1/2 lg:w-full lg:p-6">
          <Text className="text-xs  text-center" >
            Não possui uma conta?
            <Link className='ml-1 underline' href='/Signup'>
              Cadastre-se
            </Link>
          </Text>
          <Box position='relative' padding='7'>
            <Divider />
            <AbsoluteCenter className="text-gray-950 text-xs text-center text-nowrap" bg='white' px='4'>
              Ou entre com
            </AbsoluteCenter>
          </Box>

          <GoogleLoginBtn />
        </div>
        
          {/* <svg xmlns="http://www.w3.org/2000/svg" className="rounded-b-xl" viewBox="0 0 1440 320"><path fill="000000" fill-opacity="0.8" d="M0,192L24,181.3C48,171,96,149,144,144C192,139,240,149,288,138.7C336,128,384,96,432,101.3C480,107,528,149,576,176C624,203,672,213,720,224C768,235,816,245,864,224C912,203,960,149,1008,112C1056,75,1104,53,1152,85.3C1200,117,1248,203,1296,245.3C1344,288,1392,288,1416,288L1440,288L1440,320L1416,320C1392,320,1344,320,1296,320C1248,320,1200,320,1152,320C1104,320,1056,320,1008,320C960,320,912,320,864,320C816,320,768,320,720,320C672,320,624,320,576,320C528,320,480,320,432,320C384,320,336,320,288,320C240,320,192,320,144,320C96,320,48,320,24,320L0,320Z"></path></svg> */}
       
      </div>

    </main>
  );
}
