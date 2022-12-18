
import { useState } from 'react';
import { Table, ScrollArea, Group, ActionIcon, Stack, Tooltip, Anchor, Container, Center } from '@mantine/core';
import { useStyles, data } from "./profile-myadvertisements.styles"
import { IconChevronLeft, IconDots, IconPencil, IconTrash } from '@tabler/icons';
import { Link } from 'react-router-dom';




function MyAdvertisements() {
    const { classes, cx } = useStyles();
    const [scrolled, setScrolled] = useState(false);

    const rows = data.map((row) => (
        <tr key={row.name}>
            <td><Anchor component={Link} to="/">{row.name} </Anchor></td>
            <td>{row.email}</td>
            <td>{row.company}</td>
            <td>
                <Tooltip label="delete">
                    <ActionIcon color="red" variant="filled">
                        <IconTrash size={18} />
                    </ActionIcon>
                </Tooltip>
            </td>
            <td>
                <Tooltip label="edit">
                    <ActionIcon variant="filled">
                        <IconPencil size={18} />
                    </ActionIcon>
                </Tooltip>
            </td>
        </tr>
    ));
    return (
        <Container sx={theme => ({
            height: "100vh",
            width: "75%",
            [theme.fn.smallerThan("md")]: {
                width: "100%",
            },
        })} size={"xl"} m={0} py={"xl"} px={0}>
            <Center>
                <Stack>
                    <Group position="apart" className={classes.header}>
                        <Group>
                            <Anchor component={Link} to="/profile">
                                <ActionIcon className={classes.icon} radius="xl">
                                    <IconChevronLeft size={24} />
                                </ActionIcon>
                            </Anchor>
                            <h2>My Advertisements</h2>
                        </Group>
                    </Group>
                    <ScrollArea sx={{ height: "80vh" }} onScrollPositionChange={({ y }) => setScrolled(y !== 0)}>
                        <Table sx={{ width: "90%" }}>
                            <thead className={cx(classes.header, { [classes.scrolled]: scrolled })}>
                                <tr>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Company</th>
                                    <th></th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>{rows}</tbody>
                        </Table>
                    </ScrollArea>
                </Stack>
            </Center>
        </Container>
    );
}

export default MyAdvertisements;


