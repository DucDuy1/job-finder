import * as yup from 'yup';

export const registerValidationSchema = yup.object().shape({
    username: yup.string().min(8, "User name must be at least 8 characters").max(12, "User name max is 12 characters").required("User name cannot be blank"),
    password: yup.string().min(8, "Password must be at least 8 characters").max(12, "Password max is 12 characters").required("Password cannot be blank"),
    email: yup.string().email("Email invalid").min(5, "Email must be at least 5 characters").required("Email cannot be blank"),
});

export const validateField = async (field, value) => {
    try {
        await registerValidationSchema.fields[field].validate(value);
        return null;
    } catch (err) {
        return err.message;
    }
};
