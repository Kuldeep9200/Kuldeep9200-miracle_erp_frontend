import { useState, useEffect } from "react";
import "./navbar.css";
import AppsIcon from "@mui/icons-material/Apps";
import LocalLibraryIcon from "@mui/icons-material/LocalLibrary";
import RemoveFromQueueIcon from "@mui/icons-material/RemoveFromQueue";
import Groups2Icon from "@mui/icons-material/Groups2";
import CreditCardOffIcon from "@mui/icons-material/CreditCardOff";
import StickyNote2Icon from "@mui/icons-material/StickyNote2";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import PowerSettingsNewIcon from "@mui/icons-material/PowerSettingsNew";
import CoPresentIcon from "@mui/icons-material/CoPresent";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import BrandingWatermarkIcon from "@mui/icons-material/BrandingWatermark";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import ConfirmationNumberIcon from "@mui/icons-material/ConfirmationNumber";
import { NavLink,useLocation } from "react-router-dom";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import ClearAllIcon from "@mui/icons-material/ClearAll";
import CloseIcon from "@mui/icons-material/Close";

// import DehazeIcon from "@mui/icons-material/Dehaze";
const Navbar = () => {
  const [isToggled, setIsToggled] = useState(false);

  const handleToggle = () => {
    setIsToggled(!isToggled);
  };
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsToggled(true);
      } else {
        setIsToggled(false);
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  const location = useLocation();

  // List of routes where you want to hide the Navbar
  const hiddenRoutes = ['/', '/dashboard'];

  if (hiddenRoutes.includes(location.pathname)) {
    return null; // Return null to hide the Navbar
  }
  return (
    <>
      <div className="wrapper">
        {isToggled && (
          <div className="sidebar">
            <img
              src={require("../../assest/newlogowebpre.png")}
              className="logoerp"
              alt="Image1"
            />
            <ul>
              <li>
                <NavLink to="/erpdasboard" className="navbartext">
                  {/* <i className="fas fa-home" /> */}
                  <RemoveFromQueueIcon className="iconserp" />
                  ERP Dasboard
                </NavLink>
              </li>
              <li>
                <NavLink to="/admission" className="navbartext">
                  <Groups2Icon className="iconserp"/>
                  Admission
                </NavLink>
              </li>
              <li>
                <NavLink to="/invoice" className="navbartext">
                  <StickyNote2Icon className="iconserp" />
                  Recepit
                </NavLink>
              </li>
              <li>
                <NavLink to="/" className="navbartext">
                  <ConfirmationNumberIcon className="iconserp" />
                  Exam Hall Ticket
                </NavLink>
              </li>
              <li>
                <NavLink to="/" className="navbartext">
                  <ReceiptLongIcon className="iconserp" />
                  LMS Recepit
                </NavLink>
              </li>
              <li>
                <NavLink to="/" className="navbartext">
                  <CreditCardOffIcon className="iconserp" />
                  Cancel Payment
                </NavLink>
              </li>
              <li>
                <NavLink to="/" className="navbartext">
                  <CoPresentIcon className="iconserp" />
                  Faculity
                </NavLink>
              </li>
              <li>
                <NavLink to="/" className="navbartext">
                  <CalendarMonthIcon className="iconserp" />
                  Faculity Batches
                </NavLink>
              </li>
              <li>
                <NavLink to="/" className="navbartext">
                  <BrandingWatermarkIcon className="iconserp" />
                  Branch Material
                </NavLink>
              </li>
              <li>
                <NavLink to="/" className="navbartext">
                  <CurrencyRupeeIcon className="iconserp" />
                  HO Payment
                </NavLink>
              </li>
              <li>
                <NavLink to="/" className="navbartext">
                  <LocalLibraryIcon className="iconserp" />
                  Lab
                </NavLink>
              </li>
              <li>
                <NavLink to="/" className="navbartext">
                  <LocalLibraryIcon className="iconserp" />
                  Lab Faculity
                </NavLink>
              </li>
            </ul>
          </div>
        )}
        <div className="main_content">
          <div className="header">
            <h5 className="textwelcome">
              {" "}
              <ClearAllIcon className="itemfrist" />{" "}
              <ContentCopyIcon className="itemsecond" />{" "}
              <PowerSettingsNewIcon className="itemthird" />{" "}
              <strong className="centermanagement"> Center's ERP Management System </strong>
            </h5>
            <h5 className="turnbutton" onClick={handleToggle}>
              {isToggled ? <CloseIcon /> : <AppsIcon />}
            </h5>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
