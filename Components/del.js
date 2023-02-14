export const del = () => {
    localStorage.removeItem('accessToken');
    return '/login';
}