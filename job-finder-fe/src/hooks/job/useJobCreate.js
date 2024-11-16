import { useState } from 'react';
import { jobCreateAPI } from '../../service/jobService';
import { jobValidationSchema, validateField } from '../../utils/validations/jobValidation';

const useJobCreate = () => {
    const [formState, setFormState] = useState({
        nameCompany: "",
        title: "",
        level: "",
        employmentType: "",
        description: "",
        tag: [],
        applicationDeadline: "",
        location: "",
        file: null,
    });
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleChange = (e) => {
        const { name, value, files, options } = e.target;
        if (name === 'tag') {
            const selectedOptions = Array.from(options)
                .filter(option => option.selected)
                .map(option => option.value);
            setFormState((prev) => ({
                ...prev,
                [name]: selectedOptions,
            }));
        } else {
            setFormState((prev) => ({
                ...prev,
                [name]: files ? files[0] : value,
            }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitted(true);
        try {
            await jobValidationSchema.validate(formState, { abortEarly: false });
            
            const formData = new FormData();
            for (let key in formState) {
                formData.append(key, formState[key]);
            }
            
            setIsLoading(true);
            setError(null);
            await jobCreateAPI(formData);
            setSuccess(true);
            setFormState({
                nameCompany: "",
                title: "",
                level: "",
                employmentType: "",
                description: "",
                tag: [],
                applicationDeadline: "",
                location: "",
                file: null,
            });
            setIsSubmitted(false);
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
        error: isSubmitted ? error : null, 
        success,
        handleChange,
        handleSubmit,
        setFormState
    };
};

export default useJobCreate;
