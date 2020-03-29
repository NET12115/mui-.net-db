import React, { ReactNode } from 'react';

import {
	Radio as MuiRadio,
	RadioProps as MuiRadioProps,
	RadioGroup,
	RadioGroupProps,
	FormControl,
	FormControlProps,
	FormControlLabel,
	FormControlLabelProps,
	FormHelperTextProps,
	FormLabel,
	FormLabelProps,
} from '@material-ui/core';

import { Field, FieldProps, FieldRenderProps } from 'react-final-form';
import { ErrorMessage, showError, useFieldForErrors } from './Util';

export interface RadioData {
	label: ReactNode;
	value: unknown;
	disabled?: boolean;
}

export interface RadiosProps extends Partial<Omit<MuiRadioProps, 'onChange'>> {
	name: string;
	data: RadioData[];
	label?: ReactNode;
	required?: boolean;
	helperText?: string;
	formLabelProps?: Partial<FormLabelProps>;
	formControlLabelProps?: Partial<FormControlLabelProps>;
	fieldProps?: Partial<FieldProps<any, any>>;
	formControlProps?: Partial<FormControlProps>;
	radioGroupProps?: Partial<RadioGroupProps>;
	formHelperTextProps?: Partial<FormHelperTextProps>;
}

export function Radios(props: RadiosProps) {
	const {
		name,
		data,
		label,
		required,
		helperText,
		formLabelProps,
		formControlLabelProps,
		fieldProps,
		formControlProps,
		radioGroupProps,
		formHelperTextProps,
		...restRadios
	} = props;

	const field = useFieldForErrors(name);
	const isError = showError(field);

	return (
		<FormControl required={required} error={isError} {...formControlProps}>
			{!!label && <FormLabel {...formLabelProps}>{label}</FormLabel>}
			<RadioGroup {...radioGroupProps}>
				{data.map((item: RadioData, idx: number) => (
					<FormControlLabel
						key={idx}
						name={name}
						label={item.label}
						value={item.value}
						disabled={item.disabled}
						control={
							<Field
								name={name}
								type="radio"
								render={({ input, meta }) => (
									<MuiRadioWrapper
										input={input}
										meta={meta}
										required={required}
										disabled={item.disabled}
										helperText={helperText}
										{...restRadios}
									/>
								)}
								{...fieldProps}
							/>
						}
						{...formControlLabelProps}
					/>
				))}
			</RadioGroup>
			<ErrorMessage
				showError={isError}
				meta={field.meta}
				formHelperTextProps={formHelperTextProps}
				helperText={helperText}
			/>
		</FormControl>
	);
}

interface MuiRadioWrapperProps extends FieldRenderProps<Partial<MuiRadioProps>, HTMLInputElement> {}

function MuiRadioWrapper(props: MuiRadioWrapperProps) {
	const {
		input: { name, value, onChange, checked, disabled, ...restInput },
		meta,
		helperText,
		required,
		...rest
	} = props;

	return (
		<MuiRadio
			name={name}
			value={value}
			onChange={onChange}
			checked={checked}
			disabled={disabled}
			required={required}
			inputProps={{ required, ...restInput }}
			{...rest}
		/>
	);
}
