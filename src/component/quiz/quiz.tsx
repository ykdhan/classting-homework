import { useRecoilState } from 'recoil';

import { QuizProps } from './types';
import { answerState, stageState } from '../../recoil/states';

export const Quiz = function (props: QuizProps) {
    const { question, options = [] } = props;
    const [ _stage, _setStage ] = useRecoilState<number>(stageState);
    const [ _answer, _setAnswer ] = useRecoilState<string[]>(answerState);

    const handleChange = (value: string) => {
        const answer = _answer.slice();
        if (answer.length < _stage) {
            answer.push(value);
        } else {
            answer[_stage - 1] = value;
        }
        _setAnswer(answer);
    }

    return (
        <div className='quiz'>
            <p className='question'>{question}</p>
            <ul className='options'>
                {
                    options.map((option: string, i: number) => {
                        return (
                            <li key={i}>
                                <input 
                                    id={`opt-${i}`} 
                                    name="answer-option" 
                                    type="radio" 
                                    value={option} 
                                    checked={option === _answer[_stage -1 ]} 
                                    onChange={(e) => handleChange(e.target.value)} 
                                />
                                <label htmlFor={`opt-${i}`}>{option}</label>
                            </li>
                        );
                    })
                }
            </ul>
        </div>
    );
}