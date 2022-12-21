import { Anchor, Avatar, Code, Container, Group, Navbar, ScrollArea } from "@mantine/core";
import { IconLogout, IconSettings } from "@tabler/icons";
import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import useStyles from "./conversation-nav.styles";
import { ConversationCard, ConversationSkeletonChatCard } from "./conevrsation-nav-card";
import { AuthContext } from "../context/auth-context";

const data = [0, 1, 2, 0, 1, 2, 0, 1, 2, 0, 1, 2, 0, 1, 2];


function ConversationNav({ contacts }) {

    const { classes } = useStyles(null);

    const ChatCards = (
        <ScrollArea style={{ height: "65vh", borderRadius: "4%" }}>
            {!contacts ? (
                data.map((_, index) => (
                    <ConversationSkeletonChatCard key={index} />
                ))
            ) : contacts.length > 0 ? (
                contacts.map((contact, index) => (
                    <ConversationCard
                        key={index}
                        user={contact}
                    />
                ))
            ) : <Container sx={(theme) => ({
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100%",
                width: "100%",
                flexDirection: "column",
            })}><Code color="primary">no contacts</Code></Container>}

        </ScrollArea>
    );

    const { currentUser, dispatch } = useContext(AuthContext);
    const navigate = useNavigate();

    return (
        <Navbar height={"90vh"} p="md">
            <Navbar.Section grow>
                <Group className={classes.header} position="apart">
                    <Anchor component={Link} to="/">
                        <Code py={5} className={classes.AppName}>
                            CONVERSATIONS
                        </Code>
                    </Anchor>
                    <Anchor component={Link} to="/profile">
                        <Avatar color="primary" radius={"lg"} src={currentUser.imgurl} >{currentUser.name.charAt(0)}</Avatar>
                    </Anchor>
                </Group>
                {ChatCards}
            </Navbar.Section>
            <Navbar.Section className={classes.footer}>
                <Link
                    to="/profile"
                    className={classes.link}
                >
                    <IconSettings className={classes.linkIcon} stroke={1.5} />
                    <span className={classes.twoLastSpams}>Settings</span>
                </Link>
                <p
                    className={classes.link}
                    onClick={() => {
                        dispatch({ type: "LOGOUT" })
                        navigate("/auth")
                    }}
                >
                    <IconLogout className={classes.linkIcon} stroke={1.5} />
                    <span className={classes.twoLastSpams}>Logout</span>
                </p>
            </Navbar.Section>
        </Navbar>
    );
}


export default ConversationNav;