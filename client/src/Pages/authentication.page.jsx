import { useToggle, upperFirst } from '@mantine/hooks';
import { useForm } from '@mantine/form';
import { TextInput, PasswordInput, Text, Paper, Group, Button, Divider, Checkbox, Anchor, Stack, Container, Input, } from '@mantine/core';
import { IconBrandGoogle, IconX } from '@tabler/icons';
import axios from 'axios';
import { useContext } from 'react';
import { AuthContext } from '../context/auth-context';
import { useId } from '@mantine/hooks';
import InputMask from 'react-input-mask';
import { showNotification } from '@mantine/notifications';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth } from '../AuthProvider';
import { useNavigate } from 'react-router-dom';

function Auth(props) {

    const { currentUser, dispatch } = useContext(AuthContext)
    const navigate = useNavigate();

    const [type, toggle] = useToggle(['login', 'register']);
    const id = useId();

    const form = useForm({
        initialValues: {
            email: '',
            name: '',
            password: '',
            phone: '',
            terms: false,
        },

        validate: {
            name: (val) => (val.length <= 3 ? 'Name should include at least 3 characters' : null),
            email: (val) => (/^\S+@\S+$/.test(val) ? null : 'Invalid email'),
            password: (val) => (val.length <= 6 ? 'Password should include at least 6 characters' : null),
        },
    });

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (type === 'register') {
            console.log("hello world")
            if (form.values.terms === false) {
                showNotification({ title: 'Terms not accepted', message: 'You should accept the terms inorder to proceed', color: "red", icon: <IconX size={18} /> })
            } else {
                const response = await axios.post("/register", { email: form.values.email, password: form.values.password, name: form.values.name, phone: form.values.phone, imgurl: null })
                if (response.status === 201) {
                    dispatch({ type: "LOGIN", payload: response.data })
                } else {
                    showNotification({ title: 'Register Error', message: 'Email is allready used', color: "red", icon: <IconX size={18} /> })
                }
            }
        }
        if (type === 'login') {
            console.log("hello world")
            axios.post("/login", { email: form.values.email, password: form.values.password }).then((response) => {
                dispatch({ type: "LOGIN", payload: response.data })
            }).catch(error => {
                showNotification({ title: 'Login Error', message: 'Unvalid email or password', color: "red", icon: <IconX size={18} /> })
            })
        }
    }

    const GoogleHandeler = async (e) => {
        e.preventDefault();
        const provider = new GoogleAuthProvider();
        signInWithPopup(auth, provider)
            .then((userCredential) => {
                const user = userCredential.user;
                const formatedUser = {
                    name: user.displayName,
                    email: user.email,
                    imgurl: user.photoURL,
                    phone: user.phoneNumber,
                    id: user.uid
                }
                axios.post("/google-signup", { ...formatedUser })
                    .then((res) => {
                        console.log(res.data)
                        dispatch({ type: "LOGIN", payload: res.data })
                    }).catch(err => {
                        showNotification({ title: 'Google Error', message: 'Something went wrong', color: "red", icon: <IconX size={18} /> })
                    })
                // navigate("/chat");
            }).catch((error) => {
                showNotification({ title: 'Google Error', message: 'Something went wrong', color: "red", icon: <IconX size={18} /> })
            }
            );
    }

    return (
        <Container size="xs">
            <Paper radius="md" p="xl" withBorder {...props}>
                <Text size="lg" weight={500}>
                    Welcome to PostiDz, {type} with
                </Text>

                <Group position='center' mb="md" mt="md">
                    <Button onClick={GoogleHandeler} size="md" leftIcon={<IconBrandGoogle stroke={3} />} variant="outline" radius="xl">Google</Button>
                </Group>

                <Divider label="Or continue with email" labelPosition="center" my="lg" />

                <form onSubmit={handleSubmit}>
                    <Stack>
                        {type === 'register' && (
                            <>
                                <TextInput
                                    label="Name"
                                    placeholder="Your name"
                                    value={form.values.name}
                                    onChange={(event) => form.setFieldValue('name', event.currentTarget.value)}
                                />
                                <Input.Wrapper id={id} label="Your phone" required>
                                    <Input
                                        value={form.values.phone}
                                        onChange={(event) => form.setFieldValue('phone', event.currentTarget.value)}
                                        component={InputMask} mask="09 99 99 99 99" id={id} placeholder="07 99 99 99 99"
                                    />
                                </Input.Wrapper>
                            </>
                        )}

                        <TextInput
                            required
                            label="Email"
                            placeholder="hello@mantine.dev"
                            value={form.values.email}
                            onChange={(event) => form.setFieldValue('email', event.currentTarget.value)}
                            error={form.errors.email && 'Invalid email'}
                        />

                        <PasswordInput
                            required
                            label="Password"
                            placeholder="Your password"
                            value={form.values.password}
                            onChange={(event) => form.setFieldValue('password', event.currentTarget.value)}
                            error={form.errors.password && 'Password should include at least 6 characters'}
                        />

                        {type === 'register' && (
                            <Checkbox
                                label="I accept terms and conditions"
                                checked={form.values.terms}
                                onChange={(event) => form.setFieldValue('terms', event.currentTarget.checked)}
                            />
                        )}
                    </Stack>

                    <Group position="apart" mt="xl">
                        <Anchor
                            component="button"
                            type="button"
                            color="dimmed"
                            onClick={() => toggle()}
                            size="xs"
                        >
                            {type === 'register'
                                ? 'Already have an account? Login'
                                : "Don't have an account? Register"}
                        </Anchor>
                        <Button type="submit">{upperFirst(type)}</Button>
                    </Group>
                </form>
            </Paper>
        </Container>
    );
}


export default Auth;