import { PointStyle } from '../index.esm';
import { Color } from '../color';
import { ChartArea } from '../geometric';
import { CanvasFontSpec } from './helpers.options';

export function clearCanvas(canvas: HTMLCanvasElement, ctx?: CanvasRenderingContext2D): void;

export function clipArea(ctx: CanvasRenderingContext2D, area: ChartArea): void;

export function unclipArea(ctx: CanvasRenderingContext2D): void;

export interface DrawPointOptions {
	pointStyle: PointStyle;
	rotation?: number;
	radius: number;
	borderWidth: number;
}

export function drawPoint(ctx: CanvasRenderingContext2D, options: DrawPointOptions, x: number, y: number): void;

/**
 * Converts the given font object into a CSS font string.
 * @param font a font object
 * @return The CSS font string. See https://developer.mozilla.org/en-US/docs/Web/CSS/font
 */
export function toFontString(font: { size: number; family: string; style?: string; weight?: string }): string | null;

export interface RenderTextOpts {
	/**
	 * The fill color of the text. If unset, the existing
	 * fillStyle property of the canvas is unchanged.
	 */
	color?: Color;

	/**
	 * The width of the strikethrough / underline
	 * @default 2
	 */
	decorationWidth?: number;

	/**
	 * The max width of the text in pixels
	 */
	maxWidth?: number;

	/**
	 * A rotation to be applied to the canvas
	 * This is applied after the translation is applied
	 */
	rotation?: number;

	/**
	 * Apply a strikethrough effect to the text
	 */
	strikethrough?: boolean;

	/**
	 * The color of the text stroke. If unset, the existing
	 * strokeStyle property of the context is unchanged
	 */
	strokeColor?: Color;

	/**
	 * The text stroke width. If unset, the existing
	 * lineWidth property of the context is unchanged
	 */
	strokeWidth?: number;

	/**
	 * The text alignment to use. If unset, the existing
	 * textAlign property of the context is unchanged
	 */
	textAlign: CanvasTextAlign;

	/**
	 * The text baseline to use. If unset, the existing
	 * textBaseline property of the context is unchanged
	 */
	textBaseline: CanvasTextBaseline;

	/**
	 * If specified, a translation to apply to the context
	 */
	translation?: [number, number];

	/**
	 * Underline the text
	 */
	underline?: boolean;
}

export function renderText(
	ctx: CanvasRenderingContext2D,
	text: string | string[],
	x: number,
	y: number,
	font: CanvasFontSpec,
	opts?: RenderTextOpts
): void;
