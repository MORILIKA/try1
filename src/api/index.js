import { post,get,postAuth,getAdmin,putAdmin,getAuth} from "@/api/http";


//demo
export const getData = (params) => get("url",params);
export const getData1 = (data) => post("url",data);

// export const getUserToken = (data) => post("/api/v1/users/get-user-token",data);

export const register = (data) => post("/api/v1/users/register",data);
export const getUserToken = (data) => post("/api/v1/users/get-user-token",data);

export const identifyInvoice = (data) => postAuth("/api/v1/auth/invoices/identify-electric-invoice",data);

export const electricInvoice = (data) => postAuth("/api/v1/auth/invoices/electric-invoices",data);
export const cloudInvoice = (data) => postAuth("/api/v1/auth/invoices/cloud-invoices",data);
export const traditionalInvoice = (data) => postAuth("/api/v1/auth/invoices/traditional-invoices",data);
export const invoiceList = (params) => getAuth("/api/v1/auth/invoices/list",params);
export const winnerList = (params) => get("/api/v1/lotteries/list",params);


//後台
export const login = (data) => post("/admin-api/v1/login",data);

export const getDashboard = (params) => getAdmin("/admin-api/v1/auth/dashboard/list",params);

export const invoiceListAdmin = (params) => getAdmin("/admin-api/v1/auth/invoices/list",params);
export const invoiceDetail = (variable) => getAdmin("/admin-api/v1/auth/invoices/"+variable);
export const invoiceUpdate = (variable,data) => putAdmin("/admin-api/v1/auth/invoices/"+variable,data);


export const userListAdmin = (params) => getAdmin("/admin-api/v1/auth/users/list",params);
export const userDetail = (variable) => getAdmin("/admin-api/v1/auth/users/"+variable);
export const userUpdate = (variable,data) => putAdmin("/admin-api/v1/auth/users/"+variable,data);

export const getlotteris = (params) => getAdmin("/admin-api/v1/auth/lotteries/list",params);



