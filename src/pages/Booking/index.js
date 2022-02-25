/**
 *
 * Booking
 *
 */

import Table from "components/Table";
import React from "react";
import { Modal, Button } from "antd";

import { Helmet } from "react-helmet";
import { FaPencilAlt, FaPrint, FaPlus, FaSearch } from "react-icons/fa";
import Loading from "components/Loading";
import lid from "assets/img/lid.svg";
import PDF from "components/PDF";

/* eslint-disable react/prefer-stateless-function */
export class Booking extends React.Component {
  state = {
    open: false,
    toggleModal: false,
    pdfContent: {},
    deleteId: "",
  };

  componentDidMount() {}

  shouldComponentUpdate(props) {
    if (this.state.cleared) {
      this.setState({ cleared: false });
      props.loadAllRequest(props.query);
    }
    if (
      props.query.size != this.props.query.size ||
      props.query.page != this.props.query.page
    ) {
      props.loadAllRequest(props.query);
    }
    return true;
  }

  handlePagination = (paging) => {
    this.props.setQueryValue({ key: "page", value: paging.page });
    this.props.setQueryValue({ key: "size", value: paging.size });
  };

  handleAdd = () => {
    this.props.clearOne();
    this.props.push("/admin/booking-manage/add");
  };

  handleEdit = (id) => {
    this.props.push(`/admin/booking-manage/edit/${id}`);
  };

  handleQueryChange = (event) => {
    event.persist();
    this.props.setQueryValue({
      key: event.target.name,
      value: event.target.value,
    });
  };

  handleSearch = () => {
    this.props.loadAllRequest(this.props.query);
    this.props.setQueryValue({ key: "page", value: 1 });
  };

  handleKeyPress = (e) => {
    if (e.key === "Enter") {
      this.handleSearch();
    }
  };

  handleOpen = (id) => {
    this.setState({ open: true, deleteId: id });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleDelete = (id) => {
    this.props.deleteOneRequest(id);
    this.setState({ open: false });
  };

  handleToggelModal = (table_data) => {
    console.log(this.state.toggleModal);
    this.setState({
      toggleModal: !this.state.toggleModal,
      pdfContent: table_data || {},
    });
  };

  printModal = (table_data) => {
    return (
      <>
        <span
          className="ml-4 w-8 h-8 inline-flex justify-center items-center leading-none cursor-pointer hover:bg-blue-100 rounded-full relative print-icon"
          onClick={() => this.handleToggelModal(table_data)}
        >
          <FaPrint className="pencil" />
          <span className="bg-blue-500 dash" />
        </span>
        <Modal
          title="Basic Modal"
          visible={this.state.toggleModal}
          onOk={this.handleToggelModal}
          onCancel={this.handleToggelModal}
        >
          <PDF table_data={this.state.pdfContent} />
        </Modal>
      </>
    );
  };

  render() {
    const {
      classes,
      all: { data, page, size, totaldata },
      query,
      loading,
    } = this.props;
    const tablePagination = { page, size, totaldata };

    const tableData = data.map((table_data) => {
      const {
        _id,
        added_at,
        consignee_name,
        consignee_address,
        consignee_contact,
        consignor_name,
        consignor_address,
        consignor_contact,
        invoice,
      } = table_data;
      return [
        added_at,
        <>CN Number Here</>,
        <>
          {consignee_name}
          <br />
          {consignee_address}
          <br />
          {consignee_contact}
        </>,
        <>
          {consignor_name}
          <br />
          {consignor_address}
          <br />
          {consignor_contact}
        </>,
        <>
          {invoice?.data?.map((inv) => (
            <span className="mr-2">{inv.weight}</span>
          ))}
        </>,
        <>
          {invoice?.data?.map((inv) => (
            <span className="mr-2">{inv.pieces}</span>
          ))}
        </>,
        invoice?.state?.total,
        <>
          <div className="flex">
            {this.printModal(table_data)}

            <span
              className="ml-4 w-8 h-8 inline-flex justify-center items-center leading-none cursor-pointer hover:bg-blue-100 rounded-full relative edit-icon"
              onClick={() => this.handleEdit(_id)}
            >
              <FaPencilAlt className="pencil" />
              <span className="bg-blue-500 dash" />
            </span>

            <span
              className="ml-4 w-8 h-8 inline-flex justify-center items-center leading-none cursor-pointer hover:bg-red-100 rounded-full relative trash-icon"
              onClick={() => this.handleOpen(_id)}
            >
              <img className="trash-lid" src={lid} alt="trash-id" />
              <span className="w-3 h-3 rounded-b-sm bg-red-500 mt-1" />
            </span>
          </div>
        </>,
      ];
    });

    return (
      <React.Fragment>
        dsfasf
        {/* <DeleteDialog
          open={this.state.open}
          doClose={this.handleClose}
          doDelete={() => this.handleDelete(this.state.deleteId)}
        /> */}
        <Helmet>
          <title>Booking</title>
        </Helmet>
        <div className="flex justify-between my-3">
          {loading && loading == true ? <Loading /> : <></>}

          <div className="flex items-center">
            <button
              className="bg-blue-500 border border-blue-600 px-3 py-2 leading-none inline-flex items-center cursor-pointer hover:bg-blue-600 transition-all duration-100 ease-in text-sm text-white rounded"
              onClick={this.handleAdd}
            >
              <FaPlus />
              <span className="pl-2">New Booking</span>
            </button>
          </div>
        </div>
        <div className="inline-flex relative mr-4 w-64 mt-4">
          <input
            type="text"
            name="find_booking_title"
            id="booking-title"
            placeholder="Search bookings by title"
            className="m-auto inputbox pr-6"
            value={query.find_booking_title}
            onChange={this.handleQueryChange}
            onKeyDown={this.handleKeyPress}
          />
          <span
            className="inline-flex border-l absolute right-0 top-0 h-8 px-2 mt-1 items-center cursor-pointer text-blue-500"
            onClick={this.handleSearch}
          >
            <FaSearch />
          </span>
        </div>
        {/* consignment number
Consigner - name and (Br/) address
Consignee - name and (Br/) address
Weight
Pieces
Carrier
Print - (POD / Slip)
Actions - Edit - Delete - Details */}
        <Table
          tableHead={[
            "Booking Date",
            "CN Number",
            "Consignee_contact",
            "Consignor_contact",
            "Weight",
            "Pieces",
            "Carrier",
            "Action",
          ]}
          tableData={tableData}
          pagination={tablePagination}
          handlePagination={this.handlePagination}
          loading={loading}
        />
      </React.Fragment>
    );
  }
}
export default Booking;
