import { useEffect, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { useRecoilState } from 'recoil';

import { QuizProps } from '../quiz';
import { Layout } from '../ui';
import { questionState, answerState, stageState, timerState } from '../../recoil/states';

export const ScreenResult = function () {
    const location = useLocation();
    const [ _correct, _setCorrect ] = useState(0);
    const [ _time, _setTime ] = useState(0);
    const [ _stage, _setStage ] = useRecoilState<number>(stageState);
    const [ _timer, _setTimer ] = useRecoilState<number>(timerState);
    const [ _question, _setQuestion ] = useRecoilState<QuizProps[]>(questionState);
    const [ _answer, _setAnswer ] = useRecoilState<string[]>(answerState);
    
    useEffect(() => {
        let correct = 0;
        _answer.forEach((ans, i) => {
            _question[i].answer === ans && correct ++;
        });
        _setCorrect(correct);
        _setTime(_timer);
    }, [_timer, _answer, _question, _correct, _setCorrect, _setTime]);

    return (
        <Layout className="screen-result" center={true}>
            <h1 className="title">SCORE</h1>
            <p className="score">
                <span className="correct">{_correct}</span>{ `/ ${_answer.length}` }
            </p>
            <p className="timer">
                <span>{ `${Math.floor(_time / 60)} : ${_time % 60 < 10 ? '0' + _time % 60 : _time % 60}` }</span>
            </p>
            <p className='buttons'>
                <NavLink to='/quiz' className="btn filled">다시 풀기</NavLink>
                <NavLink to='/' className="btn">홈으로</NavLink>
            </p>
        </Layout>
    );
}