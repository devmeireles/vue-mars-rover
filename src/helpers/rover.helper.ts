import { CARDINAL_POINTS, MOVE_COORDINATES } from "@/configs/consts.config";
import type { TRoverPosition } from "@/types/TRoverPosition";
import Plateau from "./plateau.helper";

/**
 * Represents a Rover.
 * @class
 */
class Rover {
	private landSize: number;
	private landingPosition: string;
	private instructions: string;
	public currentPosition: TRoverPosition | undefined;
	public finalPosition: TRoverPosition | undefined;
	public finalPositionForHuman: string;
	public exploredMap: number[][];

	/**
	 * Creates a new Rover instance.
	 * @constructor
	 * @param {number} landSize - The size of the plateau.
	 * @param {string} landingPosition - The initial landing position of the rover.
	 * @param {string} instructions - The instructions for the rover's movement.
	 */
	constructor(landSize: number, landingPosition: string, instructions: string,) {
		this.landSize = landSize;
		this.landingPosition = landingPosition;
		this.instructions = instructions;
		this.currentPosition = this.parseLanding(landingPosition);
		this.finalPosition = this.parseLanding(landingPosition);
		this.finalPositionForHuman = '';
		this.exploredMap = [];
	}


	/**
	 * Parses the landing position string to an object.
	 * @private
	 * @param {string} landingPosition - The landing position string.
	 * @returns {TRoverPosition | undefined} The parsed landing position.
	 */
	private parseLanding(landingPosition: string): TRoverPosition | undefined {
		const landingPositionArr = landingPosition.split(" ");

		if (landingPositionArr.length < 3) return;

		const response: TRoverPosition = {
			x: Number(landingPositionArr[0]),
			y: Number(landingPositionArr[1]),
			direction: landingPositionArr[2],
		}

		return response;
	}

	/**
	 * Converts a rover position object to a human-readable string.
	 * @private
	 * @param {TRoverPosition} position - The rover's position object.
	 * @returns {string} The position string in the format 'x y direction'.
	 */
	private parsePositionToString(position: TRoverPosition): string {
		return `${position.x} ${position.y} ${position.direction}`;
	}

	/**
	 * Moves the rover based on the current position.
	 * @private
	 * @param {TRoverPosition} currentPosition - The current position of the rover.
	 * @returns {TRoverPosition} The new position after moving.
	 */
	private move(currentPosition: TRoverPosition): TRoverPosition {
		const [xMove, yMove] = MOVE_COORDINATES[currentPosition.direction];
		const newPosX = currentPosition.x + xMove;
		const newPosY = currentPosition.y + yMove;
		return { ...currentPosition, x: newPosX, y: newPosY };
	};

	/**
	 * Turns the rover based on the current position and direction.
	 * @private
	 * @param {TRoverPosition} currentPosition - The current position of the rover.
	 * @param {string} direction - The direction to turn ('L' for left, 'R' for right).
	 * @returns {TRoverPosition} The new position after turning.
	 */
	private turn(currentPosition: TRoverPosition, direction: string): TRoverPosition {
		const currentIndex = CARDINAL_POINTS.indexOf(currentPosition.direction);

		if (direction === "L") {
			const newDirection = CARDINAL_POINTS[(currentIndex - 1 + 4) % 4];
			return { ...currentPosition, direction: newDirection };
		} else if (direction === "R") {
			const newDirection = CARDINAL_POINTS[(currentIndex + 1) % 4];
			return { ...currentPosition, direction: newDirection };
		}
		return currentPosition;
	};

	/**
		 * Deploys the rover on the plateau and executes the instructions.
		 * @private
		 * @param {number[][]} plateau - The plateau grid.
		 * @param {TRoverPosition} landedPosition - The initial landing position.
		 * @param {string} instructions - The rover's movement instructions.
		 */
	private deployRover(plateau: number[][], landedPosition: TRoverPosition, instructions: string) {
		let currentPosition = landedPosition;

		const markPosition = (x: number, y: number, step: number) => {
			if (x >= 0 && y >= 0) {
				plateau[x][y] = step;
			}
		};

		markPosition(currentPosition.x, currentPosition.y, 1);

		Array.from(instructions).forEach((instruction) => {
			if (instruction === "M") {
				const newPosition = this.move(currentPosition);
				markPosition(newPosition.x, newPosition.y, 1);
				currentPosition = newPosition;
				this.currentPosition = currentPosition;
			} else if (instruction === "L" || instruction === "R") {
				currentPosition = this.turn(currentPosition, instruction);
				this.currentPosition = currentPosition;
			}
		});

		this.finalPosition = currentPosition;
		this.exploredMap = plateau;
		this.finalPositionForHuman = this.parsePositionToString(this.finalPosition);
	}

	/**
	 * Starts the rover's exploration on the plateau.
	 */
	public start() {
		const plateau = new Plateau(this.landSize);
		plateau.calculatePlateau();

		const landedPosition = this.parseLanding(this.landingPosition);

		if (!landedPosition) {
			throw new Error("Unable to land, please review the landing coordinates");
		}

		this.deployRover(plateau.field, landedPosition, this.instructions)
	};
}

export default Rover;