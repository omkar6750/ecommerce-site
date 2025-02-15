import React, { useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";

export const EditableCell = ({
	initialValue,
	row,
	column,
	updateData,
	inputType = "text", // default to text input
	className = "", // default to an empty string if not provided
}) => {
	const [value, setValue] = useState(initialValue);

	const onBlur = () => {
		if (value !== initialValue) {
			updateData(row.original, column.id, value);
		}
	};

	// If inputType is 'select', render a dropdown
	if (inputType === "select") {
		return (
			<Select
				className={`w-full rounded border p-1 ${className}`}
				value={value}
				onValueChange={(newVal) => {
					setValue(newVal);
					// Immediately update on value change since onBlur might not fire
					updateData(row.original, column.id, newVal);
				}}
				// onBlur not necessary if we update immediately on value change
				onKeyDown={(e) => {
					if (e.key === "Enter") {
						e.target.blur();
					}
				}}
			>
				<SelectTrigger className="w-[180px]">
					<SelectValue placeholder="Gender" />
					<SelectContent>
						<SelectItem value="male">male</SelectItem>
						<SelectItem value="female">female</SelectItem>
						<SelectItem value="kid">kid</SelectItem>
						<SelectItem value="unisex">unisex</SelectItem>
					</SelectContent>
				</SelectTrigger>
			</Select>
		);
	}

	// Otherwise, render an input of the specified type (e.g. text, number, etc.)
	return (
		<input
			type={inputType}
			className={`w-full rounded border p-1 ${className}`}
			value={value}
			onChange={(e) => setValue(e.target.value)}
			onBlur={onBlur}
			onKeyDown={(e) => {
				if (e.key === "Enter") {
					e.target.blur();
				}
			}}
		/>
	);
};
