import React, { useState, useEffect, use } from "react";
import Table from "./Table";
import Form from "./Form";


function MyApp() {
  // const [characters, setCharacters] = useState([
  //   {
  //     name: "Charlie",
  //     job: "Janitor"
  //   },
  //   {
  //     name: "Mac",
  //     job: "Bouncer"
  //   },
  //   {
  //     name: "Dee",
  //     job: "Aspring actress"
  //   },
  //   {
  //     name: "Dennis",
  //     job: "Bartender"
  //   }
  // ]);
  const [characters, setCharacters] = useState([]);


  // function removeOneCharacter(index) {
  //   const updated = characters.filter((character, i) => {
  //     return i !== index;
  //   });
  //   setCharacters(updated);
  // }
  function removeOneCharacter(id) {
    fetch(`http://localhost:8000/users/${id}`, { method: "DELETE" })
      .then((res) => {
        if (res.status === 204) {
          setCharacters((prev) => prev.filter((c) => c._id !== id));
        }
      })
      .catch((error) => console.log(error));
  }

  function updateList(person) {
    // setCharacters([...characters, person]);
    postUser(person)
      .then((res) => {
        if (res.status === 201) return res.json();
      })
      .then((newUser) => {
        if (newUser) setCharacters((prev) => [...prev, newUser]);
      })
      .catch((error) => console.log(error));
  }

  function fetchUsers() {
    return fetch("http://localhost:8000/users");
  }

  function postUser(person) {
    const promise = fetch("Http://localhost:8000/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(person),
    });
    return promise;
  }

  useEffect(() => {
    fetchUsers()
      .then((res) => res.json())
      .then((json) => setCharacters(json["users_list"]))
      .catch((error) => console.log(error));
  }, []);

  return (
    <div className="container">
      <Table
        characterData={characters}
        removeCharacter={removeOneCharacter}
      />
      <Form handleSubmit={updateList} />
    </div>
  );
}

export default MyApp;
