import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import apiClient from '@/lib/apiClient'
import { LOGIN_ROUTE, SIGNUP_ROUTE } from '@/Utils/constants'
import React, { useState } from 'react'
import { toast } from 'sonner'
import { useNavigate } from 'react-router-dom'
import { useAppStore } from '@/Store'


const Auth=() =>{
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const { setUserInfo, profileCreated } = useAppStore();


    const handleError = (data) => {
        
        switch (data) {
            case "email-password-required":
                toast.error("Email and Password are required.");
                break;
            case "password-too-short":
                toast.error("Password is too short.");
                break;
            case "password-missing-letter":
                toast.error("Password must contain at least one letter.");
                break;
            case "password-missing-digit":
                toast.error("Password must contain at least one digit.");
                break;
            case "password-missing-special-character":
                toast.error("Password must contain at least one special character (@, $, !, %, *, ?, &).");
                break;
            case "password-invalid-characters":
                toast.error("Password contains invalid characters. Only letters, digits, and specific special characters are allowed.");
                break;
            case "email-invalid":
                toast.error("Email is invalid.");
                break;
            case "email-listed":
                toast.error("Email is already registered.");
                break;
            case "internal-server-error":
                toast.error("An unexpected error occurred. Please try again later.");
                break;
            case "user-not-found":
                toast.error("User not found.");
                break;
            case "password-incorrect":
                toast.error("Password is incorrect.");
                break;
            default:
                console.log(data)
                toast.error(data);

        }
    }


    const handleSignUp = async () => {
        try {
            const response = await apiClient.post(SIGNUP_ROUTE, { email, password }, {withCredentials:true});
            console.log(response.status)
            if (response.status === 201) {
                setUserInfo(response.data.user)
                if(profileCreated){
                    navigate("/profile"); 
                }else{
                    navigate('/shop')
                }
            }
        } catch (error) {
            handleError(error.response?.data?.error || "Signup failed");
        }
    };

    const handleLogin = async () => {
        try {
            const response = await apiClient.post(LOGIN_ROUTE, { email, password }, {withCredentials:true});
            
            if (response.status === 200) {
                
                setUserInfo(response.data.user)
                toast.success("Login successfull")
                if(profileCreated){
                    navigate('/')
                }else{
                    navigate('/profile')
                }
                
            }
        } catch (error) {
            handleError(error.response.data.error || "Login failed");
        }
    };


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
                                     onClick={() => {handleLogin()}}>Login</Button>
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