import React, {useState, useEffect} from "react";
import {login} from "./services/authProvider";
import {setupSP, getDocuments} from "./services/spService";
import {Sidebar, Menu, MenuItem, SubMenu, sidebarClasses} from "react-pro-sidebar";
import "@fontsource/roboto";
import {FaQuestionCircle, FaCalendarAlt, FaBuilding} from "react-icons/fa";
import logo from "./assets/avantlogo.png";
import ReactPlayer from "react-player";
const theme = {
  colors: {
    primaryStart: "#1e272e",
    primaryEnd: "#485460",
    secondary: "#485460",
    background: "#f1f2f6",
    text: "#ffffff",
    heading: "#1e272e",
    cardBackground: "#ffffff",
  },
  fonts: {
    primary: "Roboto, sans-serif",
  },
};


const departmentContent = {
  FICO: {
    videos: [
      {
        title: "Introduction to FICO",
        videoUrl: "https://www.youtube.com/watch?v=ER4xnUGztaE/videos/fico1.mp4",
        thumbnailUrl: "https://img.youtube.com/vi/ER4xnUGztaE/hqdefault.jpg",
      },
      {
        title: "FICO Advanced Techniques",
        videoUrl:
          "https://www.youtube.com/watch?v=2_8c4zgScQs&list=PLFZrWCcy6oceSnP42lZiBMxjVRKRyTg4M",
        thumbnailUrl: "https://img.youtube.com/vi/2_8c4zgScQs/hqdefault.jpg",
      },
    ],
    manual: "This is the user manual for the FICO department.",
  },
  HCM: {
    videos: [
      {
        title: "Introduction to HCM",
        videoUrl: "https://www.youtube.com/watch?v=FPj8HOc59WU",
        thumbnailUrl: "https://img.youtube.com/vi/FPj8HOc59WU/hqdefault.jpg",
      },
      {
        title: "HCM Best Practices",
        videoUrl: "https://www.youtube.com/watch?v=h-W4DB_B7zs",
        thumbnailUrl: "https://img.youtube.com/vi/h-W4DB_B7zs/hqdefault.jpg",
      },
    ],
    manual: "This is the user manual for the HCM department.",
  },
  MM: {
    videos: [
      {
        title: "Introduction to MM",
        videoUrl: "https://www.youtube.com/watch?v=jkxtXXWqMqo",
        thumbnailUrl: "https://img.youtube.com/vi/jkxtXXWqMqo/hqdefault.jpg",
      },
      {
        title: "MM Workflow Management",
        videoUrl:
          "https://www.youtube.com/watch?v=p93SN2eAPH8&list=PL5LE1pk3CSPpExvyO2gFaaaWE9S8-qcYl",
        thumbnailUrl: "https://img.youtube.com/vi/p93SN2eAPH8/hqdefault.jpg",
      },
    ],
    manual: "This is the user manual for the MM department.",
  },
  PM: {
    videos: [
      {
        title: "Introduction to PM",
        videoUrl: "https://www.youtube.com/watch?v=XshztGYetHE",
        thumbnailUrl: "https://img.youtube.com/vi/XshztGYetHE/hqdefault.jpg",
      },
      {
        title: "PM Project Planning",
        videoUrl: "https://www.youtube.com/watch?v=tAfCHycGa0E",
        thumbnailUrl: "https://img.youtube.com/vi/tAfCHycGa0E/hqdefault.jpg",
      },
    ],
    manual: "This is the user manual for the PM department.",
  },
  PS: {
    videos: [
      {
        title: "Introduction to PS",
        videoUrl: "https://www.example.com/videos/ps1.mp4",
        thumbnailUrl: "https://www.example.com/thumbnails/ps1.jpg",
      },
      {
        title: "PS System Integration",
        videoUrl: "https://www.example.com/videos/ps2.mp4",
        thumbnailUrl: "https://www.example.com/thumbnails/ps2.jpg",
      },
    ],
    manual: "This is the user manual for the PS department.",
  },
  QM: {
    videos: [
      {
        title: "Introduction to QM",
        videoUrl: "https://www.example.com/videos/qm1.mp4",
        thumbnailUrl: "https://www.example.com/thumbnails/qm1.jpg",
      },
      {
        title: "QM Quality Control",
        videoUrl: "https://www.example.com/videos/qm2.mp4",
        thumbnailUrl: "https://www.example.com/thumbnails/qm2.jpg",
      },
    ],
    manual: "This is the user manual for the QM department.",
  },
  SD: {
    videos: [
      {
        title: "Introduction to SD",
        videoUrl: "https://www.example.com/videos/sd1.mp4",
        thumbnailUrl: "https://www.example.com/thumbnails/sd1.jpg",
      },
      {
        title: "SD Sales Strategies",
        videoUrl: "https://www.example.com/videos/sd2.mp4",
        thumbnailUrl: "https://www.example.com/thumbnails/sd2.jpg",
      },
    ],
    manual: "This is the user manual for the SD department.",
  },
};

function App() {
  const [documents, setDocuments] = useState([]);
  const [selectedDepartment, setSelectedDepartment] = useState(null);
  const [selectedVideo, setSelectedVideo] = useState(null); 
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

  // Handle department selection
  const handleDepartmentSelect = (dept) => {
    setSelectedDepartment(dept);
    setSelectedVideo(null); // Reset selected video when department changes
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
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

      <div style={{display: "flex", flex: 1}}>
        <Sidebar
          rootStyles={{
            [`.${sidebarClasses.container}`]: {
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
                fontWeight: "bold",
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
                fontWeight: "bold",
              },
            }}>
            <SubMenu label='Departments' icon={<FaBuilding />}>
              {Object.keys(departmentContent).map((dept) => (
                <MenuItem
                  key={dept}
                  onClick={() => handleDepartmentSelect(dept)}
                  active={selectedDepartment === dept}>
                  {dept}
                </MenuItem>
              ))}
            </SubMenu>
            <MenuItem icon={<FaQuestionCircle />}> FAQ </MenuItem>
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
                {/* Video List Section */}
                <div>
                  <h3>Training Videos</h3>
                  <div
                    style={{
                      display: "flex",
                      flexWrap: "wrap",
                      gap: "20px",
                    }}>
                    {departmentContent[selectedDepartment].videos.map((video, index) => (
                      <div
                        key={index}
                        onClick={() => setSelectedVideo(video)}
                        style={{
                          cursor: "pointer",
                          width: "200px",
                          textAlign: "center",
                          border:
                            selectedVideo === video
                              ? `2px solid ${theme.colors.primaryStart}`
                              : "none",
                          borderRadius: "5px",
                        }}>
                        <img
                          src={video.thumbnailUrl}
                          alt={video.title}
                          style={{
                            width: "100%",
                            height: "auto",
                            borderRadius: "5px",
                          }}
                        />
                        <p>{video.title}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Video Player Section */}
                {selectedVideo && (
                  <div>
                    <h3>{selectedVideo.title}</h3>
                    <ReactPlayer
                      url={selectedVideo.videoUrl}
                      controls
                      width='100%'
                      height='500px'
                    />
                  </div>
                )}

                {/* User Manual Section */}
                <div>
                  <h3>User Manual</h3>
                  <p>{departmentContent[selectedDepartment].manual}</p>
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
