import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import React, { useState } from 'react'
// import { useNavigate } from 'react-router-dom'


const Auth=() =>{
    // const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");


    const handleSignUp = () => {
        console.log('signup')
    }
    const handeleLogin = () => {
        console.log('login')
    }
  return (
    
    <div className='flex justify-center items-center h-screen w-full'>
<div className="h-[80vh] w-[80vw] flex items-center justify-center absolute z-20">
                <div className="flex justify-center h-[80vh] bg-white/70 border-2 text-opacity-90 shadow-2xl w-[80vw] md:w-[90vw] lg:w-[70vw] xl:w-[60vw] rounded-3xl xl:grid-cols-2">
                    <div className="flex lg:gap-24 md:gap-12 sm:gap-5 items-center">
                        <div className="flex items-center justify-center flex-col ">
                            <div className="flex items-center justify-center">
                                <div>
                                    {/* <Logo></Logo> */}
                                    <h1 className="xl:text-8xl font-bold lg:text-7xl sm:text-6xl  ">Welcome</h1>
                                </div>
                            </div>
                            <p className='font-medium pt-7 text-lg text-center '> Fill in the details to get started</p>
                        </div>
                        <div className='flex items-center justify-center w-full'>
                            <Tabs className='w-56' defaultValue='login'>
                                <TabsList className='bg-transparent w-full rounded-none'>
                                    <TabsTrigger className='date-[state=active]:bg-transparent text-black text-opacity-90 border-b-2 rounded-none w-full data-[state=active]:text-black data-[state=active]:font-semibold data-[state=active]:border-b-purple-500 p-3 duration-300 transition-all' value='login'>Login</TabsTrigger>
                                    <TabsTrigger className='date-[state=active]:bg-transparent text-black text-opacity-90 border-b-2 rounded-none w-full data-[state=active]:text-black data-[state=active]:font-semibold data-[state=active]:border-b-purple-500 p-3 duration-300 transition-all'  value='signup'>SignUp</TabsTrigger>
                                </TabsList>
                                <TabsContent className='flex flex-col gap-5 mt-10' value="login">
                                    <Input placeholder="Email" type="email" className='rounded-full p-6' value={email} onChange={(e) => setEmail(e.target.value)}
                                    />
                                    <Input placeholder="Password" type="password" className='rounded-full p-6' value={password} onChange={(e) => setPassword(e.target.value)}
                                    />
                                    <Button className='rounded-full p-6'
                                     onClick={() => {handeleLogin()}}>Login</Button>
                                </TabsContent>
                                <TabsContent className='flex flex-col gap-5 ' value="signup">
                                <Input placeholder="Email" type="email" className='rounded-full p-6' value={email} onChange={(e) => setEmail(e.target.value)}
                                />
                                <Input placeholder="Password" type="password" className='rounded-full p-6' value={password} onChange={(e) => setPassword(e.target.value)} />
                                <Input placeholder="Confirm Password" type="password" className='rounded-full p-6' value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                                <Button className='rounded-full p-6'
                                     onClick={() => {handleSignUp()}}>SignUp</Button>
                                </TabsContent>
                            </Tabs>
                        </div>
                    </div>
            
                </div>
            </div>        
    </div>
    
  )
}

export default Auth