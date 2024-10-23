"use client"
import { FormLogin } from "./components/Auth/LoginByCredentials/login"


export default function Home() {
  return (
    <main>
      <div className="flex items-center justify-centerflex rounded-lg justify-center h-screen w-screen">
        <FormLogin />
      </div>
    </main>
  );
}
