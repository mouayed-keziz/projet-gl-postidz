import { createStyles, Group, Container, Center } from '@mantine/core';
import ProfileNav from '../profile/profile-nav';
import { Outlet, useLocation } from 'react-router-dom'

export default function Profile() {

    const location = useLocation().pathname;
    const profile = (location === "/profile/" || location === "/profile") ? false : true;

    return (
        <Group spacing={0} position='left' m={0} p={0}>
            <ProfileNav hidden={profile} />
            <Outlet />
        </Group >
    );
}