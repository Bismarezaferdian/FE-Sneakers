import axios from "axios";

const BASE_URL = "https://lazy-pear-eagle-boot.cyclic.app/api/v1/";
// const BASE_URL = "https://be-fashionshop-production.up.railway.app/api/v1/";
// const BASE_URL = "http://localhost:8000/api/v1/";

// const token = process.env.TOKEN;
const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzODhjOWE4MGQ0ZjZlZmZmMjE2OWVmNCIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY3MTMzNjkzMywiZXhwIjoxNjcxNTk2MTMzfQ.NXo71N-_kQVjwpURySdbLEZiKDzwkzctDJjf7lLhwdQ";

export const fetchData = axios.create({
  baseURL: BASE_URL,
  // withCredentials: "include",
});

export const fetchUser = axios.create({
  baseURL: BASE_URL,
  header: { token: `Bearer ${token}` },
});
