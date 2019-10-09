import { Configuration }    from '../../configuration';

/**
 * Used to time and execute periodic operations.
 * @property lastLoopTime - The last time the operation was executed.
 * @property keepLooping - If true, periodic execution will continue.
 * @property runningThreads - Used to keep track of how many loops are executing.
 */
export class LoopedTask {
    public lastLoopTime: Date;

    private keepLooping: boolean;

    private runningThreads: Array<number>;

    /**
     * @constructor
     * @param operation - A function pointer executed periodically.
     * @param loopInterval - The delay between loops in milliseconds.
     */
    constructor(
        private operation: Function,
        private loopInterval: number = Configuration.global.defaultLoopIntervalInMilliseconds) {

        this.keepLooping = false;
        this.runningThreads = new Array<number>();
        this.lastLoopTime = new Date();
    }

    /**
     * Starts the polling service
     */
    public StartLooping(): void {
        this.keepLooping = true;
        if (this.runningThreads.push(1) === 1) {
            this.operation();
        }
        else {
            if (this.runningThreads.pop() === undefined) {
                this.StartLooping();
            }
        }
    }

    /**
     * Stops the polling service
     */
    public StopLooping(): void {
        this.keepLooping = false;
    }

    /**
     * Polls data again after a delay
     * @param pollWaitTime - the time to wait before polling again
     */
    public LoopAgain(loopInterval: number = this.loopInterval): void {
        this.lastLoopTime = new Date;
        if (this.keepLooping) {
            setTimeout(() => {
                this.operation();
            }, loopInterval);
        }
        else {
            while (this.runningThreads.pop() !== undefined) { console.log('task loop'); }
        }
    }
}