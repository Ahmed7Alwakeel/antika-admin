import i18next from "i18next";
import {initReactI18next} from "react-i18next";
import ar from "../assets/locale/ar/translation.json"; 
import en from "../assets/locale/en/translation.json"; 
 


const resources = {
    en: {
        translation: en
    },
    ar: {
        translation: ar
    }
}

i18next.use(initReactI18next).init({
    resources,
    lng: "en",
    
})

export default i18next;