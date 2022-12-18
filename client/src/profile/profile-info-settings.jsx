import { ActionIcon, Anchor, Avatar, Badge, Box, Center, Container, createStyles, Divider, Group, Indicator, InputBase, Stack, Text, TextInput, Tooltip } from "@mantine/core";
import { IconCheck, IconChevronLeft, IconDots, IconEdit } from "@tabler/icons";
import { useRef, useState, useContext, useEffect } from "react";
import InputMask from 'react-input-mask';
import { Link } from "react-router-dom";
import { AuthContext } from '../context/auth-context';
import axios from "axios";

const useStyles = createStyles((theme) => {
    return {
        viewElement: {
            width: "50%",
            [theme.fn.smallerThan("md")]: {
                width: "85%",
            },
        },
        header: {
            paddingBottom: theme.spacing.md,
            marginBottom: theme.spacing.md * 1.5,
        },
        icon: {
            '&:hover': {
                backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[2],
            },
        },

        profileSettings: {
            backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[2],
            padding: `${theme.spacing.sm}px ${theme.spacing.md}px`,
            borderRadius: theme.radius.md,
        },

        label: {
            color: theme.colorScheme === 'dark' ? theme.colors.dark[2] : theme.colors.gray[6],
            fontSize: theme.fontSizes.xs,
            fontWeight: 400,
        },
        data: {
            color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.colors.gray[7],
            fontSize: theme.fontSizes.sm,
            fontWeight: 500,
        },
    };
});

export default function ProfileInfoSettings() {
    const { currentUser, dispatch } = useContext(AuthContext);
    //.id  .email  .phone  .imgurl .name
    const [displayName, setDisplayName] = useState(currentUser.name);
    const [email] = useState(currentUser.email);
    const [phone, setPhone] = useState(currentUser.phone);
    const [displayNameEdit, setDisplayNameEdit] = useState(false);
    const [emailEdit, setEmailEdit] = useState(false);
    const [phoneEdit, setPhoneEdit] = useState(false);

    const imageinputRef = useRef();

    const { classes } = useStyles();

    const changeImageHandeler = (e) => {
        e.preventDefault();
        imageinputRef.current.click()
    }

    const submitNameHandeler = () => {
        setDisplayNameEdit(!displayNameEdit)
        if (displayNameEdit) {
            axios.put("/update-user", { user_id: currentUser.id, name: displayName })
                .then(res => {
                    dispatch({ type: "UPDATE_USER", payload: { name: displayName } })
                })
                .catch(err => {
                    console.log(err)
                })

        }
    }

    const submitPhoneHandeler = () => {
        setPhoneEdit(!phoneEdit)
        if (phoneEdit) {
            axios.put("/update-user", { user_id: currentUser.id, phone: phone })
                .then(res => {
                    dispatch({ type: "UPDATE_USER", payload: { phone: phone } })
                })
                .catch(err => {
                    console.log(err)
                })

        }
    }

    return (
        <Container size={"xl"} sx={theme => ({
            height: "100vh",
            width: "75%",
            [theme.fn.smallerThan("md")]: {
                width: "100%",
            },
        })} m={0} py={"xl"} px={0}>
            <Center>
                <Box className={classes.viewElement}>
                    <Group position="apart" className={classes.header}>
                        <Group>
                            <Anchor component={Link} to="/profile">
                                <ActionIcon className={classes.icon} radius="xl">
                                    <IconChevronLeft size={24} />
                                </ActionIcon>
                            </Anchor>

                            <h2>My account</h2>
                        </Group>
                        <ActionIcon radius={"xl"}>
                            <IconDots size={24} />
                        </ActionIcon>
                    </Group>

                    <Group position="left" className={classes.header}>
                        <Indicator
                            onClick={changeImageHandeler}
                            sx={{ cursor: "pointer" }}
                            mr={"md"} color={"white"} label={<IconEdit color="black" size={15} />} dot inline size={18} offset={10} position="top-end" >
                            <Avatar color={"primay"} size="xl" radius="100%" src={currentUser.imgurl}
                                sx={theme => ({
                                    border: `1px solid ${theme.colorScheme === "dark" ? theme.colors.dark[6] : theme.colors.gray[2]}`,
                                })}
                            >{currentUser.name.charAt(0).toUpperCase()}</Avatar>
                        </Indicator>
                        <Stack>
                            <Text >{displayName}</Text>
                            <Badge >{/** for admin or user */}</Badge>
                        </Stack>
                    </Group>

                    <Box className={classes.profileSettings}>
                        <Box mb="sm" mt="sm">
                            <Text className={classes.label} size="xs">Display Name</Text>
                            <Group position="apart">
                                {displayNameEdit ? (
                                    <TextInput value={displayName} placeholder="displayName" onChange={(e) => setDisplayName(e.target.value)} />
                                ) : (
                                    <Text className={classes.data} color={"white"}>{displayName}</Text>
                                )}
                                <Tooltip label="edit">
                                    <ActionIcon radius={"xl"} onClick={() => { submitNameHandeler() }}>
                                        {displayNameEdit ? (
                                            <IconCheck size={24} />
                                        ) : (
                                            <IconEdit size={24} />
                                        )}
                                    </ActionIcon>
                                </Tooltip>
                            </Group>
                        </Box>
                        <Divider />
                        <Box mb="sm" mt="sm">
                            <Text className={classes.label} size="xs">Email</Text>
                            <Group position="apart">
                                <Text className={classes.data} color={"white"}>{email}</Text>
                                <Tooltip label="edit">
                                    <ActionIcon disabled radius={"xl"} onClick={() => setEmailEdit(!emailEdit)}>
                                        <IconEdit size={24} />
                                    </ActionIcon>
                                </Tooltip>
                            </Group>
                        </Box>
                        <Divider />
                        <Box mb="sm" mt="sm">
                            <Text className={classes.label} size="xs">Phone</Text>
                            <Group position="apart">
                                {phoneEdit ? (
                                    <InputBase
                                        placeholder="Your phone"
                                        component={InputMask}
                                        mask="07 99 99 99 99"
                                        value={phone}
                                        onChange={(e) => setPhone(e.target.value)}
                                    />
                                ) : (
                                    <Text className={classes.data} color={"white"}>{phone}</Text>
                                )}
                                <Tooltip label="edit">
                                    <ActionIcon radius={"xl"} onClick={() => submitPhoneHandeler()}>
                                        {phoneEdit ? (
                                            <IconCheck size={24} />
                                        ) : (
                                            <IconEdit size={24} />
                                        )}
                                    </ActionIcon>
                                </Tooltip>
                            </Group>
                        </Box>
                    </Box>
                    <input style={{ display: "none" }} type="file" ref={imageinputRef} />
                </Box >

            </Center>
        </Container>
    );
}