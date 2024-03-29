import { useCallback, useState } from "react";
import historyUtils from "../../libs/history.utils";

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

  const handleClos = useCallback(() => {
    // historyUtils.push("/feedback");
  }, []);
  return {
    language,
    toggleLanguageEnglish,
    toggleLanguageHindi,
    setLanguage,
    overAllExperience,
    handleClos,
  };
};

export default useFeedBackHook;
