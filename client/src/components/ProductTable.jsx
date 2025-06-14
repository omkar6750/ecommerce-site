import React, { useMemo } from "react";
import { useReactTable, getCoreRowModel, flexRender } from "@tanstack/react-table";
import { EditableCell } from "./EditableCell";
import NestedVariantsTable from "./NestedVariantsTable";

const ProductTable = ({ data, updateData, onDeleteProduct }) => {
	const columns = useMemo(
		() => [
			{
				header: "Product ID",
				accessorKey: "product_id",
			},
			{
				header: "Name",
				accessorKey: "name",
				cell: ({ getValue, row, column }) => (
					<EditableCell
						initialValue={getValue()}
						row={row}
						column={column}
						updateData={updateData}
					/>
				),
			},
			{
				header: "Gender",
				accessorKey: "gender",
				cell: ({ getValue, row, column }) => (
					<EditableCell
						initialValue={getValue()}
						row={row}
						column={column}
						updateData={updateData}
						inputType="select"
						options={["male", "female", "kid"]}
					/>
				),
			},
			{
				header: "Old Price",
				accessorKey: "old_price",
				cell: ({ getValue, row, column }) => (
					<EditableCell
						initialValue={getValue()}
						row={row}
						column={column}
						updateData={updateData}
					/>
				),
			},
			{
				header: "New Price",
				accessorKey: "new_price",
				cell: ({ getValue, row, column }) => (
					<EditableCell
						initialValue={getValue()}
						row={row}
						column={column}
						updateData={updateData}
					/>
				),
			},
			{
				header: "Description",
				accessorKey: "description",
				cell: ({ getValue, row, column }) => (
					<EditableCell
						initialValue={getValue()}
						row={row}
						column={column}
						updateData={updateData}
					/>
				),
			},
			{
				header: "Tags",
				accessorKey: "tags",
				cell: ({ getValue, row, column }) => (
					<EditableCell
						initialValue={getValue()}
						row={row}
						column={column}
						updateData={updateData}
					/>
				),
			},
			{
				header: "Delete",
				cell: ({ row }) => (
					<button
						onClick={() => onDeleteProduct(row.original.product_id)}
						className="text-red-500 hover:text-red-700"
					>
						Delete
					</button>
				),
			},
			{
				header: "Variants",
				cell: ({ row }) => (
					<button
						onClick={() => row.toggleExpanded()}
						className="rounded border px-2 py-1 text-sm text-blue-600 hover:text-blue-800"
					>
						{row.getIsExpanded() ? "Hide Variants" : "Show Variants"}
					</button>
				),
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
									{header.isPlaceholder
										? null
										: flexRender(
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
						<React.Fragment key={row.id}>
							<tr>
								{row.getVisibleCells().map((cell) => (
									<td key={cell.id} className="border px-4 py-2">
										{flexRender(cell.column.columnDef.cell, cell.getContext())}
									</td>
								))}
							</tr>
							{row.getIsExpanded() && (
								<tr>
									<td
										colSpan={row.getVisibleCells().length}
										className="bg-gray-50"
									>
										<NestedVariantsTable
											variants={row.original.variants}
											updateData={updateData}
											productId={row.original.product_id}
										/>
									</td>
								</tr>
							)}
						</React.Fragment>
					))}
				</tbody>
			</table>
		</div>
	);
};

export default ProductTable;
