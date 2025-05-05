import { convertAndGetUnit, getToUnitType, roundToNearestQuarter, MeasurementType } from '../conversionUtils'
import { Unit } from "../../types/api";

describe('convertMeasurement', () => {
    const metricUnits: Unit[] = [Unit.mg, Unit.g, Unit.kg, Unit.ml, Unit.l];
    const imperialUnits: Unit[] = [Unit.oz, Unit.lb, Unit.floz, Unit.pint, Unit.qt, Unit.gallon];

    it.each`
        type                        | value | fromUnit       | cupEquivalent | expectedValue  | expectedUnit
        ${MeasurementType.metric}   | ${1}  | ${Unit.oz}     | ${undefined}  | ${28.3495}     | ${Unit.g}
        ${MeasurementType.metric}   | ${1}  | ${Unit.lb}     | ${undefined}  | ${0.453592}    | ${Unit.kg}
        ${MeasurementType.metric}   | ${1}  | ${Unit.floz}   | ${undefined}  | ${28.4131}     | ${Unit.ml}
        ${MeasurementType.metric}   | ${1}  | ${Unit.pint}   | ${undefined}  | ${0.568261}    | ${Unit.l}
        ${MeasurementType.metric}   | ${1}  | ${Unit.qt}     | ${undefined}  | ${1.13652}     | ${Unit.l}
        ${MeasurementType.metric}   | ${1}  | ${Unit.gallon} | ${undefined}  | ${4.54609}     | ${Unit.l}
        ${MeasurementType.metric}   | ${1}  | ${Unit.mg}     | ${undefined}  | ${1}           | ${Unit.mg}
        ${MeasurementType.metric}   | ${1}  | ${Unit.g}      | ${undefined}  | ${1}           | ${Unit.g}
        ${MeasurementType.metric}   | ${1}  | ${Unit.kg}     | ${undefined}  | ${1}           | ${Unit.kg}
        ${MeasurementType.metric}   | ${1}  | ${Unit.ml}     | ${undefined}  | ${1}           | ${Unit.ml}
        ${MeasurementType.metric}   | ${1}  | ${Unit.l}      | ${undefined}  | ${1}           | ${Unit.l}
        ${MeasurementType.metric}   | ${1}  | ${Unit.cup}    | ${undefined}  | ${1}           | ${Unit.cup}
        ${MeasurementType.metric}   | ${1}  | ${Unit.tsp}    | ${undefined}  | ${1}           | ${Unit.tsp}
        ${MeasurementType.imperial} | ${1}  | ${Unit.mg}     | ${undefined}  | ${0.000035274} | ${Unit.oz}
        ${MeasurementType.imperial} | ${1}  | ${Unit.g}      | ${undefined}  | ${0.035274}    | ${Unit.oz}
        ${MeasurementType.imperial} | ${1}  | ${Unit.kg}     | ${undefined}  | ${2.20462}     | ${Unit.lb}
        ${MeasurementType.imperial} | ${1}  | ${Unit.ml}     | ${undefined}  | ${0.0351951}   | ${Unit.floz}
        ${MeasurementType.imperial} | ${1}  | ${Unit.l}      | ${undefined}  | ${1.75975}     | ${Unit.pint}
        ${MeasurementType.imperial} | ${1}  | ${Unit.oz}     | ${undefined}  | ${1}           | ${Unit.oz}
        ${MeasurementType.imperial} | ${1}  | ${Unit.lb}     | ${undefined}  | ${1}           | ${Unit.lb}
        ${MeasurementType.imperial} | ${1}  | ${Unit.floz}   | ${undefined}  | ${1}           | ${Unit.floz}
        ${MeasurementType.imperial} | ${1}  | ${Unit.pint}   | ${undefined}  | ${1}           | ${Unit.pint}
        ${MeasurementType.imperial} | ${1}  | ${Unit.qt}     | ${undefined}  | ${1}           | ${Unit.qt}
        ${MeasurementType.imperial} | ${1}  | ${Unit.gallon} | ${undefined}  | ${1}           | ${Unit.gallon}
        ${MeasurementType.imperial} | ${1}  | ${Unit.cup}    | ${undefined}  | ${1}           | ${Unit.cup}
        ${MeasurementType.imperial} | ${1}  | ${Unit.tsp}    | ${undefined}  | ${1}           | ${Unit.tsp}
        ${MeasurementType.imperial} | ${1}  | ${undefined}   | ${undefined}  | ${1}           | ${undefined}
        ${MeasurementType.cup}      | ${1}  | ${undefined}   | ${undefined}  | ${1}           | ${undefined}
        ${MeasurementType.cup}      | ${1}  | ${Unit.mg}     | ${undefined}  | ${1}           | ${Unit.mg}
        ${MeasurementType.cup}      | ${1}  | ${Unit.oz}     | ${undefined}  | ${1}           | ${Unit.oz}
        ${MeasurementType.cup}      | ${1}  | ${Unit.tsp}    | ${undefined}  | ${1}           | ${Unit.tsp}
        ${MeasurementType.cup}      | ${1}  | ${Unit.oz}     | ${0.5}        | ${2}           | ${Unit.cup}
        ${MeasurementType.cup}      | ${1}  | ${Unit.lb}     | ${0.5}        | ${2}           | ${Unit.cup}
        ${MeasurementType.cup}      | ${1}  | ${Unit.floz}   | ${0.5}        | ${2}           | ${Unit.cup}
        ${MeasurementType.cup}      | ${1}  | ${Unit.pint}   | ${0.5}        | ${2}           | ${Unit.cup}
        ${MeasurementType.cup}      | ${1}  | ${Unit.qt}     | ${0.5}        | ${2}           | ${Unit.cup}
        ${MeasurementType.cup}      | ${1}  | ${Unit.gallon} | ${0.5}        | ${2}           | ${Unit.cup}
        ${MeasurementType.cup}      | ${1}  | ${Unit.mg}     | ${0.5}        | ${2}           | ${Unit.cup}
        ${MeasurementType.cup}      | ${1}  | ${Unit.g}      | ${0.5}        | ${2}           | ${Unit.cup}
        ${MeasurementType.cup}      | ${1}  | ${Unit.kg}     | ${0.5}        | ${2}           | ${Unit.cup}
        ${MeasurementType.cup}      | ${1}  | ${Unit.ml}     | ${0.5}        | ${2}           | ${Unit.cup}
        ${MeasurementType.cup}      | ${1}  | ${Unit.l}      | ${0.5}        | ${2}           | ${Unit.cup}
    `('should convert measurement for type $type and unit $fromUnit to expected result $expectedValue $expectedUnit', ({ type, value, fromUnit, cupEquivalent, expectedValue, expectedUnit }) => {
        const result = convertAndGetUnit(type, value, fromUnit, cupEquivalent);
        expect(result.value).toBeCloseTo(expectedValue, 2); // Allowing a tolerance for floating-point comparisons
        if (expectedUnit !== undefined) {
            expect(result.unit).toEqual(expectedUnit);
        }
    });
});

describe('roundToNearestQuarter', () => {
    [{
        input: 0.23,
        expected: 0.25
    }, {
        input: 0.78,
        expected: 0.75
    }, {
        input: 0.4,
        expected: 0.5
    }, {
        input: 3.24,
        expected: 3.25
    }].forEach(test => {
        it(`should round ${test.input} to the nearest quarter (${test.expected}`, () => {
            expect(roundToNearestQuarter(test.input)).toBeCloseTo(test.expected);
        });
    });
});
