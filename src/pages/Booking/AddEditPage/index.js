import React from "react";
import PropTypes from "prop-types";
import { Helmet } from "react-helmet";
import Loading from "components/Loading";
import "components/Table/table.css";
import { FaArrowLeft, FaCheck } from "react-icons/fa";
import CustomInput from "components/CustomInput";
import CustomTextArea from "components/CustomTextArea";
import Invoice from "components/react-table";
import CustomSelect from "components/CustomSelect";
import CustomAutoComplete from "components/CustomAutoComplete";
import DestinationAutoComplete from "components/DestinationAutoComplete";
import CustomReactSelect from "components/CustomReactSelect";

class AddEdit extends React.PureComponent {
  static propTypes = {
    loadOneRequest: PropTypes.func.isRequired,
    addEditRequest: PropTypes.func.isRequired,
    setOneValue: PropTypes.func.isRequired,
    match: PropTypes.shape({
      params: PropTypes.object,
    }),
    one: PropTypes.object.isRequired,
    push: PropTypes.func.isRequired,
  };

  componentDidMount() {
    this.props.clearErrors();
    if (this.props.match.params && this.props.match.params.id) {
      this.props.loadOneRequest(this.props.match.params.id);
    }
  }

  handleChange = (name) => (event) => {
    event.persist();
    this.props.setOneValue({ key: name, value: event.target.value });
  };

  // handle react table changes
  handleTableChange = (event) => {
    this.props.setOneValue({ key: "invoice", value: event });
  };

  // handle react select changes
  handleCustomChangeSelect = (value) => {
    this.props.setOneValue({
      key: "consignor_pan",
      value: value.pan_no,
    });
    this.props.setOneValue({
      key: "consignor_email",
      value: value.email,
    });
    this.props.setOneValue({
      key: "consignor_contact",
      value: value.mobile,
    });
    this.props.setOneValue({
      key: "consignor_email",
      value: value.email,
    });
    this.props.setOneValue({
      key: "consignor_title",
      value: value.label,
    });
    this.props.setOneValue({
      key: "consignor_address",
      value: value.address,
    });
  };

  // autocomplete change for destination
  handleDestinationChangeSelect = (value, select) => {
    this.props.setOneValue({
      key: select.name,
      value: value.value,
    });
  };
  handleChecked = (name) => (event) => {
    event.persist();
    this.props.setOneValue({ key: name, value: event.target.checked });
  };

  handleSave = () => {
    this.props.addEditRequest();
  };

  handleBack = () => {
    this.props.push("/admin/booking-manage");
  };

  render() {
    const bookingModeData = [
      { label: "COD", value: "COD" },
      { label: "Cash", value: "Cash" },
      { label: "Credit", value: "Credit" },
      { label: "ToPay", value: "ToPay" },
    ];

    const serviceTypeData = [
      { label: "Air", value: "Air" },
      { label: "Surface", value: "Surface" },
    ];
    const { classes, bookingMode, one, match, loading, errors } = this.props;
    console.log("one", one, "=============");
    return loading && loading == true ? (
      <Loading />
    ) : (
      <React.Fragment>
        <Helmet>
          <title>
            {match && match.params && match.params.id
              ? "Edit Booking"
              : "Add Booking"}
          </title>
        </Helmet>
        <div className="flex justify-between my-3">
          <div className="page-header">
            <span className="backbtn" onClick={this.handleBack}>
              <FaArrowLeft className="text-xl" />
            </span>
            {match && match.params && match.params.id
              ? "Edit Booking"
              : "Add Booking"}
          </div>
        </div>
        <div className="page-content">
          <div className="grid grid-cols-3 gap-4">
            <CustomSelect
              label="Booking Mode"
              name="bookingMode"
              options={bookingModeData}
              one={one}
              handleChange={this.handleChange}
            />
            {(one.bookingMode == "Credit" || one.bookingMode == "COD") && (
              <CustomAutoComplete
                handleChange={this.handleChange}
                one={one}
                label="Select Client"
                name="Client"
                errors={errors}
              />
            )}

            <CustomSelect
              label="Service Type"
              name="serviceType"
              options={serviceTypeData}
              one={one}
              handleChange={this.handleChange}
            />
          </div>

          <hr className="my-4" />
          {/* <CustomInput
            handleChange={this.handleChange}
            one={one}
            label="Select Client"
            type="text"
            name="client"
            errors={errors}
          /> */}
          <div className="grid grid-cols-2 gap-4">
            <div style={{ width: "80%" }}>
              <CustomInput
                divClassname="pb-2"
                handleChange={this.handleChange}
                one={one}
                label="Consignor"
                type="text"
                defaultValue={one?.user && one?.user?.label}
                name="consignor_title"
                errors={errors}
              />
              {one.bookingMode == "Credit" || one.bookingMode == "COD" ? (
                <CustomInput
                  divClassname="pb-2"
                  handleChange={this.handleChange}
                  one={one}
                  label="Origin / Address"
                  defaultValue={one?.user && one?.user?.address}
                  type="text"
                  name="consignor_address"
                  errors={errors}
                />
              ) : (
                <CustomReactSelect
                  handleChange={this.handleDestinationChangeSelect}
                  one={one}
                  label="Destination / Address"
                  name="consignor_address"
                  errors={errors}
                />
              )}

              <CustomInput
                divClassname="pb-2"
                handleChange={this.handleChange}
                one={one}
                label="Contact Details"
                defaultValue={one?.user && one?.user?.mobile}
                type="text"
                name="consignor_contact"
                errors={errors}
              />
              <CustomInput
                divClassname="pb-2"
                handleChange={this.handleChange}
                one={one}
                label="Email"
                defaultValue={one?.user && one?.user?.email}
                type="email"
                // pattern=".+@globex\.com"
                name="consignor_email"
                errors={errors}
              />
              <CustomInput
                divClassname="pb-2"
                handleChange={this.handleChange}
                one={one}
                defaultValue={one?.user && one?.user?.pan_no}
                label="Pan / Vat no."
                type="text"
                // pattern=".+@globex\.com"
                name="consignor_pan"
                errors={errors}
              />
            </div>

            <div style={{ width: "80%" }}>
              <CustomInput
                divClassname="pb-2"
                handleChange={this.handleChange}
                one={one}
                label="Consignee"
                type="text"
                name="consignee_title"
                errors={errors}
              />

              <CustomReactSelect
                handleChange={this.handleDestinationChangeSelect}
                one={one}
                label="Consignee Address"
                name="consignee_address"
                errors={errors}
              />

              <CustomInput
                divClassname="pb-2"
                handleChange={this.handleChange}
                one={one}
                label="Contact Details"
                type="text"
                name="consignee_contact"
                errors={errors}
              />
              <CustomInput
                divClassname="pb-2"
                handleChange={this.handleChange}
                one={one}
                label="email"
                type="Email"
                // pattern=".+@globex\.com"
                name="consignee_email"
                errors={errors}
              />
              <CustomInput
                divClassname="pb-2"
                handleChange={this.handleChange}
                one={one}
                label="Pan / Vat no."
                type="text"
                // pattern=".+@globex\.com"
                name="consignee_pan"
                errors={errors}
              />
            </div>
          </div>
          <hr className="my-4" />
          <Invoice
            handleChange={this.handleTableChange}
            one={one}
            name="invoice"
            errors={errors}
          />
          {/* <CustomTextArea
            handleChange={this.handleChange}
            one={one}
            label="Description"
            type="text"
            // pattern=".+@globex\.com"
            name="description"
            errors={errors}
          /> */}

          <hr className="my-4" />
          <button
            className="block btn text-white bg-blue-500 border border-blue-600 hover:bg-blue-600"
            onClick={this.handleSave}
          >
            Save
          </button>
        </div>
      </React.Fragment>
    );
  }
}

export default AddEdit;
