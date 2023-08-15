import { useState } from 'react';
import LoginIcon from '@mui/icons-material/Login';
import { Box, Button, Paper, TextField, Typography } from '@mui/material';
import { useAuth } from '../components/Auth/Auth';
import { useNavigate } from 'react-router-dom';
import logo from '/logo.svg';
// Same as below, will return in next PR
// import PasswordField from '../components/Fields/Password';

export default function LoginView() {
  const [user, setUser] = useState('');
  // Same as below and above, will return in next PR
  // const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const auth = useAuth();
  const navigate = useNavigate();

  async function handleLogin(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    try {
      await auth.signIn(data, () => {
        navigate('/', { replace: true });
      });
    } catch (err) {
      let error = err as Error;
      setError(error.message);
    }
  }

  return (
    <Box
      component={'main'}
      sx={{
        minHeight: '100dvh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Paper
        elevation={3}
        component={'form'}
        onSubmit={handleLogin}
        sx={{
          margin: 'auto',
          padding: '2rem',
          gap: '1rem',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          width: '90%',
          maxWidth: '30rem',
        }}
      >
        <img src={logo} alt="logo" height={50} />
        <Typography variant="h4" component={'h1'}>
          Login
        </Typography>
        {error && <p>{error}</p>}
        <TextField
          variant="filled"
          label="Gebruikersnaam"
          name="username"
          id="username"
          value={user}
          type={'text'}
          autoComplete="username"
          onChange={(e) => setUser(e.target.value)}
        />
        {/* 
        I commented these out for now, due to the discussed error
        Next PR i will add this field again
        <PasswordField password={password} setPassword={setPassword} /> 
         */}
        <Button
          color={'primary'}
          startIcon={<LoginIcon />}
          variant="contained"
          type="submit"
          aria-label="Login"
        >
          Login
        </Button>
      </Paper>
    </Box>
  );
}
