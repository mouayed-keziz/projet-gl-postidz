import {
    Avatar,
    createStyles,
    Group,
    Skeleton,
    Text,
    UnstyledButton,
    Anchor,
} from "@mantine/core";
import { IconChevronRight } from "@tabler/icons";
import { Link } from "react-router-dom";

const useStyles = createStyles((theme) => ({
    user: {
        display: "block",
        width: "100%",
        padding: theme.spacing.md,
        color: theme.colorScheme === "dark" ? theme.colors.dark[0] : theme.black,

        "&:hover": {
            backgroundColor:
                theme.colorScheme === "dark"
                    ? theme.colors.dark[8]
                    : theme.colors.gray[0],
        },
    },
    dontShowBetweenSmXs: {
        "@media (max-width: 674px)": {
            display: "none",
        },
        "@media (max-width: 643px)": {
            display: "block",
        },
    },
}));

export function ConversationCard({ user }) {
    const { classes } = useStyles(null);

    return (
        <Anchor href={`/chat/${user.id}`}>
            <UnstyledButton className={classes.user}>
                <Group>
                    <Avatar src={user.participant_imgurl} radius={"xl"} color="primary">{user.name.charAt(0)}</Avatar>
                    <div style={{ flex: 1 }}>
                        <Text className={classes.dontShowBetweenSmXs} size="sm" weight={500}>
                            {user.name}
                        </Text>

                        {/* <Text
                            className={classes.dontShowBetweenSmXs}
                            color="dimmed"
                            size="xs"
                        >
                            {"No messages yet"}
                        </Text> */}
                    </div>
                    <IconChevronRight
                        className={classes.dontShowBetweenSmXs}
                        size={14}
                        stroke={1.5}
                    />
                </Group>
            </UnstyledButton>
        </Anchor >
    );
}

export function ConversationSkeletonChatCard() {
    const { classes } = useStyles(null);

    return (
        <UnstyledButton className={classes.user}>
            <Group>
                <Skeleton height={50} circle />

                <div style={{ flex: 1 }} className={classes.dontShowBetweenSmXs}>
                    <Skeleton height={15} radius="xl" mb={8} />
                    <Skeleton height={12} radius="xl" width="70%" />
                </div>
                <IconChevronRight
                    className={classes.dontShowBetweenSmXs}
                    size={14}
                    stroke={1.5}
                />
            </Group>
        </UnstyledButton>
    );
}
