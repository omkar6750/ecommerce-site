import React, { useMemo } from "react";
import { useReactTable, getCoreRowModel, flexRender } from "@tanstack/react-table";
import { EditableCell } from "./EditableCell";

const NestedVariantsTable = ({ variants, updateData, productId }) => {
	const columns = useMemo(
		() => [
			{
				header: "SKU",
				accessorKey: "sku",
			},
			{
				header: "Size",
				accessorKey: "size",
				cell: ({ getValue, row, column }) => (
					<EditableCell
						initialValue={getValue()}
						row={row}
						column={column}
						updateData={updateData}
						inputType="text"
					/>
				),
			},
			{
				header: "color",
				accessorKey: "color",
				cell: ({ getValue, row, column }) => (
					<EditableCell
						initialValue={getValue()}
						row={row}
						column={column}
						updateData={updateData}
						inputType="text"
					/>
				),
			},
			{
				header: "Inventory",
				accessorKey: "inventory_count",
				cell: ({ getValue, row, column }) => (
					<EditableCell
						initialValue={getValue()}
						row={row}
						column={column}
						updateData={updateData}
						inputType="number"
					/>
				),
			},
		],
		[updateData]
	);

	const table = useReactTable({
		data: variants,
		columns,
		getCoreRowModel: getCoreRowModel(),
	});

	return (
		<div className="mt-2 overflow-x-auto">
			<table className="min-w-full border">
				<thead className="bg-gray-100">
					{table.getHeaderGroups().map((headerGroup) => (
						<tr key={headerGroup.id}>
							{headerGroup.headers.map((header) => (
								<th key={header.id} className="border px-2 py-1">
									{flexRender(
										header.column.columnDef.header,
										header.getContext()
									)}
								</th>
							))}
						</tr>
					))}
				</thead>
				<tbody>
					{table.getRowModel().rows.map((row) => (
						<tr key={row.id}>
							{row.getVisibleCells().map((cell) => (
								<td key={cell.id} className="border px-2 py-1">
									{flexRender(cell.column.columnDef.cell, cell.getContext())}
								</td>
							))}
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
};

export default NestedVariantsTable;
