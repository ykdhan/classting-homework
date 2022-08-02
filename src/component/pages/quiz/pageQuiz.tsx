import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import axios from 'axios';

import { Button, Layout } from '../../ui';
import { Quiz } from '../../quiz';
import { Timer } from '../../timer';
import { QuizProps } from '../../quiz';
import { PageQuizProps, DataType } from './types';
import { questionState, answerState, stageState, timeRecordState } from '../../../recoil/states';

const decodeHTML = (html: string) => {
    var textarea = document.createElement('textarea');
    textarea.innerHTML = html;
    return textarea.value;
}

export const PageQuiz = function (props: PageQuizProps) {
    const { max = 10 } = props;
    const [ _layer, _setLayer ] = useState({ type: 'loading', on: true, correct: false });
    const [ _time, _setTime ] = useRecoilState<number>(timeRecordState);
    const [ _stage, _setStage ] = useRecoilState<number>(stageState);
    const [ _question, _setQuestion ] = useRecoilState<QuizProps[]>(questionState);
    const [ _answer, _setAnswer ] = useRecoilState<string[]>(answerState);

    useEffect(() => {
        // first load
        if (!_question.length) {
            axios
                .get(`https://opentdb.com/api.php?amount=${max}&type=multiple`)
                .then(res => {
                    if (res.data) {
                        const list: QuizProps[] = [];
                        res.data.results.forEach((data: DataType) => {
                            let { question = '', correct_answer = '', incorrect_answers = []} = data;
                            question = decodeHTML(question)
                            const answer = decodeHTML(correct_answer)
                            const options: string[] = [];
                            incorrect_answers.push(correct_answer);
                            incorrect_answers.forEach(ans => {
                                options.push(decodeHTML(ans));
                            });
                            options.sort(() => Math.random() - 0.5);
                            list.push({ question, answer, options });
                        });
                        _setTime(new Date().getTime());
                        _setQuestion(list);
                        _setLayer({ type: 'loading', on: false, correct: false });
                    }
                })
                .catch(() => {
                    console.log('API ERROR');
                })
        }
    }, [max, _question, _setQuestion, _setLayer, _setTime]);

    useEffect(() => {
        // quiz again
        if (_question.length) {
            _setStage(1);
            _setAnswer([]);
            _setTime(new Date().getTime());
            _setLayer({ type: 'loading', on: false, correct: false });
        }
    }, [_question, _setStage, _setTime, _setLayer, _setAnswer]);

    const handleButton = () => {
        const correct = (_question[_stage - 1].answer === _answer[_stage - 1 ]);
        _setLayer({ type: 'result', on: true, correct: correct });
        setTimeout(() => {
            _setLayer({ type: 'result', on: false, correct: correct });
            _setStage(_stage + 1);
        }, 700);
    }

    return (
        <Layout className='screen-quiz' layer={_layer}>
            <h1 className="title">
                {_stage}. 
                <Timer />
            </h1>
            {
                (_question.length !== 0) &&
                (<>
                    <div className="progressbar">
                        <div className="progress" style={{transform: `translateX(${-100 + 100 / max * _stage}%)`}}></div>
                    </div>
                    <Quiz 
                        question={_question[_stage - 1].question}
                        answer={_question[_stage - 1].answer}
                        options={_question[_stage - 1].options}
                    />
                    { _answer.length >= _stage && (_stage === max
                        ? <NavLink to="/result" className="btn block filled">결과 보기</NavLink>
                        : <Button block filled onClick={handleButton}>다음 문항</Button>)
                    }
                </>)
            }
        </Layout>
    );
}