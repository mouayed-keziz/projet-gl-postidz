import { AspectRatio, useMantineTheme } from "@mantine/core";
import { data } from "./algeria-map.data";
import { Map } from "react-algeria-map";
import { useNavigate } from "react-router-dom";

function AlgeriaMap() {

    const theme = useMantineTheme();
    const navigate = useNavigate();

    const handleWilayaClick = (wilaya, data) => {
        navigate(`/search/q?wilaya=${wilaya}`);
    };


    return (
        <AspectRatio ratio={1 / 1} sx={{ scale: "1" }}>
            <Map
                color="#5583f6"
                HoverColor="#1240b3"
                stroke={theme.colorScheme === "dark" ? "#fff" : "#000"}
                hoverStroke="#218c74"
                height="800px"
                data={data}
                onWilayaClick={(wilaya, data) => handleWilayaClick(wilaya, data)}
            />
        </AspectRatio>
    );
}

export default AlgeriaMap;