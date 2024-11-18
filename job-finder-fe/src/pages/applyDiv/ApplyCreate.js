import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import '../css/create.css'
import 'animate.css';
import useApplyCreate from '../../hooks/apply/useApplyCreate';

const ApplyCreate = () => {
    const { id: jobId } = useParams(); // Lấy jobId từ URL
    
    const {
        formState,
        isLoading,
        error,
        success,
        handleChange,
        handleSubmit,
        setFormState, // Thêm setFormState để khởi tạo jobId
    } = useApplyCreate();

    // Khởi tạo jobId ngay khi component được mount
    useEffect(() => {
        if (jobId) { // Kiểm tra jobId tồn tại
            setFormState((prev) => ({
                ...prev,
                job: { id: jobId },
            }));
        }
    }, [jobId, setFormState]);
    console.log(jobId);
    return (
        <div className="create-container animate__animated animate__fadeIn">
            <h1 className="animate__animated animate__bounceIn">Apply</h1>
            {error && (
                <p className="error-message animate__animated animate__shakeX">
                    {error}
                </p>
            )}
            <form onSubmit={handleSubmit}>
                <div>
                    <label>File CV:</label>
                    <input
                        type="file"
                        name="file"
                        accept=".pdf,.doc,.docx,.txt"
                        onChange={handleChange}
                        className="animate__animated animate__fadeIn"
                    />
                </div>
                <button
                    type="submit"
                    className="animate__animated animate__pulse"
                    disabled={isLoading}
                >
                    {isLoading ? "Creating..." : "Create Apply"}
                </button>
                {success && (
                    <p className="success-message animate__animated animate__fadeIn">
                        Apply created successfully!
                    </p>
                )}
            </form>
        </div>
    );
};

export default ApplyCreate;