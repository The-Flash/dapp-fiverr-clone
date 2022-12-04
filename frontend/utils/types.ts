import { NextPage } from "next";
import { ReactElement, ReactNode } from "react";

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
    getLayout?: (page: ReactElement) => ReactNode
  }

export interface ICategory {
    slug: string;
    name: string;
    image: string;
}

export interface ICategoriesData {
    categories: ICategory[]
}

export interface IUser {
    id: string;
    email: string;
    username: string;
    firstName: string;
    lastName: string;
}

export interface ICreateUserResponse {
    createUser: IUser
}