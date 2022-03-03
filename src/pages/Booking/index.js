/**
 *
 * Booking
 *
 */

import Table from "components/Table";
import React, { useState } from "react";
import { Modal, Button } from "antd";

import { Helmet } from "react-helmet";
import { FaPencilAlt, FaPrint, FaPlus, FaSearch } from "react-icons/fa";
import Loading from "components/Loading";
import lid from "assets/img/lid.svg";
import PDF from "components/PDF";

/* eslint-disable react/prefer-stateless-function */

export default function Booking({ props }) {
  const [state, setState] = useState({
    open: false,
    toggleModal: false,
    pdfContent: {},
    deleteId: "",
  });

  const handlePagination = (paging) => {
    props.setQueryValue({ key: "page", value: paging.page });
    props.setQueryValue({ key: "size", value: paging.size });
  };

  const handleAdd = () => {
    props.clearOne();
    props.push("/admin/booking-manage/add");
  };

  const handleEdit = (id) => {
    props.push(`/admin/booking-manage/edit/${id}`);
  };

  const handleQueryChange = (event) => {
    event.persist();
    props.setQueryValue({
      key: event.target.name,
      value: event.target.value,
    });
  };

  const handleSearch = () => {
    props.loadAllRequest(props.query);
    props.setQueryValue({ key: "page", value: 1 });
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const handleOpen = (id) => {
    setState({ ...state, open: true, deleteId: id });
  };

  const handleClose = () => {
    setState({ ...state, open: false });
  };

  const handleDelete = (id) => {
    props.deleteOneRequest(id);
    setState({ ...state, open: false });
  };

  const handleToggelModal = (table_data) => {
    setState({
      ...state,
      toggleModal: !state.toggleModal,
      pdfContent: table_data || {},
    });
  };

  const printModal = (table_data) => {
    return (
      <>
        <span
          className="ml-4 w-8 h-8 inline-flex justify-center items-center leading-none cursor-pointer hover:bg-blue-100 rounded-full relative print-icon"
          onClick={() => handleToggelModal(table_data)}
        >
          <FaPrint className="pencil" />
          <span className="bg-blue-500 dash" />
        </span>
        <Modal
          title="Basic Modal"
          visible={state.toggleModal}
          onOk={handleToggelModal}
          onCancel={handleToggelModal}
        >
          <PDF table_data={state.pdfContent} />
        </Modal>
      </>
    );
  };

  return <React.Fragment>adfds</React.Fragment>;
}
