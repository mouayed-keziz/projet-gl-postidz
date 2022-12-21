import { Container, Group, Title } from "@mantine/core";
import { IconMessagesOff } from "@tabler/icons";

function ConversationEmpty(props) {
    return (
        <Container
            sx={(theme) => ({
                width: "100%",
                height: "96vh",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                "@media (max-width: 643px)": {
                    display: "none",
                },
            })}>
            <Group w={"100%"} position="center">
                <IconMessagesOff size={55} />
                <Title sx={(theme) => ({
                    textAlign: "center",
                })} order={1}>Start a new conversation, choose someone to contact from the contact bar on the left side</Title>
            </Group>
        </Container>
    );
}

export default ConversationEmpty;