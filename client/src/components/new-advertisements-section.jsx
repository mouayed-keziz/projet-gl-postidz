import { Anchor, Button, Grid, Group, NativeSelect, Text, Title } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { IconBellRinging } from "@tabler/icons";
import AdvertisementCardCarousel from "./advertisement-cart-carousel";
import axios from "axios";
import { useEffect, useState } from "react";

function NewAdvertisements() {

    const isTablet = useMediaQuery("(max-width: 992px)");

    const [ads, setAds] = useState([]);

    useEffect(() => {
        axios.get("/recent-advertisements").then((result) => {
            setAds(result.data);
        })
    }, [])

    return (
        <>
            <Title>Nouvelles Annonces</Title>
            <Group mb="xl" align={"center"} position="left">
                <Anchor target="_blank">
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
                    data={['Lycee', 'CEM', 'Primaire', 'Université']}
                    variant="filled"
                />
                <Button variant="outline" leftIcon={<IconBellRinging />}>
                    Sauvegarder cette recherche
                </Button>

                <Grid justify="center">
                    {ads ? (
                        ads.map((ad, index) => (
                            <Grid.Col key={index} span={12} sm={6} md={4}>
                                <AdvertisementCardCarousel ad={ad} />
                            </Grid.Col>
                        ))
                    ) : (
                        "..."
                    )}



                </Grid>

            </Group>
        </>
    );
}


export default NewAdvertisements;


