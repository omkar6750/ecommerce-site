import React, { useEffect, useRef, useState } from "react";
import { Input } from "@/components/ui/input";
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import MultipleSelector from "@/components/MultipleSelect";
import { Button } from "@/components/ui/button";
import { CREATE_PRODUCT, UPLOAD_IMAGE } from "@/Utils/constants";
import apiClient from "@/lib/apiClient";
import { toast } from "sonner";
import tags from "@/Utils/tags.json";
import { Trash2 } from "lucide-react";

const CreateProduct = () => {
	const [name, setName] = useState("");
	const [gender, setGender] = useState("");
	const [newPrice, setNewPrice] = useState(null);
	const [oldPrice, setOldPrice] = useState(null);
	const [description, setDescription] = useState("");
	const [image, setImage] = useState(null);
	const [url, setUrl] = useState("");
	const [selectedTags, setSelectedTags] = useState([]);

	const [variant, setVariant] = useState([]);
	const [SKU, setSKU] = useState("");
	const [size, setSize] = useState("");
	const [color, setcolor] = useState("");
	const [inventory, setInventory] = useState(0);
	const [savedSkuParts, setSavedSkuParts] = useState({ gender: "", tag: "" });
	const [collection, setCollection] = useState("");

	const fileInputRef = useRef(null);
	const handleAttachmentClick = () => {
		if (fileInputRef.current) {
			fileInputRef.current.click();
		}
	};

	const formReset = () => {
		setName("");
		setGender("");
		setDescription("");
		setImage(null);
		setOldPrice(0);
		setNewPrice(0);
		setUrl("");
		setSelectedTags([]);
		setVariant([]);
		setSKU("");
		setcolor("");
		setSize("");
		setInventory(0);
		setCollection("");
	};

	useEffect(() => {
		if (gender && selectedTags.length > 0) {
			const firstTag = selectedTags[0]?.label.toUpperCase().slice(0, 3);
			setSavedSkuParts({
				gender: gender[0].toUpperCase(),
				tag: firstTag,
				collection: collection,
			});
		}
	}, [gender, selectedTags, collection]);

	useEffect(() => {
		if (savedSkuParts.gender && savedSkuParts.tag && size) {
			const newSku = `${savedSkuParts.gender}-${savedSkuParts.tag}-${size.toUpperCase()}-${collection}`;
			setSKU(newSku);
		}
	}, [size, savedSkuParts, collection]);

	const handleFileChange = (e) => {
		const file = e.target.files[0];
		if (file) {
			setImage(file);
			setUrl(URL.createObjectURL(file));
		}
	};

	const handleNewVariant = () => {
		if (variant.some((item) => item.sku === SKU)) {
			toast.error("SKU already exists. Modify it.");
			return;
		}
		if (SKU && size && color && inventory) {
			setVariant((prev) => [
				...prev,
				{
					sku: SKU,
					size: size,
					color: color,
					inventory_count: inventory,
				},
			]);
		}
		toast.success("New Variant Created");
	};

	const deleteVariant = (skuToDelete) => {
		setVariant((prev) => prev.filter((variant) => variant.sku !== skuToDelete));
		toast.success("Variant Deleted");
	};
	const handleNewProduct = async () => {
		// if (!name || !gender || !newPrice || !description) {
		// 	toast.error("Fill all fields");
		// 	return;
		// }
		if (variant.length === 0) {
			toast.error("Add variants first");
		}
		const payload = {
			name: name,
			gender: gender,
			old_price: oldPrice ? oldPrice : null,
			new_price: newPrice ? newPrice : null,
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

				const formData = new FormData();
				formData.append("productId", productId);
				formData.append("file", image);
				for (const [key, value] of formData.entries()) {
				}
				const imageResponse = await apiClient.post(UPLOAD_IMAGE, formData, {
					withCredentials: true,
					headers: {
						"Content-Type": "multipart/form-data",
					},
				});
				if (imageResponse.status === 200) {
					formReset();
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
		<div className="flex h-[90vh] w-screen flex-col items-center justify-center p-2">
			<div className="grid h-full w-full grid-cols-3 space-x-10 border p-8">
				<div className="flex flex-col space-y-10 border p-8">
					<Input
						type="text"
						placeholder="Product Name"
						value={name}
						onChange={(e) => {
							setName(e.target.value);
						}}
						className="bg-[#d4ebff]"
					></Input>
					<Select onValueChange={(e) => setGender(e)}>
						<SelectTrigger className="w-[180px] bg-[#d4ebff]">
							<SelectValue placeholder="Gender" />
						</SelectTrigger>
						<SelectContent>
							<SelectItem value="male">male</SelectItem>
							<SelectItem value="female">female</SelectItem>
							<SelectItem value="kid">kid</SelectItem>
						</SelectContent>
					</Select>
					<Input
						type="number"
						placeholder="New Price"
						value={newPrice || ""}
						onChange={(e) => {
							setNewPrice(e.target.value);
						}}
						className="bg-[#d4ebff]"
					></Input>
					<Input
						type="number"
						placeholder="Old Price"
						value={oldPrice || ""}
						onChange={(e) => {
							setOldPrice(e.target.value);
						}}
						className="bg-[#d4ebff]"
					></Input>
					<div className="rounded-md border">
						<MultipleSelector
							className="z-1000 rounded-lg border-none bg-[#d4ebff] py-2 text-black"
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
						className="h-40 border border-[#d4ebff]"
					></textarea>
				</div>
				<div className="flex h-full flex-col border p-8">
					<div className="flex flex-col space-y-10">
						<Select onValueChange={(e) => setCollection(e)}>
							<SelectTrigger className="w-[180px] bg-[#d4ebff]">
								<SelectValue placeholder="Collection" />
							</SelectTrigger>
							<SelectContent>
								<SelectItem value="SS">SS</SelectItem>
								<SelectItem value="FW">FW</SelectItem>
							</SelectContent>
						</Select>

						<Input
							type="text"
							placeholder="color"
							value={color}
							onChange={(e) => {
								setcolor(e.target.value);
							}}
							className="bg-[#d4ebff]"
						/>
						<Input
							type="number"
							placeholder="Inventory"
							value={inventory}
							onChange={(e) => {
								setInventory(e.target.value);
							}}
							className="bg-[#d4ebff]"
						/>
						<Input
							type="text"
							placeholder="SKU"
							value={SKU}
							onChange={(e) => {
								setSKU(e.target.value);
							}}
							className="bg-[#d4ebff]"
						></Input>
						<Select onValueChange={(e) => setSize(e)}>
							<SelectTrigger className="w-[180px] bg-[#d4ebff]">
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
					</div>

					<div className="mt-5 h-full">
						{variant.map((item, i) => (
							<div key={i} className="flex space-x-10">
								<div>{item.sku}</div>
								<div>{item.size}</div>
								<div>{item.color}</div>
								<div>{item.inventory_count}</div>
								<button>
									<Trash2
										size={15}
										onClick={() => {
											deleteVariant(item.sku);
										}}
									/>
								</button>
							</div>
						))}
					</div>
					<div className="flex flex-col space-y-10">
						<Button onClick={handleNewVariant} className="bg-blue-500">
							Add Variant
						</Button>
					</div>
				</div>
				<div className="border">
					<div className="flex h-full w-full items-center justify-center p-2">
						{image ? (
							<div className="flex flex-col items-center justify-center">
								<img
									className="h-2/3 w-3/4 object-cover"
									loading="lazy"
									src={url}
									alt=""
								/>
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
							<div className="relative flex h-full flex-col items-center justify-center">
								<button
									type="button"
									onClick={handleAttachmentClick}
									className="rounded-lg bg-blue-500 p-7 text-3xl text-white"
								>
									<span>Browse</span>
								</button>
								<input
									type="file"
									ref={fileInputRef}
									className="hidden"
									accept=".png, .jpg,.webp, .jpeg, .avif"
									onChange={handleFileChange}
								/>
							</div>
						)}
					</div>
				</div>
			</div>
			<Button onClick={handleNewProduct} className="m-5 w-1/3 bg-blue-500 p-5">
				Submit Product
			</Button>
		</div>
	);
};

export default CreateProduct;
