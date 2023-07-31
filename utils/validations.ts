import { ITag } from "@/interfaces";
import { RegisterOptions } from "react-hook-form";

export interface LoginFormData {
  email: string;
  password: string;
}

interface LoginFormDataValidations {
  email: RegisterOptions
  password: RegisterOptions
}

export const loginFormValidations: LoginFormDataValidations = {
  email: {
    required: 'Este campo es requerido',
    pattern: {
      value: /^[A-Za-z0-9_!#$%&'*+\/=?`{|}~^.-]+@[A-Za-z0-9.-]+$/gm,
      message: 'Ese email es invalido'
    }
  },
  password: {
    required: 'Este campo es requerido',
    minLength: {
      value: 4,
      message: 'Debe ser mayor a 4 caracteres'
    }
  },
}

export interface RegisterFormData {
  name: string,
  email: string;
  password: string;
}

interface RegisterFormDataValidations {
  name: RegisterOptions,
  email: RegisterOptions
  password: RegisterOptions
}

export const registerFormValidations: RegisterFormDataValidations = {
  name: {
    required: 'Este campo es requerido'
  },
  email: {
    required: 'Este campo es requerido',
    pattern: {
      value: /^[A-Za-z0-9_!#$%&'*+\/=?`{|}~^.-]+@[A-Za-z0-9.-]+$/gm,
      message: 'Ese email es invalido'
    }
  },
  password: {
    required: 'Este campo es requerido',
    minLength: {
      value: 4,
      message: 'Debe ser mayor a 4 caracteres'
    }
  },
}

export interface NoteFormData {
  title: string;
  description: string;
  tags: ITag[];
}

interface NoteFormDataValidations {
  title: RegisterOptions
  description: RegisterOptions
}

export const noteFormValidations: NoteFormDataValidations = {
  title: {
    required: 'Este campo es requerido'
  },
  description: {
    required: 'Este campo es requerido'
  },
}