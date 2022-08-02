import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';

import { timeRecordState } from '../recoil/states';

export const useCountTime = () => {
    const [ _timeRecord ] = useRecoilState(timeRecordState);
    const [ countTime, setCountTime ] = useState(new Date().getTime() - _timeRecord);

    useEffect(() => {
        setTimeout(() => {
            setCountTime(new Date().getTime() - _timeRecord);
        }, 1000);
    }, [_timeRecord, countTime]);

    return countTime ? Math.round(countTime / 1000) : 0;
};