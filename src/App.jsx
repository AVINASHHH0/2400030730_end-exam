import React, { useEffect, useState } from "react";
import axios from "axios";

const App = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    axios
      .get("https://jsonplaceholder.typicode.com/users")
      .then((res) => {
        setStudents(
          res.data.map((s) => ({
            id: s.id,
            name: s.name,
            email: s.email,
            city: s.address.city,
          }))
        );
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to load student data ⚠");
        setLoading(false);
      });
  }, []);

  if (loading) return <h2 className="text-center mt-6">Loading students...</h2>;
  if (error) return <h2 className="text-center mt-6 text-red-500">{error}</h2>;

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-bold text-center mb-6">Student Details</h1>

      {/* Card Section */}
      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 mb-8">
        {students.map((stu) => (
          <div
            key={stu.id}
            className="border rounded-2xl shadow p-3 hover:scale-105 transition bg-white"
          >
            <h3 className="text-lg font-semibold">{stu.name}</h3>
            <p className="text-sm text-gray-600 truncate">{stu.email}</p>
            <p className="text-sm mt-1">📍 {stu.city}</p>
          </div>
        ))}
      </div>

      {/* Table Section */}
      <div className="overflow-x-auto">
        <table className="w-full border border-gray-300">
          <thead>
            <tr>
              <th className="border p-2">ID</th>
              <th className="border p-2">Name</th>
              <th className="border p-2">Email</th>
              <th className="border p-2">City</th>
            </tr>
          </thead>
          <tbody>
            {students.map((stu) => (
              <tr key={stu.id} className="text-center">
                <td className="border p-2">{stu.id}</td>
                <td className="border p-2">{stu.name}</td>
                <td className="border p-2 truncate">{stu.email}</td>
                <td className="border p-2">{stu.city}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default App;
