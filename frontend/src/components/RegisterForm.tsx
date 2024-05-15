import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import { registerUser, loginUser } from '../services/api';
import { Button, TextField, Container, Typography, Box, Paper } from '@mui/material';
import { useNotification } from './Notification';

const RegisterForm: React.FC = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('');
    const navigate = useNavigate();
    const { login } = useContext(AuthContext);
    const { showNotification } = useNotification();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await registerUser({ username, password, role });
            const response = await loginUser({ username, password });
            login(response.data.token);
            showNotification('Registration successful', 'success');
        } catch (err) {
            showNotification('Registration failed. Please try again.', 'error');
        }
    };

    return (
        <Container maxWidth="sm">
            <Paper elevation={3} sx={{ padding: 4, marginTop: 4 }}>
                <Typography variant="h4" align="center" gutterBottom>
                    Register
                </Typography>
                <form onSubmit={handleSubmit}>
                    <TextField
                        fullWidth
                        label="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        margin="normal"
                        required
                    />
                    <TextField
                        fullWidth
                        label="Password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        margin="normal"
                        required
                    />
                    <TextField
                        fullWidth
                        label="Role"
                        value={role}
                        onChange={(e) => setRole(e.target.value)}
                        margin="normal"
                        required
                    />
                    <Box mt={2}>
                        <Button type="submit" fullWidth variant="contained" color="primary">
                            Register
                        </Button>
                    </Box>
                    <Box mt={2}>
                        <Button
                            fullWidth
                            variant="outlined"
                            color="secondary"
                            onClick={() => navigate('/login')}
                        >
                            Login
                        </Button>
                    </Box>
                </form>
            </Paper>
        </Container>
    );
};

export default RegisterForm;
