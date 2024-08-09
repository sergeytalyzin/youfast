import React, {useEffect, useState} from 'react';
import styles from './styles.module.less'
import {Button, Input, Popover} from 'antd';
import 'antd/dist/reset.css';
import {useValidate} from '../../shared/useValidate';
import {getIds, saveIds} from '../../firebase/firestoreService';
import {extractYouTubeId} from "../../shared/utils";
import Cards from "../cards/cards"; // Импортируем функции для работы с Firestore
import Player from "../player/player"; // Импортируем react-youtube

const instructions = (
    <div>
        <ol>
            <li>
                <a href="https://youtube.com" target="_blank" rel="noopener noreferrer">Перейдите на сайт YouTube и скопируйте ссылку на нужное видео.</a>
            </li>
            <li>
                Вставьте скопированную ссылку в поле ввода на нашем сайте.
            </li>
            <li>
                Нажмите кнопку "Найти".
            </li>
        </ol>
    </div>
);

const YouTubeEmbed = () => {
    const [inputId, setInputId] = useState('');
    const [videoId, setVideoId] = useState(''); // Введенный ID видео
    const [confirmedVideoId, setConfirmedVideoId] = useState(''); // Подтвержденный ID видео для поиска
    const [ids, setIds] = useState([]); // Массив сохраненных ID
    const { checkVideoId, setIsValid } = useValidate();

    // Получаем список ID при загрузке компонента
    useEffect(() => {
        (async () => {
            const storedIds = await getIds();
            setIds(storedIds);
            storedIds.length && setConfirmedVideoId(storedIds[0])
        })()
    }, []);

    const handleInputChange = (e) => {
        setInputId(e?.target?.value)
        const value = extractYouTubeId(e?.target?.value)
        setVideoId(value);
    };

    const handleSearchClick = async () => {
        if (videoId) {
            try {
              const valid =   await checkVideoId(videoId);
                if (valid) {
                    setConfirmedVideoId(videoId);
                    const updatedIds = Array.from(new Set([videoId, ...ids]));
                    setIds(updatedIds);
                    await saveIds(updatedIds);
                }
            } catch (error) {
                console.error('Ошибка при проверке видео ID:', error);
                setIsValid(false);
            }
        } else {
            setIsValid(true);
        }
        setInputId('')
    };
    const handlerCards = (id) => {
        setConfirmedVideoId(id)
    }
    return (
        <div className={styles.wrapper}>
            <div className="body">
                <header className="header">
                    <div className={styles.header}></div>
                </header>
                <div className={styles.container}>
                    <div className={styles.actions}>
                        <Popover content={instructions} title="Инструкция" trigger="click">
                            <Button type="primary" danger className="button">Посмотреть инструкцию</Button>
                        </Popover>
                        <div className={styles.actions_wrapper}>
                            <Input
                                placeholder="Ссылка с youtube"
                                value={inputId}
                                onChange={handleInputChange}
                                style={{marginBottom: '10px'}}
                            />
                            <Button type='primary' onClick={handleSearchClick}>Найти</Button>
                        </div>
                    </div>
                </div>

                {confirmedVideoId && (
                    <Player id={confirmedVideoId}/>
                )}
                {ids?.length && <Cards ids={ids} handler={handlerCards}/>}
            </div>
        </div>
    );
};

export default YouTubeEmbed;
