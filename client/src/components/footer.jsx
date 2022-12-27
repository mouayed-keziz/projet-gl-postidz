import { Text, Container, ActionIcon, Group, Anchor, useMantineTheme } from '@mantine/core';
import { IconBrandTwitter, IconBrandYoutube, IconBrandInstagram } from '@tabler/icons';
import { Link } from 'react-router-dom';
import { useStyles, data } from './footer.styles';

import logodark from '../assets/photo_dark.png';
import logowhite from "../assets/logo_white.png"

function Footer() {

    const { classes } = useStyles();

    const theme = useMantineTheme();

    const groups = data.map((group) => {
        const links = group.links.map((link, index) => (
            <Text
                key={index}
                className={classes.link}
                component="a"
                href={link.link}
                onClick={(event) => event.preventDefault()}
            >
                {link.label}
            </Text>
        ));

        return (
            <div className={classes.wrapper} key={group.title}>
                <Text className={classes.title}>{group.title}</Text>
                {links}
            </div>
        );
    });

    return (
        <footer className={classes.footer}>
            <Container className={classes.inner}>
                <div className={classes.logo}>
                    <Anchor component={Link} to="/">
                        <Group position="left" align={"center"} spacing={0}>
                            <img width={"45px"} src={theme.colorScheme === "dark" ? (logodark) : (logowhite)} alt="logo" ></img>
                        </Group>
                    </Anchor>
                    <Text size="xs" color="dimmed" className={classes.description}>
                        PostiDZ site d'annonces de l'education dans l'Algerie
                    </Text>
                </div>
                <div className={classes.groups}>{groups}</div>
            </Container>
            <Container className={classes.afterFooter}>
                <Text color="dimmed" size="sm">
                    © 2023 postidz.com. All rights reserved.
                </Text>

                <Group spacing={0} className={classes.social} position="right" noWrap>
                    <ActionIcon size="lg">
                        <IconBrandTwitter size={18} stroke={1.5} />
                    </ActionIcon>
                    <ActionIcon size="lg">
                        <IconBrandYoutube size={18} stroke={1.5} />
                    </ActionIcon>
                    <ActionIcon size="lg">
                        <IconBrandInstagram size={18} stroke={1.5} />
                    </ActionIcon>
                </Group>
            </Container>
        </footer>
    );
}


export default Footer;