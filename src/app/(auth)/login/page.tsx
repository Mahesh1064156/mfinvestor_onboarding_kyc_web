'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import axios  from 'axios';
import { axios_apibase_url } from '@/services/api';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

const handleLogin = async () => {
  try {
    const res = await axios_apibase_url.post("/login", {
      email,
      password
    });
    localStorage.setItem("token", res.data.token);
    router.push("/dashboard");
  } catch (error) {
    if (axios.isAxiosError(error)) {
      alert(error.response?.data?.message || "Login failed");
    } else {
      alert("Unexpected error");
    }
  }
};
  return (
    <div style={{ display: 'flex', height: '100vh', justifyContent: 'center', alignItems: 'center' }}>
      <div>
        <h2>Login</h2>
        <input
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        /><br /><br />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        /><br /><br />
        <button onClick={handleLogin}>Login</button>
      </div>
    </div>
  );
}
