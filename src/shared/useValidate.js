import {useState} from 'react';
import {message} from "antd";

export const useValidate = () => {
    const [isValid, setIsValid] = useState(true);

    const checkVideoId = async (id) => {
        try {
            const response = await fetch(`https://www.youtube.com/oembed?url=http://www.youtube.com/watch?v=${id}&format=json`);
            if (response.ok) {
                setIsValid(true);
                return true
            } else {
                setIsValid(false);
                message.error('Неверный ID видео. Пожалуйста, введите правильный ID.');
                return false
            }
        } catch (error) {
            console.error('Ошибка проверки ID видео:', error);
            setIsValid(false);
            message.error('Произошла ошибка при проверке ID. Пожалуйста, попробуйте снова.');
            return false
        }
    };
   return {isValid, checkVideoId, setIsValid}
};
