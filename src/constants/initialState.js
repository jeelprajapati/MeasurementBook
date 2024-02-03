export const billInitialState = {
  id: "00000000-0000-0000-0000-000000000000",
  invoiceNo: "INV-2023080428",
  name: "",
  invoiceDate: "",
  typeBill: "",
  status: "",
  invoiceValue: 0,
};
export const clientInitialState = {
  id: "00000000-0000-0000-0000-000000000000",
  name: "",
  email: "",
  phoneNumber: "",
  gstin: "",
  pan: "",
  address: "",
  city: "",
  countryId: "",
  stateId: "",
  postalCode: "",
};
export const projectInitialState = {
  id: "00000000-0000-0000-0000-000000000000",
  contractNo: "",
  contractDate: "",
  loiNo: "",
  loiDate: "",
  projectName: "",
  contractValidity: "",
  clientId: "",
  projectValue: 0,
  executedValue: 0,
};

export const contractItemInitialState = {
  id: "00000000-0000-0000-0000-000000000000",
  sorNo: 0,
  item: "",
  hsn: 0,
  poQty: 0,
  stdUnitId: 0,
  unit: "",
  rate: 0,
};
