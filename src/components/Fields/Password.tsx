import { FilledInput, FormControl, IconButton, InputAdornment, InputLabel } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { Dispatch, SetStateAction, useState } from 'react';

// TODO: Add PasswordFieldT to types.tsx if file is created
interface PasswordFieldT {
  password: string;
  setPassword: Dispatch<SetStateAction<string>>;
}

const PasswordField = (props: PasswordFieldT) => {
  const { password, setPassword } = props;
  const [showPassword, setShowPassword] = useState(false);

  return (
    <FormControl variant="outlined">
      <InputLabel htmlFor="password" variant="filled">
        Wachtwoord
      </InputLabel>
      <FilledInput
        autoComplete="current-password"
        id="password"
        name="password"
        type={showPassword ? 'text' : 'password'}
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        endAdornment={
          <InputAdornment position="end">
            <IconButton
              aria-label="toggle password visibility"
              onClick={() => setShowPassword(!showPassword)}
              onMouseDown={(e) => e.preventDefault()}
              edge="end"
            >
              {showPassword ? <Visibility /> : <VisibilityOff />}
            </IconButton>
          </InputAdornment>
        }
      />
    </FormControl>
  );
};

export default PasswordField;
