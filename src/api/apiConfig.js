const apiConfig = {
    baseUrl: 'https://api.themoviedb.org/3/',
    apiKey: '1de04659ff9ee932df08fda644e1012b',
    originalImage: (imgPath) => `https://image.tmdb.org/t/p/original/${imgPath}`,
    w500Image: (imgPath) => `https://image.tmdb.org/t/p/w500/${imgPath}`
}

export default apiConfig;