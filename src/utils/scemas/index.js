import * as Yup from "yup";

export const signUpScema = Yup.object({
  username: Yup.string().min(2).required("Username is Required!"),
  name: Yup.string().min(2).required("Name is required!"),
  email: Yup.string()
    .matches(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, "Enter a valid email")
    .required("Email is required!"),
  password: Yup.string()
    .matches(
      /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]{6,}$/,
      "Password must contain at least 8 characters, one uppercase, one number and one special case character"
    )
    .required("Password is Required!"),
  organizationname: Yup.string().required("Organization Name is Required!"),
  plan: Yup.string().required("Plan is required!"),
});

export const loginScema = Yup.object({
  email: Yup.string()
    .matches(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, "Enter a valid email")
    .required("Email is required!"),
  password: Yup.string()
    .matches(
      /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]{6,}$/,
      "Password must contain at least 8 characters, one uppercase, one number and one special case character"
    )
    .required("Password is required!"),
});

export const clientScema = Yup.object({
  name: Yup.string().min(2).required("Client Name is required!"),
  email: Yup.string()
    .matches(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, "Enter a valid email")
    .required("Email is required!"),
  phoneNumber: Yup.string()
    .min(10)
    .max(10)
    .required("PhoneNumber is required!"),
  address: Yup.string().required("Address is required!"),
  city: Yup.string().required("City is required!"),
  countryId: Yup.string().required("Country is required!"),
  stateId: Yup.string().required("state is required!"),
  pan: Yup.string().max(30),
  postalCode: Yup.string().required("Postal code is required!"),
});

export const projectScema = Yup.object({
  clientId: Yup.string().required("Client Name is Required!"),
  projectName: Yup.string().required("Project Name is Required!"),
  contractDate: Yup.string().required("Date of Contract is Required!"),
  loiDate: Yup.string().required("Project Start Date is Required"),
  contractNo: Yup.string().required("Contract No is Required!"),
});

export const billScema = Yup.object({
  name: Yup.string().min(2).required("Bill Name is required!"),
  invoiceDate: Yup.string().required("Invoice Date is Required!"),
  typeBill: Yup.string().required("Type is Required!"),
  status: Yup.string().required("Status is Required!"),
});

export const contractTable = Yup.object({
  item: Yup.string().required("Description is Required!"),
  poQty: Yup.string().required("Work Order Quantity is Required!"),
  stdUnitId: Yup.string().required("Measure Type is Requried!"),
  unit: Yup.string().required("UOM is Required!"),
});

export const measureTable = Yup.object({
  description: Yup.string().required("Description is Required!"),
  no: Yup.string().required("No is Required!"),
  contractItemId: Yup.string().required("Contract Item is Required!"),
});

export const forgetPasswordSchema = Yup.object({
  email: Yup.string()
    .matches(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, "Enter A valid Email")
    .required("Email is Required!"),
});

export const resetSchema = Yup.object({
  newPassword: Yup.string()
    .matches(
      /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]{6,}$/,
      "Password must contain at least 8 characters, one uppercase, one number and one special case character"
    )
    .required("New Password is Required!"),
  confirmPassword: Yup.string()
    .oneOf(
      [Yup.ref("newPassword"), null],
      "New Password and Confirm Password must be same"
    )
    .required("Confirm Password is Requird!"),
});

export const changePasswordSchema = Yup.object({
  email: Yup.string()
    .matches(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, "Enter A valid Email")
    .required("Email is Required!"),
  currentPassword: Yup.string()
    .matches(
      /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]{6,}$/,
      "Password must contain at least 8 characters, one uppercase, one number and one special case character"
    )
    .required("Password is Required!"),
  newPassword: Yup.string()
    .matches(
      /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]{6,}$/,
      "Password must contain at least 8 characters, one uppercase, one number and one special case character"
    )
    .required("Password is Required!"),
  cNewPassword: Yup.string()
    .oneOf(
      [Yup.ref("newPassword"), null],
      "New Password and Confirm New Password must be same"
    )
    .required("Confirm Password is Requird!"),
});
