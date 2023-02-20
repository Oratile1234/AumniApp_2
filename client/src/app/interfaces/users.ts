export interface Users {
    name : string;
    image: string;
    email : string;
    job_title: string;
    phone_number: string;
    password: string;
    employee_number: number;
    account_status: boolean,
    user_type: number;
    looking:boolean;
    company_id:any;

}

export interface Alumni {
    name: string;
    surname: string;
    employment_status: string;
}
