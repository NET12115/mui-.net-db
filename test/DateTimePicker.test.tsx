import React from 'react';

import { Form } from 'react-final-form';

import 'date-fns';

import { DateTimePicker } from '../src';
import { act, customRender } from '../src/test/TestUtils';

interface ComponentProps {
	initialValues: FormData;
	validator?: any;
}

interface FormData {
	date: Date;
}

describe('DateTimePicker', () => {
	const defaultDateTimeValue = '2019-10-18 12:00 AM';

	const initialValues: FormData = {
		date: new Date(defaultDateTimeValue),
	};

	function DateTimePickerComponent({ initialValues, validator }: ComponentProps) {
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
						<DateTimePicker label="Test" name="date" required={true} inputFormat="yyyy-MM-dd h:mm a" />
					</form>
				)}
			/>
		);
	}

	it('renders without errors', async () => {
		await act(async () => {
			const rendered = customRender(<DateTimePickerComponent initialValues={initialValues} />);
			expect(rendered).toMatchSnapshot();
		});
	});

	it('renders the value with default data', async () => {
		const rendered = customRender(<DateTimePickerComponent initialValues={initialValues} />);
		const date = (await rendered.findByDisplayValue(defaultDateTimeValue)) as HTMLInputElement;
		expect(date.value).toBe(defaultDateTimeValue);
	});

	it('has the Test label', async () => {
		await act(async () => {
			const rendered = customRender(<DateTimePickerComponent initialValues={initialValues} />);
			const elem = rendered.getByText('Test') as HTMLLegendElement;
			expect(elem.tagName).toBe('LABEL');
		});
	});

	it('has the required *', async () => {
		await act(async () => {
			const rendered = customRender(<DateTimePickerComponent initialValues={initialValues} />);
			const elem = rendered.getByText('*') as HTMLSpanElement;
			expect(elem.tagName).toBe('SPAN');
			expect(elem.innerHTML).toBe(' *');
		});
	});
});
