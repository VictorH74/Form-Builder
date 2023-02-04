import useTranslate from '@/hooks/UseTranslate';
import * as Yup from 'yup';

const translate = useTranslate({
    "en": {
        min: "Too Short!",
        max: "Too Long!",
        required: "Required",
        emailRequired: "Invalid email",
    },
    "pt-BR": {
        min: "Muito curto!",
        max: "Muito longo!",
        required: "Obrigatório",
        emailRequired: "email inválido",
    }
})

export const SigninSchema = Yup.object().shape({
    login: Yup.string()
        .min(5, translate("min"))
        .max(50, translate("max"))
        .required(translate("required")),
    password: Yup.string()
        .min(8, translate("min"))
        .max(50, translate("max"))
        .required(translate("required")),
});

export const SignupSchema = Yup.object().shape({
    name: Yup.string()
        .min(5, translate("min"))
        .max(50, translate("max"))
        .required(translate("required")),
    username: Yup.string()
        .min(8, translate("min"))
        .max(20, translate("max"))
        .required(translate("required")),
    email: Yup.string()
        .email(translate("emailRequired"))
        .required(translate("required")),
    phone: Yup.string()
        .min(9, translate("min"))
        .max(9, translate("max"))
        .required(translate("required")),
    password: Yup.string()
        .min(8, translate("min"))
        .max(50, translate("max"))
        .required(translate("required")),
});