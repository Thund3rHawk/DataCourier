import { Document } from "mongoose";

interface CustomProperty {
    title: string;
    fallbackValue: string;
  }

export interface User{
    name: string;
    email: string;
    city: string;
    [key: string]: string;
}

export interface List extends Document{
    title: string;
    customProperty: CustomProperty[];
    users: User[];
}