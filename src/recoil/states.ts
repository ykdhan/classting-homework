import { atom } from 'recoil';
import { QuizProps } from '../component/quiz';

export const timeRecordState = atom<number>({
    key: 'timeRecordState',
    default: new Date().getTime()
});

export const timerState = atom<number>({
    key: 'timerState',
    default: 0
});

export const stageState = atom<number>({
    key: 'stageState',
    default: 1
});

export const questionState = atom<QuizProps[]>({
    key: 'questionState',
    default: []
});

export const answerState = atom<string[]>({
    key: 'answerState',
    default: []
});