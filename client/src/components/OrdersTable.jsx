import React, { useMemo } from "react";
import { useReactTable, getCoreRowModel, flexRender } from "@tanstack/react-table";
import { EditableCell } from "./EditableCell";

const OrderTable = ({ data, updateData }) => {
	const columns = useMemo(
		() => [
			{
				header: "Order ID",
				accessorKey: "order_id",
			},
			{
				header: "User ID",
				accessorKey: "user_id",
			},
			{
				header: "Order Value",
				accessorKey: "order_value",
			},
			{
				header: "Order Status",
				accessorKey: "order_status",
				cell: ({ getValue, row, column }) => (
					<EditableCell
						initialValue={getValue()}
						row={row}
						column={column}
						updateData={updateData}
						inputType="select"
						options={["Pending", "Shipped", "Delivered", "Cancelled"]}
					/>
				),
			},
			{
				header: "Created At",
				accessorKey: "created_at",
			},
		],
		[updateData]
	);

	const table = useReactTable({
		data: data.data,
		columns,
		getCoreRowModel: getCoreRowModel(),
	});

	return (
		<div className="overflow-x-auto">
			<table className="min-w-full border">
				<thead className="bg-gray-200">
					{table.getHeaderGroups().map((headerGroup) => (
						<tr key={headerGroup.id}>
							{headerGroup.headers.map((header) => (
								<th key={header.id} className="border px-4 py-2">
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
								<td key={cell.id} className="border px-4 py-2">
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

export default OrderTable;
