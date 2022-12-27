import { useContext, useState } from 'react';
import { Header, Container, Group, Burger, Paper, Transition, Text, Anchor, Menu, Button, Avatar, useMantineTheme } from '@mantine/core';
import { useDisclosure, useMediaQuery } from '@mantine/hooks';
import { useStyles, HEADER_HEIGHT, links } from './nav-bar.styles';
import ThemeSwitcher from './theme-switcher';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { IconArrowsLeftRight, IconLogout, IconMessageCircle, IconPhoto, IconSearch, IconSettings, IconTrash, IconUser } from '@tabler/icons';
import { AuthContext } from '../context/auth-context';
import logodark from '../assets/photo_dark.png';
import logowhite from "../assets/logo_white.png"

function NavBar() {

    const [opened, { toggle, close }] = useDisclosure(false);
    const [active, setActive] = useState(links[0].link);
    const { classes, cx } = useStyles();
    const isMobile = useMediaQuery('(max-width: 768px)');
    const { currentUser } = useContext(AuthContext)

    const theme = useMantineTheme();

    const items = links.map((link) => (
        <Link
            key={link.label}
            to={link.link}
            className={cx(classes.link, { [classes.linkActive]: active === link.link })}
            onClick={(event) => {
                setActive(link.link);
                close();
            }}
        >
            {link.label}
        </Link>
    ));

    return (
        <Header height={HEADER_HEIGHT} mb={40} className={classes.root}>
            <Container className={classes.header}>
                <Anchor component={Link} to="/">
                    <Group position="left" align={"center"} spacing={0}>
                        <img width={"45px"} src={theme.colorScheme === "dark" ? (logodark) : (logowhite)} alt="logo" ></img>
                    </Group>
                </Anchor>
                <Group spacing={5} className={classes.links}>
                    {items}
                </Group>
                <Group position='right'>
                    {currentUser && !isMobile && <UserMenu />}
                    {!isMobile && <ThemeSwitcher />}
                    {!currentUser && !isMobile && <Button variant="outline" component={Link} to="/auth">Login</Button>}
                </Group>
                <Group position="right" className={classes.burger}>
                    {currentUser && isMobile && <UserMenu />}
                    {isMobile && <ThemeSwitcher />}
                    {isMobile && !currentUser && <Button variant="outline" component={Link} to="/auth">Login</Button>}
                    <Burger opened={opened} onClick={toggle} size="sm" />
                </Group>

                <Transition transition="pop-top-right" duration={200} mounted={opened}>
                    {(styles) => (
                        <Paper className={classes.dropdown} withBorder style={styles}>
                            {items}
                        </Paper>
                    )}
                </Transition>
            </Container>
        </Header>
    );
}

export default NavBar;




function UserMenu() {
    const { currentUser, dispatch } = useContext(AuthContext);
    const navigate = useNavigate();
    return (
        <Menu shadow="md" width={200}>
            <Menu.Target>
                <Avatar src={currentUser.imgurl} color={"blue"} radius={"100%"} >{currentUser.name.charAt(0)}</Avatar>
            </Menu.Target>

            <Menu.Dropdown sx={{ zIndex: "100" }} >
                <Menu.Label>Application</Menu.Label>
                <Menu.Item icon={<IconUser size={14} />}>
                    <Anchor component={Link} to="/profile">{currentUser.name}</Anchor>
                </Menu.Item>
                <Menu.Item icon={<IconMessageCircle size={14} />}>
                    <Anchor component={Link} to="/chat">Messages</Anchor>
                </Menu.Item>
                <Menu.Item icon={<IconSearch size={14} />}>
                    <Anchor component={Link} to="/search/q?">Search</Anchor>
                </Menu.Item>

                <Menu.Divider />

                <Menu.Label>Danger zone</Menu.Label>
                <Menu.Item color="red" icon={<IconLogout size={14} />}
                    onClick={() => {
                        dispatch({ type: "LOGOUT" })
                        Navigate("/auth")
                    }}
                >Log Out</Menu.Item>
            </Menu.Dropdown>
        </Menu>
    );
}