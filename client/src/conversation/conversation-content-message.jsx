import {
    createStyles,
    Group,
    Text,
    Avatar,
    Container,
    HoverCard,
} from "@mantine/core";
import { useContext } from "react";
import { AuthContext } from "../context/auth-context";
const useStyle = createStyles((theme) => ({
    group: {
        flexDirection: "row-reverse",
    },

    message: {
        backgroundColor: theme.fn.variant({
            variant: "filled",
            color: theme.primaryColor,
        }).background,
        borderRadius: theme.radius.md,
        color: theme.white,
        fontWeight: 530,
        fontSize: 14,
        lineHeight: 1.5,
        overflowWrap: "break-word",
    },
}));
export default function Message(props) {
    const { currentUser } = useContext(AuthContext)
    const { sender, text, user, time } = props;


    const { classes } = useStyle(null);
    return (
        <Group mb={10} position={sender.id === currentUser.id ? "right" : "left"}>
            <Group className={sender.id === currentUser.id ? classes.group : null}>
                <HoverCard>
                    <HoverCard.Target>
                        <Avatar src={sender.photoURL} size="lg" color="primary" radius={"xl"}>
                            {sender.displayName.charAt(0)}
                        </Avatar>
                    </HoverCard.Target>
                    <HoverCard.Dropdown>
                        <Text size="sm">{sender.displayName}</Text>
                    </HoverCard.Dropdown>
                </HoverCard>

                <HoverCard>
                    <HoverCard.Target>
                        <Container
                            className={classes.message}
                            style={{ maxWidth: "60%", marginLeft: 0, marginRight: 0, }} px="md" py="xs"
                        >
                            {text}
                        </Container>
                    </HoverCard.Target>
                    <HoverCard.Dropdown>
                        <Text size="sm">{time}</Text>
                    </HoverCard.Dropdown>
                </HoverCard>
            </Group>
        </Group>
    );
}
