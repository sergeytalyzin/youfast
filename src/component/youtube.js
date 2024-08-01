import React, {useState} from 'react';
import {Button, Input, Popover, Image} from 'antd';
import 'antd/dist/reset.css'; // или 'antd/dist/antd.css' в зависимости от версии

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
    const [videoId, setVideoId] = useState('');

    const handleInputChange = (e) => {
        setVideoId(e.target.value);
    };



    return (
        <div style={{ padding: '20px' }} className="body">
            <header className="header">
                <h1>Здесь может быть ваша реклама</h1>
            </header>
            <div className="actions">
                <Popover content={instructions} title="Инструкция" trigger="click">
                    <Button type="primary" danger className="button">Посмотреть инструкцию</Button>
                </Popover>
                <Input
                    placeholder="Введите ID видео YouTube в поле ввода"
                    value={videoId}
                    onChange={handleInputChange}
                    style={{ marginBottom: '10px' }}
                />
            </div>

            {videoId && (
                <iframe

                    src={`https://www.youtube.com/embed/${videoId}`}
                    title="YouTube video player"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                ></iframe>
            )}
        </div>
    );
};

export default YouTubeEmbed;
