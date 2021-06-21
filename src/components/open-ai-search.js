import React, { useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Button, Container } from "react-bootstrap";

const OpenSearch = (props) => {

  const [message, setMessage] = useState(''); 
  const { getAccessTokenSilently } = useAuth0()
  const apiUrl = process.env.REACT_APP_API_URL;

  async function fetchOpenSearch () {
    const token = await getAccessTokenSilently();
    const res = await fetch(`${apiUrl}/api/openai-search`, {
      method: 'GET',
      headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'},});
    const payload = await res.json();
    return payload
  };

  function handleSearch(){
    console.log(props)
    fetchOpenSearch()
    .then(r=>props.onChange(r))
  }

  return (
    <Container>
      <Button variant="outline-primary" className="float-right m-3" onClick={handleSearch}>openAi</Button>
    </Container>
  );
};

export default OpenSearch;