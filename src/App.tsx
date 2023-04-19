import "./App.css";
// import { useEffect, useState } from "react";
// import axios from "axios";
import { CustomQrScanner } from "./Scanner";
function App() {
  // const [isLoading, setLoading] = useState(true);
  // const [users, setUsers] = useState<any[]>([]);
  // useEffect(() => {
  //   axios
  //     .get("https://gorest.co.in/public/v2/users")
  //     .then((data) => {
  //       setUsers(data.data);
  //     })
  //     .catch(() => {
  //       setUsers([]);
  //     })
  //     .finally(() => {
  //       setLoading(false);
  //     });

  //   navigator.mediaDevices.getUserMedia({ video: true }).then((a) => {
  //     console.info("KKK", a);
  //   });
  // }, []);
  return (
    <div className="App">
      <CustomQrScanner/>
      {/* TEST CALL API */}
      {/* {isLoading && <div>Loading....</div>}
      {!isLoading && (
        <>
          <h3>Hello Users</h3>
          <ul>
            {users.map((user) => (
              <li key={user.name}>{user.name}</li>
            ))}
          </ul>
        </>
      )} */}
    </div>
  );
}

export default App;
