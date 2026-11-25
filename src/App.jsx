
import React, { useEffect, useState } from "react";
import "./style.css";

const ADMIN_EMAIL = "admin@tru.com";
const ADMIN_PASSWORD = "admin123";

const demoUsers = [
  {
    id: 1,
    name: "Likith Kumar Reddy",
    email: "likith@tru.com",
    password: "1234",
    username: "likith",
    role: "user",
    bio: "",
    interests: "",
    photo: "",
    loginCount: 0,
    createdAt: new Date().toLocaleString(),
    lastLogin: "Not logged in yet"
  },
  {
    id: 2,
    name: "Meena",
    email: "meena@tru.com",
    password: "1234",
    username: "meena",
    role: "user",
    bio: "",
    interests: "",
    photo: "",
    loginCount: 0,
    createdAt: new Date().toLocaleString(),
    lastLogin: "Not logged in yet"
  }
];

const initialCircles = [
  { id: 1, name: "Music Lovers", description: "Share songs and discover new music.", members: ["likith"] },
  { id: 2, name: "Sports Community", description: "Play, compete and enjoy sports.", members: ["likith"] },
  { id: 3, name: "Movie Fans", description: "Discuss movies and share reviews.", members: ["likith"] },
  { id: 4, name: "Travel Buddies", description: "Explore new places together.", members: ["meena"] }
];

const events = [
  {
    id: 1,
    name: "Open Mic Night",
    date: "December 10, 2026",
    location: "Vijayawada",
    description: "Music, singing and unforgettable performances.",
    category: "MUSIC",
    symbol: "♪",
    art: "music-art"
  },
  {
    id: 2,
    name: "Photography Walk",
    date: "December 15, 2026",
    location: "Vijayawada",
    description: "Capture beautiful moments with new friends.",
    category: "CREATIVE",
    symbol: "◉",
    art: "photo-art"
  },
  {
    id: 3,
    name: "Sports Meet",
    date: "December 20, 2026",
    location: "KL University",
    description: "Play together, compete and have fun.",
    category: "SPORTS",
    symbol: "★",
    art: "sports-art"
  },
  {
    id: 4,
    name: "Creative Workshop",
    date: "December 25, 2026",
    location: "Vijayawada",
    description: "Explore your creativity and learn something new.",
    category: "WORKSHOP",
    symbol: "✦",
    art: "workshop-art"
  },
  {
    id: 5,
    name: "Coffee Connect",
    date: "December 28, 2026",
    location: "Vijayawada",
    description: "Make new friends over coffee and conversations.",
    category: "SOCIAL",
    symbol: "C",
    art: "coffee-art"
  },
  {
    id: 6,
    name: "Weekend Trip",
    date: "January 5, 2027",
    location: "Andhra Pradesh",
    description: "Explore new places and enjoy the journey.",
    category: "TRAVEL",
    symbol: "↗",
    art: "travel-art"
  }
];

function getSaved(key, fallback) {
  try {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : fallback;
  } catch {
    return fallback;
  }
}

function App() {
  const [users, setUsers] = useState(() => getSaved("truUsers", demoUsers));
  const [posts, setPosts] = useState(() => getSaved("truPosts", []));
  const [circles, setCircles] = useState(() => getSaved("truCircles", initialCircles));
  const [messages, setMessages] = useState(() => getSaved("truMessages", []));
  const [requests, setRequests] = useState(() => getSaved("truRequests", []));
  const [loginHistory, setLoginHistory] = useState(() => getSaved("truLoginHistory", []));
  const [eventRegistrations, setEventRegistrations] = useState(() => getSaved("truEventRegistrations", []));

  const [current, setCurrent] = useState(() => getSaved("truUser", null));
  const [page, setPage] = useState(() => getSaved("truUser", null) ? "home" : "login");
  const [authMode, setAuthMode] = useState("login");

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [caption, setCaption] = useState("");
  const [postImage, setPostImage] = useState("");
  const [visibility, setVisibility] = useState("public");
  const [selectedCircle, setSelectedCircle] = useState("");

  const [circleName, setCircleName] = useState("");
  const [circleDescription, setCircleDescription] = useState("");
  const [search, setSearch] = useState("");

  const [selectedChat, setSelectedChat] = useState(null);
  const [messageText, setMessageText] = useState("");

  const [profileBio, setProfileBio] = useState("");
  const [profileInterests, setProfileInterests] = useState("");
  const [profilePhoto, setProfilePhoto] = useState("");

  useEffect(() => localStorage.setItem("truUsers", JSON.stringify(users)), [users]);
  useEffect(() => localStorage.setItem("truPosts", JSON.stringify(posts)), [posts]);
  useEffect(() => localStorage.setItem("truCircles", JSON.stringify(circles)), [circles]);
  useEffect(() => localStorage.setItem("truMessages", JSON.stringify(messages)), [messages]);
  useEffect(() => localStorage.setItem("truRequests", JSON.stringify(requests)), [requests]);
  useEffect(() => localStorage.setItem("truLoginHistory", JSON.stringify(loginHistory)), [loginHistory]);
  useEffect(() => localStorage.setItem("truEventRegistrations", JSON.stringify(eventRegistrations)), [eventRegistrations]);

  useEffect(() => {
    if (current) {
      localStorage.setItem("truUser", JSON.stringify(current));
    } else {
      localStorage.removeItem("truUser");
    }
  }, [current]);

  const createUsername = (fullName, userEmail) => {
    const base = fullName.toLowerCase().replace(/[^a-z0-9]/g, "") || userEmail.split("@")[0];
    let username = base;
    let count = 1;

    while (users.some(user => user.username?.toLowerCase() === username.toLowerCase())) {
      username = base + count;
      count++;
    }

    return username;
  };

  // SIGNUP
  const handleRegister = (e) => {
    e.preventDefault();

    const cleanName = name.trim();
    const cleanEmail = email.trim().toLowerCase();

    if (!cleanName || !cleanEmail || !password) {
      alert("Please enter your name, email and password.");
      return;
    }

    if (users.some(user => user.email.toLowerCase() === cleanEmail)) {
      alert("This email is already registered. Please login.");
      return;
    }

    if (cleanEmail === ADMIN_EMAIL) {
      alert("This email is reserved for the administrator.");
      return;
    }

    const newUser = {
      id: Date.now(),
      name: cleanName,
      email: cleanEmail,
      password,
      username: createUsername(cleanName, cleanEmail),
      role: "user",
      bio: "",
      interests: "",
      photo: "",
      loginCount: 0,
      createdAt: new Date().toLocaleString(),
      lastLogin: "Not logged in yet"
    };

    setUsers(previous => [...previous, newUser]);
    setName("");
    setEmail("");
    setPassword("");
    setAuthMode("login");

    alert("Account created successfully. Please login.");
  };

  // LOGIN
  const handleLogin = (e) => {
    e.preventDefault();

    const cleanEmail = email.trim().toLowerCase();

    if (cleanEmail === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
      setCurrent({
        id: "admin",
        name: "TRU Administrator",
        email: ADMIN_EMAIL,
        username: "admin",
        role: "admin"
      });
      setPage("admin");
      setEmail("");
      setPassword("");
      return;
    }

    const foundUser = users.find(
      user => user.email.toLowerCase() === cleanEmail && user.password === password
    );

    if (!foundUser) {
      alert("Invalid email or password.");
      return;
    }

    const loginTime = new Date().toLocaleString();
    const updatedUser = {
      ...foundUser,
      loginCount: (foundUser.loginCount || 0) + 1,
      lastLogin: loginTime
    };

    setUsers(previous => previous.map(user => user.id === foundUser.id ? updatedUser : user));

    setLoginHistory(previous => [
      {
        id: Date.now(),
        userId: foundUser.id,
        name: foundUser.name,
        email: foundUser.email,
        time: loginTime
      },
      ...previous
    ]);

    setCurrent(updatedUser);
    setPage("home");
    setEmail("");
    setPassword("");
  };

  const handleLogout = () => {
    setCurrent(null);
    setPage("login");
    setAuthMode("login");
    setSelectedChat(null);
  };

  // IMAGE UPLOAD
  const handleImageUpload = (e, type) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert("Please select an image.");
      return;
    }

    if (file.size > 3 * 1024 * 1024) {
      alert("Image must be smaller than 3 MB.");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      if (type === "post") setPostImage(reader.result);
      else setProfilePhoto(reader.result);
    };
    reader.readAsDataURL(file);
  };

  // CREATE POST
  const publishPost = (e) => {
    e.preventDefault();

    if (!caption.trim() && !postImage) {
      alert("Write something or select an image.");
      return;
    }

    if (visibility === "circle" && !selectedCircle) {
      alert("Please select a circle.");
      return;
    }

    const newPost = {
      id: Date.now(),
      userId: current.id,
      author: current.name,
      username: current.username,
      caption: caption.trim(),
      image: postImage,
      visibility,
      circleId: visibility === "circle" ? Number(selectedCircle) : null,
      likes: [],
      createdAt: new Date().toLocaleString()
    };

    setPosts(previous => [newPost, ...previous]);
    setCaption("");
    setPostImage("");
    setVisibility("public");
    setSelectedCircle("");
    setPage("home");
  };

  const toggleLike = (postId) => {
    setPosts(previous => previous.map(post => {
      if (post.id !== postId) return post;
      const liked = post.likes.includes(current.id);
      return {
        ...post,
        likes: liked
          ? post.likes.filter(id => id !== current.id)
          : [...post.likes, current.id]
      };
    }));
  };

  // CIRCLES
  const createCircle = (e) => {
    e.preventDefault();

    if (!circleName.trim()) return;

    setCircles(previous => [
      ...previous,
      {
        id: Date.now(),
        name: circleName.trim(),
        description: circleDescription.trim(),
        members: [current.username]
      }
    ]);

    setCircleName("");
    setCircleDescription("");
    alert("Circle created successfully.");
  };

  const joinCircle = (circleId) => {
    setCircles(previous => previous.map(circle =>
      circle.id === circleId && !circle.members.includes(current.username)
        ? { ...circle, members: [...circle.members, current.username] }
        : circle
    ));
  };

  // FRIEND REQUESTS
  const sendRequest = (targetUser) => {
    const alreadySent = requests.some(
      request => request.from === current.id && request.to === targetUser.id
    );

    if (alreadySent) {
      alert("You have already sent a request.");
      return;
    }

    setRequests(previous => [
      ...previous,
      { id: Date.now(), from: current.id, to: targetUser.id, status: "pending" }
    ]);
  };

  const acceptRequest = (requestId) => {
    setRequests(previous => previous.map(request =>
      request.id === requestId ? { ...request, status: "accepted" } : request
    ));
  };

  // CHAT
  const sendMessage = (e) => {
    e.preventDefault();
    if (!messageText.trim() || !selectedChat) return;

    setMessages(previous => [
      ...previous,
      {
        id: Date.now(),
        from: current.id,
        to: selectedChat.id,
        text: messageText.trim(),
        time: new Date().toLocaleTimeString()
      }
    ]);

    setMessageText("");
  };

  // PROFILE
  const saveProfile = () => {
    const updatedUser = {
      ...current,
      bio: profileBio,
      interests: profileInterests,
      photo: profilePhoto || current.photo
    };

    setCurrent(updatedUser);
    setUsers(previous => previous.map(user =>
      user.id === current.id ? updatedUser : user
    ));

    alert("Profile updated successfully.");
  };

  const navItems = [
    ["home", "Home"],
    ["create", "Create Post"],
    ["events", "Events"],
    ["circles", "Circles"],
    ["friends", "Friends"],
    ["chat", "Chat"],
    ["profile", "My Profile"]
  ];

  // ADMIN DASHBOARD
  if (current?.role === "admin") {
    return (
      <div className="app">
        <aside className="sidebar">
          <div className="logo">TRU<span>.</span></div>
          <p className="side-caption">ADMINISTRATION</p>

          <div className="nav-links">
            <button className="nav-item active">Admin Dashboard</button>
          </div>

          <div className="sidebar-user">
            <div className="avatar admin-avatar">A</div>
            <div>
              <strong>Administrator</strong>
              <small>Admin Account</small>
            </div>
            <button className="logout" onClick={handleLogout}>Logout</button>
          </div>
        </aside>

        <main className="main-area">
          <div className="topbar">
            <div>
              <p className="muted">TRU MANAGEMENT</p>
              <h1>Admin Dashboard</h1>
            </div>
            <div className="top-avatar admin-avatar">A</div>
          </div>

          <div className="admin-banner">
            <div>
              <span>ADMIN CONTROL PANEL</span>
              <h2>Welcome, Administrator</h2>
              <p>Manage members and monitor TRU activity.</p>
            </div>
            <div className="admin-banner-shape">TRU</div>
          </div>

          <div className="admin-stats">
            <div className="admin-stat stat-purple">
              <span>Total Members</span>
              <h2>{users.length}</h2>
              <small>Registered accounts</small>
            </div>
            <div className="admin-stat stat-pink">
              <span>Total Logins</span>
              <h2>{loginHistory.length}</h2>
              <small>Recorded login sessions</small>
            </div>
            <div className="admin-stat stat-blue">
              <span>Total Posts</span>
              <h2>{posts.length}</h2>
              <small>Community posts</small>
            </div>
            <div className="admin-stat stat-orange">
              <span>Total Circles</span>
              <h2>{circles.length}</h2>
              <small>Community groups</small>
            </div>
          </div>

          <div className="content-card admin-members">
            <div className="section-heading">
              <div>
                <h2>Registered Members</h2>
                <p className="muted">All accounts created in this browser.</p>
              </div>
              <span className="member-count">{users.length} Members</span>
            </div>

            <div className="admin-table-wrap">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Member</th>
                    <th>Email Address</th>
                    <th>Username</th>
                    <th>Login Count</th>
                    <th>Last Login</th>
                    <th>Registered On</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map(user => (
                    <tr key={user.id}>
                      <td>{user.name}</td>
                      <td>{user.email}</td>
                      <td>{user.username}</td>
                      <td>{user.loginCount || 0}</td>
                      <td>{user.lastLogin || "Not logged in"}</td>
                      <td>{user.createdAt || "-"}</td>
                    </tr>
                  ))}
                  {users.length === 0 && (
                    <tr><td colSpan="6">No members registered.</td></tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          <div className="content-card admin-members">
            <div className="section-heading">
              <div>
                <h2>Recent Login Activity</h2>
                <p className="muted">See when members logged into TRU.</p>
              </div>
            </div>

            <div className="admin-table-wrap">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Member Name</th>
                    <th>Email Address</th>
                    <th>Login Date and Time</th>
                  </tr>
                </thead>
                <tbody>
                  {loginHistory.map(item => (
                    <tr key={item.id}>
                      <td>{item.name}</td>
                      <td>{item.email}</td>
                      <td>{item.time}</td>
                    </tr>
                  ))}
                  {loginHistory.length === 0 && (
                    <tr><td colSpan="3">No login activity recorded yet.</td></tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          <footer>TRU Admin Panel</footer>
        </main>
      </div>
    );
  }

  // LOGIN AND SIGNUP
  if (!current) {
    return (
      <div className="auth-page">
        <div className="auth-decoration">
          <div className="auth-logo">TRU<span>.</span></div>
          <div className="auth-message">
            <span>CONNECT • SHARE • DISCOVER</span>
            <h1>Your People.<br />Your Moments.</h1>
            <p>Meet new people, share your moments and discover communities.</p>
            <div className="auth-art">
              <div className="auth-art-circle circle-one"></div>
              <div className="auth-art-circle circle-two"></div>
              <div className="auth-art-card">TRU</div>
            </div>
          </div>
          <div className="auth-bottom">A COMMUNITY THAT BRINGS PEOPLE TOGETHER</div>
        </div>

        <div className="auth-box">
          <div className="auth-small-logo">TRU<span>.</span></div>

          {authMode === "signup" ? (
            <>
              <h2>Create your account</h2>
              <p className="muted">Join the TRU community today.</p>

              <form onSubmit={handleRegister}>
                <label>Full Name</label>
                <input
                  type="text"
                  placeholder="Enter your full name"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  required
                />

                <label>Email Address</label>
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  required
                />

                <label>Password</label>
                <input
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  minLength="4"
                  required
                />

                <button type="submit" className="main-btn">Create Account</button>
              </form>

              <p className="switch-auth">
                Already have an account?
                <button onClick={() => setAuthMode("login")}>Login</button>
              </p>
            </>
          ) : (
            <>
              <h2>Welcome back</h2>
              <p className="muted">Login to continue to TRU.</p>

              <form onSubmit={handleLogin}>
                <label>Email Address</label>
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  required
                />

                <label>Password</label>
                <input
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  required
                />

                <button type="submit" className="main-btn">Login</button>
              </form>

              <p className="switch-auth">
                Don't have an account?
                <button onClick={() => setAuthMode("signup")}>Sign Up</button>
              </p>

              <div className="demo-details">
                <p>Demo user: likith@tru.com / 1234</p>
                <button
                  className="admin-link"
                  onClick={() => {
                    setEmail(ADMIN_EMAIL);
                    setPassword(ADMIN_PASSWORD);
                  }}
                >
                  Fill Admin Login
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    );
  }

  const myCircles = circles.filter(circle => circle.members.includes(current.username));

  const visiblePosts = posts.filter(post => {
    if (post.visibility === "public" || post.userId === current.id) return true;
    const circle = circles.find(item => item.id === post.circleId);
    return circle?.members.includes(current.username);
  });

  const otherUsers = users.filter(user => user.id !== current.id && user.role !== "admin");

  const incomingRequests = requests.filter(
    request => request.to === current.id && request.status === "pending"
  );

  return (
    <div className="app">
      <aside className="sidebar">
        <div className="logo">TRU<span>.</span></div>
        <p className="side-caption">YOUR PEOPLE. YOUR MOMENTS.</p>

        <div className="nav-links">
          {navItems.map(([id, title]) => (
            <button
              key={id}
              className={`nav-item ${page === id ? "active" : ""}`}
              onClick={() => setPage(id)}
            >
              <span className="nav-dot"></span>
              {title}
              {id === "friends" && incomingRequests.length > 0 && (
                <small className="nav-count">{incomingRequests.length}</small>
              )}
            </button>
          ))}
        </div>

        <div className="sidebar-user">
          <div className="avatar">
            {current.photo
              ? <img src={current.photo} alt="Profile" />
              : current.name.charAt(0).toUpperCase()}
          </div>
          <div className="sidebar-user-info">
            <strong>{current.name}</strong>
            <small>@{current.username}</small>
          </div>
          <button className="logout" onClick={handleLogout}>Logout</button>
        </div>
      </aside>

      <main className="main-area">
        <div className="topbar">
          <div>
            <p className="muted">WELCOME TO TRU</p>
            <h1>
              {page === "home" && "Discover your world"}
              {page === "create" && "Create a Post"}
              {page === "events" && "Explore Events"}
              {page === "circles" && "Find Your Community"}
              {page === "friends" && "Meet Your People"}
              {page === "chat" && "Your Conversations"}
              {page === "profile" && "My Profile"}
            </h1>
          </div>
          <div className="top-avatar">
            {current.photo
              ? <img src={current.photo} alt="Profile" />
              : current.name.charAt(0).toUpperCase()}
          </div>
        </div>

        {/* HOME PAGE */}
        {page === "home" && (
          <>
            <div className="welcome-banner">
              <div className="welcome-content">
                <span>WELCOME TO YOUR COMMUNITY</span>
                <h2>Your People.<br />Your Moments.</h2>
                <p>Share your experiences and connect with others.</p>
                <button onClick={() => setPage("create")}>Create a Post</button>
              </div>
              <div className="welcome-art">
                <div className="welcome-art-circle"></div>
                <div className="welcome-art-box">TRU</div>
                <div className="welcome-art-star">✦</div>
              </div>
            </div>

            <div className="section-heading">
              <div>
                <h2>Community Posts</h2>
                <p className="muted">See what's happening around you.</p>
              </div>
              <button onClick={() => setPage("create")}>Create Post</button>
            </div>

            {visiblePosts.length === 0 ? (
              <div className="empty-state">
                <div className="empty-art">TRU</div>
                <h3>No posts yet</h3>
                <p>Be the first person to share a moment.</p>
                <button className="main-btn" onClick={() => setPage("create")}>Create Post</button>
              </div>
            ) : (
              visiblePosts.map(post => (
                <div className="post-card" key={post.id}>
                  <div className="post-author">
                    <div className="avatar">{post.author.charAt(0).toUpperCase()}</div>
                    <div>
                      <strong>{post.author}</strong>
                      <small>{post.createdAt}</small>
                    </div>
                    <span className="post-privacy">
                      {post.visibility === "public" ? "Public" : "Circle"}
                    </span>
                  </div>

                  {post.image && <img src={post.image} alt="Post" className="post-image" />}
                  {post.caption && <p className="post-caption">{post.caption}</p>}

                  <div className="post-actions">
                    <button onClick={() => toggleLike(post.id)}>
                      {post.likes.includes(current.id) ? "Unlike" : "Like"} ({post.likes.length})
                    </button>
                    <span>{post.visibility === "public" ? "Public post" : "Circle post"}</span>
                  </div>
                </div>
              ))
            )}
          </>
        )}

        {/* CREATE POST PAGE */}
        {page === "create" && (
          <div className="content-card create-card">
            <h2>Share a moment</h2>
            <p className="muted">Share your photos and thoughts with your community.</p>

            <form onSubmit={publishPost}>
              <label>Write a caption</label>
              <textarea
                className="caption-input"
                placeholder="What would you like to share?"
                value={caption}
                onChange={e => setCaption(e.target.value)}
              />

              <label>Add an image</label>
              <label className="upload-box">
                <span className="upload-symbol">+</span>
                <strong>Choose an image</strong>
                <small>Maximum image size: 3 MB</small>
                <input type="file" accept="image/*" onChange={e => handleImageUpload(e, "post")} />
                {postImage && <img src={postImage} alt="Preview" className="image-preview" />}
              </label>

              {postImage && (
                <button type="button" className="text-btn" onClick={() => setPostImage("")}>
                  Remove image
                </button>
              )}

              <label>Who can see this post?</label>
              <select value={visibility} onChange={e => setVisibility(e.target.value)}>
                <option value="public">Everyone - Public</option>
                <option value="circle">Circle Members Only</option>
              </select>

              {visibility === "circle" && (
                <>
                  <label>Select Circle</label>
                  <select value={selectedCircle} onChange={e => setSelectedCircle(e.target.value)} required>
                    <option value="">Choose a circle</option>
                    {myCircles.map(circle => (
                      <option key={circle.id} value={circle.id}>{circle.name}</option>
                    ))}
                  </select>
                </>
              )}

              <button type="submit" className="main-btn">Publish Post</button>
            </form>
          </div>
        )}

        {/* EVENTS PAGE */}
        {page === "events" && (
          <div className="events-page">
            <div className="events-banner">
              <div>
                <span>DISCOVER • CONNECT • ENJOY</span>
                <h2>Find your next<br />great experience.</h2>
                <p>Meet people, explore interests and create memories.</p>
              </div>
              <div className="events-banner-art">
                <div className="art-circle"></div>
                <div className="art-star">✦</div>
                <div className="art-card">TRU</div>
              </div>
            </div>

            <div className="section-heading">
              <div>
                <h2>Upcoming Events</h2>
                <p className="muted">Something exciting is waiting for you.</p>
              </div>
            </div>

            <div className="event-grid">
              {events.map(event => {
                const registered = eventRegistrations.some(
                  item => item.eventId === event.id && item.userId === current.id
                );

                return (
                  <div className="event-card" key={event.id}>
                    <div className={`event-art ${event.art}`}>
                      <span className="event-art-symbol">{event.symbol}</span>
                      <span className="event-art-name">TRU EVENTS</span>
                      <div className="event-art-shape"></div>
                    </div>

                    <div className="event-info">
                      <span className="event-category">{event.category}</span>
                      <h2>{event.name}</h2>
                      <p>{event.description}</p>
                      <div className="event-details">
                        <span>{event.date}</span>
                        <span>{event.location}</span>
                      </div>
                      <button
                        className="event-register"
                        disabled={registered}
                        onClick={() => {
                          setEventRegistrations(previous => [
                            ...previous,
                            { id: Date.now(), eventId: event.id, userId: current.id }
                          ]);
                          alert("You have registered for " + event.name);
                        }}
                      >
                        {registered ? "Registered" : "Register Now"}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* CIRCLES PAGE */}
        {page === "circles" && (
          <>
            <div className="content-card">
              <h2>Create Your Own Circle</h2>
              <p className="muted">Build a community around your interests.</p>
              <form onSubmit={createCircle} className="inline-form">
                <label>Circle Name</label>
                <input
                  placeholder="Enter circle name"
                  value={circleName}
                  onChange={e => setCircleName(e.target.value)}
                  required
                />
                <label>Description</label>
                <textarea
                  placeholder="Describe your circle"
                  value={circleDescription}
                  onChange={e => setCircleDescription(e.target.value)}
                />
                <button className="main-btn" type="submit">Create Circle</button>
              </form>
            </div>

            <div className="section-heading">
              <div>
                <h2>Explore Circles</h2>
                <p className="muted">Join communities that match your interests.</p>
              </div>
            </div>

            <div className="circle-grid">
              {circles.map((circle, index) => {
                const joined = circle.members.includes(current.username);

                return (
                  <div className={`circle-card circle-${index % 4}`} key={circle.id}>
                    <div className="circle-icon">{circle.name.charAt(0).toUpperCase()}</div>
                    <h2>{circle.name}</h2>
                    <p>{circle.description}</p>
                    <span>{circle.members.length} Members</span>
                    <button
                      onClick={() => joined ? alert("You are already a member.") : joinCircle(circle.id)}
                    >
                      {joined ? "Joined" : "Join Circle"}
                    </button>
                  </div>
                );
              })}
            </div>
          </>
        )}

        {/* FRIENDS PAGE */}
        {page === "friends" && (
          <>
            <div className="content-card">
              <h2>Find People</h2>
              <input
                className="search-input"
                placeholder="Search members by name"
                value={search}
                onChange={e => setSearch(e.target.value)}
              />

              {otherUsers
                .filter(user => `${user.name} ${user.username}`.toLowerCase().includes(search.toLowerCase()))
                .map(user => {
                  const sent = requests.some(
                    request => request.from === current.id && request.to === user.id
                  );

                  return (
                    <div className="person-row" key={user.id}>
                      <div className="avatar">{user.name.charAt(0).toUpperCase()}</div>
                      <div>
                        <strong>{user.name}</strong>
                        <small>@{user.username}</small>
                      </div>
                      <button disabled={sent} onClick={() => sendRequest(user)}>
                        {sent ? "Request Sent" : "Add Friend"}
                      </button>
                    </div>
                  );
                })}
            </div>

            <div className="content-card">
              <h2>Friend Requests</h2>
              {incomingRequests.length === 0 ? (
                <p className="muted">No new friend requests.</p>
              ) : incomingRequests.map(request => {
                const sender = users.find(user => user.id === request.from);
                if (!sender) return null;

                return (
                  <div className="person-row" key={request.id}>
                    <div className="avatar">{sender.name.charAt(0).toUpperCase()}</div>
                    <div>
                      <strong>{sender.name}</strong>
                      <small>{sender.email}</small>
                    </div>
                    <button onClick={() => acceptRequest(request.id)}>Accept</button>
                  </div>
                );
              })}
            </div>
          </>
        )}

        {/* CHAT PAGE */}
        {page === "chat" && (
          <div className="chat-layout">
            <div className="chat-people">
              <h2>Members</h2>
              {otherUsers.map(user => (
                <button
                  key={user.id}
                  className={`chat-person ${selectedChat?.id === user.id ? "selected" : ""}`}
                  onClick={() => setSelectedChat(user)}
                >
                  <div className="avatar">{user.name.charAt(0).toUpperCase()}</div>
                  <div>
                    <strong>{user.name}</strong>
                    <small>@{user.username}</small>
                  </div>
                </button>
              ))}
            </div>

            <div className="chat-window">
              {!selectedChat ? (
                <div className="empty-chat">
                  <div className="empty-art">TRU</div>
                  <h2>Your conversations</h2>
                  <p>Select a member to open a conversation.</p>
                </div>
              ) : (
                <>
                  <div className="chat-header">
                    <div className="avatar">{selectedChat.name.charAt(0).toUpperCase()}</div>
                    <div>
                      <strong>{selectedChat.name}</strong>
                      <small>@{selectedChat.username}</small>
                    </div>
                  </div>

                  <div className="chat-messages">
                    {messages.filter(message =>
                      (message.from === current.id && message.to === selectedChat.id) ||
                      (message.from === selectedChat.id && message.to === current.id)
                    ).map(message => (
                      <div
                        key={message.id}
                        className={`message ${message.from === current.id ? "sent" : "received"}`}
                      >
                        <p>{message.text}</p>
                        <small>{message.time}</small>
                      </div>
                    ))}
                  </div>

                  <form className="chat-input" onSubmit={sendMessage}>
                    <input
                      placeholder="Write a message..."
                      value={messageText}
                      onChange={e => setMessageText(e.target.value)}
                    />
                    <button type="submit">Send</button>
                  </form>
                </>
              )}
            </div>
          </div>
        )}

        {/* PROFILE PAGE */}
        {page === "profile" && (
          <div className="profile-card">
            <div className="profile-cover">
              <div className="profile-avatar">
                {profilePhoto || current.photo
                  ? <img src={profilePhoto || current.photo} alt="Profile" />
                  : current.name.charAt(0).toUpperCase()}
              </div>
            </div>

            <div className="profile-details">
              <h2>{current.name}</h2>
              <p className="muted">@{current.username}</p>
              <p>{current.bio || "Welcome to my TRU profile."}</p>

              <div className="profile-stats">
                <div>
                  <strong>{posts.filter(post => post.userId === current.id).length}</strong>
                  <span>Posts</span>
                </div>
                <div>
                  <strong>{myCircles.length}</strong>
                  <span>Circles</span>
                </div>
                <div>
                  <strong>{current.loginCount || 0}</strong>
                  <span>Logins</span>
                </div>
              </div>

              <h3>Edit Profile</h3>

              <label>Profile Photo</label>
              <input type="file" accept="image/*" onChange={e => handleImageUpload(e, "profile")} />

              <label>About You</label>
              <textarea
                value={profileBio}
                placeholder={current.bio || "Write a short bio"}
                onChange={e => setProfileBio(e.target.value)}
              />

              <label>Your Interests</label>
              <input
                value={profileInterests}
                placeholder={current.interests || "Music, movies, sports..."}
                onChange={e => setProfileInterests(e.target.value)}
              />

              <button className="main-btn profile-save" onClick={saveProfile}>
                Save Profile
              </button>

              <h3>My Interests</h3>
              <div className="profile-tags">
                {(current.interests || "No interests added yet").split(",").map((item, index) => (
                  <span key={index}>{item.trim()}</span>
                ))}
              </div>
            </div>
          </div>
        )}

        <footer>TRU - Your People. Your Moments.</footer>
      </main>
    </div>
  );
}

export default App;
