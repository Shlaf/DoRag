// Functions
import Addition from "../functions/addition";
import Subtract from "../functions/subtract";
import Multiply from "../functions/multiply";
import Divide from "../functions/divide";
import Cosh from "../functions/cosh";
import Sinh from "../functions/sinh";

describe('Control math functions', () => {

    it('Addition', () => {
        expect(Addition(2,2)).toBe(4);
    });
    
    it('Subtract', () => {
        expect(Subtract(2,2)).toBe(0);
    });
    
    it('Multiply', () => {
        expect(Multiply(2,2)).toBe(4);
    });
    
    it('Divide', () => {
        expect(Divide(2,2)).toBe(1);
    });
    it('Cosh', () => {
        expect(Cosh(0.0002)).toBe(1.00000002);
    });
    it('Sinh', () => {
        expect(Number(Sinh(12).toFixed(3))).toBe(81377.396);
    });
})
