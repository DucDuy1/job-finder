import { Route, Routes, useNavigate } from 'react-router-dom';
import PrivateRoute from '../component/PrivateRoute';
import Login from '../pages/auth/Login';
import AdminDashboard from '../pages/adminComponent/AdminDashboard';
import React, { useState, useEffect } from 'react';
import UserDashboard from '../pages/userComponent/UserDashboard';
import MemberDashboard from '../pages/memberComponent/MemberDashboard';

const RoutesComponent = () => {
  // Kiểm tra role từ localStorage, nếu không có thì gán 'GUEST'
  const [role, setRole] = useState(localStorage.getItem('userRole') || 'GUEST');
  const navigate = useNavigate();

  useEffect(() => {
    const storedRole = localStorage.getItem('userRole');
    if (storedRole) {
      setRole(storedRole);
      if (storedRole === 'ADMIN') {
        navigate('/admin-dashboard'); 
      } else if (storedRole === 'USER' || storedRole === 'GUEST') {
        navigate('/user-dashbroad'); 
      } else if (storedRole === 'MEMBER') {
        navigate('/member-dashbroad');
      }
    } else {
      localStorage.setItem('userRole', 'GUEST');
      setRole('GUEST'); // Gán 'GUEST' khi không có role
      navigate('/user-dashbroad'); // Điều hướng khách đến trang user dashboard
    }
  }, [navigate]);

  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      {role === 'ADMIN' && (
        <Route path="/admin-dashboard" element={
          <PrivateRoute allowedRoles={['ADMIN']}>
            <AdminDashboard />
          </PrivateRoute>
        } />
      )}
      {(role === 'USER' || role === 'GUEST') && (
        <Route path="/user-dashbroad" element={
          <PrivateRoute allowedRoles={['USER', 'GUEST']}>
            <UserDashboard />
          </PrivateRoute>
        } />
      )}
      {role === 'MEMBER' && (
        <Route path="/member-dashbroad" element={
          <PrivateRoute allowedRoles={['MEMBER']}>
            <MemberDashboard />
          </PrivateRoute>
        } />
      )}
    </Routes>
  );
};

export default RoutesComponent;
