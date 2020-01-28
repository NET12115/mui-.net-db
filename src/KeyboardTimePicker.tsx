import React from 'react';

import {
	KeyboardTimePicker as MuiKeyboardTimePicker,
	KeyboardTimePickerProps as MuiKeyboardTimePickerProps,
} from '@material-ui/pickers';

import { Field, FieldProps, FieldRenderProps } from 'react-final-form';

import pickerProviderWrapper from './PickerProvider';

export interface KeyboardTimePickerProps extends Partial<MuiKeyboardTimePickerProps> {
	dateFunsUtils?: any;
	fieldProps?: FieldProps<any, any>;
}

export function KeyboardTimePicker(props: KeyboardTimePickerProps) {
	const { name, fieldProps, ...rest } = props;

	return (
		<Field
			name={name as any}
			render={fieldRenderProps => <KeyboardTimePickerWrapper {...fieldRenderProps} {...rest} />}
			{...fieldProps}
		/>
	);
}

interface KeyboardTimePickerWrapperProps extends FieldRenderProps<MuiKeyboardTimePickerProps, HTMLElement> {
	dateFunsUtils?: any;
}

function KeyboardTimePickerWrapper(props: KeyboardTimePickerWrapperProps) {
	const {
		input: { name, onChange, value, ...restInput },
		meta,
		dateFunsUtils,
		...rest
	} = props;

	const showError = ((meta.submitError && !meta.dirtySinceLastSubmit) || meta.error) && meta.touched;

	return pickerProviderWrapper(
		dateFunsUtils,
		<MuiKeyboardTimePicker
			fullWidth={true}
			autoOk={true}
			helperText={showError ? meta.error || meta.submitError : undefined}
			error={showError}
			margin="normal"
			onChange={onChange}
			name={name}
			value={(value as any) === '' ? null : value}
			{...rest}
			inputProps={restInput}
		/>
	);
}
