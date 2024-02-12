import { useCallback, useState } from "react";

const useFeedBackHook = () => {
  const [language, setLanguage] = useState("english");

  const toggleLanguageEnglish = useCallback(
    (lng) => {
      setLanguage(lng);
    },
    [language, setLanguage]
  );

  const toggleLanguageHindi = useCallback(
    (lng) => {
      setLanguage(lng);
    },
    [setLanguage, language]
  );

  const overAllExperience = useCallback(
    (lng) => {
      setLanguage(lng);
    },
    [setLanguage, language]
  );

  return {
    language,
    toggleLanguageEnglish,
    toggleLanguageHindi,
    setLanguage,
    overAllExperience
  };
};

export default useFeedBackHook;
