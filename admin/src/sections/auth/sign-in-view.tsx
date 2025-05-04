import axios from 'axios';
import { useState } from 'react';

import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import Link from '@mui/material/Link';
import Snackbar from '@mui/material/Snackbar';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

import { Iconify } from 'src/components/iconify';
import { useRouter } from 'src/routes/hooks';

export function SignInView() {
  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  const handleLogin = async () => {
    try {
      const res = await axios.post(`${import.meta.env.VITE_API_BACKEND}/login`, {
        email,
        password,
      });

      localStorage.setItem('token', res.data.accessToken);

      setIsSuccess(true);
      setSnackbarMessage('🎉 Đăng nhập thành công!');
      setSnackbarOpen(true);

      setTimeout(() => {
        router.push('/');
      }, 1500);
    } catch (err: any) {
      const msg = err?.response?.data?.message || 'Đăng nhập thất bại!';
      setIsSuccess(false);
      setSnackbarMessage(`❌ ${msg}`);
      setSnackbarOpen(true);
    }
  };

  return (
    <>
      <Box
        sx={{
          gap: 1.5,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          mb: 5,
        }}
      >
        <Typography variant="h5">Sign in</Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          Don’t have an account?
          <Link variant="subtitle2" sx={{ ml: 0.5 }}>
            Get started
          </Link>
        </Typography>
      </Box>

      <Box sx={{ display: 'flex', alignItems: 'flex-end', flexDirection: 'column' }}>
        <TextField
          fullWidth
          label="Email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          sx={{ mb: 3 }}
        />

        <Link variant="body2" color="inherit" sx={{ mb: 1.5 }}>
          Forgot password?
        </Link>

        <TextField
          fullWidth
          label="Password"
          type={showPassword ? 'text' : 'password'}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                  <Iconify icon={showPassword ? 'solar:eye-bold' : 'solar:eye-closed-bold'} />
                </IconButton>
              </InputAdornment>
            ),
          }}
          sx={{ mb: 3 }}
        />

        <Button fullWidth size="large" color="inherit" variant="contained" onClick={handleLogin}>
          Sign in
        </Button>
      </Box>

      <Divider sx={{ my: 3, '&::before, &::after': { borderTopStyle: 'dashed' } }}>
        <Typography
          variant="overline"
          sx={{ color: 'text.secondary', fontWeight: 'fontWeightMedium' }}
        >
          OR
        </Typography>
      </Divider>

      <Box sx={{ gap: 1, display: 'flex', justifyContent: 'center' }}>
        <IconButton color="inherit">
          <Iconify width={22} icon="socials:google" />
        </IconButton>
        <IconButton color="inherit">
          <Iconify width={22} icon="socials:github" />
        </IconButton>
        <IconButton color="inherit">
          <Iconify width={22} icon="socials:twitter" />
        </IconButton>
      </Box>

      {/* Snackbar hiển thị thông báo */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={() => setSnackbarOpen(false)}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert
          onClose={() => setSnackbarOpen(false)}
          severity={isSuccess ? 'success' : 'error'}
          sx={{ width: '100%' }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </>
  );
}
