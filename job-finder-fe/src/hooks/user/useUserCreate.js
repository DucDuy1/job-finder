import { useState } from "react";
import { userValidationSchema, validateField } from "../../utils/validations/userValidation"; // Import schema validation
import { userCreateAPI } from "../../service/userService";
import { useNavigate } from "react-router-dom";

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
    const [isSubmitted, setIsSubmitted] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        setFormState((prev) => ({
            ...prev,
            [name]: files ? files[0] : value, // Nếu input là file, lưu file
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitted(true);

        try {
            // Validate toàn bộ formState bằng schema
            await userValidationSchema.validate(formState, { abortEarly: false });

            const formData = new FormData();
            for (let key in formState) {
                formData.append(key, formState[key]);
            }

            setIsLoading(true);
            setError(null);
            await userCreateAPI(formData);
            setSuccess(true);
            setFormState({
                username: "",
                password: "",
                fullName: "",
                email: "",
                age: "",
                role: "",
                file: null,
            });
            setIsSubmitted(false);
            navigate("/user/search");
        } catch (err) {
            setError(
                err.inner.reduce((acc, validationError) => {
                    acc[validationError.path] = validationError.message;
                    return acc;
                }, {})
            );
        } finally {
            setIsLoading(false);
        }
    };

    return {
        formState,
        isLoading,
        error: isSubmitted ? error : null, // Hiển thị lỗi sau khi nhấn submit
        success,
        handleChange,
        handleSubmit,
        setFormState,
    };
};

export default useUserCreate;
