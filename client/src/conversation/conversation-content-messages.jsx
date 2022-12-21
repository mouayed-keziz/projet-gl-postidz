import {
    ActionIcon,
    Anchor,
    Avatar,
    Box,
    Center,
    Code,
    createStyles,
    Divider,
    Group,
    ScrollArea,
    Space,
    Stack,
    TextInput,
} from "@mantine/core";
import { IconMail as IconAt, IconSend, IconX } from "@tabler/icons";
import { useState } from "react";
import { useEffect, useContext, useRef } from "react";
import Message from "./conversation-content-message";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../context/auth-context";
import { showNotification } from "@mantine/notifications";

const useStyle = createStyles((theme) => ({
    stack: {
        gap: 0,
    },
    avatar: {
        borderRadius: "100%",
    },
    AppName: {
        backgroundColor: theme.fn.lighten(
            theme.fn.variant({
                variant: "filled",
                color: theme.primaryColor,
            }).background,
            0.1
        ),
        borderRadius: theme.radius.lg,
        paddingLeft: theme.spacing.md,
        paddingRight: theme.spacing.md,
        paddingTop: theme.spacing.sm,
        paddingBottom: theme.spacing.sm,
        color: theme.white,
        fontWeight: 700,
        fontSize: 18,
        lineHeight: 1.5,
    },
    text: {
        textAlign: "center",
        margin: 0,
        padding: 0,
    },
    scrollArea: {
        height: "71vh",
        backgroundColor: theme.backgroundColor,
    },
}));

function ConversationContentMessages({ messages, user }) {
    const { id } = useParams()
    const { classes } = useStyle(null);
    const bottomOfTheConversation = useRef();
    const [message, setMessage] = useState("");

    const { currentUser } = useContext(AuthContext)

    const handleSendMsg = (e) => {
        e.preventDefault()
        axios.post("/send-message", { user_id: currentUser.id, conversation_id: id, message: message })
            .then(res => {
                setMessage("")
            }).catch(err => {
                showNotification({ title: 'Error while sending the msg', message: 'Check your connection to internet', color: "red", icon: <IconX size={18} /> })
                setMessage("")
            })
    }

    //when the messages change scroll to the bottom of the conversation
    useEffect(() => {
        bottomOfTheConversation.current.scrollIntoView({ behavior: "smooth" });
    }, [messages]);


    return (
        <Box sx={(theme) => ({
            marginTop: theme.spacing.md,
            backgroundColor: theme.colorScheme === "dark" ? theme.colors.dark[6] : theme.colors.gray[0],
            textAlign: "center",
            borderRadius: theme.radius.md,
        })}
        >
            <ScrollArea className={classes.scrollArea}>
                <Box sx={(theme) => ({ padding: theme.spacing.md, })} >
                    <Center>
                        <Stack align="center" className={classes.gap}>
                            <Space h="xs" />
                            <Anchor component={Link} to={`/chat`}>
                                <Avatar color={"primary"} size="xl" radius="xl" className={classes.avatar} m={0} p={0} src={user.imgurl} >
                                    {user.name.charAt(0)}
                                </Avatar>
                            </Anchor>
                            <Anchor component={Link} to={`/chat`}>
                                <h2 className={classes.text}>
                                    <Code className={classes.AppName}>{user.name}</Code>
                                </h2>
                            </Anchor>
                        </Stack>
                    </Center>
                    <Space h={"xl"} />
                    <Space h={"xl"} />
                    {messages === null ? ("loading...") :
                        messages.length === 0 ? (`start your conversation with ${user.name}`) :
                            <>
                                {messages.map((message, index) => (
                                    <Message
                                        key={index}
                                        sender={{ id: message.user_id, displayName: message.user_name, photoURL: message.user_imgurl }}
                                        text={message.text}
                                        user={user}
                                        time={"27/10/2002"}
                                    />
                                ))}
                            </>
                    }

                    <Space h={"xl"} />
                    <span ref={bottomOfTheConversation}></span>
                </Box>
            </ScrollArea>
            <Divider my="sm" />
            <form onSubmit={handleSendMsg}>
                <Group pr={25} pl={25} pb={15}>
                    <TextInput
                        autoComplete="off"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        icon={<IconAt />}
                        sx={{ flex: 1 }}
                        variant="filled"
                        placeholder="..."
                        radius="lg"
                        size="lg"
                    />
                    <ActionIcon type={"submit"} color="primary" size="xl" radius="xl" variant="filled">
                        <IconSend />
                    </ActionIcon>
                </Group>
            </form>
        </Box>
    );
}

export default ConversationContentMessages;