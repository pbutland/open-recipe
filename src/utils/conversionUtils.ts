import { toSentenceCase } from "./utils";
import { Unit } from "../types/api";

interface FunctionObject {
    [key: string]: (...args: any[]) => any;
}

const unitConverter: FunctionObject = {
    // Metric to Imperial conversions
    mgToOz: (mg: number): number => mg * 0.000035274,
    gToOz: (g: number): number => g * 0.035274,
    kgToLb: (kg: number): number => kg * 2.20462,
    mlToFloz: (ml: number): number => ml * 0.0351951,
    lToPint: (l: number): number => l * 1.75975,

    // Imperial to Metric conversions
    ozToG: (oz: number): number => oz / 0.035274,
    lbToKg: (lb: number): number => lb / 2.20462,
    flozToMl: (flOz: number): number => flOz / 0.035195,
    pintToL: (pint: number): number => pint * 0.568261,
    qtToL: (quart: number): number => quart * 1.13652,
    gallonToL: (gallon: number): number => gallon * 4.54609,
};

const metricUnits: Unit[] = [Unit.mg, Unit.g, Unit.kg, Unit.ml, Unit.l];
const imperialUnits: Unit[] = [Unit.oz, Unit.lb, Unit.floz, Unit.pint, Unit.qt, Unit.gallon];
export enum MeasurementType {
    metric = "metric",
    imperial = "imperial",
    cup = "cup",
}

/**
 * Returns the appropriate `measurementType` equivalent unit type for the input `fromUnit` unit type
 * e.g. oz equivalent in metric is g
 *
 * @param measurementType 
 * @param fromUnit 
 * @returns Unit
 */
export const getToUnitType = (measurementType: MeasurementType, fromUnit: Unit): Unit => {
    if (measurementType === MeasurementType.cup) {
        if (metricUnits.includes(fromUnit) || imperialUnits.includes(fromUnit)) {
            return Unit.cup;
        }
        return fromUnit; // Return original unit if not convertible to cups
    }

    switch (fromUnit) {
        case 'oz':
            return measurementType === MeasurementType.metric ? Unit.g : fromUnit;
        case 'lb':
            return measurementType === MeasurementType.metric ? Unit.kg : fromUnit;
        case 'floz':
            return measurementType === MeasurementType.metric ? Unit.ml : fromUnit;
        case 'pint':
            return measurementType === MeasurementType.metric ? Unit.l : fromUnit;
        case 'qt':
            return measurementType === MeasurementType.metric ? Unit.l : fromUnit;
        case 'gallon':
            return measurementType === MeasurementType.metric ? Unit.l : fromUnit;
        case 'mg':
            return measurementType === MeasurementType.imperial ? Unit.oz : fromUnit;
        case 'g':
            return measurementType === MeasurementType.imperial ? Unit.oz : fromUnit;
        case 'kg':
            return measurementType === MeasurementType.imperial ? Unit.lb : fromUnit;
        case 'ml':
            return measurementType === MeasurementType.imperial ? Unit.floz : fromUnit;
        case 'l':
            return measurementType === MeasurementType.imperial ? Unit.pint : fromUnit;
        default:
            break;
    }

    return fromUnit;
};

export interface Measurement {
    value: number,
    unit?: Unit,
}

/**
 * converts a measurement from one unit to another based on the type of target measurement requested (e.g. metric, imperial, or cup)
 * 
 * @param type measurement system required for new value and unit
 * @param value converted value in new unit
 * @param fromUnit unit to convert from
 * @param cupEquivalent equivalent value of one cup in the fromUnit
 * @returns an object with the converted value and unit
 */
export const convertAndGetUnit = (
    type: MeasurementType,
    value: number,
    fromUnit?: Unit,
    cupEquivalent?: number,
): Measurement => {
    if (fromUnit === undefined) {
        return { value };
    }

    const toUnit = getToUnitType(type, fromUnit);
    if (!toUnit || fromUnit === toUnit) {
        // Return original value and unit if type is not recognized or is same as MeasurementType
        return { value, unit: fromUnit };
    }

    let newValue;
    if (type === MeasurementType.cup) {
        if (cupEquivalent && (metricUnits.includes(fromUnit) || imperialUnits.includes(fromUnit))) {
            const valueInCups = value / cupEquivalent;
            newValue = roundToNearestQuarter(valueInCups);
        } else {
            // Return original value if unit is not recognized or there is no cup conversion value
            return { value, unit: fromUnit };
        }
    } else {
        newValue = unitConverter[`${fromUnit}To${toSentenceCase(toUnit)}`](value);
    }

    return { value: roundToTwoDecimalPlaces(newValue), unit: toUnit };
};

function roundToTwoDecimalPlaces(input: number): number {
    return Math.round((input + Number.EPSILON) * 100) / 100
}

export function roundToNearestQuarter(input: number): number {
    return Math.round(input * 4) / 4;
}
