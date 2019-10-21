import React from 'react';

import {
	KeyboardDatePicker as MuiKeyboardDatePicker,
	KeyboardDatePickerProps as MuiKeyboardDatePickerProps,
	MuiPickersUtilsProvider,
} from '@material-ui/pickers';

import { Field, FieldRenderProps } from 'react-final-form';

interface KeyboardDatePickerProps extends Partial<MuiKeyboardDatePickerProps> {
	dateFunsUtils: any;
}

export function KeyboardDatePicker(props: KeyboardDatePickerProps) {
	const { name } = props;

	return (
		<Field
			name={name as any}
			render={fieldRenderProps => (
				<KeyboardDatePickerWrapper {...fieldRenderProps} {...props} />
			)}
		/>
	);
}

interface DatePickerWrapperProps
	extends FieldRenderProps<MuiKeyboardDatePickerProps, HTMLElement> {
	dateFunsUtils: any;
}

function KeyboardDatePickerWrapper(props: DatePickerWrapperProps) {
	const {
		input: { name, onChange, value, ...restInput },
		meta,
		dateFunsUtils,
		...rest
	} = props;

	const showError =
		((meta.submitError && !meta.dirtySinceLastSubmit) || meta.error) &&
		meta.touched;

	return (
		<MuiPickersUtilsProvider utils={dateFunsUtils}>
			<MuiKeyboardDatePicker
				disableToolbar
				fullWidth={true}
				autoOk={true}
				helperText={showError ? meta.error || meta.submitError : undefined}
				error={showError}
				variant="inline"
				format="yyyy-MM-dd"
				margin="normal"
				onChange={onChange}
				value={(value as any) === '' ? null : value}
				{...rest}
				inputProps={restInput}
			/>
		</MuiPickersUtilsProvider>
	);
}
