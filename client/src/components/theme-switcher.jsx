import { ActionIcon, Tooltip, useMantineColorScheme, Kbd, useMantineTheme } from '@mantine/core';
import { IconSun, IconMoonStars } from '@tabler/icons';

function ThemeSwitcher() {

    const { colorScheme, toggleColorScheme } = useMantineColorScheme();
    const theme = useMantineTheme();

    return (
        <Tooltip
            sx={{
                backgroundColor: theme.colorScheme === "dark" ? "#25262b" : "#ffffff",
                color: theme.colorScheme === "dark" ? "#ffffff" : "#25262b",
                boxShadow: "0px 0px 13px -1px rgba(0,0,0,0.15)",
                WebkitBoxShadow: "0px 0px 13px -1px rgba(0,0,0,0.15)",
                MozBoxShadow: "0px 0px 13px -1px rgba(0,0,0,0.15)",
            }}
            position="bottom" label={<><Kbd>Ctrl</Kbd> + <Kbd>I</Kbd></>}>
            <ActionIcon
                variant="outline"
                color={'blue'}
                onClick={() => toggleColorScheme()}
                title="Toggle color scheme"
            >
                {colorScheme === "dark" ? <IconSun size={18} /> : <IconMoonStars size={18} />}
            </ActionIcon>
        </Tooltip>
    );
}

export default ThemeSwitcher;