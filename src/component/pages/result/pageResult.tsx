import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useRecoilState } from 'recoil';

import { QuizProps } from '../../quiz';
import { Layout } from '../../ui';
import { questionState, answerState, timeRecordState } from '../../../recoil/states';

export const PageResult = function () {
    const [ _correct, _setCorrect ] = useState(0);
    const [ _time, _setTime ] = useState(0);

    const [ _timeRecord ] = useRecoilState<number>(timeRecordState);
    const [ _question ] = useRecoilState<QuizProps[]>(questionState);
    const [ _answer ] = useRecoilState<string[]>(answerState);

    useEffect(() => {
        _setTime(
            Math.round((new Date().getTime() - _timeRecord) / 1000)
        );
    }, [_timeRecord, _setTime]);
    
    useEffect(() => {
        let correct = 0;
        _answer.forEach((ans, i) => {
            _question[i].answer === ans && correct ++;
        });
        _setCorrect(correct);
        console.log(_answer.length, _correct);
    }, [_answer, _question, _correct, _setCorrect]);

    return (
        <Layout className="screen-result" center={true}>
            <h1 className="title">SCORE</h1>
            <div className="score">
                <p className="tag">
                    <span>정답</span>
                    <span>오답</span>
                </p>
                <span className="percent">
                    <span className="correct" style={{transform: `translateX(${-100 + 100 / _answer.length * _correct}%)`}}></span>
                </span>
                <p className="tag num">
                    <span>{_correct}</span>
                    <span>{_answer.length - _correct}</span>
                </p>
            </div>
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