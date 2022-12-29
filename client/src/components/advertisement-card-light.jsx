import { Center, Image, Stack, Text } from "@mantine/core";
import ThemedCard from "./my-card";

function AdvertisementLight() {
    return (
        <>
            <ThemedCard>
                <Center>
                    <Stack>
                        <Image alt="add" src={"https://images.unsplash.com/photo-1598928506311-c55ded91a20c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=720&q=80"} />
                        <Text align="center" fw={600} fz="sm">something something</Text>
                        <Text align="center" fw={600} fz="xs">50 000DA</Text>
                    </Stack>
                </Center>
            </ThemedCard>
        </>
    );
}

export default AdvertisementLight;
