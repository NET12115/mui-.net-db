import {
	Checkbox as MuiCheckbox,
	FormControl,
	FormControlLabel,
	FormGroup,
	FormHelperText,
	FormLabel,
} from '@material-ui/core';
import { CheckboxProps } from '@material-ui/core/Checkbox';
import { FormControlProps } from '@material-ui/core/FormControl';
import { FormControlLabelProps } from '@material-ui/core/FormControlLabel';
import { FormGroupProps } from '@material-ui/core/FormGroup';
import { FormHelperTextProps } from '@material-ui/core/FormHelperText';
import { FormLabelProps } from '@material-ui/core/FormLabel';
import React, { useState } from 'react';

import { Field, FieldProps, FieldRenderProps } from 'react-final-form';

export interface CheckboxData {
	label: string;
	value: any;
}

export interface CheckboxesProps {
	required: boolean;
	label?: string;
	name: string;
	data: CheckboxData | CheckboxData[];
	fieldProps?: FieldRenderProps<CheckboxProps, HTMLInputElement>;
	formControlProps?: FormControlProps;
	formGroupProps?: FormGroupProps;
	formLabelProps?: FormLabelProps;
	formControlLabelProps?: FormControlLabelProps;
	formHelperTextProps?: FormHelperTextProps;
}

interface CheckboxFormControlLabelProps {
	name: string;
	item: CheckboxData;
	single: boolean;
	setError: any;
	fieldProps?: FieldProps<any, any>;
	formControlLabelProps?: FormControlLabelProps;
}

function CheckboxFormControlLabel(props: CheckboxFormControlLabelProps) {
	const {
		name,
		single,
		item,
		setError,
		fieldProps,
		formControlLabelProps,
	} = props;

	return (
		<FormControlLabel
			label={item.label}
			value={single ? undefined : item.value}
			control={
				<Field
					render={(
						fieldRenderProps: FieldRenderProps<CheckboxProps, HTMLInputElement>
					) => {
						const { meta } = fieldRenderProps;

						const showError =
							((meta.submitError && !meta.dirtySinceLastSubmit) ||
								meta.error) &&
							meta.touched;

						setError(showError ? fieldRenderProps.meta.error : null);

						return <CheckboxWrapper {...fieldRenderProps} />;
					}}
					type="checkbox"
					name={name}
					{...fieldProps}
				/>
			}
			{...formControlLabelProps}
		/>
	);
}

export function Checkboxes(props: CheckboxesProps) {
	const {
		required,
		label,
		data,
		name,
		fieldProps,
		formControlProps,
		formGroupProps,
		formLabelProps,
		formControlLabelProps,
		formHelperTextProps,
	} = props;

	const [error, setError] = useState(null);

	const isArray = Array.isArray(data);
	const dataIsOneItem = !isArray || (isArray && (data as any).length === 1);

	if (dataIsOneItem) {
		let item = data;
		if (isArray) {
			item = (data as any)[0];
		}

		return (
			<CheckboxFormControlLabel
				name={name}
				single={true}
				fieldProps={fieldProps as any}
				formControlLabelProps={formControlLabelProps}
				item={item as any}
				setError={setError}
				key={name}
			/>
		);
	} else {
		return (
			<FormControl
				required={required}
				error={!!error}
				margin="normal"
				{...formControlProps}
			>
				<FormLabel {...formLabelProps}>{label}</FormLabel>
				<FormGroup {...formGroupProps}>
					{(data as any).map((item: CheckboxData, idx: number) => (
						<CheckboxFormControlLabel
							name={name}
							single={false}
							fieldProps={fieldProps as any}
							formControlLabelProps={formControlLabelProps}
							item={item}
							setError={setError}
							key={idx}
						/>
					))}
				</FormGroup>
				{error ? (
					<FormHelperText {...formHelperTextProps}>{error}</FormHelperText>
				) : (
					<></>
				)}
			</FormControl>
		);
	}
}

function CheckboxWrapper(
	props: FieldRenderProps<CheckboxProps, HTMLInputElement>
) {
	const {
		input: { name, checked, onChange, ...restInput },
		meta, // pull out meta as we don't need to dump it into the object
		...rest
	} = props;

	return (
		<MuiCheckbox
			{...rest}
			name={name}
			inputProps={restInput as any}
			checked={checked}
			onChange={onChange}
		/>
	);
}
