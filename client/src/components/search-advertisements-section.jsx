import { Anchor, Button, Center, Group, NativeSelect, Pagination, Stack, Text, Title } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { IconBellRinging } from "@tabler/icons";
import NewAdvertisement from "./advertisement-cart";

function SearchAdvertisementsSection({ searchResults }) {

    const isMobile = useMediaQuery("(max-width: 768px)");
    // console.log(searchResults);

    return (
        <>
            <Title> {searchResults.length} : Annonces </Title>
            <Group mb="xl" align={"center"} position="left">
                <Anchor href="https://mantine.dev/" target="_blank">
                    Toutes les Annonces
                </Anchor>
                <Text fz="sm" >
                    1 a 30 sur 171
                </Text>
                <Text fz="sm" >
                    Particulier: 160
                </Text>
                <Text fz="sm" >
                    Professionnel: 11
                </Text>
                <NativeSelect
                    data={['React', 'Vue', 'Angular', 'Svelte']}
                    variant="filled"
                />
                <Button variant="outline" leftIcon={<IconBellRinging />}>
                    Sauvegarder cette recherche
                </Button>

                <Stack w={"100%"} justify="flex-start">
                    {searchResults.map((result) => (
                        <NewAdvertisement
                            key={result.id}
                            result={result}
                        />
                    ))}

                </Stack>
            </Group>
            <Center>
                <Pagination siblings={isMobile ? 0 : 1} noWrap={false} total={20} boundaries={1} initialPage={10} size="lg" />
            </Center>
        </>
    );
}


export default SearchAdvertisementsSection;


