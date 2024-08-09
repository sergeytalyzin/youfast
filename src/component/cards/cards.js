import React, {useEffect, useState} from 'react';
import styles from "./styles.module.less";

const fetchVideoTitle = async (videoId) => {
    try {
        const response = await fetch(`https://www.youtube.com/oembed?url=http://www.youtube.com/watch?v=${videoId}&format=json`);
        if (response.ok) {
            const data = await response.json();
            return data.title;
        } else {
            console.error('Ошибка при получении данных о видео');
            return 'Не удалось загрузить название';
        }
    } catch (error) {
        console.error('Ошибка при получении названия видео:', error);
        return 'Ошибка загрузки названия';
    }
};

const Cards = ({ ids, handler }) => {
    const [titles, setTitles] = useState({});

    useEffect(() => {
        const fetchTitles = async () => {
            const titlesMap = {};
            for (const id of ids) {
                const title = await fetchVideoTitle(id);
                titlesMap[id] = title;
            }
            setTitles(titlesMap);
        };

        fetchTitles();
    }, [ids]);

    if (!ids?.length) return null;

    return (
        <div className={styles.list}>
            {ids.slice(0,100).map((id, index) => (
                <div key={index} onClick={() => handler(id)} className={styles.card}>
                    <img
                        src={`https://img.youtube.com/vi/${id}/mqdefault.jpg`}
                        alt={`Thumbnail for ${id}`}
                        className={styles.thumbnail}
                    />
                    <div className={styles.cardContent}>
                        <h3>{titles[id] || `Видео ${index + 1}`}</h3>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Cards;
