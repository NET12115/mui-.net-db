import React from 'react';

import { Form } from 'react-final-form';

import { Autocomplete } from '../src';
import { render, act } from './TestUtils';
import { AutocompleteOption } from '../src/Autocomplete';

interface ComponentProps {
	initialValues: FormData;
	validator?: any;
	textFieldProps?: any;
	options: AutocompleteOption[];
	getOptionValue: (option: any) => any;
	getOptionLabel: (option: any) => any;
}

interface FormData {
	hello: string;
}

describe('Autocomplete', () => {
	const defaultData = 'something here';

	const initialValues: FormData = {
		hello: defaultData,
	};

	const initialOptions: AutocompleteOption[] = [{ value: 'Hello' }, { value: 'World' }];

	const initialGetOptionValue = (option: any) => option.value;

	function AutocompleteFieldComponent({
		initialValues,
		validator,
		textFieldProps,
		options,
		getOptionLabel,
		getOptionValue,
	}: ComponentProps) {
		const onSubmit = (values: FormData) => {
			console.log(values);
		};

		const validate = async (values: FormData) => {
			if (validator) {
				return validator(values);
			}
		};

		return (
			<Form
				onSubmit={onSubmit}
				initialValues={initialValues}
				validate={validate}
				render={({ handleSubmit }) => (
					<form onSubmit={handleSubmit} noValidate>
						<Autocomplete
							label="Test"
							name="hello"
							required={true}
							textFieldProps={textFieldProps}
							options={options}
							getOptionValue={getOptionValue}
							getOptionLabel={getOptionLabel}
						/>
					</form>
				)}
			/>
		);
	}

	it('renders without errors', async () => {
		await act(async () => {
			const rendered = render(
				<AutocompleteFieldComponent
					initialValues={initialValues}
					options={initialOptions}
					getOptionValue={initialGetOptionValue}
					getOptionLabel={initialGetOptionValue}
				/>
			);
			expect(rendered).toMatchSnapshot();
		});
	});
});
