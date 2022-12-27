import { createStyles } from "@mantine/core";

const useStyles = createStyles((theme) => ({
    BigText: {
        color: theme.colorScheme === "dark" ? "#fff" : "#3f3e3e",
        fontSize: "3rem",
        fontWeight: "bold",
        [theme.fn.smallerThan("sm")]: {
            fontSize: "2rem",
            textAlign: "center",
        },
    },
    BlueText: {
        color: "#5583f6",
    }
}))


export default useStyles;