import React, { useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";

export const EditableCell = ({
	initialValue,
	row,
	column,
	updateData,
	inputType = "text",
	className = "",
	options = [],
}) => {
	const [value, setValue] = useState(initialValue);

	const onBlur = () => {
		console.log(value, initialValue, row.original, column.id);
		if (value !== initialValue) {
			updateData(row.original, column.id, value);
		}
	};

	if (inputType === "select") {
		return (
			<Select
				className={`w-full rounded border p-1 ${className}`}
				value={value}
				onValueChange={(newVal) => {
					setValue(newVal);
					updateData(row.original, column.id, newVal);
				}}
				onKeyDown={(e) => {
					if (e.key === "Enter") {
						e.target.blur();
					}
				}}
			>
				<SelectTrigger className="w-[180px]">
					<SelectValue placeholder="Gender" />
					<SelectContent>
						{options.map((option) => (
							<SelectItem key={option} value={option}>
								{option}
							</SelectItem>
						))}
					</SelectContent>
				</SelectTrigger>
			</Select>
		);
	}

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
