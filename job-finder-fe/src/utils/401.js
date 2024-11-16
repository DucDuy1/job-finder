import React from 'react';

const UnauthorizedPage = () => {
    return (
        <div style={{ textAlign: 'center', marginTop: '20px' }}>
            <h1>401 - Unauthorized</h1>
            <p>Bạn không có quyền truy cập vào trang này. Vui lòng đăng nhập lại.</p>
        </div>
    );
};

export default UnauthorizedPage;
