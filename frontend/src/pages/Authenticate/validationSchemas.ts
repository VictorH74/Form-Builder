import * as Yup from 'yup';


export const SigninSchema = Yup.object().shape({
    login: Yup.string()
        .max(50, "max")
        .required("required"),
    password: Yup.string()
        .max(50, "max")
        .required("required"),
});

export const SignupSchema = Yup.object().shape({
    name: Yup.string()
        .min(5, "min")
        .max(50, "max")
        .required("required"),
    username: Yup.string()
        .min(5, "min")
        .max(20, "max")
        .required("required"),
    email: Yup.string()
        .email("emailRequired")
        .required("required"),
    password: Yup.string()
        .min(8, "min")
        .max(50, "max")
        .required("required"),
});