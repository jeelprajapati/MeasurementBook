import * as Yup from "yup";

export const signUpScema = Yup.object({
  username: Yup.string().min(2).required("Username is Required!"),
  name: Yup.string().min(2).required("Name is required!"),
  email: Yup.string()
    .matches(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, "Enter A valid Email")
    .required("Email is Required!"),
  password: Yup.string()
    .matches(
      /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]{8,}$/,
      "Password must contain at least 8 characters, one uppercase, one number and one special case character"
    )
    .required("Password is Required!"),
  organizationname: Yup.string().required("Organizationname is Required!"),
  plan: Yup.string().required("Plan is Required!"),
});

export const clientScema = Yup.object({
  name: Yup.string().min(2).required("Client Name is required!"),
  email: Yup.string()
    .matches(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, "Enter A valid Email")
    .required("Email is Required!"),
  phoneNumber: Yup.string()
    .min(10)
    .max(10)
    .required("PhoneNumber Is required!"),
  address: Yup.string().required("Address is Required!"),
  city: Yup.string().required("City is Required!"),
  countryId: Yup.string().required("Country is Required!"),
  stateId: Yup.string().required("state is Required!"),
  postalCode: Yup.string().required("Postal Code is Required!"),
});

export const projectScema = Yup.object({
  clientId: Yup.string().required("Client Name is Required!"),
  projectName: Yup.string().required("Project Name is Required!"),
  contractDate: Yup.string().required("Date of Contract is Required!"),
  loiDate: Yup.string().required("Project Start Date is Required"),
  contractNo: Yup.string().required("Contract No is Required!"),
});


export const billScema=Yup.object({
  name: Yup.string().min(2).required("Bill Name is required!"),
  invoiceDate:Yup.string().required("Invoice Date is Required!"),
  typeBill:Yup.string().required("Type is Required!"),
  status:Yup.string().required("Status is Required!")
})

export const contractTable=Yup.object({
  item:Yup.string().required("Description is Required!"),
  poQty:Yup.string().required("Work Order Quantity is Required!"),
  stdUnitId:Yup.string().required("Measure Type is Requried!"),
  unit:Yup.string().required("UOM is Required!"),
})

export const measureTable=Yup.object({
  description:Yup.string().required("Description is Required!"),
  no:Yup.string().required("No is Required!"),
  contractItemId:Yup.string().required("Contract Item is Required!")
})