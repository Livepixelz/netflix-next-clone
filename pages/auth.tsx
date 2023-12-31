import Image from 'next/image'
import Input from '@/components/Input'
import { useCallback, useState } from 'react'
import { useRouter } from 'next/router'
import axios from 'axios'
import { signIn } from 'next-auth/react'

import { FcGoogle } from 'react-icons/fc'
import { FaGithub } from 'react-icons/fa'

const Auth = () => {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')  
  const [password, setPassword] = useState('')

  const [variant, setVariant] = useState('login') 

  const toggleVariant = useCallback(() => {
    setVariant((currentVariant) => currentVariant === 'login' ? 'register' : 'login')
  }, [])

  const login = useCallback(async() => {
    try {
      await signIn('credentials', { email, password, callbackUrl: '/' })
      router.push('/profiles')
    } catch (error) {
      console.log(error)
    }
  }, [email, password, router])

  const register = useCallback(async() => {
    try {
      await axios.post('/api/register', { email, password, name })
      login()
    } catch (error) {
     console.log(error) 
    }
  }, [email, name, password, login])


  return (
    <div className="relative h-full w-full bg-[url('/images/hero.jpg')] bg-no-repeat bg-center bg-cover">
      <div className="bg-black w-full h-full lg:bg-opacity-50">
        <nav className="px-12 py-5">
          <Image src="/images/logo.png" alt="logo" width={1272} height={344} className="h-12 w-auto" />
        </nav>
        <div className="flex justify-center">
          <div className="bg-black bg-opacity-70 p-16 self-center mt-2 lg:w-2/5 lg:max-w-md rounded-md w-full">
            <h2 className="text-white text-4xl mb-8 font-semibold">{variant === 'login' ? 'Sign in' : 'Register'}</h2>
            
            <div className="flex flex-col gap-4">
            { variant === 'register' && (
              <Input id="name" type="text" label="Name" value={name} onChange={(e: any) => { setName(e.target.value)}} />
            )}
              <Input id="email" type="email" label="Email" value={email} onChange={(e: any) => { setEmail(e.target.value)}} />
              <Input id="password" type="password" label="Password" value={password} onChange={(e: any) => { setPassword(e.target.value)}} />
            </div>
            <button onClick={variant === 'login' ? login : register} className="bg-red-600 p-3 text-white rounded-md w-full mt-10 hover:bg-red-700 transition-colors">
            {variant === 'login' ? 'Login' : 'Sign up'}
            </button>
            <div className="flex flex-row items-center gap-4 mt-8 justify-center">
              <div onClick={() => signIn('google', {callbackUrl: '/profiles'})} className="w-10 h-10 bg-white rounded-full flex items-center justify-center cursor-pointer hover:opacity-80 transition">
                <FcGoogle size={30} />
              </div>
              <div onClick={() => signIn('github', {callbackUrl: '/profiles'})} className="w-10 h-10 bg-white text-black rounded-full flex items-center justify-center cursor-pointer hover:opacity-80 transition">
                <FaGithub size={30} />
              </div>
            </div>
            <p className="text-neutral-500 mt-12">
              {variant === 'login' ? 'First time using Netflix?' : 'Already have an account?'}
              <span onClick={toggleVariant} className="text-white ml-1 cursor-pointer hover:underline">{variant === 'login' ? 'Sign up now!' : 'Login'}</span>
            </p> 
            
          </div>    
        </div>
      </div>
    </div>
  )
}

export default Auth