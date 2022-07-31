import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import axios from 'axios';

import { Button, Layout } from '../ui';
import { Quiz } from '../quiz';
import { Timer } from '../timer';
import { QuizProps } from '../quiz';
import { ScreenQuizProps, DataType } from './types';
import { questionState, answerState, stageState, timerState } from '../../recoil/states';

export const ScreenQuiz = function (props: ScreenQuizProps) {
    const { max = 10 } = props;
    const [ _loading, _setLoading ] = useState(true);
    const [ _stage, _setStage ] = useRecoilState<number>(stageState);
    const [ _timer, _setTimer ] = useRecoilState<number>(timerState);
    const [ _question, _setQuestion ] = useRecoilState<QuizProps[]>(questionState);
    const [ _answer, _setAnswer ] = useRecoilState<string[]>(answerState);

    useEffect(() => {
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
                            list.push({ question, answer, options });
                        });
                        _setQuestion(list);
                    }
                })
                .finally(() => _setLoading(false));
        } else {
            _setStage(1);
            _setTimer(0);
            _setLoading(false);
        }
    }, [max, _question, _setQuestion, _setLoading, _setStage, _setTimer]);

    const decodeHTML = (html: string) => {
        var textarea = document.createElement('textarea');
        textarea.innerHTML = html;
        return textarea.value;
    }

    const handleButton = () => {
        _stage !== max && _setStage(_stage + 1);
    }

    return (
        <Layout className='screen-quiz' loading={_loading}>
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
                    { _stage === max
                        ? <NavLink to="/result" state={{time: _timer}} className="btn block filled">결과 보기</NavLink>
                        : <Button block filled onClick={handleButton} disabled={_answer.length < _stage}>다음 문항</Button> 
                    }
                </>)
            }
        </Layout>
    );
}