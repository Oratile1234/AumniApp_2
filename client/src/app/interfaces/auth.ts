export interface login {
    employee_number: number;
    password: string;
}
export interface register {

    name : string;
    surname: string,
    job_title: string,
    image:string;
    email : string;
    phone_number: number;
    password: string;
    employee_number: string;
    employement_status: string;
    account_status: boolean;
    user_type: number;
}

export interface pass {
  confirm: string;
  password: string;
}
