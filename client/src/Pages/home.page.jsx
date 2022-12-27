import { ActionIcon, Affix, Button, Container, Grid } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { IconPlus } from "@tabler/icons";
import AlgeriaMap from "../components/algeria-map";
import FeaturesSection from "../components/features-section";
import NewAdvertisements from "../components/new-advertisements-section";
import SearchCard from "../components/search-card";
import useStyles from "./home.styles";
import axios from "axios";
import { useContext, useEffect, useState, useCallback } from "react";
import { AuthContext } from "../context/auth-context";
import { Link } from "react-router-dom";



function Home() {
    const { classes } = useStyles();
    const isMobile = useMediaQuery("(max-width: 768px)");

    const [number_of_advertisements, setNumber] = useState("...");

    const { currentUser } = useContext(AuthContext);

    useEffect(() => {
        axios.get("/number-of-advertisements").then((result) => {
            setNumber(result.data.number_of_advertisements);
        })
    }, [])

    return (
        <Container>
            <SearchCard />
            <Grid>
                <Grid.Col span={12} sm={6}>
                    <p className={classes.BigText}>Cherchez et trouvez parmi <b className={classes.BlueText}> {number_of_advertisements} Petites Annonces ! </b></p>
                </Grid.Col>
                <Grid.Col span={12} sm={6}>
                    <AlgeriaMap />
                </Grid.Col>
            </Grid>
            <NewAdvertisements />
            <FeaturesSection />
            {currentUser && (
                <Affix position={{ bottom: 30, right: 25 }} >
                    {isMobile ? (
                        <ActionIcon component={Link} to="/create" sx={{
                            boxShadow: "0px 0px 13px -1px rgba(0,0,0,0.15)",
                            WebkitBoxShadow: "0px 0px 13px -1px rgba(0,0,0,0.15)",
                            MozBoxShadow: "0px 0px 13px -1px rgba(0,0,0,0.15)",
                        }} color="blue" size="xl" radius="xl" variant="filled">
                            <IconPlus size={34} />
                        </ActionIcon>
                    ) : (
                        <Button component={Link} to="/create" sx={{
                            boxShadow: "0px 0px 13px -1px rgba(0,0,0,0.15)",
                            WebkitBoxShadow: "0px 0px 13px -1px rgba(0,0,0,0.15)",
                            MozBoxShadow: "0px 0px 13px -1px rgba(0,0,0,0.15)",
                        }}
                            radius="md" leftIcon={<IconPlus />}>
                            CREATE NEW POST
                        </Button>
                    )}
                </Affix>
            )}
        </Container>
    );
}

export default Home

