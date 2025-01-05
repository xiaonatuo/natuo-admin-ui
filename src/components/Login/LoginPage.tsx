import React, { useState } from 'react';
import { 
  Button, 
  Box, 
  Typography, 
  Container, 
  Checkbox, 
  FormControlLabel, 
  Alert,
  InputBase,
  styled
} from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';

interface LoginFormData {
  username: string;
  password: string;
  remember: boolean;
}

const StyledInput = styled(InputBase)(({ theme }) => ({
  'label + &': {
    marginTop: theme.spacing(3),
  },
  '& .MuiInputBase-input': {
    position: 'relative',
    backgroundColor: 'rgba(255, 255, 255, 0.04)',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    fontSize: 16,
    width: '100%',
    padding: '10px 12px',
    paddingLeft: '40px',
    borderRadius: 4,
    color: '#fff',
    transition: 'all 0.3s',
    '&:focus': {
      borderColor: '#1890ff',
      backgroundColor: 'rgba(255, 255, 255, 0.08)',
    },
    '&::placeholder': {
      color: 'rgba(255, 255, 255, 0.45)',
    },
    '&:-webkit-autofill': {
      WebkitBoxShadow: '0 0 0 1000px rgb(33 33 36) inset',
      WebkitTextFillColor: '#fff',
    },
    fontFamily: '-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,Noto Sans,sans-serif,apple color emoji,segoe ui emoji,Segoe UI Symbol,noto color emoji',
  },
}));

const getGreeting = () => {
  const hour = new Date().getHours();
  if (hour >= 5 && hour < 12) {
    return '早上好';
  } else if (hour >= 12 && hour < 14) {
    return '中午好';
  } else if (hour >= 14 && hour < 18) {
    return '下午好';
  } else if (hour >= 18 && hour < 22) {
    return '晚上好';
  } else {
    return '夜深了，注意休息哦 😊';
  }
};

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [greeting] = useState(getGreeting());
  const hour = new Date().getHours();

  const [formData, setFormData] = useState<LoginFormData>({
    username: '',
    password: '',
    remember: false
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await login(formData.username, formData.password, formData.remember);
      const from = (location.state as any)?.from?.pathname || '/';
      navigate(from, { replace: true });
    } catch (err) {
      setError(err instanceof Error ? err.message : '登录失败，请重试');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'remember' ? checked : value
    }));
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        background: '#141414',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
      }}
    >
      <Typography
        component="h1"
        variant="h5"
        sx={{
          position: 'absolute',
          top: '20%',
          left: '50%',
          transform: 'translateX(-50%)',
          color: '#fff',
          textAlign: 'center',
          fontSize: '33px',
          fontWeight: 500,
          fontFamily: '-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,Noto Sans,sans-serif,apple color emoji,segoe ui emoji,Segoe UI Symbol,noto color emoji',
        }}
      >
        登录
      </Typography>

      <Container
        maxWidth="xs"
        sx={{
          display: 'flex',
          flexDirection: 'column',
          padding: 3,
          marginTop: '-10vh',
          backgroundColor: '#18181b',
          borderRadius: '12px',
          border: '1px solid #27272a',
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.3)',
        }}
      >
        <Typography
          sx={{
            color: '#fff',
            fontSize: '16px',
            mb: 3,
            fontFamily: '-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,Noto Sans,sans-serif,apple color emoji,segoe ui emoji,Segoe UI Symbol,noto color emoji',
          }}
        >
          {hour >= 22 || hour < 5 ? greeting : `${greeting}，欢迎使用本系统`}
        </Typography>

        {error && (
          <Alert 
            severity="error" 
            sx={{ 
              position: 'absolute',
              top: '5%',
              left: '50%',
              transform: 'translateX(-50%)',
              width: '400px',
              borderRadius: 1,
              backgroundColor: 'rgba(255,0,0,0.1)',
              color: '#ff4d4f',
              '& .MuiAlert-icon': {
                color: '#ff4d4f',
              },
            }}
          >
            {error}
          </Alert>
        )}

        <Box 
          component="form" 
          onSubmit={handleSubmit}
        >
          <Box sx={{ position: 'relative', mb: 2 }}>
            <PersonOutlineIcon 
              sx={{ 
                position: 'absolute',
                left: 12,
                top: 10,
                color: 'rgba(255, 255, 255, 0.45)',
                zIndex: 1,
              }} 
            />
            <StyledInput
              fullWidth
              placeholder="用户名"
              name="username"
              value={formData.username}
              onChange={handleChange}
            />
          </Box>

          <Box sx={{ position: 'relative', mb: 2 }}>
            <LockOutlinedIcon 
              sx={{ 
                position: 'absolute',
                left: 12,
                top: 10,
                color: 'rgba(255, 255, 255, 0.45)',
                zIndex: 1,
              }} 
            />
            <StyledInput
              fullWidth
              type="password"
              placeholder="密码"
              name="password"
              value={formData.password}
              onChange={handleChange}
            />
          </Box>

          <Box sx={{ 
            display: 'flex', 
            justifyContent: 'space-between',
            alignItems: 'center',
            mb: 3,
          }}>
            <FormControlLabel
              control={
                <Checkbox
                  name="remember"
                  checked={formData.remember}
                  onChange={handleChange}
                  sx={{
                    color: 'rgba(255, 255, 255, 0.45)',
                    '&.Mui-checked': {
                      color: '#1890ff',
                    },
                  }}
                />
              }
              label={
                <Typography sx={{ 
                  color: 'rgba(255, 255, 255, 0.45)',
                  fontFamily: '-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,Noto Sans,sans-serif,apple color emoji,segoe ui emoji,Segoe UI Symbol,noto color emoji',
                }}>
                  记住我
                </Typography>
              }
            />
            <Typography 
              sx={{ 
                color: '#1890ff',
                cursor: 'pointer',
                fontFamily: '-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,Noto Sans,sans-serif,apple color emoji,segoe ui emoji,Segoe UI Symbol,noto color emoji',
                '&:hover': {
                  color: '#40a9ff',
                },
              }}
            >
              忘记密码
            </Typography>
          </Box>

          <Button
            type="submit"
            fullWidth
            variant="contained"
            disabled={loading}
            sx={{
              py: 1.2,
              fontSize: '16px',
              fontWeight: 400,
              fontFamily: '-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,Noto Sans,sans-serif,apple color emoji,segoe ui emoji,Segoe UI Symbol,noto color emoji',
              background: '#1890ff',
              '&:hover': {
                background: '#40a9ff',
              },
              '&:disabled': {
                background: '#1890ff',
                opacity: 0.7,
              },
            }}
          >
            {loading ? '登录中...' : '登录'}
          </Button>
        </Box>
      </Container>
    </Box>
  );
};

export default LoginPage; 