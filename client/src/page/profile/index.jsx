import React, { useState } from 'react';
import { toast } from 'sonner'; // Assuming you're using a library like sonner for notifications
import axios from 'axios';
import { PROFILE_CREATE } from '@/Utils/constants';
import { useAppStore } from '@/Store';
import apiClient from '@/lib/apiClient';

const ProfileForm = () => {
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    mobile_number: '',
    age: '',
    gender: '',
    address: '',
  });

  const [isLoading, setIsLoading] = useState(false);

  const {userInfo, setUserInfo} = useAppStore()

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await apiClient.post(PROFILE_CREATE, formData);
      setUserInfo(response.data)
      toast.success('Profile created successfully');
      console.log(userInfo)
    } catch (error) {
      toast.error(error.response?.data?.error || 'Error updating profile');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col">
      <h2 className="text-7xl font-bold mb-4 text-center">Create Profile</h2>
      <form onSubmit={handleSubmit} className="flex items-start flex-col justify-center ">
        <div>
          <label className="w-60 block text-xl ">First Name</label>
          <input
            type="text"
            name="first_name"
            value={formData.first_name}
            onChange={handleChange}
            className="w-72 h-14  border border-gray-300 rounded-2xl p-2 "
          />
        </div>
        <div>
          <label className="w-60 block text-xl">Last Name</label>
          <input
            type="text"
            name="last_name"
            value={formData.last_name}
            onChange={handleChange}
            className="w-72 h-14  border border-gray-300 rounded-2xl p-2 "
          />
        </div>
        <div>
          <label className="w-60 block text-xl">Mobile Number</label>
          <input
            type="text"
            name="mobile_number"
            value={formData.mobile_number}
            onChange={handleChange}
            className="w-72 h-14  border border-gray-300 rounded-2xl p-2 "
          />
        </div>
        <div>
          <label className="w-60 block text-xl">Age</label>
          <input
            type="number"
            name="age"
            value={formData.age}
            onChange={handleChange}
            className="w-72 h-14  border border-gray-300 rounded-2xl p-2 "
          />
        </div>
        <div>
          <label className="w-60 block text-xl">Gender</label>
          <select
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            className="w-72 h-14  border border-gray-300 rounded-2xl p-2 "
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
        </div>
        <div>
          <label className="w-60 block text-xl">Address</label>
          <textarea
            name="address"
            value={formData.address}
            onChange={handleChange}
            className="w-72 h-14  border border-gray-300 rounded-2xl p-2 "
          />
        </div>

        <div className="mt-4">
          <button
            type="submit"
            className={`py-2 px-4 bg-blue-500 text-white rounded ${isLoading ? 'opacity-50' : ''}`}
            disabled={isLoading}
          >
            {isLoading ? 'Saving...' : 'Save Profile'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProfileForm;
