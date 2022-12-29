import { Container, Space } from "@mantine/core";
import SearchAdvertisementsSection from "../components/search-advertisements-section";
import SearchCard from "../components/search-card";
import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

function Search() {
    const location = useLocation();
    //console.log(location.search)
    const search = new URLSearchParams(location.search);



    const [searchResults, setSearchResults] = useState(null);

    const [formData, setFormData] = useState({
        category: '',
        wilaya: '',
        commune: '',
        date_from: '',
        date_to: '',
        theme: '',
        description: '',
    });


    useEffect(() => {
        setFormData({
            category: search.get('category') || '',
            wilaya: search.get('wilaya') || '',
            commune: search.get('commune') || '',
            date_from: search.get('date_from') || '',
            date_to: search.get('date_to') || '',
            theme: search.get('theme') || '',
            description: search.get('description') || '',
        });
    }, [location.search]);

    useEffect(() => {
        axios.post('/search-advertisement', formData)
            .then(response => {
                setSearchResults(response.data);
            })
            .catch(error => {
                console.error(error);
            });
    }, [formData]);
    return (
        <>
            <Container>
                <SearchCard />
                <Space h={100} />
                {searchResults && searchResults.length > 0 ? (
                    <SearchAdvertisementsSection searchResults={searchResults} />
                ) : (
                    <h1>There is no results</h1>
                )}
            </Container>
        </>
    );
}

export default Search;