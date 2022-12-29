import { Anchor, AspectRatio, Card, Grid, Group, Stack, Text, useMantineTheme } from "@mantine/core";
import { Link } from "react-router-dom";

function AdvertisementCart({ result }) {
    const theme = useMantineTheme();
    //console.log(result)
    return (
        <Card sx={{
            backgroundColor: theme.colorScheme === "dark" ? "#25262b" : "#ffffff",
            boxShadow: "0px 0px 13px -1px rgba(0,0,0,0.15)",
            WebkitBoxShadow: "0px 0px 13px -1px rgba(0,0,0,0.15)",
            MozBoxShadow: "0px 0px 13px -1px rgba(0,0,0,0.15)",
        }}>
            <Anchor component={Link} to={`/advertisement/${result.id}`}
                sx={{
                    textDecoration: "none"
                    , "&:hover": {
                        textDecoration: "none",
                    }
                }}>
                <Grid>
                    <Grid.Col span={12} sm={6}>
                        <Text mb={"xs"} fz="lg" fw="bold">{result.theme}, {result.category}</Text>
                        <Group align={"start"} position="left" spacing={"xl"}>
                            <Stack justify={"flex-start"} spacing={0}>
                                <Text>{result.wilaya}</Text>
                                <Text>{result.commune}</Text>
                            </Stack>
                            <Text>{result.mode}</Text>
                        </Group>
                    </Grid.Col>
                    <Grid.Col span={12} xs={6} sm={3}>
                        <AspectRatio ratio={225.7 / 158}>
                            <img
                                alt="imgcard"
                                src={result.images[0]}
                                width={"100%"}
                            />
                        </AspectRatio>
                    </Grid.Col>
                    <Grid.Col span={12} xs={6} sm={3} sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <Stack align="center" justify="space-around">
                            <Text align="center"  >Deposé le {result.date.substring(0, 10)}</Text>
                            <Text align="center"  >à {result.date.substring(11, 16)}</Text>
                            <Text align="center"  >{result.images.length} photo</Text>
                        </Stack>
                    </Grid.Col>
                </Grid>
            </Anchor>
        </Card >
    );
}

export default AdvertisementCart;