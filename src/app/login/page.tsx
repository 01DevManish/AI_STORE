'use client'
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showToast, setShowToast] = useState(false);  // For showing success toast
  
  const router = useRouter();

  // Check if the user is already logged in (token exists in localStorage)
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      router.push('/dashboard');  // Redirect to dashboard if logged in
    }
  }, [router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const url = isLogin ? '/api/auth/login' : '/api/auth/signup';
    const body = isLogin ? { email, password } : { username, email, password };

    try {
      const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      const data = await res.json();

      if (!res.ok) {
        setError(data.error || 'Something went wrong');
      } else {
        if (isLogin) {
          // Store the token in localStorage after successful login
          localStorage.setItem('token', data.token);

          // Show success toast
          setShowToast(true);

          // Redirect to dashboard after showing the toast
          setTimeout(() => {
            router.push('/dashboard');
          }, 1500);  // Delay redirection to allow toast to show
        } else {
          alert('Signup successful! Please log in.');
          setIsLogin(true);
        }
      }
    } catch (err) {
      console.error("Error during authentication:", err); // Log the actual error
      setError("Something went wrong"); // Display a generic error message
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
      <div className="w-full max-w-md p-6 bg-gray-800 rounded-md shadow-md">
        <h1 className="text-3xl font-semibold text-center mb-6">{isLogin ? 'Login' : 'Signup'}</h1>

        {error && <p className="text-red-500 text-center mb-4">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLogin && (
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-300">Username:</label>
              <input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-4 py-2 mt-2 bg-gray-700 text-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
          )}

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-300">Email:</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 mt-2 bg-gray-700 text-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-300">Password:</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 mt-2 bg-gray-700 text-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-200"
          >
            {isLogin ? 'Login' : 'Signup'}
          </button>
        </form>

        <div className="text-center mt-4">
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="text-blue-400 hover:underline focus:outline-none"
          >
            {isLogin ? 'Don’t have an account? Sign up' : 'Already have an account? Login'}
          </button>
        </div>
      </div>

      {/* Success Toast Message */}
      {showToast && (
        <div className="fixed bottom-6 right-6 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg">
          <p>Login successful!</p>
        </div>
      )}
    </div>
  );
};

export default AuthPage;
