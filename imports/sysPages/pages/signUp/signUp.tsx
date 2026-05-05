// signup component similar to login page (except loginWithPassword)
// instead createUser to insert a new user account document

// login page overrides the form’s submit event and call Meteor’s loginWithPassword()
// Authentication errors modify the component’s state to be displayed
import React from 'react';
import { Form, Link, NavigateFunction, useNavigate } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import TextField from '/imports/ui/components/SimpleFormFields/TextField/TextField';
import Button from '@mui/material/Button';
import { userprofileApi } from '../../../modules/userprofile/api/userProfileApi';
import SimpleForm from '/imports/ui/components/SimpleForm/SimpleForm';

import { signUpStyle } from './signUpStyle';
import SignInStyles from '../signIn/signInStyles';
import Box from '@mui/material/Box';
import { IUserProfile } from '/imports/modules/userprofile/api/userProfileSch';
import SysForm from '/imports/ui/components/sysForm/sysForm';
import SysTextField from '/imports/ui/components/sysFormFields/sysTextField/sysTextField';

interface ISignUp {
	showNotification: (options?: Object) => void;
	navigate: NavigateFunction;
	user: IUserProfile;
}

export const SignUp = (props: ISignUp) => {
	const { showNotification } = props;
	const navigate = useNavigate();

	const handleSubmit = (doc: { email: string; password: string }) => {
		const { email, password } = doc;

		userprofileApi.insertNewUser({ email, username: email, password }, (err, r) => {
			if (err) {
				console.log('Login err', err);
				showNotification &&
					showNotification({
						type: 'warning',
						title: 'Problema na criação do usuário!',
						description: 'Erro ao fazer registro em nossa base de dados!'
					});
			} else {
				showNotification &&
					showNotification({
						type: 'sucess',
						title: 'Cadastrado com sucesso!',
						description: 'Registro de usuário realizado em nossa base de dados!'
					});
			}
		});
	};

	const { Container, FormContainer, Content, FormWrapper} = SignInStyles;

	return (
		<Container>
			<Content>
				<Box sx={signUpStyle.labelRegisterSystem}>
					<Typography variant="h1" display={'inline-flex'} gap={1}>
						<Typography variant="inherit" color={(theme) => theme.palette.sysText?.tertiary}>
							{'{'}
						</Typography>
						To-Do List
						<Typography variant="inherit" color="sysText.tertiary">
							{'}'}
						</Typography>
					</Typography>
				</Box>
				<FormContainer>
					<Typography variant="h5">Cadastre-se no sistema</Typography>
					<SysForm
						schema={{
							email: {
								type: String,
								label: 'Email',
								optional: false
							},
							password: {
								type: String,
								label: 'Senha',
								optional: false
							}
						}}
						onSubmit={handleSubmit}>
						<FormWrapper>
							<SysTextField id="Email" label="Email" fullWidth name="email" type="email" placeholder="Digite um email" />
							<SysTextField id="Senha" label="Senha" fullWidth name="password" placeholder="Digite uma senha" type="password" />
							<Box sx={signUpStyle.containerButtonOptions}>
								<Button color={'primary'} variant={'outlined'} id="submit">
									Cadastrar
								</Button>
							</Box>
						</FormWrapper>
					</SysForm>
					<Typography variant="body2">
						Já tem uma conta?{' '}
						<Button variant="text" onClick={() => navigate('/signin')} sx={{ p: 0, minWidth: 'auto' }}>
							<Typography variant="link">Faça Login</Typography>
						</Button>
					</Typography>
				</FormContainer>
				<Box component="img" src="/images/wireframe/synergia-logo.svg" sx={{ width: '100%', maxWidth: '400px' }} />
			</Content>
		</Container>
	);
};
