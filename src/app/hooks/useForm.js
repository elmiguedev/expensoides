import { useState } from "react";

export const useForm = (initialValues) => {

    const [form, setForm] = useState(initialValues);

    const onChange = (e) => {
        const { value, name, type, checked } = e.target;
        setForm({ ...form, [name]: type === 'checkbox' ? checked : value });
    }

    const getInput = (name) => {
        return {
            name,
            value: form[name],
            onChange
        }
    }

    const getCheckbox = (name) => {
        return {
            name,
            checked: form[name],
            onChange
        }
    }

    const getRadio = (name, value) => {
        return {
            name,
            value,
            checked: value === form[name],
            onChange
        }
    }

    const getSelect = (name) => {
        return {
            name,
            value: form[name],
            onChange
        }
    }

    return {
        form,
        getInput,
        getSelect,
        getCheckbox,
        getRadio
    }
}