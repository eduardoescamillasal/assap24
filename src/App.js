import React, {useState, useEffect} from "react";
import {login} from "./services/authProvider";
import {setupSP, getDocuments} from "./services/spService";
import {Sidebar, Menu, MenuItem, SubMenu, sidebarClasses} from "react-pro-sidebar";
import "@fontsource/roboto"; // Ensure this package is installed
import {FaQuestionCircle, FaCalendarAlt, FaBuilding} from "react-icons/fa"; // Ensure this package is installed
import logo from "./assets/avantlogo.png"; // Import your company logo

// Define a theme object to manage colors and fonts
const theme = {
  colors: {
    primaryStart: "#1e272e", // Gradient start color
    primaryEnd: "#485460", // Gradient end color
    secondary: "#485460", // Hover and active states
    background: "#f1f2f6", // Main content background
    text: "#ffffff", // Text color on dark backgrounds
    textLight: "#1e272e", // Text color on light backgrounds
    heading: "#1e272e", // Heading color in main content
    cardBackground: "#ffffff", // Background for cards/list items
  },
  fonts: {
    primary: "Inter, sans-serif",
  },
};

function App() {
  const [documents, setDocuments] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const account = await login();
        const accessToken = account.idTokenClaims["access_token"];
        setupSP(accessToken);
        const data = await getDocuments("url");
        setDocuments(data);
      } catch (error) {
        console.error("Error fetching documents:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column", // Changed to column to accommodate header
        height: "100vh",
        fontFamily: theme.fonts.primary,
      }}>
      {/* Header Component */}
      <header
        style={{
          display: "flex",
          alignItems: "center",
          backgroundColor: theme.colors.primaryStart,
          padding: "10px 20px",
          color: theme.colors.text,
        }}>
        <img src={logo} alt='Company Logo' style={{height: "40px", marginRight: "20px"}} />
        <h1 style={{margin: 0}}>Avant Santé | SAP Training</h1>
      </header>

      {/* Main Content */}
      <div style={{display: "flex", flex: 1}}>
        <Sidebar
          rootStyles={{
            [`.${sidebarClasses.container}`]: {
              // Apply gradient background
              background: `linear-gradient(to bottom, ${theme.colors.primaryStart}, ${theme.colors.primaryEnd})`,
              color: theme.colors.text,
              width: "250px",
            },
          }}>
          <Menu
            menuItemStyles={{
              button: {
                color: theme.colors.text,
                backgroundColor: "rgba(0,0,0,0.35)",
                transition: "background-color 0.3s ease",
                fontWeight: "bold", // Make the text bold
                "&:hover": {
                  backgroundColor: theme.colors.secondary,
                },
                "&.active": {
                  backgroundColor: theme.colors.secondary,
                },
              },
              icon: {
                color: theme.colors.text,
              },
              label: {
                fontWeight: "bold", // Ensure submenu labels are bold
              },
            }}>
            <SubMenu label='Departments' icon={<FaBuilding />}>
              <MenuItem> FICO </MenuItem>
              <MenuItem> HCM </MenuItem>
              <MenuItem> MM </MenuItem>
              <MenuItem> PM </MenuItem>
              <MenuItem> PS </MenuItem>
              <MenuItem> QM </MenuItem>
              <MenuItem> SD </MenuItem>
            </SubMenu>
            <MenuItem icon={<FaQuestionCircle />}> FAQ </MenuItem>
            {/* <MenuItem icon={<FaCalendarAlt />}> Calendar </MenuItem> */}
          </Menu>
        </Sidebar>
        <main
          style={{
            flex: 1,
            padding: "20px",
            backgroundColor: theme.colors.background,
          }}>
          <h2 style={{color: theme.colors.heading}}>SharePoint Documents</h2>
          <ul style={{listStyleType: "none", padding: 0}}>
            {documents.map((doc) => (
              <li
                key={doc.Id}
                style={{
                  backgroundColor: theme.colors.cardBackground,
                  margin: "10px 0",
                  padding: "10px",
                  borderRadius: "5px",
                  boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                }}>
                {doc.Title}
              </li>
            ))}
          </ul>
        </main>
      </div>
    </div>
  );
}

export default App;
