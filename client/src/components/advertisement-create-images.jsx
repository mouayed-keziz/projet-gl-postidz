import { useEffect, useRef, useState } from 'react';
import { Text, Group, Button, Container, Grid, Indicator, AspectRatio, Space } from '@mantine/core';
import { Dropzone, IMAGE_MIME_TYPE } from '@mantine/dropzone';
import { IconCloudUpload, IconX, IconDownload } from '@tabler/icons';
import useStyles from './advertisement-create-images.styles';
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { storage } from "../AuthProvider";
import { uuidv4 } from '@firebase/util';
import { showNotification } from '@mantine/notifications';


function AdvertisementCreateImages({ photos, setPhotos }) {
    const { classes, theme } = useStyles();
    const openRef = useRef(null);
    const [files, setFiles] = useState([]);
    const [loading, setLoading] = useState(false);
    const [progress, setProgress] = useState(-1);

    const uploadFile = async (file) => {

        setLoading(true);
        const storageRef = ref(storage, 'users/' + uuidv4() + "." + file.path.split('.').pop());
        const uploadTask = uploadBytesResumable(storageRef, file);

        uploadTask.on('state_changed',
            (snapshot) => {
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                setProgress(Math.floor(progress));
                switch (snapshot.state) {
                    case 'paused':
                        console.log('Upload is paused');
                        break;
                    case 'running':
                        setLoading(true);
                        break;
                    default:
                        break;
                }
            },
            (error) => {
                console.log("error", error)
            },
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    setPhotos([...photos, downloadURL]);
                    setLoading(false);
                    setProgress(-1)
                });
            }
        );
    }

    return (
        <>
            <Container size={"xs"}>
                <div className={classes.wrapper}>
                    <Dropzone
                        loading={loading}
                        openRef={openRef}
                        className={classes.dropzone}
                        radius="md"
                        maxFiles={1}
                        onDrop={(newFiles) => {
                            for (let i = 0; i < newFiles.length; i++) {
                                uploadFile(newFiles[i]);
                            }
                        }}
                        onReject={(files) => showNotification({ title: 'Too many images', message: 'you can only upload one image at a time', color: "red", icon: <IconX size={18} /> })}
                        maxSize={3 * 1024 ** 2}
                        accept={IMAGE_MIME_TYPE}
                    >
                        <div style={{ pointerEvents: 'none' }}>
                            <Group position="center">
                                <Dropzone.Accept>
                                    <IconDownload size={50} color={theme.colors[theme.primaryColor][6]} stroke={1.5} />
                                </Dropzone.Accept>
                                <Dropzone.Reject>
                                    <IconX size={50} color={theme.colors.red[6]} stroke={1.5} />
                                </Dropzone.Reject>
                                <Dropzone.Idle>
                                    <IconCloudUpload
                                        size={50}
                                        color={theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.black}
                                        stroke={1.5}
                                    />
                                </Dropzone.Idle>
                            </Group>

                            <Text align="center" weight={700} size="lg" mt="xl">
                                <Dropzone.Accept>Drop Files Here</Dropzone.Accept>
                                <Dropzone.Reject>File should be of type image</Dropzone.Reject>
                                <Dropzone.Idle>Upload images</Dropzone.Idle>
                            </Text>
                            <Text align="center" size="sm" mt="xs" color="dimmed">
                                Drag&apos;n&apos;drop files here to upload. We can accept only <i>.pdf</i> files that
                                are less than 30mb in size.<br />atleast one image is required
                            </Text>
                        </div>
                    </Dropzone>

                    {!loading && (
                        <Button className={classes.control} size="md" radius="xl" onClick={() => openRef.current?.()}>
                            Select files
                        </Button>
                    )}
                </div>
            </Container>
            <Space h="xs" />
            <Grid mt="xl">
                {photos.map((photo, index) => (
                    <Grid.Col key={index} span={3} sm={2} md={2}>
                        <Indicator onClick={() => {
                            const newPhotos = photos.filter((_, i) => i !== index);
                            setPhotos(newPhotos);
                        }} sx={{ cursor: "pointer" }} size={20} color="red" label={"X"}>
                            <AspectRatio ratio={1}>
                                <img alt={photo} fit='none' sx={{ cursor: 'auto' }} width={"100%"}
                                    src={photo}
                                />
                            </AspectRatio>
                        </Indicator>
                    </Grid.Col>
                ))}
            </Grid>
        </>
    );
}

export default AdvertisementCreateImages;