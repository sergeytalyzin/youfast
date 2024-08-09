export const extractYouTubeId = (urlOrId) => {
    let id = urlOrId;

    // Если это полный URL, извлекаем ID из URL
    const urlPattern = /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
    const match = id.match(urlPattern);

    if (match && match[1]) {
        id = match[1];
    } else if (id.includes('&')) {
        // Обрезаем параметры, если есть
        id = id.split('&')[0];
    }

    return id;
};
