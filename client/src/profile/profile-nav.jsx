import { useState, useContext } from 'react';
import { createStyles, Navbar, Group, Anchor, Avatar, Text, useMantineTheme } from '@mantine/core';
import { IconKey, IconLogout, IconUser, IconBooks, IconPlus, IconNetwork } from '@tabler/icons';
import { Link } from 'react-router-dom';
import logodark from '../assets/photo_dark.png';
import logowhite from "../assets/logo_white.png"
import { AuthContext } from '../context/auth-context';
const useStyles = createStyles((theme, _params, getRef) => {
    const icon = getRef('icon');
    return {
        navbar: {
            backgroundColor: theme.fn.variant({ variant: 'filled', color: theme.primaryColor }).background,
            overflow: 'auto',
            width: '25%',
            [theme.fn.smallerThan("md")]: {
                width: '100%',
            },
        },

        header: {
            paddingBottom: theme.spacing.md,
            marginBottom: theme.spacing.md * 1.5,
            borderBottom: `1px solid ${theme.fn.lighten(
                theme.fn.variant({ variant: 'filled', color: theme.primaryColor }).background, 0.1
            )}`,
        },



        username: {
            color: theme.colors.gray[0],
            [theme.fn.smallerThan("lg")]: {
                display: "none"
            },
            [theme.fn.smallerThan("md")]: {
                display: "block"
            }
        },

        profileGroup: {
            borderRadius: theme.radius.sm,
            '&:hover': {
                backgroundColor: theme.fn.lighten(
                    theme.fn.variant({ variant: 'filled', color: theme.primaryColor }).background, 0.1
                ),
            },
        },


        footer: {
            paddingTop: theme.spacing.md,
            marginTop: theme.spacing.md,
            borderTop: `1px solid ${theme.fn.lighten(
                theme.fn.variant({ variant: 'filled', color: theme.primaryColor }).background, 0.1
            )}`,
        },

        link: {
            ...theme.fn.focusStyles(),
            display: 'flex',
            alignItems: 'center',
            textDecoration: 'none',
            fontSize: theme.fontSizes.sm,
            color: theme.white,
            padding: `${theme.spacing.xs}px ${theme.spacing.sm}px`,
            borderRadius: theme.radius.sm,
            fontWeight: 500,

            '&:hover': {
                backgroundColor: theme.fn.lighten(
                    theme.fn.variant({ variant: 'filled', color: theme.primaryColor }).background, 0.1
                ),
            },
        },

        linkIcon: {
            ref: icon,
            color: theme.white,
            opacity: 0.75,
            marginRight: theme.spacing.sm,
        },

        linkActive: {
            '&, &:hover': {
                backgroundColor: theme.fn.lighten(
                    theme.fn.variant({ variant: 'filled', color: theme.primaryColor }).background, 0.15
                ),
                [`& .${icon}`]: { opacity: 0.9 },
            },
        },
    };
});

const data = [
    { link: 'change-profile-info', label: 'Change Profile Info', icon: IconUser },
    { link: 'change-password', label: 'Change Password', icon: IconKey },
    { link: 'my-advertisements', label: 'My Advertisement', icon: IconBooks },
    { link: 'web-scrapping', label: 'Web Scrapping', icon: IconNetwork },
    { link: '/create', label: 'Add New Advertisement', icon: IconPlus },
];

export default function ProfileNav({ hidden }) {

    const { currentUser } = useContext(AuthContext);
    //.id  .email  .phone  .imgurl .name
    //console.log(currentUser)

    const { classes, cx } = useStyles();
    const [active, setActive] = useState('Profile Overview');
    const theme = useMantineTheme()

    const links = data.map((item) => (
        <Link
            className={cx(classes.link, { [classes.linkActive]: item.label === active })}
            to={item.link}
            key={item.label}
            onClick={() => setActive(item.label)}
        >
            <item.icon className={classes.linkIcon} stroke={1.5} />
            <span>{item.label}</span>
        </Link>
    ));

    return (
        <Navbar sx={(theme) => ({
            [theme.fn.smallerThan("md")]: {
                display: hidden ? "none" : "block",
            },
        })} m={0} height={"100vh"} width={"100%"} p="md" className={classes.navbar}>
            <Navbar.Section grow>
                <Group className={classes.header} position="apart">
                    <Anchor component={Link} to="/" size={28} sx={theme => ({
                        color: theme.colors.gray[2],
                        cursor: 'pointer',
                    })}>
                        <Group position="left" align={"center"} spacing={0}>
                            <img width={"45px"} src={theme.colorScheme === "dark" ? (logodark) : (logowhite)} alt="logo" ></img>
                        </Group>
                    </Anchor>
                    <Group p={10} className={classes.profileGroup} position='right'>
                        <Avatar m={0} p={0} alt={"user_name"} radius="xl" size={35} className={classes.avatar} >{currentUser.name.charAt(0).toUpperCase()}</Avatar>
                        <Text className={classes.username} m={0} p={0}>{currentUser.name}</Text>
                    </Group>
                </Group>
                {links}
            </Navbar.Section>

            <Navbar.Section className={classes.footer}>
                <a href="/" className={classes.link} onClick={(event) => event.preventDefault()}>
                    <IconLogout className={classes.linkIcon} stroke={1.5} />
                    <span>Logout</span>
                </a>
            </Navbar.Section>
        </Navbar>
    );
}