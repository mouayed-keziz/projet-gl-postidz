import { Carousel } from '@mantine/carousel';
import { Breadcrumbs, Anchor, Container, Group, ActionIcon, Grid, Center, Image, Stack, Button, Text, Box, Modal, Avatar } from '@mantine/core';
import { IconBookmark, IconBrandFacebook, IconBrandGmail, IconChartBar, IconClock, IconHeart, IconMap2, IconX } from '@tabler/icons';
import { useContext, useEffect, useState } from 'react';
import AdvertisementLight from '../components/advertisement-card-light';
import ThemedCard from '../components/my-card';
import useStyles from './advertisement-details-styles';
import axios from 'axios';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { AuthContext } from '../context/auth-context';
import { showNotification } from '@mantine/notifications';
import { data2 } from '../components/algeria-map.data';

function Advertisement() {
    const { id } = useParams();

    const { classes } = useStyles();
    const { currentUser } = useContext(AuthContext);

    const navigate = useNavigate();

    const handleCreateConversation = (e) => {
        e.preventDefault();
        axios.post("/start-conversation", {
            user_id: currentUser.id,
            receiver_id: advertisement.creator_id
        }).then(res => {
            navigate(`/chat/${res.data.conversation_id}`);
        }).catch(err => {
            showNotification({
                title: 'Error',
                message: err.response.data.message,
                color: 'red',
                icon: <IconX />,
            })
        })
    }

    const [liked, setLiked] = useState(false);

    const [itemss, setItems] = useState([
        { title: 'LOGO', href: '/' },
        { title: 'advertisements', href: '/' },
        { title: '...', href: '#' },
    ])

    const [opened, setOpened] = useState(false);

    const [user, setUser] = useState(null);

    const handleGetInformations = () => {
        setOpened(true);
        axios.post("/advertisement-owner", { advertisement_id: advertisement.id })
            .then(res => {
                setUser(res.data);
            }).catch(err => {
                showNotification({
                    title: 'Error',
                    message: err.response.data.message,
                    color: 'red',
                    icon: <IconX />,
                })
            })
    }


    const [advertisement, setAdvertisement] = useState([]);
    const [date, setDate] = useState("2003-01-09");
    useEffect(() => {
        axios.get(`/advertisements/${id}`)
            .then(res => {
                setAdvertisement(res.data.advertisement);
                setDate(res.data.advertisement.date.substring(0, 10));
                setItems([
                    { title: 'LOGO', href: '/' },
                    { title: 'advertisements', href: '/' },
                    { title: res.data.advertisement.theme + " " + res.data.advertisement.mode, href: `/advertisement/${res.data.advertisement.id}` },
                ])
            })
            .catch(err => {
                console.log(err);
            })
    }, [id]);
    if (!advertisement) {
        return <div>Loading...</div>
    }

    let slides = null;
    if (advertisement.images) {
        slides = Array.from(advertisement.images).map((image) => (
            <Carousel.Slide key={image}>
                <Image alt={image} src={image} height={350} />
            </Carousel.Slide>
        ));
    }

    return (
        <>
            <Container>
                <Group mb={"lg"} sx={{ width: "100%" }} position="apart">
                    <Breadcrumbs separator=">">
                        {itemss.map((item, index) => (
                            <Anchor href={item.href} key={index}>
                                {item.title}
                            </Anchor>
                        ))}
                    </Breadcrumbs>
                    <ActionIcon onClick={() => setLiked(!liked)} color={liked ? "red" : "dark"} size="xl" radius="xl" variant="transparent">
                        <IconHeart stroke={1} fill={liked ? "red" : "transparent"} size={26} />
                    </ActionIcon>
                </Group>
                <Grid>
                    <Grid.Col span={12} sm={7} md={8}>
                        <ThemedCard >
                            <Container sx={{ height: "100%" }} size="xs" py={"md"} px={"xl"} >
                                <Center sx={{ height: "100%" }}>
                                    <Carousel sx={{ height: "100%" }}
                                        withIndicators
                                        loop
                                        classNames={{
                                            root: classes.carousel,
                                            controls: classes.carouselControls,
                                            indicator: classes.carouselIndicator,
                                        }}
                                    >
                                        {slides}
                                    </Carousel>
                                </Center>
                            </Container>
                        </ThemedCard>
                        <Box mt={"xl"}>
                            <ThemedCard m="xl">
                                <Text mb={"sm"} color="blue" fw={600} fz="sm">Informations generales:</Text>
                                <Text fw={600} fz="sm">Prix : {advertisement.price} DA </Text>
                                <Group position={"left"}>
                                    <IconMap2 stroke={1.5} size={26} />
                                    <Stack align="flex-end" justify="flex-end" spacing={0} h={"60px"}>
                                        <Text fw={600} fz="sm">{advertisement.wilaya} </Text>
                                        <Text fw={600} fz="sm"> {advertisement.commune}</Text>
                                    </Stack>
                                </Group>
                                <Group position='right'>
                                    <Text fw={600} fz="xs">Date de publication : {date}</Text>
                                </Group>
                            </ThemedCard>
                            <Box mt="xl">
                                <ThemedCard>
                                    <div dangerouslySetInnerHTML={{ __html: advertisement.description }} />
                                </ThemedCard>
                            </Box>
                        </Box>
                    </Grid.Col>
                    <Grid.Col span={12} sm={5} md={4}>
                        <Stack justify="flex-start" spacing="xs" sx={{ height: "100%" }}>
                            <ThemedCard>
                                <Stack>
                                    {currentUser && (
                                        advertisement.creator_id !== currentUser.id && (
                                            <Button onClick={handleCreateConversation} color="gray" fullWidth>
                                                Envoyer un message
                                            </Button>
                                        )
                                    )}
                                    <Modal
                                        opened={opened}
                                        onClose={() => setOpened(false)}
                                    >
                                        {user ? (
                                            <Stack>
                                                <Center><Avatar src={user.imgurl} size="lg" radius={"100%"}>{user.name.charAt(0)}</Avatar></Center>
                                                <Text fw={600} fz="sm">Nom : {user.name} </Text>
                                                <Text fw={600} fz="sm">Prénom : {user.surname} </Text>
                                                <Text fw={600} fz="sm">Email : {user.email} </Text>
                                                <Text fw={600} fz="sm">Téléphone : {user.phone} </Text>
                                            </Stack>
                                        ) : ("...LOADING")}

                                    </Modal>

                                    <Button onClick={() => handleGetInformations()} fullWidth>
                                        Afficher le téléphone
                                    </Button>
                                </Stack>
                            </ThemedCard>
                            <ThemedCard >
                                <Stack justify="flex-start">
                                    <Text fw={600} fz="md" align={"center"}>Partager l'annonce :</Text>
                                    <Group position='center' spacing={"lg"}>
                                        <ActionIcon color="indigo" size="xl" radius="xl" variant="filled">
                                            <IconBrandFacebook stroke={1} size={34} />
                                        </ActionIcon>
                                        <ActionIcon color="red" size="xl" radius="xl" variant="filled">
                                            <IconBrandGmail stroke={1} size={34} />
                                        </ActionIcon>
                                    </Group>
                                </Stack>
                            </ThemedCard>
                            <ThemedCard >
                                <Stack justify="flex-start">
                                    <Text fw={600} fz="md" align={"center"}>Statistiques de l'annonce :</Text>
                                    <Stack justify="flex-start" spacing="xs">
                                        <Group position='left'>
                                            <IconChartBar stroke={1} size={26} />
                                            <Text fw={600} fz="xs" >Likes : 100</Text>
                                        </Group>
                                        <Group position='left'>
                                            <IconClock stroke={1} size={26} />
                                            <Text fw={600} fz="xs" >created in : {date}</Text>
                                        </Group>
                                        <Group position='left'>
                                            <IconBookmark stroke={1} size={26} />
                                            <Text fw={600} fz="xs" >Référence : {advertisement.id}</Text>
                                        </Group>
                                    </Stack>
                                </Stack>
                            </ThemedCard>
                        </Stack>
                    </Grid.Col>
                </Grid>
                <Box my={"10px"} ></Box>
                {advertisement.wilaya}
                {data2[advertisement.wilaya]}
            </Container>
        </>
    );
}

export default Advertisement;




