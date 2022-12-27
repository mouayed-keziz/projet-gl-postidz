import { createStyles } from '@mantine/core';
import { IconGauge, IconCookie, IconUser, IconMessage2, IconLock } from '@tabler/icons';

const useStyles = createStyles((theme) => ({
    wrapper: {
        paddingTop: theme.spacing.xl * 4,
        paddingBottom: theme.spacing.xl * 4,
    },

    title: {
        fontFamily: `Greycliff CF, ${theme.fontFamily}`,
        fontWeight: 900,
        marginBottom: theme.spacing.md,
        textAlign: 'center',

        [theme.fn.smallerThan('sm')]: {
            fontSize: 28,
            textAlign: 'left',
        },
    },

    description: {
        textAlign: 'center',

        [theme.fn.smallerThan('sm')]: {
            textAlign: 'left',
        },
    },
}));

const MOCKDATA = [
    {
        icon: IconGauge,
        title: 'Extreme performance',
        description:
            'This dust is actually a powerful poison that will even make a pro wrestler sick, Regice cloaks itself with frigid air of -328 degrees Fahrenheit',
    },
    {
        icon: IconUser,
        title: 'Privacy focused',
        description:
            'People say it can run at the same speed as lightning striking, Its icy body is so cold, it will not melt even if it is immersed in magma',
    },
    {
        icon: IconCookie,
        title: 'No third parties',
        description:
            'They’re popular, but they’re rare. Trainers who show them off recklessly may be targeted by thieves',
    },
    {
        icon: IconLock,
        title: 'Secure by default',
        description:
            'Although it still can’t fly, its jumping power is outstanding, in Alola the mushrooms on Paras don’t grow up quite right',
    },
    {
        icon: IconMessage2,
        title: '24/7 Support',
        description:
            'Rapidash usually can be seen casually cantering in the fields and plains, Skitty is known to chase around after its own tail',
    },
];

export { MOCKDATA, useStyles }