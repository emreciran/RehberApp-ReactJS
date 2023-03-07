import * as Yup from "yup";

export const ResetPasswordSchema = Yup.object().shape({
  newPassword: Yup.string()
    .required("Şifre alanı zorunludur!")
    .min(4, "Şifreniz en az 4 karakter olmalıdır!")
    .max(50, "Şifreniz en fazla 50 karakterden oluşmalıdır!")
    .matches(/[0-9]/, "Şifrenizde en az 1 sayı olmalıdır!")
    .matches(/[a-z]/, "Şifrenizde en az 1 küçük harf olmalıdır!"),

  confirmPassword: Yup.string()
    .required("Şifre tekrar alanı zorunludur!")
    .oneOf([Yup.ref("newPassword"), null], "Onay şifresi hatalı!"),
});
