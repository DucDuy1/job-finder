import * as yup from 'yup';

export const jobValidationSchema = yup.object().shape({
    nameCompany: yup.string().min(5, "Name company must be at least 5 characters").required("Company name cannot be blank"),
    title: yup.string().required("Title cannot be blank"),
    level: yup.string().required("Level cannot be blank"),
    description: yup.string().required("location"),
    tag: yup.array().min(1, "Select at least one"),
    applicationDeadline: yup.date().required("ApplicationDeadline is required").nullable(),
    location: yup.string().required("Location cannot be blank"),
    file: yup.mixed().required("File cannot be blank"),
});

export const validateField = async (field, value) => {
    try {
        await jobValidationSchema.fields[field].validate(value);
        return null; // Không có lỗi
    } catch (err) {
        return err.message; // Trả về thông báo lỗi
    }
};
