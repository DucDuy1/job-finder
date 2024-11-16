import * as yup from 'yup';

export const userValidationSchema = yup.object().shape({
    username: yup.string().min(8, "User name must be at least 8 characters").max(12, "User name max is 12 characters").required("User name cannot be blank"),
    password: yup.string().min(8, "Password must be at least 8 characters").max(12, "Password max is 12 characters").required("Password cannot be blank"),
    fullName: yup.string().required("FullName cannot be blank"),
    email: yup.string().required("email cannot be blank"),
    age: yup.date().required("age cannot be blank"),
    file: yup.mixed().required("File cannot be blank"),
});

export const validateField = async (field, value) => {
    try {
        await userValidationSchema.fields[field].validate(value);
        return null; // Không có lỗi
    } catch (err) {
        return err.message; // Trả về thông báo lỗi
    }
};
