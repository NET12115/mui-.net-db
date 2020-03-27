import React from 'react';

import { TimePicker as MuiTimePicker, TimePickerProps as MuiTimePickerProps } from '@material-ui/pickers';

import { Field, FieldProps, FieldRenderProps } from 'react-final-form';

import pickerProviderWrapper from './PickerProvider';

export interface TimePickerProps extends Partial<Omit<MuiTimePickerProps, 'onChange'>> {
	dateFunsUtils?: any;
	fieldProps?: Partial<FieldProps<any, any>>;
}

export function TimePicker(props: TimePickerProps) {
	const { name, fieldProps, ...rest } = props;

	return (
		<Field
			name={name as any}
			render={fieldRenderProps => <TimePickerWrapper {...fieldRenderProps} {...rest} />}
			{...fieldProps}
		/>
	);
}

interface TimePickerWrapperProps extends FieldRenderProps<MuiTimePickerProps, HTMLElement> {
	dateFunsUtils?: any;
}

function TimePickerWrapper(props: TimePickerWrapperProps) {
	const {
		input: { name, onChange, value, ...restInput },
		meta: { error, submitError, dirtySinceLastSubmit, touched },
		dateFunsUtils,
		...rest
	} = props;

	const { helperText, ...lessrest } = rest;
	const showError = ((submitError && !dirtySinceLastSubmit) || error) && touched;

	return pickerProviderWrapper(
		dateFunsUtils,
		<MuiTimePicker
			fullWidth={true}
			autoOk={true}
			helperText={showError ? error || submitError : helperText}
			error={showError}
			onChange={onChange}
			name={name}
			value={(value as any) === '' ? null : value}
			{...lessrest}
			inputProps={restInput}
		/>
	);
}
