import { ActionIcon, Anchor, Avatar, Box, Group, Text } from "@mantine/core";
import { IconArrowLeft } from "@tabler/icons";
import { Link } from "react-router-dom";
export default function ConversationContentHeader({ user }) {

    return (
        <Box
            sx={(theme) => ({
                backgroundColor:
                    theme.colorScheme === "dark"
                        ? theme.colors.dark[6]
                        : theme.colors.gray[0],
                padding: theme.spacing.sm,
                borderRadius: theme.radius.md,

                "&:hover": {
                    backgroundColor:
                        theme.colorScheme === "dark"
                            ? theme.colors.dark[5]
                            : theme.colors.gray[1],
                },
            })}
        >
            <Group>
                <Anchor component={Link} to={`/chat`}>
                    <ActionIcon size="xl" radius="xl" variant="transparent"
                        sx={(theme) => ({
                            cursor: "pointer",
                            display: "none",
                            paddingLeft: "3px",
                            "&:hover": {
                                backgroundColor:
                                    theme.colorScheme === "dark"
                                        ? theme.colors.dark[8]
                                        : theme.colors.gray[0],
                            },
                            "@media (max-width: 643px)": {
                                display: "block",
                            },
                        })}>
                        <IconArrowLeft size={34} />
                    </ActionIcon>
                </Anchor>
                <Anchor component={Link} to={`/`}>
                    <Group>
                        <Avatar color="primary" radius="xl" src={user.imgurl}>
                            {user.name.charAt(0)}
                        </Avatar>

                        <div style={{ flex: 1 }}>
                            <Text size="sm" weight={500}>
                                {user.name}
                            </Text>
                        </div>
                    </Group>
                </Anchor>
            </Group>
        </Box>
    );
}
