import 'react-app-polyfill/ie11';

import {
	AppBar,
	Grid,
	Link,
	Paper,
	Toolbar,
	Typography,
} from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

import React from 'react';
import ReactDOM from 'react-dom';

import { Form } from 'react-final-form';

import * as Yup from 'yup';

import {
	CheckboxData,
	Checkboxes,
	DatePicker,
	makeValidate,
	Select,
	SelectData,
	TextField,
} from '../src';
import { RadioData, Radios } from '../src/Radios';

interface FormData {
	best: string[];
	date: Date;
	hello: string;
	cities: string;
	gender: string;
}

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		paper: {
			marginTop: theme.spacing(3),
			padding: theme.spacing(3),
		},
		footer: {
			top: 'auto',
			bottom: 0,
		},
	})
);

const validateSchema = makeValidate(
	Yup.object().shape({
		best: Yup.array().min(1),
		date: Yup.date().required(),
		hello: Yup.string().required(),
		cities: Yup.string().required(),
		gender: Yup.string().required(),
	})
);

const App = () => {
	const classes = useStyles();

	const checkboxData: CheckboxData[] = [
		{ label: 'Ack', value: 'ack' },
		{ label: 'Bar', value: 'bar' },
		{ label: 'Foo', value: 'foo' },
	];

	const selectData: SelectData[] = [
		{ label: 'Pick one...', value: '' },
		{ label: 'San Diego', value: 'sandiego' },
		{ label: 'Los Angeles', value: 'losangeles' },
		{ label: 'Saigon', value: 'saigon' },
	];

	const radioData: RadioData[] = [
		{ label: 'Female', value: 'female' },
		{ label: 'Male', value: 'male' },
		{ label: 'Both', value: 'both' },
	];

	const initialValues: FormData = {
		best: ['bar'],
		date: new Date(),
		hello: 'some text',
		cities: 'losangeles',
		gender: 'both',
	};

	const onSubmit = (values: FormData) => {
		console.log(values);
	};

	const validate = (values: FormData) => {
		return validateSchema(values);
	};

	return (
		<>
			<Paper className={classes.paper}>
				<Form
					onSubmit={onSubmit}
					initialValues={initialValues}
					validate={validate}
					render={({ handleSubmit, values, errors }) => (
						<form onSubmit={handleSubmit} noValidate>
							<Grid container>
								<Grid item xs>
									<Checkboxes
										label="Check at least one..."
										required={true}
										name="best"
										data={checkboxData}
										error={errors.best}
									/>
								</Grid>
								<Grid item xs>
									<Typography>Form field data</Typography>
									<pre>{JSON.stringify(values, undefined, 2)}</pre>
								</Grid>
							</Grid>
							<Grid item xs>
								<Radios
									label="Pick a gender"
									required={true}
									name="gender"
									data={radioData}
									error={errors.gender}
								/>
							</Grid>
							<Grid container>
								<Grid item xs>
									<DatePicker label="Pick a date" name="date" required={true} />
								</Grid>
								<Grid item xs></Grid>
							</Grid>
							<Grid container>
								<Grid item xs>
									<TextField label="Hello world" name="hello" required={true} />
								</Grid>
								<Grid item xs></Grid>
							</Grid>
							<Grid container>
								<Grid item xs>
									<Select
										label="Pick a city..."
										name="cities"
										error={errors.cities}
										required={true}
										data={selectData}
									/>
								</Grid>
								<Grid item xs></Grid>
							</Grid>
						</form>
					)}
				/>
			</Paper>
			<AppBar
				color="inherit"
				position="fixed"
				elevation={0}
				className={classes.footer}
			>
				<Toolbar>
					<Grid
						container
						spacing={1}
						alignItems="center"
						justify="center"
						direction="row"
					>
						<Grid item>
							<Link
								href="https://github.com/lookfirst/mui-rff"
								target="_blank"
								color="textSecondary"
								variant="body1"
							>
								MUI-RFF Github Project
							</Link>
						</Grid>
					</Grid>
				</Toolbar>
			</AppBar>
		</>
	);
};

ReactDOM.render(<App />, document.getElementById('root'));
