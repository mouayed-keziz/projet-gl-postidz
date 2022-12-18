import { Center, Container } from "@mantine/core";

function WebScrapping() {
    return (
        <Container sx={theme => ({
            height: "100vh",
            width: "75%",
            [theme.fn.smallerThan("md")]: {
                width: "100%",
            },
        })} size={"xl"} m={0} py={"xl"} px={0}>
            <Center>
                web scrapping

            </Center>
        </Container>
    );
}

export default WebScrapping;