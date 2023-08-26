/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { GridProps, TextAreaFieldProps, TextFieldProps } from "@aws-amplify/ui-react";
import { EscapeHatchProps } from "@aws-amplify/ui-react/internal";
export declare type ValidationResponse = {
    hasError: boolean;
    errorMessage?: string;
};
export declare type ValidationFunction<T> = (value: T, validationResponse: ValidationResponse) => ValidationResponse | Promise<ValidationResponse>;
export declare type ModelCreateFormInputValues = {
    name?: string;
    description?: string;
    dashboardLayouts?: string[];
};
export declare type ModelCreateFormValidationValues = {
    name?: ValidationFunction<string>;
    description?: ValidationFunction<string>;
    dashboardLayouts?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type ModelCreateFormOverridesProps = {
    ModelCreateFormGrid?: PrimitiveOverrideProps<GridProps>;
    name?: PrimitiveOverrideProps<TextFieldProps>;
    description?: PrimitiveOverrideProps<TextFieldProps>;
    dashboardLayouts?: PrimitiveOverrideProps<TextAreaFieldProps>;
} & EscapeHatchProps;
export declare type ModelCreateFormProps = React.PropsWithChildren<{
    overrides?: ModelCreateFormOverridesProps | undefined | null;
} & {
    clearOnSuccess?: boolean;
    onSubmit?: (fields: ModelCreateFormInputValues) => ModelCreateFormInputValues;
    onSuccess?: (fields: ModelCreateFormInputValues) => void;
    onError?: (fields: ModelCreateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: ModelCreateFormInputValues) => ModelCreateFormInputValues;
    onValidate?: ModelCreateFormValidationValues;
} & React.CSSProperties>;
export default function ModelCreateForm(props: ModelCreateFormProps): React.ReactElement;
