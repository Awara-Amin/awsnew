import React, { useMemo } from 'react';
import ReactTable from 'react-table';
import FileSaver from 'file-saver';
// import 'react-table/react-table.css';
import XLSX from 'xlsx';

const data = [
  { name: 'Alice', age: 25, gender: 'Female' },
  { name: 'Bob', age: 30, gender: 'Male' },
  { name: 'Charlie', age: 35, gender: 'Male' },
];

const columns = [
  { Header: 'Name', accessor: 'name' },
  { Header: 'Age', accessor: 'age' },
  { Header: 'Gender', accessor: 'gender' },
];

const exportExcel = (tableData, fileName) => {
  const worksheet = XLSX.utils.json_to_sheet(tableData);
  const workbook = { Sheets: { data: worksheet }, SheetNames: ['data'] };
  const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
  const data = new Blob([excelBuffer], {
    type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8',
  });
  FileSaver.saveAs(data, `${fileName}.xlsx`);
};

const ExportToExcel= () => {
  const tableData = useMemo(() => data, []);

  return (
    <>
      <ReactTable
        data={tableData}
        columns={columns}
        defaultPageSize={5}
        className="-striped -highlight"
        resizable={true}
      />
      <button onClick={() => exportExcel(tableData, 'table_data')}>
        Export to Excel
      </button>
    </>
  );
};
export default ExportToExcel;
