import { Stack } from "@mantine/core";
import { useInterval } from "@mantine/hooks";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../context/auth-context";
import ConversationContentHeader from "./conversation-content-header";
import ConversationContentMessages from "./conversation-content-messages";

function ConversationContent() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [user, setUser] = useState(null)
    const [messages, setMessages] = useState([]);

    const { currentUser } = useContext(AuthContext);

    const getMessages = () => {
        axios.post("/conversation-messages", { user_id: currentUser.id, conversation_id: id })
            .then((res) => {
                setMessages(res.data.messages)
            })
    }
    const getPartner = () => {
        axios.post("/conversation-partner", { user_id: currentUser.id, conversation_id: id })
            .then((res) => {
                setUser(res.data.partner)
            }).catch((err) => {
                navigate("/chat")
            })
    }

    const interval = useInterval(() => { getMessages() }, 500);

    useEffect(() => {
        interval.start();
    }, []);


    useEffect(() => {
        getPartner()
    }, [navigate, id, currentUser.id])
    return (
        <>
            <Stack>
                {user ? (
                    <>
                        <ConversationContentHeader user={user} />
                        <ConversationContentMessages user={user} messages={messages} />
                    </>) : (
                    <h1>Loading...{id}</h1>
                )}
            </Stack>
        </>
    );
}

export default ConversationContent;