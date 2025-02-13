import React, { useRef, useState } from "react";
import { Input } from "./ui/input";
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectTrigger,
	SelectValue,
} from "./ui/select";
import MultipleSelector from "./MultipleSelect";
import { Button } from "./ui/button";
import { CREATE_PRODUCT, UPLOAD_IMAGE } from "@/Utils/constants";
import apiClient from "@/lib/apiClient";
import { toast } from "sonner";

const tags = [
	{
		label: "TSH",
		value: "1",
	},
	{
		label: "SHT",
		value: "2",
	},
	{
		label: "PNT",
		value: "3",
	},
	{
		label: "JKT",
		value: "4",
	},
	{
		label: "SLL",
		value: "5",
	},
	{
		label: "HSL",
		value: "6",
	},
	{
		label: "SWT",
		value: "7",
	},
	{
		label: "PUL",
		value: "8",
	},
	{
		label: "ZIP",
		value: "9",
	},
	{
		label: "CRW",
		value: "10",
	},
	{
		label: "VNK",
		value: "11",
	},
	{
		label: "POL",
		value: "12",
	},
	{
		label: "TTN",
		value: "13",
	},
	{
		label: "HOD",
		value: "14",
	},
];

const CreateProduct = () => {
	const [name, setName] = useState("");
	const [gender, setGender] = useState("");
	const [newPrice, setNewPrice] = useState(0);
	const [oldPrice, setOldPrice] = useState(0);
	const [description, setDescription] = useState("");
	const [image, setImage] = useState(null);
	const [url, setUrl] = useState("");
	const [selectedTags, setSelectedTags] = useState([]);

	const [variant, setVariant] = useState([]);
	const [SKU, setSKU] = useState("");
	const [size, setSize] = useState("");
	const [colour, setColour] = useState("");
	const [inventory, setInventory] = useState(0);

	const fileInputRef = useRef(null);
	const handleAttachmentClick = () => {
		if (fileInputRef.current) {
			fileInputRef.current.click();
		}
	};

	const formReset = () => {
		setName("");
		setGender("");
		setColour("");
	};

	const handleFileChange = (e) => {
		const file = e.target.files[0];
		if (file) {
			setImage(file);
			setUrl(URL.createObjectURL(file));
		}
	};

	const handleNewVariant = () => {
		if (SKU && size && colour && inventory) {
			setVariant((prev) => [
				...prev,
				{
					sku: SKU,
					size: size,
					colour: colour,
					inventory_count: inventory,
				},
			]);
		}
		toast.success("New Variant Created");
	};

	const handleNewProduct = async () => {
		const payload = {
			name: name,
			gender: gender,
			old_price: oldPrice,
			new_price: newPrice,
			description: description,
			tags: selectedTags.map((tag) => tag.label),
			variants: variant,
		};
		try {
			if (image) {
				const response = await apiClient.post(CREATE_PRODUCT, payload, {
					withCredentials: true,
				});
				const productId = response.data.product_id;

				console.log(image);

				const formData = new FormData();
				formData.append("productId", productId);
				formData.append("file", image);
				for (const [key, value] of formData.entries()) {
					console.log(key, value);
				}
				const imageResponse = await apiClient.post(UPLOAD_IMAGE, formData, {
					withCredentials: true,
					headers: {
						"Content-Type": "multipart/form-data",
					},
				});
				if (imageResponse.status === 201) {
					toast.success("product created successfully");
				}
			} else {
				toast.error("Upload image first");
			}
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<div className="flex h-[90vh] w-screen items-center justify-center p-8">
			<div className="grid h-full w-full grid-cols-3 space-x-10 border p-8">
				<div className="flex flex-col space-y-10 border p-8">
					<Input
						type="text"
						placeholder="Product Name"
						value={name}
						onChange={(e) => {
							setName(e.target.value);
						}}
					></Input>
					<Select onValueChange={(e) => setGender(e)}>
						<SelectTrigger className="w-[180px]">
							<SelectValue placeholder="Gender" />
						</SelectTrigger>
						<SelectContent>
							<SelectItem value="male">male</SelectItem>
							<SelectItem value="female">female</SelectItem>
							<SelectItem value="kid">kid</SelectItem>
							<SelectItem value="unisex">unisex</SelectItem>
						</SelectContent>
					</Select>
					<Input
						type="number"
						placeholder="New Price"
						value={newPrice}
						onChange={(e) => {
							setNewPrice(e.target.value);
						}}
						className=""
					></Input>
					<Input
						type="number"
						placeholder="Old Price"
						value={oldPrice}
						onChange={(e) => {
							setOldPrice(e.target.value);
						}}
						className=""
					></Input>
					<div className="rounded-md border">
						<MultipleSelector
							className="z-1000 rounded-lg border-none py-2 text-black"
							defaultOptions={tags}
							placeholder="Search Tags"
							value={selectedTags}
							onChange={setSelectedTags}
							emptyIndicator={
								<p className="text-center text-lg leading-10 text-gray-600">
									No results found
								</p>
							}
						/>
					</div>
					<textarea
						value={description}
						onChange={(e) => {
							setDescription(e.target.value);
						}}
						type="text"
						placeholder="Description"
						className="h-40 border"
					></textarea>
				</div>
				<div className="flex flex-col space-y-10 border p-8">
					<Input
						type="text"
						placeholder="SKU"
						value={SKU}
						onChange={(e) => {
							setSKU(e.target.value);
						}}
					></Input>
					<Select onValueChange={(e) => setSize(e)}>
						<SelectTrigger className="w-[180px]">
							<SelectValue placeholder="Size" />
						</SelectTrigger>
						<SelectContent>
							<SelectGroup>
								<SelectLabel> Adult</SelectLabel>
								<SelectItem value="xs">XS</SelectItem>
								<SelectItem value="s">S</SelectItem>
								<SelectItem value="m">M</SelectItem>
								<SelectItem value="l">L</SelectItem>
								<SelectItem value="xl">XL</SelectItem>
							</SelectGroup>
							<SelectGroup>
								<SelectLabel>Kids</SelectLabel>
								<SelectItem value="k1">4-5Y</SelectItem>
								<SelectItem value="k2">6-7Y</SelectItem>
								<SelectItem value="k3">8-9Y</SelectItem>
								<SelectItem value="k4">10-11Y</SelectItem>
								<SelectItem value="k5">12-13Y</SelectItem>
								<SelectItem value="k6">14-16Y</SelectItem>
							</SelectGroup>
						</SelectContent>
					</Select>
					<Input
						type="text"
						placeholder="color"
						value={colour}
						onChange={(e) => {
							setColour(e.target.value);
						}}
					/>
					<Input
						type="number"
						placeholder="Inventory"
						value={inventory}
						onChange={(e) => {
							setInventory(e.target.value);
						}}
					/>
					<Button onClick={handleNewVariant}>Add Variant</Button>
					<Button onClick={handleNewProduct}>Submit Product</Button>
				</div>
				<div className="border">
					<div className="flex h-full w-full items-center justify-center p-2">
						{image ? (
							<div className="flex flex-col items-center justify-center">
								<img className="h-full w-full object-cover" src={url} alt="" />
								<p className="text-gray-600">Selected: {image.name}</p>
								<button
									onClick={() => {
										setImage(null);
										setUrl(null);
									}}
									className="rounded-lg bg-blue-500 px-4 py-2 text-white"
								>
									Remove Image
								</button>
							</div>
						) : (
							<div className="upload-container">
								<button
									type="button"
									onClick={handleAttachmentClick}
									className="rounded-lg bg-blue-500 px-4 py-2 text-white"
								>
									<p>Drag & Drop here</p>
									<p>
										or <span>Browse</span>
									</p>
								</button>
								<input
									type="file"
									ref={fileInputRef}
									className="hidden"
									accept=".png, .jpg, .jpeg, .avif"
									onChange={handleFileChange}
								/>
							</div>
						)}
					</div>
				</div>
			</div>
		</div>
	);
};

export default CreateProduct;
