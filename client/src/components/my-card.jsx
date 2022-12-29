import { Card, useMantineTheme } from "@mantine/core";

function ThemedCard({ children, sx }) {
    const theme = useMantineTheme();
    return (
        <Card sx={{
            backgroundColor: theme.colorScheme === "dark" ? "#25262b" : "#ffffff",
            boxShadow: "0px 0px 13px -1px rgba(0,0,0,0.15)",
            WebkitBoxShadow: "0px 0px 13px -1px rgba(0,0,0,0.15)",
            MozBoxShadow: "0px 0px 13px -1px rgba(0,0,0,0.15)",
            ...sx
        }}
        >
            {children}
        </Card>
    );
}

export default ThemedCard;