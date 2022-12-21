import { createStyles } from "@mantine/core";

const useStyles = createStyles((theme, _params, getRef) => {
    const icon = getRef("icon");
    return {
        AppName: {
            backgroundColor: theme.fn.lighten(
                theme.fn.variant({
                    variant: "filled",
                    color: theme.primaryColor,
                }).background,
                0.1
            ),
            color: theme.white,
            fontWeight: 700,
        },

        header: {
            paddingBottom: theme.spacing.md,
            marginBottom: theme.spacing.md * 1.5,
            borderBottom: `1px solid ${theme.fn.lighten(
                theme.fn.variant({
                    variant: "filled",
                    color: theme.primaryColor,
                }).background,
                0.1
            )}`,
        },

        footer: {
            paddingTop: theme.spacing.md,
            marginTop: theme.spacing.md,
            borderTop: `1px solid ${theme.fn.lighten(
                theme.fn.variant({
                    variant: "filled",
                    color: theme.primaryColor,
                }).background,
                0.1
            )}`,
        },

        link: {
            ...theme.fn.focusStyles(),
            display: "flex",
            alignItems: "center",
            textDecoration: "none",
            fontSize: theme.fontSizes.sm,
            color: theme.white,
            padding: `${theme.spacing.xs}px ${theme.spacing.sm}px`,
            borderRadius: theme.radius.sm,
            fontWeight: 500,

            "&:hover": {
                backgroundColor: theme.fn.lighten(
                    theme.fn.variant({
                        variant: "filled",
                        color: theme.primaryColor,
                    }).background,
                    0.1
                ),
            },
        },

        linkIcon: {
            ref: icon,
            color: theme.colorScheme === "dark" ? theme.white : theme.black,
            opacity: 0.75,
            marginRight: theme.spacing.sm,
        },
        twoLastSpams: {
            color: theme.colorScheme === "dark" ? theme.white : theme.black,
        },
        linkActive: {
            "&, &:hover": {
                backgroundColor: theme.fn.lighten(
                    theme.fn.variant({
                        variant: "filled",
                        color: theme.primaryColor,
                    }).background,
                    0.15
                ),
                [`& .${icon}`]: {
                    opacity: 0.2,
                },
            },
        },
    };
});

export default useStyles;