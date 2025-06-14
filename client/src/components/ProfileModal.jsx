import { Input } from "@/components/ui/input";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import React, { useState } from "react";
import { toast } from "sonner";
import apiClient from "@/lib/apiClient";
import { PROFILE_CREATE } from "@/Utils/constants";
import { useAppStore } from "@/Store";

const ProfileModal = ({ isOpen, onClose }) => {
	const { setUserInfo, fetchUser } = useAppStore();
	const [formData, setFormData] = useState({
		firstName: "",
		lastName: "",
		phone: "",
		gender: "",
		address: "",
	});

	const [isLoading, setIsLoading] = useState(false);

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData((prev) => ({ ...prev, [name]: value }));
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setIsLoading(true);

		try {
			await apiClient.post(PROFILE_CREATE, formData, { withCredentials: true });
			toast.success("Profile created successfully");
			fetchUser();
			onClose();
		} catch (error) {
			toast.error(error.response?.data?.error || "Error updating profile");
		} finally {
			setIsLoading(false);
		}
	};

	const handleOverlayClick = (e) => {
		if (e.target.id === "modal-overlay") {
			onClose();
		}
	};

	if (!isOpen) return null;

	return (
		<div
			id="modal-overlay"
			className="fixed inset-0 z-20 flex items-center justify-center bg-black/50 backdrop-blur-sm"
			onClick={handleOverlayClick}
		>
			{isOpen && (
				<style>
					{`
                    body {
                        pointer-events: none;
                        overflow: hidden;
                    }
                    #modal-overlay, #modal-overlay * {
                        pointer-events: auto;
                    }
                `}
				</style>
			)}
			<div className="relative w-[480px] rounded-2xl bg-gray-100 shadow-2xl">
				<nav className="flex h-14 w-full items-center justify-center text-3xl font-semibold">
					<h2 className="mt-5">Profile SetUp</h2>
				</nav>
				<form
					className="mt-5 w-full space-y-4 rounded-2xl border bg-white p-6"
					onSubmit={handleSubmit}
				>
					<div>
						<label className="text-sm font-medium text-gray-700">Name</label>
						<div className="flex gap-3">
							<Input
								placeholder="First Name"
								type="text"
								name="firstName"
								value={formData.firstName}
								onChange={handleChange}
								required
							/>
							<Input
								placeholder="Last Name"
								type="text"
								name="lastName"
								value={formData.lastName}
								onChange={handleChange}
							/>
						</div>
					</div>

					<div>
						<label className="text-sm font-medium text-gray-700">Phone Number</label>
						<Input
							placeholder="Phone Number"
							type="tel"
							name="phone"
							value={formData.phone}
							onChange={handleChange}
						/>
					</div>

					<div>
						<label className="text-sm font-medium text-gray-700">Gender</label>
						<Select
							onValueChange={(value) =>
								setFormData((prev) => ({ ...prev, gender: value }))
							}
						>
							<SelectTrigger className="w-full">
								<SelectValue placeholder="Select Gender" />
							</SelectTrigger>
							<SelectContent>
								<SelectItem value="male">Male</SelectItem>
								<SelectItem value="female">Female</SelectItem>
								<SelectItem value="NA">Prefer Not to Say</SelectItem>
							</SelectContent>
						</Select>
					</div>

					<div>
						<label className="text-sm font-medium text-gray-700">Address</label>
						<textarea
							className="w-full rounded-md border p-2"
							placeholder="Address"
							name="address"
							value={formData.address}
							onChange={handleChange}
						/>
					</div>

					<div className="mt-5 flex justify-between">
						<button
							type="button"
							className="rounded-lg px-4 py-2 text-gray-700 hover:bg-gray-100"
							onClick={onClose}
						>
							Cancel
						</button>
						<button
							type="submit"
							className="rounded-lg bg-blue-600 px-6 py-2 text-white hover:bg-blue-700 disabled:bg-gray-400"
							disabled={isLoading}
						>
							{isLoading ? "Saving..." : "Save changes"}
						</button>
					</div>
				</form>
			</div>
		</div>
	);
};

export default ProfileModal;
