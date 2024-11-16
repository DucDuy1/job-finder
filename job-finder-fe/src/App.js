import React from "react";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from "./pages/auth/Login";
import Register from './pages/auth/Register';
import JobCreate from "./pages/jobDiv/JobCreate";
import JobSearch from "./pages/jobDiv/JobSearch";
import JobUpdate from "./pages/jobDiv/JobUpdate";
import Layout from "./component/Layout";
import UserCreate from "./pages/userDiv/UserCreate";
import UserSearch from "./pages/userDiv/UserSearch";
import UserUpdate from "./pages/userDiv/UserUpdate";
import CommentUpdate from "./pages/commentDiv/CommentUpdate";
import CommentCreate from "./pages/commentDiv/CommentCreate";
import CommentSearch from "./pages/commentDiv/CommentSearch";
import ApplyCreate from "./pages/applyDiv/ApplyCreate";
import ApplySearch from "./pages/applyDiv/ApplySearch";
import ApplyUpdate from "./pages/applyDiv/ApplyUpdate";
import JobDetail from "./pages/jobDiv/JobDetail";
import UserDashboard from "./pages/userComponent/UserDashboard";
import UserDetail from "./pages/userComponent/UserDetail";
import JobList from "./pages/jobDiv/JobList";
import ContactMember from "./pages/memberComponent/ContactMember";
import UserAppliedJobs from "./pages/userComponent/UserAppliedJobs";
import MemberCreateListJob from "./pages/memberComponent/MemberCreateListJob";
import MemberApplicantList from "./pages/memberComponent/MemberApplicantList ";
import ForgotPassword from "./pages/auth/ForgotPassword";
import ChangePassword from "./pages/auth/ChangePassword";
import ErrorException from "./utils/ErrorException";
import UnauthorizedPage from "./utils/401";
import UserApplyStats from "./pages/memberComponent/UserApplyStats";

const App = () => {
  return (
    <div className="app">
      <Router>
        <ErrorException>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="/job/create" element={<JobCreate />} />
          <Route path="/job/search" element={<JobSearch />} />
          <Route path="/job/list" element={<JobList />} />
          <Route path="/job/update/:id" element={<JobUpdate />} />
          <Route path="/jobDetail/:id" element={<JobDetail />} />
          <Route path="/user/create" element={<UserCreate />} />
          <Route path="/user/search" element={<UserSearch />} />
          <Route path="/user/update/:id" element={<UserUpdate />} />
          <Route path="/comment/create" element={<CommentCreate />} />
          <Route path="/comment/search" element={<CommentSearch />} />
          <Route path="/comment/update/:id" element={<CommentUpdate />} />
          <Route path="/apply/create/:id" element={<ApplyCreate />} />
          <Route path="/apply/search" element={<ApplySearch />} />
          <Route path="/apply/update/:id" element={<ApplyUpdate />} />
          <Route path="/user-dashbroad/:id" element={<UserDashboard/>} />
          <Route path="/user-detail/:id" element={<UserDetail/>} />
          <Route path="/job-user-apply/:id" element={<UserAppliedJobs/>} />
          <Route path="/member-create-listjob" element={<MemberCreateListJob/>} />
          <Route path="/contact-to-become-a-member" element={<ContactMember/>} />
          <Route path="/member-applicants" element={<MemberApplicantList />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/change-password" element={<ChangePassword />} />
          <Route path="/user-apply-stats" element={<UserApplyStats />} />
          <Route path="/*" element={<Layout />} />
        </Routes>
        </ ErrorException>
      </Router>
    </div>
  );
};
export default App;