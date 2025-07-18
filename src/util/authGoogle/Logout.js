import axios from 'axios';

const Logout = () => {
    const handleLogout = async () => {
        try {
            await axios.post('http://localhost:5000/auth/logout', {}, { withCredentials: true });

            // Remove access token from localStorage
            localStorage.removeItem('access_token');
            localStorage.removeItem('userInfo');

            console.log('Logged out successfully');
            // alert('You have been logged out.');
        } catch (err) {
            console.error('Logout failed:', err.response?.data || err.message);
        }
    };

    return <button onClick={handleLogout}>Logout</button>;
};

export default Logout;
