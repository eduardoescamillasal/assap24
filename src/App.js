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
    heading: "#1e272e", // Heading color in main content
    cardBackground: "#ffffff",
  },
  fonts: {
    primary: "Roboto, sans-serif",
  },
};

// Sample data for user manuals and videos
const departmentContent = {
  FICO: {
    videoUrl: "https://www.example.com/videos/fico.mp4",
    manual: "This is the user manual for FICO department.",
  },
  HCM: {
    videoUrl: "https://www.example.com/videos/hcm.mp4",
    manual: "This is the user manual for HCM department.",
  },
  MM: {
    videoUrl: "https://www.example.com/videos/mm.mp4",
    manual: "This is the user manual for MM department.",
  },
  PM: {
    videoUrl: "https://www.example.com/videos/pm.mp4",
    manual: "This is the user manual for PM department.",
  },
  PS: {
    videoUrl: "https://www.example.com/videos/ps.mp4",
    manual: "This is the user manual for PS department.",
  },
  QM: {
    videoUrl: "https://www.example.com/videos/qm.mp4",
    manual: "This is the user manual for QM department.",
  },
  SD: {
    videoUrl: "https://www.example.com/videos/sd.mp4",
    manual: "This is the user manual for SD department.",
  },
};

function App() {
  const [documents, setDocuments] = useState([]);
  const [selectedDepartment, setSelectedDepartment] = useState(null); // State for selected department

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
                backgroundColor: "rgba(0,0,0,0.2)",
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
              {Object.keys(departmentContent).map((dept) => (
                <MenuItem key={dept} onClick={() => setSelectedDepartment(dept)}>
                  {dept}
                </MenuItem>
              ))}
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
            overflowY: "auto",
          }}>
          {selectedDepartment ? (
            <>
              <h2 style={{color: theme.colors.heading}}>{selectedDepartment} Department</h2>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "20px",
                }}>
                {/* Video Section */}
                <div>
                  <h3>Training Video</h3>
                  <video controls style={{width: "100%", maxHeight: "400px"}}>
                    <source src={departmentContent[selectedDepartment].videoUrl} type='video/mp4' />
                    Your browser does not support the video tag.
                  </video>
                </div>

                {/* User Manual Section */}
                <div>
                  <h3>User Manual</h3>
                  <p>{departmentContent[selectedDepartment].manual}</p>
                  {/* Alternatively, you can display PDF or rich text content */}
                </div>
              </div>
            </>
          ) : (
            <>
              <h2 style={{color: theme.colors.heading}}>Welcome to the Company Portal</h2>
              <p>Select a department from the sidebar to view content.</p>
            </>
          )}
        </main>
      </div>
    </div>
  );
}

export default App;
