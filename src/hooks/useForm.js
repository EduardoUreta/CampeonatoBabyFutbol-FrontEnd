import { useEffect, useMemo, useState } from "react";

export const useForm = (initialForm = {}, formValidations = {}) => {

    const [formState, setFormState] = useState(initialForm);
    const [formValidation, setFormValidation] = useState({});

    useEffect(() => {
        createValidators();
    }, [formState]);

    const isFormValid = useMemo(() => {
        for (const formValue of Object.keys(formValidation)) {
            if(formValidation[formValue] !== null) return false;
        }
        return true
    }, [formValidation]);

    // Funcion de cambiar cualquier input de manera DINAMICA
    const onInputChange = ({target}) => {
        // Con esto puedo saber que input cambio,
        // ya que tengo name y su value 
        const {name, value} = target;
        setFormState({
            ...formState,
            // Al name, le doy el nuevo valor
            [name]: value
        });
    };

    const onResetForm = () => {
        setFormState(initialForm);
    };

    const createValidators = () => {
        const formCheckedValues = {};
        for (const formField of Object.keys(formValidations)) {
            const [ fn, errorMessage ] = formValidations[formField];
            formCheckedValues[`${formField}Valid`] = fn(formState[formField]) ? null : errorMessage;
        }

        setFormValidation(formCheckedValues);
            
    };

    return {
        ...formState,
        formState,
        setFormState,
        onInputChange,
        onResetForm,

        ...formValidation,
        isFormValid
    }
}


