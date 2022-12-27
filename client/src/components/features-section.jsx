import { ThemeIcon, Text, Title, Container, SimpleGrid, useMantineTheme } from '@mantine/core';
import { MOCKDATA, useStyles } from './features-section.styles';

function Feature({ icon: Icon, title, description }) {

    const theme = useMantineTheme();

    return (
        <div>
            <ThemeIcon variant="light" size={40} radius={40}>
                <Icon size={20} stroke={1.5} />
            </ThemeIcon>
            <Text style={{ marginTop: theme.spacing.sm, marginBottom: 7 }}>{title}</Text>
            <Text size="sm" color="dimmed" style={{ lineHeight: 1.6 }}>
                {description}
            </Text>
        </div>
    );
}



function FeaturesSection({ title, description, data = MOCKDATA }) {

    const { classes, theme } = useStyles();

    const features = data.map((feature, index) => <Feature {...feature} key={index} />);

    return (
        <Container className={classes.wrapper}>
            <Title className={classes.title}>Integrate effortlessly with any technology stack</Title>

            <Container size={560} p={0}>
                <Text size="sm" className={classes.description}>
                    Every once in a while, you’ll see a Golbat that’s missing some fangs. This happens when hunger drives it to try biting a Steel-type Pokémon.
                </Text>
            </Container>

            <SimpleGrid
                mt={60}
                cols={3}
                spacing={theme.spacing.xl * 2}
                breakpoints={[
                    { maxWidth: 980, cols: 2, spacing: 'xl' },
                    { maxWidth: 755, cols: 1, spacing: 'xl' },
                ]}
            >
                {features}
            </SimpleGrid>
        </Container>
    );
}

export default FeaturesSection;