import { Customer } from "./Customer.model";

export interface DataItem {
    id: number;
    customerId: number;
    score: number;
    type: string;
    membershipId: string;
    createdAt: string;
    updatedAt: string;
    deletedAt: any;
    customer: Customer;
}