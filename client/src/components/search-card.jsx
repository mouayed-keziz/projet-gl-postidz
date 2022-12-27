import { Button, Card, Container, Grid, Group, NativeSelect, Select, TextInput, useMantineTheme } from "@mantine/core";
import { useEffect, useState } from "react";
import { data1 } from "./algeria-map.data";
import { DateRangePicker } from "@mantine/dates"
import { useNavigate } from "react-router-dom";
import { IconSearch } from "@tabler/icons";
function SearchCard() {

    const theme = useMantineTheme();

    const [Stheme, setStheme] = useState(null);
    const [swilaya, setSWilaya] = useState(null);
    const [commune, setCommune] = useState(null);
    const [category, setCategory] = useState('Lycee');
    const [description, setDescription] = useState(null);




    let wilayas = Object.entries(data1).sort((a, b) => a[1] - b[1]).map((wilaya) => wilaya[0]);
    wilayas = ["Toutes les wilayas", ...wilayas];

    const [dateinterval, setDateinterval] = useState([
        // new Date(2023, 0, 1),
        // new Date(2023, 1, 1),
        null,
        null,
    ]);
    const [formattedDateFrom, setFormattedDateFrom] = useState(null);
    const [formattedDateTo, setFormattedDateTo] = useState(null);

    const handlesometing = () => {
        if (dateinterval[0] && dateinterval[1]) {
            setFormattedDateFrom(dateinterval[0].toISOString().split("T")[0]);
            setFormattedDateTo(dateinterval[1].toISOString().split("T")[0]);
        } else {
            setFormattedDateFrom(null);
            setFormattedDateTo(null);
        }
    }

    const navigate = useNavigate();
    const Submithandler = async () => {

        const searchParams = new URLSearchParams();
        searchParams.append("category", category);
        if (swilaya && swilaya !== "Toutes les wilayas") searchParams.append("wilaya", swilaya);
        if (Stheme) searchParams.append("theme", Stheme);
        if (commune) searchParams.append("commune", commune);
        if (description) searchParams.append("description", description);
        if (formattedDateFrom) searchParams.append("date_from", formattedDateFrom);
        if (formattedDateTo) searchParams.append("date_to", formattedDateTo);
        navigate(`/search/q?${searchParams.toString()}`);
    }
    useEffect(() => {
        handlesometing();
    }, [dateinterval])

    return (
        <Card sx={{
            overflow: "visible",
            backgroundColor: theme.colorScheme === "dark" ? "#25262b" : "#ffffff",
            boxShadow: "0px 0px 13px -1px rgba(0,0,0,0.15)",
            WebkitBoxShadow: "0px 0px 13px -1px rgba(0,0,0,0.15)",
            MozBoxShadow: "0px 0px 13px -1px rgba(0,0,0,0.15)",
        }}>
            <Container size="sm" p={0} >
                <Grid>
                    <Grid.Col span={12} sm={6}>
                        <TextInput
                            placeholder="mathematique"
                            onChange={(e) => setStheme(e.target.value)}
                            label="theme"
                            size="md"
                        />
                    </Grid.Col>
                    <Grid.Col span={12} sm={6}>
                        <NativeSelect
                            data={['Lycee', 'CEM', 'Primaire']}
                            onChange={(e) => setCategory(e.target.value)}
                            label="Cathegory"
                            size="md"
                        />
                    </Grid.Col>
                    <Grid.Col span={12} sm={6}>
                        <NativeSelect
                            size="md"
                            onChange={(e) => setSWilaya(e.target.value)}
                            data={wilayas}
                            label="wilaya"
                        />
                    </Grid.Col>
                    <Grid.Col span={12} sm={6}>
                        <TextInput
                            placeholder="amizour"
                            onChange={(e) => setCommune(e.target.value)}
                            label="commune"
                            size="md"
                        />
                    </Grid.Col>
                    <Grid.Col span={12} sm={6}>
                        <DateRangePicker
                            zIndex={1000}
                            label="Date interval"
                            placeholder="Pick dates range"
                            value={dateinterval}
                            onChange={((value) => { setDateinterval(value); handlesometing() })}
                        />
                    </Grid.Col>
                    <Grid.Col span={12} sm={6}>
                        <TextInput
                            placeholder="description..."
                            onChange={(e) => setDescription(e.target.value)}
                            label="description"
                            size="md"
                        />
                    </Grid.Col>
                </Grid>
                <Group mt="xl" position="right">
                    <Button onClick={Submithandler} variant="outline" leftIcon={<IconSearch size={24} />} >Search</Button>
                </Group>
            </Container>
        </Card>
    );
}

export default SearchCard;