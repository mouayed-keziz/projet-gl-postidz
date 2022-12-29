import { Image, Card, Text, Group, Button, Anchor } from '@mantine/core';
import { Carousel } from '@mantine/carousel';
import useStyles from "./advertisement-cart-carousel.styles";
import { Link, useNavigate } from 'react-router-dom';


function AdvertisementCardCarousel({ ad }) {
    const { classes } = useStyles();

    const slides = ad.images.map((image) => (
        <Carousel.Slide key={image}>
            <Image src={image} height={220} />
        </Carousel.Slide>
    ));
    const navigate = useNavigate();
    const handleClick = () => {
        navigate(`/advertisement/${ad.id}`);
    };
    return (
        <Card h={"100%"} radius="md" withBorder p="xl">
            <Card.Section>
                <Carousel
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
            </Card.Section>

            <Group position="apart" mt="lg">
                <Anchor component={Link} to={`/advertisement/${ad.id}`}>
                    <Text weight={500} size="lg">
                        {ad.theme} ,{ad.category}
                    </Text>
                </Anchor>

                <Group spacing={5}>
                    {/**see if you need it or just delete the group */}
                </Group>
            </Group>

            <Text size="sm" color="dimmed" mt="sm">
                {/* <div dangerouslySetInnerHTML={{ __html: ad.description }} /> */}
                {Object.keys(ad).map((key) => {
                    if (key !== 'description' && key !== "images" && key !== "date") {
                        return (`${ad[key]} `);
                    }
                })}
            </Text>

            <Group position="apart" mt="md">
                <div>
                    <Text size="xl" span weight={500} className={classes.price}>
                        {ad.price} DA
                    </Text>
                    <Text span size="sm" color="dimmed">
                        / {ad.mode}
                    </Text>
                </div>

                <Button onClick={handleClick} radius="md">More</Button>
            </Group>
        </Card>
    );
}


export default AdvertisementCardCarousel;