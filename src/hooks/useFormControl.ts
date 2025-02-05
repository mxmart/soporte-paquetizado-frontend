'use client';
import { useEffect, useState } from "react";
import { UseFormReset, UseFormSetValue } from "react-hook-form";

interface Props {
    values: any;
    reset: UseFormReset<any>;
    setValue: UseFormSetValue<any>;
    name: string;
};

export const useFormControl = ({ values, reset, setValue, name }: Props) => {

    const [currentValues, setCurrentValues] = useState<any>();
    const [isReseted, setIsReseted] = useState<boolean>(false);
    const [edit, setEdit] = useState<boolean>(false);

    const handleReset = () => {
        setValue(name, currentValues);
        setIsReseted(true);
        setEdit(false);
        setTimeout(() => {
            setIsReseted(false);
        }, 2000);
    };

    useEffect(() => {
      setCurrentValues(values);
    }, [ values ]);
    
    return {
        handleReset,
        setEdit,

        currentValues,
        isReseted,
        edit,
    }

};