import { useContext, useRef, useState } from "react";
import AdvertisementCreateImages from "../components/advertisement-create-images";
import { data1 } from "../components/algeria-map.data";
import ThemedCard from "../components/my-card";
import TextEditor from "../components/text-editor";
import { Container, Title, Divider, Grid, TextInput, Space, NativeSelect, NumberInput, Group, Button, Select, Box, Text, Code } from "@mantine/core";

import axios from "axios";
import { AuthContext } from "../context/auth-context";
import { showNotification } from "@mantine/notifications";
import { IconCheck, IconPencil, IconX } from "@tabler/icons";
import { useNavigate } from "react-router-dom";

function CreateAdvertisement() {

    // data contains wilayas as keys and code as valye, return an array when all elements like this (code - wilaya) and ordered by the code
    const wilayas = Object.entries(data1).sort((a, b) => a[1] - b[1]).map((wilaya) => wilaya[0]);

    const { currentUser } = useContext(AuthContext)
    const navigate = useNavigate();

    const [theme, setTheme] = useState('');
    const [price, setPrice] = useState(123);
    const [description, setDescription] = useState('');
    const [category, setCathgory] = useState('Lycee');
    const [mode, setMode] = useState('Online');
    const [wilaya, setWilaya] = useState('Adrar');
    const [commune, setCommune] = useState('');
    const [adress, setAdress] = useState('');
    const [images, setImages] = useState([]);

    const [edit, setEdit] = useState(true);


    const textSetterRef = useRef();

    const [canSubmit, setCanSubmit] = useState(true);

    const handlaSubmit = async (e) => {
        e.preventDefault();
        textSetterRef.current.click();


        setCanSubmit(false);
        axios.post("/new-advertisement", { user_id: currentUser.id, theme, price, description, category, mode, wilaya, commune, adress, images })
            .then((res) => {
                showNotification({
                    title: 'Advertisement added successfully',
                    message: 'Hey there, your advertisement is awesome!',
                })
                navigate(`/advertisement/${res.data.id}`);
            }
            )
            .catch((err) => {
                showNotification({ title: 'Input Error', message: 'All fields are required, even images (atleast 1 img)', color: "red", icon: <IconX size={18} /> })
                setCanSubmit(true);
            })
    }


    return (
        <>
            <Container>
                <ThemedCard>
                    <Title my="lg">Create Advertisement :</Title>
                    <Divider my="lg" />
                    <Title mb="xl" order={3}>General Infoamations :</Title>
                    <Grid>
                        <Grid.Col span={12} sm={6}>
                            <TextInput
                                value={theme}
                                onChange={(e) => setTheme(e.target.value)}
                                placeholder="mathemathics"
                                label="Title"
                                size="md"
                            />
                        </Grid.Col>
                        <Grid.Col span={12} sm={6}>
                            <NumberInput
                                value={price}
                                onChange={(val) => setPrice(val)}
                                defaultValue={18}
                                placeholder="1000DA"
                                label="Price"
                                size="md"
                            />
                        </Grid.Col>
                    </Grid>
                    <Grid my="sm">
                        <Grid.Col span={12} sm={6}>
                            <NativeSelect
                                value={category}
                                onChange={(e) => setCathgory(e.target.value)}
                                size="md"
                                data={['Lycee', 'CEM', 'Primaire']}
                                label="category"
                            />
                        </Grid.Col>
                        <Grid.Col span={12} sm={6}>
                            <NativeSelect
                                value={mode}
                                onChange={(e) => setMode(e.target.value)}
                                size="md"
                                data={['Presence', 'Online']}
                                label="Mode"
                            />
                        </Grid.Col>
                    </Grid>
                    <Grid my="sm">
                        <Grid.Col span={12} sm={6}>
                            <Select
                                value={wilaya}
                                onChange={(value) => setWilaya(value)}
                                size="md"
                                data={wilayas}
                                label="wilaya"
                                searchable
                                nothingFound="No options"
                            />
                        </Grid.Col>
                        <Grid.Col span={12} sm={6}>
                            <TextInput
                                value={commune}
                                onChange={(e) => setCommune(e.target.value)}
                                placeholder="bab el oued"
                                label="Commune"
                                size="md"
                            />
                        </Grid.Col>
                    </Grid>
                    <TextInput
                        value={adress}
                        onChange={(e) => setAdress(e.target.value)}
                        placeholder="street 20"
                        label="adress"
                        size="md"
                    />
                    <Divider my="lg" />
                    <Group my="lg" align={"center"} position="apart">
                        <Title order={3}>Description :</Title>
                        <Button leftIcon={edit ? (<IconCheck size={24} />) : (<IconPencil size={24} />)} variant="outline" onClick={() => { textSetterRef.current.click(); setEdit(!edit) }}>{edit ? "Validate" : "Edit"}</Button>
                    </Group>
                    <Box sx={{ display: edit ? "block" : "none" }} m={0} p={0}>
                        <TextEditor setterref={textSetterRef} setter={setDescription} />
                    </Box>
                    <Box sx={{ borderRadius: "10px", border: "1px solid #eaeaea", padding: "10px", display: edit ? "none" : "block" }}>
                        <div dangerouslySetInnerHTML={{ __html: description }} />
                    </Box>


                    <Space h="lg" />
                    <Title order={3}>Images :</Title>
                    <AdvertisementCreateImages photos={images} setPhotos={setImages} />

                    <Group mt="lg" position='right'>
                        {edit && <Code>you need to validate the description inorder to submit</Code>}
                        <Button disabled={edit} onClick={handlaSubmit}>Submit</Button>
                    </Group>
                </ThemedCard>
            </Container>
        </>
    );
}


export default CreateAdvertisement;