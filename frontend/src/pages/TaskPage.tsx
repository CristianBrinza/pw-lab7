import React, { useContext, useEffect, useState } from 'react';
import AuthContext from '../context/AuthContext';
import { getTasks, createTask, updateTask, deleteTask } from '../services/api';
import { Button, TextField, Container, Typography, List, ListItem, ListItemText, IconButton, Box, Paper } from '@mui/material';
import { Delete, Edit } from '@mui/icons-material';
import { useNotification } from '../components/Notification';
import { Task } from '../types/Task';

const TaskPage: React.FC = () => {
    const { token, logout, userRole, userInfo } = useContext(AuthContext);
    const { showNotification } = useNotification();
    const [tasks, setTasks] = useState<Task[]>([]);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [editingTask, setEditingTask] = useState<Task | null>(null);
    const [page, setPage] = useState(1);

    useEffect(() => {
        fetchTasks(page);
    }, [page]);

    const fetchTasks = async (page: number) => {
        try {
            const response = await getTasks(page, 5);
            setTasks(response.data);
        } catch (err) {
            showNotification('Failed to load tasks', 'error');
        }
    };

    const handleCreate = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            if (editingTask) {
                await updateTask(editingTask._id, { title, description });
                showNotification('Task updated successfully', 'success');
            } else {
                await createTask({ title, description });
                showNotification('Task created successfully', 'success');
            }
            setTitle('');
            setDescription('');
            setEditingTask(null);
            fetchTasks(page);
        } catch (err) {
            showNotification('Failed to create task', 'error');
        }
    };

    const handleDelete = async (id: string) => {
        try {
            await deleteTask(id);
            showNotification('Task deleted successfully', 'success');
            fetchTasks(page);
        } catch (err) {
            showNotification('Failed to delete task', 'error');
        }
    };

    const handleEdit = (task: Task) => {
        setEditingTask(task);
        setTitle(task.title);
        setDescription(task.description || '');
    };

    return (
        <Container>
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
                <Typography variant="h4">Tasks</Typography>
                <Button variant="contained" color="secondary" onClick={logout}>
                    Logout
                </Button>
            </Box>
            <Typography variant="subtitle1">Welcome, {userInfo?.username}</Typography>
            {userRole && ['ADMIN', 'WRITER'].includes(userRole) && (
                <Paper elevation={3} sx={{ padding: 3, marginTop: 2 }}>
                    <form onSubmit={handleCreate}>
                        <TextField
                            fullWidth
                            label="Title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            margin="normal"
                            required
                        />
                        <TextField
                            fullWidth
                            label="Description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            margin="normal"
                        />
                        <Button type="submit" fullWidth variant="contained" color="primary">
                            {editingTask ? 'Update Task' : 'Create Task'}
                        </Button>
                    </form>
                </Paper>
            )}
            <List>
                {tasks.map((task: Task) => (
                    <ListItem key={task._id} secondaryAction={
                        <>
                            {userRole && ['ADMIN', 'WRITER'].includes(userRole) && (
                                <>
                                    <IconButton edge="end" aria-label="edit" onClick={() => handleEdit(task)}>
                                        <Edit />
                                    </IconButton>
                                    {userRole === 'ADMIN' && (
                                        <IconButton edge="end" aria-label="delete" onClick={() => handleDelete(task._id)}>
                                            <Delete />
                                        </IconButton>
                                    )}
                                </>
                            )}
                        </>
                    }>
                        <ListItemText primary={task.title} secondary={task.description} />
                    </ListItem>
                ))}
            </List>
            <Box display="flex" justifyContent="center" mt={2}>
                <Button onClick={() => setPage(page - 1)} disabled={page === 1}>
                    Previous
                </Button>
                <Button onClick={() => setPage(page + 1)}>
                    Next
                </Button>
            </Box>
        </Container>
    );
};

export default TaskPage;
