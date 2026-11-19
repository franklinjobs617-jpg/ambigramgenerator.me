export function isAmbigramWord(word: string) {
    return word.length > 0 && !/[^a-z]/i.test(word);
}
