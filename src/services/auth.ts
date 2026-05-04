const BASE_URL = "http://localhost:5400";

export const login = async (email:string,password:string) => {
  const res= await fetch(`${BASE_URL}/api/user/login`,{
    method:"POST",
      headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
  return res.json();

}
export const register = async (name: string, email: string, password: string) => {
  const res = await fetch(`${BASE_URL}/api/user/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, email, password }),
  });
  return res.json();
};
export const setToken = (t: string) => localStorage.setItem("token", t);
export const getToken = () => localStorage.getItem("token") || "";
export const clearToken = () => localStorage.removeItem("token");
