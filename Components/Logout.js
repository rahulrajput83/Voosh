export const logOut = () => {
    localStorage.removeItem('accessToken');
    return '/login';
}