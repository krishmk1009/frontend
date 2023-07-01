import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from 'react-router-dom';


const NotePage = ({ match }) => {
  const history = useNavigate();
  const { id } = useParams();
  const [note, setNote] = useState([]);

  useEffect(() => {
    getNote();
  }, [id]);

  const getNote = async () => {
    const response = await fetch(`/api/notes/${id}`);
    const data = await response.json();
    setNote(data);
  };

  const updateNote = async () => {
    fetch(`/api/notes/${id}/update`, {
      method: "PUT",
      headers: {
        "Content-Type": " application/json",
      },

      body: JSON.stringify(note),
    });
  };

  const deleteNote = async ()=>{
    fetch(`/api/notes/${id}/delete`,{
      method:"DELETE",
      headers:{
        "Content-Type": " application/json",
      },

    })
    history("/");
  }

  const handleSubmit = () => {
    updateNote();
    history("/");

  };

  return (
    <div className="note">
      <div className="note-header">
        <button onClick={handleSubmit}> Back </button>
      </div>
      <button onClick={deleteNote}>Delete</button>
      <textarea
        onChange={(e) => setNote({ ...note, body: e.target.value })}
        defaultValue={note?.body}
      ></textarea>
    </div>
  );
};

export default NotePage;
