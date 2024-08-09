import React, { useState, useEffect } from 'react';
import styles from './styles.module.less'
import { Button, Image, Input, Popover } from 'antd';
import 'antd/dist/reset.css';
import { useValidate } from '../../shared/useValidate';
import { getIds, saveIds } from '../../firebase/firestoreService';
import {extractYouTubeId} from "../../shared/utils";
import Cards from "../cards/cards"; // Импортируем функции для работы с Firestore
import Player from "../player/player"; // Импортируем react-youtube

const instructions = (
    <div>
        <ol>
            <li>
                <a href="https://youtube.com" target="_blank" rel="noopener noreferrer">Откройте YouTube</a>
            </li>
            <Image
                width={200}
                src="/screen.png"
                alt="Инструкция"
                className='image'
            />
            <li>
                <p>Введите ID видео YouTube в поле ввода. Пример ID видео: <code>dQw4w9WgXcQ</code></p>
            </li>
            <Image
                width={200}
                src="/screen2.png"
                alt="Инструкция"
                className='image'
            />
            <li><h2>Наслаждаемся просмотром!</h2></li>
        </ol>
    </div>
);

const YouTubeEmbed = () => {
    const [videoId, setVideoId] = useState(''); // Введенный ID видео
    const [confirmedVideoId, setConfirmedVideoId] = useState(''); // Подтвержденный ID видео для поиска
    const [ids, setIds] = useState([]); // Массив сохраненных ID
    const { checkVideoId, setIsValid } = useValidate();

    // Получаем список ID при загрузке компонента
    useEffect(() => {
        const fetchIds = async () => {
            const storedIds = await getIds();
            const reverseIds  = storedIds.length ? storedIds.reverse() : []
            setIds(reverseIds);
            storedIds.length && setConfirmedVideoId(reverseIds[0])
        };
        fetchIds();
    }, []);

    const handleInputChange = (e) => {
        const value = extractYouTubeId(e?.target?.value)
        setVideoId(value);
    };

    const handleSearchClick = async () => {
        if (videoId) {
            try {
              const valid =   await checkVideoId(videoId);
                if (valid) {
                    setConfirmedVideoId(videoId);
                    const updatedIds = Array.from(new Set([...ids, videoId]));
                    setIds(updatedIds);
                    await saveIds(updatedIds); // Сохраняем обновленный массив ID в Firestore
                }
            } catch (error) {
                console.error('Ошибка при проверке видео ID:', error);
                setIsValid(false);
            }
        } else {
            setIsValid(true);
        }
    };
    const handlerCards = (id) => {
        setConfirmedVideoId(id)
    }
    return (
        <div style={{ padding: '20px' }} className="body">
            <header className="header">
                <h1>Здесь может быть ваша реклама</h1>
            </header>
            <div className={styles.actions}>
                <Popover content={instructions} title="Инструкция" trigger="click">
                    <Button type="primary" danger className="button">Посмотреть инструкцию</Button>
                </Popover>
                <Input
                    placeholder="Введите ID видео YouTube в поле ввода"
                    value={videoId}
                    onChange={handleInputChange}
                    style={{ marginBottom: '10px' }}
                />
                <Button type='primary' onClick={handleSearchClick}>Найти</Button>
            </div>

            {confirmedVideoId && (
                <Player id={confirmedVideoId}/>
            )}
            {ids?.length && <Cards ids={ids} handler={handlerCards}/>}
        </div>
    );
};

export default YouTubeEmbed;
