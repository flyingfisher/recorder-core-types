declare module 'recorder-core' {
  type SampleRate = 48000 | 44100 | 32000 | 24000 | 22050 | 16000 | 12000 | 11025 | 8000;
  interface IChunkInfo {
    index: number;
    offset: number;
    frameNext?: number[];
    sampleRate: SampleRate;
    data: number[];
  }
  interface IOption {
    type: 'mp3' | 'wav';
    sampleRate: SampleRate;
    bitRate: 16 | 8;
    /**realtime callback, invoking rate is about 12 times per second */
    onProcess?: (
      buffers: number[][],
      powerLevel: number,
      bufferDuration: number,
      bufferSampleRate: SampleRate,
      newBufferIdx: number,
      /**call this function in acync method */
      asyncEnd: () => void,
    ) => boolean;
  }
  export default class Recorder {
    buffers: number[][];
    /**no value until started or mocked */
    srcSampleRate?: number;
    /**Recorder
     * @param option to set record type sample rate and bit rate.
     */
    constructor(option: IOption);
    /**acquire mic right */
    open(success: () => void, fail: (msg: string, isUserNotAllow: boolean) => void): void;
    /**start record */
    start(): void;
    /**end record */
    stop(
      success: (blob: unknown, duration: number) => void,
      fail: (msg: string) => void,
      autoClose?: boolean,
    ): void;
    /**release recorder */
    close(success?: () => void): void;
    /**if device support recorder */
    pause(): void;
    resume(): void;
    mock(pcmAbsSum: number[], pcmLength: number): void;

    static Support(): boolean;
    static IsOpen(): boolean;
    static Destroy(): void;
    /**statistics url by 51la, set to null for no statistics */
    static TrafficImgUrl: string;
    static BufferSize: 256 | 512 | 1024 | 2048 | 4096 | 8192 | 16384;
    static SampleData(
      pcmDatas: number[][],
      pcmSampleRate: SampleRate,
      newSampleRate: SampleRate,
      prevChunkInfo?: IChunkInfo,
      option?: { frameSize: number; frameType: string },
    ): IChunkInfo;
    static PowerLevel(pcmAbsSum: number, pcmLength: number): number;
  }
}
