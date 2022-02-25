import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useForm, useField, splitFormProps } from 'react-form';
import { useTable } from 'react-table';

const TableInput = props => {
  // console.log('TableInput', props);
  const { column, row, cell, updateData, defaultValue } = props;
  const onChange = e => {
    if (e.target.value == '' || e.target.value <= 1) {
      updateData(row.index, column.id, parseInt(1));
    } else updateData(row.index, column.id, parseInt(e.target.value));
  };

  return (
    <input
      className="w-full"
      type="number"
      value={defaultValue || cell.value}
      onChange={onChange}
    />
  );
};

const TableInputString = props => {
  const { column, row, cell, updateData } = props;
  const onChange = e => updateData(row.index, column.id, e.target.value);
  return <input type="string" value={cell.value} onChange={onChange} />;
};

const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  th,
  td {
    border: 1px solid lightgray;
    padding: 5px;
  }
`;

const ReactTable = React.memo(props => {
  let count = 0;
  const { setAmountDue, setState, state } = props;
  const columns = React.useMemo(
    () => [
      {
        Header: 'S.N.',
        accessor: 'id',
        Cell: TableInput,
      },
      {
        Header: 'Description of goods',
        accessor: 'descriptionOfGoods',
        Cell: TableInputString,
      },
      {
        Header: 'No of pieces',
        accessor: 'pieces',
        Cell: TableInput,
      },
      {
        Header: 'Weight',
        accessor: 'weight',
        Cell: TableInput,
      },
      {
        Header: 'Declared Value',
        accessor: 'declaredValue',
        Cell: TableInput,
      },
      {
        Header: 'Ref. No.',
        accessor: 'ref',
        Cell: TableInput,
      },
      {
        Header: 'Instruction',
        accessor: 'instruction',
        Cell: TableInputString,
      },
    ],
    [],
  );

  const initialData = [
    {
      id: 1,
      descriptionOfGoods: '',
      pieces: 1,
      weight: 1,
      declaredValue: 1,
      ref: '',
      instruction: '',
    },
  ];

  const [data, setData] = React.useState(props.editForData || initialData);
  const resetData = () => setData(initialData);
  const addRow = () =>
    setData(old => [
      ...old,
      {
        id: old.length + 1,
        descriptionOfGoods: '',
        ref: '',
        instruction: '',
        declaredValue: 1,
        weight: 1,
        pieces: 1,
      },
    ]);

  const updateData = (rowIndex, columnID, value) => {
    setData(oldData =>
      oldData.map((row, index) => {
        if (index === rowIndex) {
          return {
            ...oldData[rowIndex],
            [columnID]: value,
          };
        }
        return row;
      }),
    );
  };

  const table = useTable({ columns, data, updateData });
  const { getTableProps, headerGroups, rows, prepareRow } = table;
  const tableSum = rows.reduce(
    (sum, row) =>
      sum +
      row.values.weight * row.values.pieces * row.values.declaredValue -
      state.discount +
      state.govtTax +
      state.serviceCharge +
      state.volumeCharge,
    0,
  );

  const handleChange = e => {
    e.preventDefault();

    setState({
      ...state,
      [e.target.name]: e.target.value,
      total: tableSum,
    });
    props.handleChange({
      data,
      state: {
        ...state,
        [e.target.name]: e.target.value,
        total: tableSum,
      },
    });
  };

  // console.log(state);

  setAmountDue(tableSum);

  return (
    <>
      <div className="text-right mb-4">
        <button
          className="py-1 px-2 mt-0 mr-2  btn text-white bg-blue-500 border border-blue-600 hover:bg-blue-600"
          type="button"
          onClick={addRow}
        >
          Add Row
        </button>
        <button
          type="button"
          className="py-1 px-2 mt-0  btn text-white bg-blue-500 border border-blue-600 hover:bg-blue-600"
          onClick={resetData}
        >
          Reset Table
        </button>
      </div>
      <StyledTable className="mb-4" {...getTableProps()}>
        <thead>
          {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                <th {...column.getHeaderProps()}>{column.render('Header')}</th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {rows.map(row => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map(cell => (
                  <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </StyledTable>
      <div className="grid grid-cols-5 gap-4">
        <div>
          <label>Service charge</label>
          <input
            className="inputbox"
            type="number"
            name="serviceCharge"
            onChange={handleChange}
            value={state.serviceCharge}
          />
        </div>
        <div>
          <label>Volume charge</label>
          <input
            className="inputbox"
            onChange={handleChange}
            type="number"
            name="volumeCharge"
            value={state.volumeCharge}
          />
        </div>
        <div>
          <label> Gov. Tax</label>

          <input
            className="inputbox"
            type="number"
            name="govtTax"
            onChange={handleChange}
            value={state.govtTax}
          />
        </div>
        <div>
          <label> Discount </label>
          <input
            className="inputbox"
            type="number"
            name="discount"
            onChange={handleChange}
            value={state.discount}
          />
        </div>
        <div>
          <label> Total</label>
          <input
            className="inputbox"
            type="text"
            value={state?.total || ''}
            disabled
          />
        </div>
      </div>
    </>
  );
});

const Invoice = props => {
  const [amountDue, setAmountDue] = React.useState(0);
  const [state, setState] = React.useState(
    props.one?.invoice?.state || {
      serviceCharge: 0,
      volumeCharge: 0,
      govtTax: 0,
      discount: 0,
      total: 0,
    },
  );
  return (
    <ReactTable
      amountDue={amountDue}
      editForData={props.one?.invoice?.data}
      setAmountDue={setAmountDue}
      setState={setState}
      state={state}
      handleChange={props.handleChange}
    />
  );
};

export default Invoice;
