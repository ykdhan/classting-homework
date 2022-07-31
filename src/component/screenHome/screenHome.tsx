import { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { answerState, questionState, stageState, timerState } from '../../recoil/states';
import { QuizProps } from '../quiz';

import { Layout } from '../ui';

export const ScreenHome = function () {
    const [ _stage, _setStage ] = useRecoilState<number>(stageState);
    const [ _timer, _setTimer ] = useRecoilState(timerState);
    const [ _question, _setQuestion ] = useRecoilState<QuizProps[]>(questionState);
    const [ _answer, _setAnswer ] = useRecoilState<string[]>(answerState);

    useEffect(() => {
        _setStage(1);
        _setTimer(0);
        _setQuestion([]);
        _setAnswer([]);
    }, [_setStage, _setTimer, _setQuestion, _setAnswer]);

    return (
        <Layout className='screen-home' center={true}>
            <h1 className='title'>RANDOM QUIZ</h1>
            <p>다양한 토픽의 퀴즈를 영어로 랜덤하게 풀어보세요.</p>
            <NavLink to='/quiz' className="btn filled">퀴즈 풀기</NavLink>
        </Layout>
    );
}