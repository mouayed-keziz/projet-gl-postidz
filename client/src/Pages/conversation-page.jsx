import { Grid } from "@mantine/core";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useLocation, Outlet, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/auth-context";
import ConversationNav from "../conversation/conversation-nav";


function ConversationPage() {
    const location = useLocation().pathname;
    const Convo = (location === "/chat/" || location === "/chat") ? false : true;
    const [conversations, setConversations] = useState([])
    const { currentUser } = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        axios.post("/user-conversations", { user_id: currentUser.id })
            .then((res) => {
                setConversations(res.data.conversations);
            }).catch((err) => {
                navigate("/");
            })
    }, [])

    return (
        <Grid grow style={{ margin: "0" }}>
            <Grid.Col span={3}
                sx={(theme) => ({
                    [theme.fn.smallerThan("md")]: {
                        display: Convo ? "none" : "block",
                    },
                })}>
                <ConversationNav contacts={conversations} />
            </Grid.Col>
            <Grid.Col span={9}>
                <Outlet />
            </Grid.Col>
        </Grid>
    );
}

export default ConversationPage;
