// import { it } from 'date-fns/locale';
import {formatDate} from './date';

describe('formatDate', () => {
    it('check format', () => {
        expect(formatDate(1632724038807, 'yyyy')).toBe('2021');
    });
});