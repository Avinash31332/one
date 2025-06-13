import { useEffect, useState } from "react";
import api from "../utils/api";
import Axios from "../utils/Axios";

export default function ViewStudents() {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    Axios.get("/api/student")
      .then((res) => setStudents(res.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div>
      <h2>All Students</h2>
      <ul>
        {students.map((s) => (
          <li key={s._id}>
            {s.name} - {s.email} - {s.branch}
          </li>
        ))}
      </ul>
    </div>
  );
}
