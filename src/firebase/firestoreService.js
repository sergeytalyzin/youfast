import { doc, setDoc, getDoc } from 'firebase/firestore';
import { db } from './firebase'; // Импортируйте Firestore из вашего файла конфигурации

// Функция для сохранения массива ID
export const saveIds = async (idArray) => {
    try {
        await setDoc(doc(db, "myCollection", "myDocument"), {
            ids: idArray
        });
        console.log("ID успешно сохранены!");
    } catch (e) {
        console.error("Ошибка при сохранении ID: ", e);
    }
};

// Функция для получения массива ID
export const getIds = async () => {
    try {
        const docRef = doc(db, "myCollection", "myDocument");
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            console.log("Полученные ID:", docSnap.data().ids);
            return docSnap.data().ids;
        } else {
            console.log("Документ не существует!");
            return [];
        }
    } catch (e) {
        console.error("Ошибка при получении ID: ", e);
        return [];
    }
};
