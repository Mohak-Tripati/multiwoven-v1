import { TableDataType } from "@/components/Table/types";
import { ColumnMapType } from "./types";
import moment from "moment";

export type ModelData = {
	id: string;
	type: string;
	icon: string;
	name: string;
	attributes: {
		[key: string]: string | null;
	};
};

export function ConvertToTableData(
	apiData: ModelData[],
	columnMap: ColumnMapType[]
): TableDataType {
	let data = apiData.map((item) => {		
		let rowData: { [key: string]: string | null } = {};
		rowData = item.attributes;

		if (item.id) rowData["id"] = item.id;
		if (item.attributes.updated_at) rowData["updated_at"] = moment(item.attributes.updated_at).format("DD/MM/YYYY")
		if (item.attributes.updated_at) rowData["created_at"] = moment(item.attributes.updated_at).format("DD/MM/YYYY")
		return rowData;
	});

	return {
		columns: columnMap,
		data: data,
	};
}

type Field = {
	[key:string] : string | number | null;
}

export function ConvertModelPreviewToTableData(
	apiData: Array<Field>
): TableDataType {
	const column_names = Object.keys(apiData[0]);

	const columns = column_names.map((column_name) => {
		return {
			name: column_name,
			key: column_name,
		};
	});

	return {
		columns: columns,
		data: apiData,
	};
}
