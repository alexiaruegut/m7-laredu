import { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./components/login";
import Register from "./components/register";
import Navbar from "./components/navbar"; // Sidebar sigue llamándose navbar.tsx
import Dashboard from "./components/dashboard";
import CoursesList from "./components/coursesList";
import SubjectsList from "./components/subjectsList";
import AssignmentsList from "./components/assignmentsList";
import SubmissionsList from "./components/submissionsList";
import MessageList from "./components/messageList";
import ProtectedRoute from "./components/protectedRoute";

function App() {
  const [token, setToken] = useState<string | null>(
    localStorage.getItem("token")
  );

  const handleLoginSuccess = (receivedToken: string) => {
    localStorage.setItem("token", receivedToken);
    setToken(receivedToken);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setToken(null);
  };

  return (
    <Router>
      <div className="flex h-screen bg-gray-100">
        {!token ? ( 
          <Routes>
            <Route path="/" element={<Login onLoginSuccess={handleLoginSuccess} />} />
            <Route path="/register" element={<Register />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        ) : (
          <>
            <Navbar onLogout={handleLogout} />
            <div className="flex-1 ml-20 overflow-auto">
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route element={<ProtectedRoute />}> 
                  <Route path="/courses" element={<CoursesList />} />
                  <Route path="/subjects" element={<SubjectsList />} />
                  <Route path="/assignments" element={<AssignmentsList />} />
                  <Route path="/submissions" element={<SubmissionsList />} />
                  <Route path="/messages" element={<MessageList />} />
                </Route>
                <Route path="*" element={<Navigate to="/" />} />
              </Routes>
            </div>
          </>
        )}
      </div>
    </Router>
  );
}

export default App;
