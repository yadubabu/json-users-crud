import React, { useEffect, useState } from "react";
import "./app.css";

function App() {
  const [users, setUsers] = useState([]);
  const [name, setName] = useState();
  const [phone, setPhone] = useState();
  const [pop, setPop] = useState("none");
  const fetchUsers = () => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((res) => res.json())
      .then((data) => setUsers(data))
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    fetchUsers();
  }, []);
  console.log(users);
  const addUser = () => {
    setPop("show");
  };
  const addUserList = () => {
    setUsers([...users, { name, phone, id: users.length + 1 }]);
  };
  const editUser = (id) => {
    const getId = users.filter((user) => user.id === parseInt(id));
    setPop("show");
    setName(getId[0].name);
    setPhone(getId[0].phone);
  };
  const deleteUser = (id) => {
    const getId = users.filter((user) => user.id !== parseInt(id));
    if (getId) {
      setUsers(getId);
    }
  };
  return (
    <div className="App">
      <input type="submit" value="Add User" onClick={addUser} />
      <div className={pop}>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <br />
        <input
          type="text"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
        <br />
        <input type="submit" value="Add" onClick={addUserList} />
        <br />
      </div>
      <table>
        <thead>
          <tr className="trow">
            <td>
              <h1>Name</h1>
            </td>
            <td>
              <h1>Phone</h1>
            </td>
            <td>
              <h1>Action</h1>
            </td>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => {
            return (
              <div>
                <tr className="tbody" key={user.id}>
                  <td>
                    <h3>{user.name}</h3>
                  </td>
                  <td>{user.phone}</td>
                  <td>
                    <button
                      className="edit"
                      id={user.id}
                      onClick={(e) => editUser(e.target.id)}
                    >
                      Edit
                    </button>
                  </td>
                  <td>
                    <button
                      className="del"
                      id={user.id}
                      onClick={(e) => deleteUser(e.target.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              </div>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default App;
