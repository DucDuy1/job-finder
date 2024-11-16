import * as yup from 'yup';

export const loginValidationSchema = yup.object().shape({
    username: yup.string().min(8, "User name must be at least 8 characters").max(12, "User name max is 12 characters").required("User name cannot be blank"),
    password: yup.string().min(8, "Password must be at least 8 characters").max(12, "Password max is 12 characters").required("Password cannot be blank"),
});

export const validateField = async (field, value) => {
    try {
        await loginValidationSchema.fields[field].validate(value);
        return null; // Không có lỗi
    } catch (err) {
        return err.message; // Trả về thông báo lỗi
    }
};
