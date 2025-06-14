import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import apiClient from "@/lib/apiClient";
import { LOGIN_ROUTE, SIGNUP_ROUTE } from "@/Utils/constants";
import React, { useState } from "react";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { useAppStore } from "@/Store";
import ProfileModal from "@/components/ProfileModal";

const Auth = () => {
	const navigate = useNavigate();

	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [mobileNumber, setMobileNumber] = useState();
	const [isModalOpen, setIsModalOpen] = useState(false);

	const { fetchUser, userInfo } = useAppStore();

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
				toast.error(
					"Password must contain at least one special character (@, $, !, %, *, ?, &)."
				);
				break;
			case "password-invalid-characters":
				toast.error(
					"Password contains invalid characters. Only letters, digits, and specific special characters are allowed."
				);
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
				toast.error(data);
		}
	};

	const handleSignUp = async () => {
		try {
			if (mobileNumber.length === 10) {
				const response = await apiClient.post(
					SIGNUP_ROUTE,
					{ email, password, mobileNumber },
					{ withCredentials: true }
				);

				console.log(response.status);
				if (response.status === 201) {
					fetchUser();
					if (!userInfo.profile_setup) {
						setIsModalOpen(true);
					} else {
						navigate("/");
					}
				}
			} else toast.error("Enter Valid Mobile Number");
		} catch (error) {
			handleError(error.response?.data?.error || "Signup failed");
		}
	};

	const handleLogin = async () => {
		try {
			const response = await apiClient.post(
				LOGIN_ROUTE,
				{ email, password },
				{ withCredentials: true }
			);

			console.log(response);
			if (response.status === 200) {
				fetchUser();
				console.log(userInfo.profile_setup);

				toast.success("Login successfull");
				if (userInfo.profile_setup) {
					console.log(userInfo.profile_setup);

					navigate("/");
				} else {
					console.log(userInfo.profile_setup);

					setIsModalOpen(true);
				}
			}
		} catch (error) {
			handleError(error.response.data.error || "Login failed");
		}
	};

	return (
		<div className="flex h-screen w-full items-center justify-center">
			<div className="absolute z-20 flex h-[80vh] w-[80vw] items-center justify-center">
				<div className="flex h-[80vh] w-[80vw] justify-center rounded-3xl border-2 bg-white/70 text-opacity-90 shadow-2xl md:w-[90vw] lg:w-[70vw] xl:w-[60vw] xl:grid-cols-2">
					<div className="flex items-center sm:gap-5 md:gap-12 lg:gap-24">
						<div className="flex flex-col items-center justify-center">
							<div className="flex items-center justify-center">
								<ProfileModal
									isOpen={isModalOpen}
									onClose={() => {
										setIsModalOpen(false);
										navigate("/");
									}}
								/>

								<div>
									<h1 className="font-bold sm:text-6xl lg:text-7xl xl:text-8xl">
										Welcome
									</h1>
								</div>
							</div>
							<p className="pt-7 text-center text-lg font-medium">
								{" "}
								Fill in the details to get started
							</p>
						</div>
						<div className="flex w-full items-center justify-center">
							<Tabs className="w-56" defaultValue="login">
								<TabsList className="w-full rounded-none bg-transparent">
									<TabsTrigger
										className="date-[state=active]:bg-transparent w-full rounded-none border-b-2 p-3 text-black text-opacity-90 transition-all duration-300 data-[state=active]:border-b-purple-500 data-[state=active]:font-semibold data-[state=active]:text-black"
										value="login"
									>
										Login
									</TabsTrigger>
									<TabsTrigger
										className="date-[state=active]:bg-transparent w-full rounded-none border-b-2 p-3 text-black text-opacity-90 transition-all duration-300 data-[state=active]:border-b-purple-500 data-[state=active]:font-semibold data-[state=active]:text-black"
										value="signup"
									>
										SignUp
									</TabsTrigger>
								</TabsList>
								<TabsContent className="mt-10 flex flex-col gap-5" value="login">
									<Input
										placeholder="Email"
										type="email"
										className="rounded-full p-6"
										value={email}
										onChange={(e) => setEmail(e.target.value)}
									/>
									<Input
										placeholder="Password"
										type="password"
										className="rounded-full p-6"
										value={password}
										onChange={(e) => setPassword(e.target.value)}
									/>
									<Button
										className="rounded-full p-6"
										onClick={() => {
											handleLogin();
										}}
									>
										Login
									</Button>
								</TabsContent>
								<TabsContent className="flex flex-col gap-5" value="signup">
									<Input
										placeholder="Email"
										type="email"
										className="rounded-full p-6"
										value={email}
										onChange={(e) => setEmail(e.target.value)}
									/>
									<Input
										placeholder="Password"
										type="password"
										className="rounded-full p-6"
										value={password}
										onChange={(e) => setPassword(e.target.value)}
									/>
									<Input
										placeholder="Confirm Password"
										type="password"
										className="rounded-full p-6"
										value={confirmPassword}
										onChange={(e) => setConfirmPassword(e.target.value)}
									/>
									<Input
										placeholder="Mobile Number"
										type="number"
										className="rounded-full p-6"
										value={mobileNumber || ""}
										onChange={(e) => setMobileNumber(e.target.value)}
									/>
									<Button
										className="rounded-full p-6"
										onClick={() => {
											handleSignUp();
										}}
									>
										SignUp
									</Button>
								</TabsContent>
							</Tabs>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Auth;
