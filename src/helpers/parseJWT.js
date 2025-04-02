const parseJwt = (token) => {
    if (!token) {
        return;
    }
    const base64Url = token.split(".")[1]; // Obtiene la segunda parte del token (payload)
    console.log('base64Url:', base64Url);
    
    const base64 = base64Url.replace("-", "+").replace("_", "/"); // Decodifica el base64Url para que tenga el formato estándar
    console.log("base64", base64);
    
    return JSON.parse(window.atob(base64)); // Convierte el base64 a JSON y lo parsea
}

export const userToken = () => {
    if(document.cookie){
        const token = document.cookie.split('; ').find(row => row.startsWith('Bearer=')).split('=')[1];
        console.log('Token:', token);
        
        const user = parseJwt(token);
        console.log('User:', user);
        
        return user;
    };
};