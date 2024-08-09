import React from 'react';
import styles from "./styles.module.less";

const Cards = ({ ids, handler }) => {
    const handleCardClick = (id) => {
        window.scrollTo({ top: 0, behavior: 'smooth' }); // Прокрутка вверх с плавной анимацией
        handler(id);
    };

    if (!ids?.length) return null;

    return (
        <div className={styles.list}>
            {ids.slice(0,100).map((id, index) => (
                <div key={index} onClick={() => handleCardClick(id)} className={styles.card}>
                    <img
                        src={`https://img.youtube.com/vi/${id}/mqdefault.jpg`}
                        alt={`Thumbnail for ${id}`}
                        className={styles.thumbnail}
                    />
                </div>
            ))}
        </div>
    );
};

export default Cards;
