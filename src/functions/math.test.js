// Functions
import Addition from "../functions/addition";
import Subtract from "../functions/subtract";
import Multiply from "../functions/multiply";
import Divide from "../functions/divide";

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