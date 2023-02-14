export default logOut = () => {
    localStorage.removeItem('accessToken');
    return '/login';
}