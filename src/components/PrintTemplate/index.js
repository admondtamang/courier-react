import React from 'react';
import './print.style.css';
export default function PrintTemplate({ data }) {
  const {
    _id,
    added_at,
    consignee_name,
    consignee_title,
    consignee_address,
    consignee_contact,
    consignor_name,
    consignor_title,
    consignor_address,
    consignor_contact,
    invoice,
    bookingMode,
    serviceType,
  } = data;

  return (
    <table style={{ padding: '20px' }}>
      <tbody>
        <tr>
          <td colspan="2">Easytake Logo</td>
          <td colspan="3" style={{ textAlign: 'center' }}>
            <b>EASYTAKE CARRIERS PVT LTD</b>
            <br />
            Kuleshwor, Kathmandu, Nepal <br />
            Tel : +977-9841678986 <br />
            PAN NO : 610137837
          </td>
          <td colspan="2" style={{ textAlign: 'center' }}>
            CONSIGNMENT NOTE NON NEGOTIABLE <br />
            <br />
            BAR CODE <br />* 0 0 1 0 0 1 0 0 1 *
          </td>
        </tr>
        <tr>
          <td colspan="2">
            <b>Origin : Kathmandu</b>
          </td>
          <td rowspan="3" colspan="3">
            Sender <br />
            Sender name : <b>{consignee_title}</b>
            <br />
            Sender Address :<b>{consignee_address}</b>
          </td>
          <td rowspan="3" colspan="2">
            Receiver <br />
            Receiver name: <b>{consignor_title}</b>
            <br />
            Receiver Address :<b>{consignor_address}</b>
          </td>
        </tr>
        <tr>
          <td colspan="2">
            <b>Destination : {consignor_address}</b>
          </td>
        </tr>
        <tr>
          <td colspan="2">
            <b>Service Type : By {serviceType}</b>
          </td>
        </tr>
        <tr>
          <td>S N</td>
          <td>Description of goods</td>
          <td>No of pcs</td>
          <td>Weight</td>
          <td>Declear Value </td>
          <td>Refrance No.</td>
          <td>Instruction </td>
        </tr>
        {invoice?.data?.map((row, index) => (
          <tr>
            <td>{index + 1}</td>
            <td>{row.descriptionOfGoods}</td>
            <td>{row.pieces}</td>
            <td>{row.weight}</td>
            <td>{row.declaredValue}</td>
            <td>{row.ref}</td>
            <td>{row.instruction}</td>
          </tr>
        ))}
        <tr>
          <td style={{ textAlign: 'center', fontSize: '10px' }} colspan="5">
            Visit / Track : www.easytakenepal.com / Email :
            info@easytakenepal.com <br />
            Our Liability for any Loss & Damage to the Shipment is Rs 100 Only
            Without Insurance. <br />
            I/We accept the above terms and condition and those self-worth on
            the reverse of the shipper's copy <br />
            of this Nonnegotiable Consignment Note and warrant that information
            contained on this is true and <br />
            correct. Shipment does not contain any cash & cash equivalent /
            contraband. Booking Currency & <br />
            Jewellery is Banned. Claims should be sattled within 30 days of
            booking center only. <br />
          </td>

          <td colspan="2" style={{ textAlign: 'center' }} rowspan="2">
            Payment Mode : {bookingMode} <br />
            Charge Rs 1000 <br />
            q r code <br />
          </td>
        </tr>
        <tr style={{ fontSize: '10px' }}>
          <td colspan="2">
            User : Sudarshan <br />
            Date : 2021/11/30
          </td>
          <td colspan="3">
            Location : Kuleswor <br />
            Time : 10:30 AM
          </td>
        </tr>
      </tbody>
    </table>
  );
}
