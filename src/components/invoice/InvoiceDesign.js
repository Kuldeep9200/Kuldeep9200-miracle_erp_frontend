// InvoiceDetails.js
import "@progress/kendo-theme-material/dist/all.css";
import { Button } from "@progress/kendo-react-buttons";
import { PDFExport } from "@progress/kendo-react-pdf";
import React, { useState, useRef } from "react";
import "hammerjs";
import "./invoice.css";
import { useAuth } from "../context/AuthContext";
const InvoiceDetails = ({ selectedInvoice }) => {
  const { authToken } = useAuth();
  const user = authToken && authToken.user ? authToken.user : null;
  const totalAmount = selectedInvoice.DownPayment;
  const sgstPercentage = 9; // SGST percentage
  const cgstPercentage = 9; // CGST percentage
  const sgst = (totalAmount * sgstPercentage) / 100;
  const cgst = (totalAmount * cgstPercentage) / 100;

  // Calculate total GST
  const totalGST = sgst + cgst;

  // Calculate total amount after GST
  const totalAmountAfterGST = totalAmount - totalGST;
  const [layoutSelection, setLayoutSelection] = useState({
    text: "A4",
    value: "size-a4",
  });

  const pdfExportComponent = useRef(null);

  const handleExportWithComponent = (event) => {
    pdfExportComponent.current.save();
  };

  return (
    <div>
      {selectedInvoice && (
        <div>
          <div id="example">
            <div className="box wide hidden-on-narrow"></div>
            <div className="page-container hidden-on-narrow">
              <PDFExport ref={pdfExportComponent}>
                <div className={`pdf-page ${layoutSelection.value}`}>
                  <div className="main-page">
                    <div className="sub-page">
                      <div
                        className="addreshcontainer"
                        style={{ border: "2px solid blue" }}
                      >
                        <div
                          className="myinvoice"
                          style={{ padding: "5px", display: "flex" }}
                        >
                          <div className="myinvoice1" style={{ width: "50%" }}>
                            {/* <img
                              src={require("../../assest/rrmircle.png")}
                              className="logoinvoice"
                              alt="miracle-logo"
                              style={{ width: "100%" }}
                            /> */}
                          </div>
                          <div
                            className="myinvoice2"
                            style={{
                              width: "92%",
                              justifyContent: "space-between",
                              display: "flex",
                            }}
                          >
                            <div
                              className="myinvoice3"
                              style={{
                                justifyContent: "space-between",
                              }}
                            >
                              <h2
                                style={{
                                  textDecoration: "underline",
                                  fontSize: "10px",
                                }}
                              >
                                Receipt
                              </h2>
                              <h4
                                style={{
                                  fontSize: "10px",
                                  marginLeft: "54px",
                                  marginTop: 0,
                                  marginBottom: 0,
                                }}
                              >
                                Service Provider : <br/> Miracle IT Career Acedemy
                              </h4>
                            </div>
                            <div className="myinvoice3" style={{marginTop:"-22px"}}>
                              <p style={{ fontSize: "10px", textAlign: "end" }}>
                                Center Copy <br /> Receipt No:
                                {selectedInvoice.name}
                              </p>
                            </div>
                          </div>
                        </div>
                        <div className="myinvoice" style={{ display: "flex" }}>
                          <div className="invoice3" style={{ width: "50%" }} />
                          <div className="invoice3" style={{ width: "60%" }}>
                            <p
                              style={{
                                marginTop: "-59px",
                                marginBottom: 0,
                                fontSize: "10px",
                              }}
                            >
                           
                              <span
                                style={{
                                  fontWeight: 300,
                                  fontSize: "10px",
                                  marginTop: "24px",
                                }}
                              >
                                3rd Floor. Narayani Complex. Zone-II MP Nagar ,
                                Bhopal
                              </span>
                            </p>
                          </div>
                        </div>
                      </div>
                      <div
                        className="myinvoice"
                        style={{
                          borderTop: "none",
                          borderBottom: "none",
                          // borderBottom:"none",
                          marginTop: "-18px",
                          display: "flex",
                          border: "2px solid blue",
                        }}
                      >
                        <h3
                          style={{
                            marginTop: 0,
                            marginBottom: 0,
                            fontSize: "12px",
                            fontWeight: "500",
                          }}
                        >
                          Student Name : {selectedInvoice.studentid}
                        </h3>
                      </div>
                      <div
                        className="myinvoice"
                        style={{
                          display: "flex",
                          borderTop: 0,
                          border: "2px solid blue",
                          // borderTop: "none",
                          padding: 5,
                          justifyContent: "space-between",
                        }}
                      >
                        <h3
                          style={{
                            marginTop: 0,
                            marginBottom: 0,
                            fontSize: "10px",
                            fontWeight: "500",
                          }}
                        >
                          Roll No:{selectedInvoice.code}
                        </h3>
                        <h3
                          style={{
                            marginTop: 0,
                            marginBottom: 0,
                            fontSize: "10px",
                            fontWeight: "500",
                          }}
                        >
                          Cource : CISP 4.0
                        </h3>
                        <h3
                          style={{
                            marginTop: 0,
                            marginBottom: 0,
                            fontSize: "10px",
                            fontWeight: "500",
                          }}
                        >
                          Date : {selectedInvoice.MobileNo}
                        </h3>
                      </div>

                      <div
                        className="myinvoice"
                        style={{
                          display: "flex",
                          border: "2px solid blue",
                          borderTop: 0,
                        }}
                      >
                        <div
                          className="myinvoice01"
                          style={{ width: "70%", textAlign: "center" }}
                        >
                          <h3
                            style={{
                              marginTop: 0,
                              marginBottom: 0,
                              fontSize: "12px",
                            }}
                          >
                            Particular
                          </h3>
                        </div>
                        <div
                          className="myinvoice01"
                          style={{
                            width: "30%",
                            borderLeft: "1px solid blue",
                            textAlign: "center",
                          }}
                        >
                          <h3
                            style={{
                              marginTop: 0,
                              marginBottom: 0,
                              fontSize: "12px",
                            }}
                          >
                            Amount
                          </h3>
                        </div>
                      </div>

                      <div
                        className="myinvoice"
                        style={{
                          display: "flex",
                          border: "2px solid blue",
                          borderTop: 0,
                        }}
                      >
                        <div className="myinvoice01" style={{ width: "70%" }}>
                          <p
                            style={{
                              marginLeft: 3,
                              marginTop: 0,
                              marginBottom: 0,
                              fontSize: "10px",
                            }}
                          >
                            Course Fees [SAC:00440229]
                          </p>
                        </div>
                        <div
                          className="myinvoice01"
                          style={{ width: "30%", borderLeft: "1px solid blue" }}
                        >
                          <p
                            style={{
                              marginLeft: 3,
                              marginTop: 0,
                              marginBottom: 0,
                              fontSize: "10px",
                            }}
                          >
                            {totalAmountAfterGST}
                          </p>
                        </div>
                      </div>
                      <div
                        className="myinvoice"
                        style={{
                          display: "flex",
                          border: "2px solid blue",
                          borderTop: 0,
                        }}
                      >
                        <div className="myinvoice01" style={{ width: "70%" }}>
                          <p
                            style={{
                              marginLeft: 3,
                              marginTop: 0,
                              marginBottom: 0,
                              fontSize: "10px",
                            }}
                          >
                            CGST @9%
                          </p>
                        </div>
                        <div
                          className="myinvoice01"
                          style={{ width: "30%", borderLeft: "1px solid blue" }}
                        >
                          <p
                            style={{
                              marginLeft: 3,
                              marginTop: 0,
                              marginBottom: 0,
                              fontSize: "10px",
                            }}
                          >
                            {sgst}
                          </p>
                        </div>
                      </div>

                      <div
                        className="myinvoice"
                        style={{
                          display: "flex",
                          border: "2px solid blue",
                          borderTop: 0,
                        }}
                      >
                        <div className="myinvoice01" style={{ width: "70%" }}>
                          <p
                            style={{
                              marginLeft: 3,
                              marginTop: 0,
                              marginBottom: 0,
                              fontSize: "10px",
                            }}
                          >
                            CGST @9%
                          </p>
                        </div>
                        <div
                          className="myinvoice01"
                          style={{ width: "30%", borderLeft: "1px solid blue" }}
                        >
                          <p
                            style={{
                              marginLeft: 3,
                              marginTop: 0,
                              marginBottom: 0,
                              fontSize: "10px",
                            }}
                          >
                            {cgst}
                          </p>
                        </div>
                      </div>

                      <div
                        className="myinvoice"
                        style={{
                          display: "flex",
                          border: "2px solid blue",
                          borderTop: 0,
                        }}
                      >
                        <div
                          className="myinvoice01"
                          style={{ width: "70%", textAlign: "end" }}
                        >
                          <p
                            style={{
                              marginRight: 3,
                              fontWeight: "bold",
                              marginTop: 0,
                              fontSize: "12px",
                              marginBottom: 0,
                            }}
                          >
                            Total Fees Paid
                          </p>
                        </div>
                        <div
                          className="myinvoice01"
                          style={{
                            width: "30%",
                            borderLeft: "1px solid blue",
                            fontWeight: "bold",
                          }}
                        >
                          <p
                            style={{
                              marginLeft: 3,
                              marginTop: 0,
                              marginBottom: 0,
                            }}
                          >
                            {totalAmount}/-
                          </p>
                        </div>
                      </div>

                      <div
                        className="myinvoice"
                        style={{
                          display: "flex",
                          border: "2px solid blue",
                          borderTop: 0,
                        }}
                      >
                        <div className="myinvoice01" style={{ width: "70%" }}>
                          <p
                            style={{
                              padding: 3,
                              borderBottom: "2px solid blue",
                              fontSize: "10px",
                              margin: 0,
                            }}
                          >
                            Amount in Words
                          </p>
                          <p
                            style={{
                              padding: 3,
                              // borderBottom: "2px solid blue",
                              fontSize: "10px",
                              margin: 0,
                            }}
                          >
                            Paid By : {selectedInvoice.emailId}
                          </p>
                          {/* <p
                            style={{ padding: 3, margin: 0, fontSize: "10px" }}
                          >
                            Date :{selectedInvoice.MobileNo}
                          </p> */}
                        </div>
                        <div
                          className="myinvoice01"
                          style={{ width: "30%", borderLeft: "1px solid blue" }}
                        >
                          <p style={{ margin: "auto", fontSize: "10px" }}>
                            Authorised signature /-
                          </p>
                        </div>
                      </div>
                      <div
                        className="myinvoice"
                        style={{
                          display: "flex",
                          border: "2px solid blue",
                          borderBottom: 0,
                          borderTop: 0,
                        }}
                      >
                        <div
                          className="myinvoice01"
                          style={{ width: "50%", textAlign: "left" }}
                        >
                          <h3
                            style={{
                              marginTop: 0,
                              marginBottom: "13px",
                              marginLeft: 5,
                              fontSize: "1rem",
                              fontSize: "12px",
                            }}
                          >
                            Student Signature:
                          </h3>
                        </div>
                      </div>
                      <div
                        className="myinvoice"
                        style={{
                          display: "flex",
                          border: "2px solid blue",
                          borderTop: 0,
                        }}
                      >
                        <div
                          className="myinvoice01"
                          style={{ textAlign: "left" }}
                        >
                          <p
                            className="tramsline"
                            style={{
                              marginTop: 0,
                              marginBottom: 8,
                              marginLeft: 5,
                              fontSize: "10px",
                            }}
                          >
                            1) Any issues/legal matters are subject to Bhopal
                            jurisdiction. 2) Cheque / D.D in Favor Of Miracle
                            Infotech. 3) Certified that the particulars given in
                            the invoice are true and correct according to best
                            of our belief and knowledge
                          </p>
                        </div>
                      </div>

                      <div
                        style={{
                          border: "2px dotted #3498db",
                          marginTop: 4,
                          marginBottom: 4,
                        }}
                      />
                      <div
                        className="addreshcontainer"
                        style={{ border: "2px solid blue" }}
                      >
                        <div
                          className="myinvoice"
                          style={{ padding: "5px", display: "flex" }}
                        >
                          <div className="myinvoice1" style={{ width: "50%" }}>
                            {/* <img
                              src={require("../../assest/rrmircle.png")}
                              className="logoinvoice"
                              alt="miracle-logo"
                              style={{ width: "100%" }}
                            /> */}
                          </div>


                          <div
                            className="myinvoice2"
                            style={{
                              width: "92%",
                              justifyContent: "space-between",
                              display: "flex",
                              marginTop: "0px",
                            }}
                          >
                            <div
                              className="myinvoice3"
                              style={{
                                justifyContent: "space-between",
                              }}
                            >
                              <h2
                                style={{
                                  textDecoration: "underline",
                                  fontSize: "10px",
                                }}
                              >
                                Receipt
                              </h2>
                              <h4
                                style={{
                                  fontSize: "10px",
                                  marginLeft: "54px",
                                  marginTop: 0,
                                  marginBottom: 0,
                                }}
                              >
                                Service Provider :<br/> Miracle IT Career Acedemy
                              </h4>
                            </div>
                            <div className="myinvoice3" style={{marginTop:"-22px"}}>
                              <p style={{ fontSize: "10px", textAlign: "end" }}>
                                Center Copy <br /> Receipt No:
                                {selectedInvoice.name}
                              </p>
                            </div>
                          </div>
                        </div>
                        <div className="myinvoice" style={{ display: "flex" }}>
                          <div className="invoice3" style={{ width: "50%" }} />
                          <div className="invoice3" style={{ width: "60%" }}>
                          <p
                              style={{
                                marginTop: "-59px",
                                marginBottom: 0,
                                fontSize: "10px",
                              }}
                            >
                           
                              <span
                                style={{
                                  fontWeight: 300,
                                  fontSize: "10px",
                                  marginTop: "27px",
                                  marginBottom:"6px"
                                }}
                              >
                                3rd Floor. Narayani Complex. Zone-II MP Nagar ,
                                Bhopal
                              </span>
                            </p>
                          </div>
                        </div>
                      </div>
                      <div
                        className="myinvoice"
                        style={{
                          borderTop: "none",
                          // borderBottom:"none",
                          display: "flex",
                          marginTop: "-18px",
                          borderBottom: "none",
                          border: "2px solid blue",
                        }}
                      >
                        <h3
                          style={{
                            marginTop: 0,
                            marginBottom: 0,
                            fontSize: "12px",
                            fontWeight: "500",
                          }}
                        >
                          Student Name : {selectedInvoice.studentid}
                        </h3>
                      </div>
                      <div
                        className="myinvoice"
                        style={{
                          display: "flex",
                          borderTop: 0,
                          border: "2px solid blue",
                          // borderTop: "none",
                          padding: 5,
                          justifyContent: "space-between",
                        }}
                      >
                        <h3
                          style={{
                            marginTop: 0,
                            marginBottom: 0,
                            fontSize: "10px",
                            fontWeight: "500",
                          }}
                        >
                          Roll No:{selectedInvoice.code}
                        </h3>
                        <h3
                          style={{
                            marginTop: 0,
                            marginBottom: 0,
                            fontSize: "10px",
                            fontWeight: "500",
                          }}
                        >
                          Cource : CISP 4.0
                        </h3>
                        <h3
                          style={{
                            marginTop: 0,
                            marginBottom: 0,
                            fontSize: "10px",
                            fontWeight: "500",
                          }}
                        >
                          Date : {selectedInvoice.MobileNo}
                        </h3>
                      </div>

                      <div
                        className="myinvoice"
                        style={{
                          display: "flex",
                          border: "2px solid blue",
                          borderTop: 0,
                        }}
                      >
                        <div
                          className="myinvoice01"
                          style={{ width: "70%", textAlign: "center" }}
                        >
                          <h3
                            style={{
                              marginTop: 0,
                              marginBottom: 0,
                              fontSize: "12px",
                            }}
                          >
                            Particular
                          </h3>
                        </div>
                        <div
                          className="myinvoice01"
                          style={{
                            width: "30%",
                            borderLeft: "1px solid blue",
                            textAlign: "center",
                          }}
                        >
                          <h3
                            style={{
                              marginTop: 0,
                              marginBottom: 0,
                              fontSize: "12px",
                            }}
                          >
                            Amount
                          </h3>
                        </div>
                      </div>

                      <div
                        className="myinvoice"
                        style={{
                          display: "flex",
                          border: "2px solid blue",
                          borderTop: 0,
                        }}
                      >
                        <div className="myinvoice01" style={{ width: "70%" }}>
                          <p
                            style={{
                              marginLeft: 3,
                              marginTop: 0,
                              marginBottom: 0,
                              fontSize: "10px",
                            }}
                          >
                            Course Fees [SAC:00440229]
                          </p>
                        </div>
                        <div
                          className="myinvoice01"
                          style={{ width: "30%", borderLeft: "1px solid blue" }}
                        >
                          <p
                            style={{
                              marginLeft: 3,
                              marginTop: 0,
                              marginBottom: 0,
                              fontSize: "10px",
                            }}
                          >
                            {totalAmountAfterGST}
                          </p>
                        </div>
                      </div>
                      <div
                        className="myinvoice"
                        style={{
                          display: "flex",
                          border: "2px solid blue",
                          borderTop: 0,
                        }}
                      >
                        <div className="myinvoice01" style={{ width: "70%" }}>
                          <p
                            style={{
                              marginLeft: 3,
                              marginTop: 0,
                              marginBottom: 0,
                              fontSize: "10px",
                            }}
                          >
                            CGST @9%
                          </p>
                        </div>
                        <div
                          className="myinvoice01"
                          style={{ width: "30%", borderLeft: "1px solid blue" }}
                        >
                          <p
                            style={{
                              marginLeft: 3,
                              marginTop: 0,
                              marginBottom: 0,
                              fontSize: "10px",
                            }}
                          >
                            {cgst}
                          </p>
                        </div>
                      </div>

                      <div
                        className="myinvoice"
                        style={{
                          display: "flex",
                          border: "2px solid blue",
                          borderTop: 0,
                        }}
                      >
                        <div className="myinvoice01" style={{ width: "70%" }}>
                          <p
                            style={{
                              marginLeft: 3,
                              marginTop: 0,
                              marginBottom: 0,
                              fontSize: "10px",
                            }}
                          >
                            CGST @9%
                          </p>
                        </div>
                        <div
                          className="myinvoice01"
                          style={{ width: "30%", borderLeft: "1px solid blue" }}
                        >
                          <p
                            style={{
                              marginLeft: 3,
                              marginTop: 0,
                              marginBottom: 0,
                              fontSize: "10px",
                            }}
                          >
                            {sgst}
                          </p>
                        </div>
                      </div>
                      <div
                        className="myinvoice"
                        style={{
                          display: "flex",
                          border: "2px solid blue",
                          borderTop: 0,
                        }}
                      >
                        <div
                          className="myinvoice01"
                          style={{ width: "70%", textAlign: "end" }}
                        >
                          <p
                            style={{
                              marginRight: 3,
                              fontWeight: "bold",
                              marginTop: 0,
                              marginBottom: 0,
                              fontSize: "12px",
                            }}
                          >
                            Total Fees Paid
                          </p>
                        </div>
                        <div
                          className="myinvoice01"
                          style={{
                            width: "30%",
                            borderLeft: "1px solid blue",
                            fontWeight: "bold",
                          }}
                        >
                          <p
                            style={{
                              marginLeft: 3,
                              marginTop: 0,
                              marginBottom: 0,
                            }}
                          >
                            {selectedInvoice.DownPayment}/-
                          </p>
                        </div>
                      </div>

                      <div
                        className="myinvoice"
                        style={{
                          display: "flex",
                          border: "2px solid blue",
                          borderTop: 0,
                        }}
                      >
                        <div className="myinvoice01" style={{ width: "70%" }}>
                          <p
                            style={{
                              padding: 3,
                              borderBottom: "2px solid blue",
                              fontSize: "10px",
                              margin: 0,
                            }}
                          >
                            Amount in Words
                          </p>
                          <p
                            style={{
                              padding: 3,
                              // borderBottom: "2px solid blue",
                              fontSize: "10px",
                              margin: 0,
                            }}
                          >
                            Paid By : {selectedInvoice.emailId}
                          </p>
                        </div>
                        <div
                          className="myinvoice01"
                          style={{ width: "30%", borderLeft: "1px solid blue" }}
                        >
                          <p style={{ margin: "auto", fontSize: "10px" }}>
                            Authorised signature /-
                          </p>
                        </div>
                      </div>
                      <div
                        className="myinvoice"
                        style={{
                          display: "flex",
                          border: "2px solid blue",
                          borderBottom: 0,
                          borderTop: 0,
                        }}
                      >
                        <div
                          className="myinvoice01"
                          style={{ width: "50%", textAlign: "left" }}
                        >
                          <h3
                            style={{
                              marginTop: 0,
                              marginBottom: "13px",
                              marginLeft: 5,
                              fontSize: "1rem",
                              fontSize: "12px",
                            }}
                          >
                            Student Signature:
                          </h3>
                        </div>
                      </div>
                      <div
                        className="myinvoice"
                        style={{
                          display: "flex",
                          border: "2px solid blue",
                          borderTop: 0,
                        }}
                      >
                        <div
                          className="myinvoice01"
                          style={{ textAlign: "left" }}
                        >
                          <p
                            className="tramsline"
                            style={{
                              marginTop: 0,
                              marginBottom: 8,
                              marginLeft: 5,
                              fontSize: "10px",
                            }}
                          >
                            1) Any issues/legal matters are subject to Bhopal
                            jurisdiction. 2) Cheque / D.D in Favor Of Miracle
                            Infotech. 3) Certified that the particulars given in
                            the invoice are true and correct according to best
                            of our belief and knowledge
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </PDFExport>
            </div>
            <div
              className="box-col"
              style={{
                textAlign: "center",
                marginBottom: "20px",
                width: "89px",
              }}
            >
              <Button primary={true} onClick={handleExportWithComponent}>
                Export
              </Button>
            </div>
          </div>
          {/* <p>Invoice Number: {selectedInvoice.name}</p>
          <p>Student ID: {selectedInvoice.studentid}</p>
          <p>Mobile Number: {selectedInvoice.MobileNo}</p>
          <p>Mobile Number c: {selectedInvoice.Cource}</p>
          <p>Mobile Number: {selectedInvoice.remainingFees}</p> */}
        </div>
      )}
    </div>
  );
};

export default InvoiceDetails;
