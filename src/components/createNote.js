import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const CreateNote = () => {
  const history = useNavigate();
  const [note, setNote] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault()
    fetch("/api/notes/create", {
      method: "POST",

      headers: {
        "Content-Type": " application/json",
      },
      body: JSON.stringify({ body: note }),
    });
    history("/");
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label> Note</label>
        <textarea
          onChange={(e) => setNote(e.target.value)}
          name="note"
        ></textarea>
        <button type="submit"> Submit</button>
      </form>
    </div>
  );
};

export default CreateNote;
