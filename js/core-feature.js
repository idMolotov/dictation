console.log('classLessonsList', classLessonsList);

const getSourceWordsFromURL = () => {
  try {
    // Get the URL from the current window (browser)
    const url = window.location.href;

    // Use URL API to parse the URL
    const urlObj = new URL(url);

    // Extract the 'lesson' parameter from the query string
    const classParam = urlObj.searchParams.get("class") || 'class_6';
    const lessonParam = urlObj.searchParams.get("lesson") || 'lesson_1';
    const fromLangParam = urlObj.searchParams.get("fromLang") || 'ru';
    const toLangParam = urlObj.searchParams.get("toLang") || 'en';

    // Check if the 'lesson' parameter exists
    if (lessonParam === null || classParam === null) {
      console.warn("Warning: 'lesson' or 'class' parameter not found in the URL.");
      return undefined;
      // return []; // Or return null, or throw an error, depending on your needs
    }
    return [classParam, lessonParam, fromLangParam, toLangParam];
      

    // Assuming the 'lesson' parameter contains a comma-separated list of words
    // const sourceWords = lessonParam.split(",");

    // Optional: Trim whitespace from each word and remove empty strings
    // const trimmedSourceWords = sourceWords.map(word => word.trim()).filter(word => word !== "");

    // return trimmedSourceWords;

  } catch (error) {
    console.error("Error processing the URL:", error);
    return []; // Or return null, or throw an error, depending on your needs
  }
};

// Example Usage (assuming you're running this in a browser environment):
const [classWord, lessonWord, fromLang, toLang] = getSourceWordsFromURL();

console.log("Extracted Source Words:", classWord, lessonWord, fromLang, toLang);

const sourceWords = classLessonsList[`${classWord}_${lessonWord}`] ?? classLessonsList[classWord]?.[lessonWord];
// const sourceWords = classLessonsList[classWord][lessonWord] || classLessonsList[`${classWord}_${lessonWord}`];
// const sourceWords = classLessonsList['class_4']['lesson_9'];

// const fromLang = 'en'; const toLang = 'ru';
// const fromLang = 'ru'; const toLang = 'en';

function getRandomWordData() {
    return sourceWords[Math.round(Math.random() * (sourceWords.length - 1))];
}

function clearForm() {
    ['ru', 'en'].forEach((sourceLang) => {
        const fromId = 'translation_' + sourceLang;
        document.getElementById(fromId).innerText = '';
    })
}

function getRandomListElement(sourceList) {
    return sourceList[Math.round(Math.random() * (sourceList.length - 1))];
}

function initForm() {
    const fromId = 'translation_' + fromLang;
    const toId = 'translation_' + toLang;
    console.log('fromId', fromId);

    const wordData = getRandomWordData();
    // document.getElementById(fromId).innerText = wordData[sourceLang];
    document.getElementById(fromId).innerHTML = wordData[fromLang].join(',');
    document.getElementById(toId).innerHTML = '?';

    document.getElementById('block_action').value = 'show translation';
    document.getElementById('block_action').onclick = () => {
        document.getElementById('block_action').value = 'next word';
        document.getElementById(toId).innerHTML = getRandomListElement(wordData[toLang]);
        document.getElementById(toId).innerHTML = wordData[toLang].join(',');
        if (toLang === 'en') speak(wordData[toLang][0]);
        document.getElementById('block_action').onclick = () => {
            initForm();
        };
    };
    if (fromLang === 'en') speak(document.getElementById(fromId).innerHTML);
}

initForm();
