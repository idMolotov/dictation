console.log('classLessonsList', classLessonsList);
const sourceWords = classLessonsList['class_4']['lesson_10'];
// const sourceWords = classLessonsList['class_4']['lesson_9'];

// const fromLang = 'en'; const toLang = 'ru';
const fromLang = 'ru'; const toLang = 'en';

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
