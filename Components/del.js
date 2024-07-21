/* Delete accessToken from local storage */
export const del = () => {
    localStorage.removeItem('accessToken');
    return '/login';
}