import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { userCreateAPI } from '../../service/userService';
import { validateField, userValidationSchema } from '../../utils/validations/userValidation';

const useUserCreate = () => {
    const [formState, setFormState] = useState({
        username: "",
        password: "",
        fullName: "",
        email: "",
        age: "",
        role: "",
        file: null,
    });

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);
    const [fieldErrors, setFieldErrors] = useState({}); // Track errors for each field
    const [isSubmitted, setIsSubmitted] = useState(false); // To handle displaying validation errors after submit
    const navigate = useNavigate();

    // Hàm cập nhật state của form
    const handleChange = (e) => {
        const { name, value, files } = e.target;
        setFormState((prev) => ({
            ...prev,
            [name]: files ? files[0] : value, // Nếu input là file, lưu file
        }));
    };

    // Hàm kiểm tra lỗi từng trường
    const validateForm = async () => {
        const errors = {};
        for (const field in formState) {
            const error = await validateField(field, formState[field]);
            if (error) errors[field] = error;
        }
        return errors;
    };

    // Hàm gửi form
    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitted(true); // Enable error display after form submission

        const errors = await validateForm(); // Validate all fields

        if (Object.keys(errors).length > 0) {
            setFieldErrors(errors); // Set validation errors if there are any
            return; // Don't submit the form if there are errors
        }

        const formData = new FormData();
        formData.append("username", formState.username);
        formData.append("password", formState.password);
        formData.append("fullName", formState.fullName);
        formData.append("email", formState.email);
        formData.append("age", formState.age);
        formData.append("role", formState.role);
        if (formState.file) formData.append("file", formState.file);

        try {
            setIsLoading(true);
            setError(null);
            await userCreateAPI(formData);
            setSuccess(true);
            setFormState({ username: "", password: "", fullName: "", email: "", age: "", role: "", file: null });
            setFieldErrors({}); // Clear any previous validation errors
            navigate("/user/search");
        } catch (err) {
            setError(err.message || "Đã xảy ra lỗi.");
        } finally {
            setIsLoading(false);
        }
    };

    return {
        formState,
        isLoading,
        error,
        success,
        fieldErrors,
        isSubmitted,
        handleChange,
        handleSubmit,
    };
};

export default useUserCreate;