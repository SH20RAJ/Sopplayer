/**
 * TypeScript Type Definitions for Sopplayer v2.0
 * Licensed under the MIT License
 */

export type SopplayerTheme =
  | 'default'
  | 'flamingo'
  | 'forest'
  | 'city'
  | 'sea'
  | 'fantasy'
  | 'minimal'
  | (string & {});

export interface SopplayerOptions {
  theme?: SopplayerTheme;
  autoplay?: boolean;
  muted?: boolean;
  controls?: boolean;
  loop?: boolean;
  preload?: 'auto' | 'metadata' | 'none';
  volume?: number;
  playbackRates?: number[];
  aspectRatio?: '16:9' | '4:3' | '1:1' | '21:9' | 'fill' | string;
  keyboard?: boolean;
  shortcuts?: boolean;
  seekStep?: number;
  hideControlsDelay?: number;
  captionsDefault?: boolean;
}

export interface SopplayerEventMap {
  play: { currentTime: number };
  pause: { currentTime: number };
  timeupdate: { currentTime: number; duration: number; progress: number };
  volumechange: { volume: number; muted: boolean };
  ratechange: { playbackRate: number };
  fullscreenchange: { isFullscreen: boolean };
  enterpictureinpicture: { window?: PictureInPictureWindow };
  leavepictureinpicture: Record<string, never>;
  themechange: { theme: string };
  ended: { duration: number };
  error: { error: MediaError | Error };
}

export type EventCallback<T = any> = (payload: T) => void;

export class Sopplayer {
  static version: string;
  static defaults: SopplayerOptions;
  static initAll(selector?: string, options?: SopplayerOptions): Sopplayer[];

  video: HTMLVideoElement;
  container: HTMLDivElement;
  options: SopplayerOptions;

  constructor(target: string | HTMLVideoElement, options?: SopplayerOptions);

  on<K extends keyof SopplayerEventMap>(event: K, handler: EventCallback<SopplayerEventMap[K]>): () => void;
  on(event: string, handler: EventCallback): () => void;

  once<K extends keyof SopplayerEventMap>(event: K, handler: EventCallback<SopplayerEventMap[K]>): () => void;
  once(event: string, handler: EventCallback): () => void;

  off<K extends keyof SopplayerEventMap>(event: K, handler?: EventCallback<SopplayerEventMap[K]>): this;
  off(event: string, handler?: EventCallback): this;

  emit(event: string, ...args: any[]): boolean;

  play(): Promise<void>;
  pause(): void;
  togglePlay(): void;
  currentTime(time?: number): number;
  duration(): number;
  volume(vol?: number): number;
  muted(state?: boolean): boolean;
  playbackRate(rate?: number): number;
  setSpeed(rate: number): void;
  seek(timeInSeconds: number): void;
  forward(seconds?: number): void;
  rewind(seconds?: number): void;
  setVolume(volume: number): void;
  setMuted(muted: boolean): void;
  toggleMute(): void;
  toggleFullscreen(): Promise<boolean>;
  togglePip(): Promise<boolean>;
  toggleShortcuts(): void;
  toggleCaptions(): void;
  setTrack(index: number): void;
  setSource(src: string, type?: string): void;
  setPoster(url: string): void;
  setTheme(themeName: SopplayerTheme): void;
  destroy(): void;

  readonly paused: boolean;
  readonly ended: boolean;
  readonly textTracks: TextTrack[];
  readonly activeTrackIndex: number;
  readonly activeTrackLabel: string | null;
}

/** Legacy Video.js compatibility shim function */
export function videojs(id: string | HTMLVideoElement, options?: SopplayerOptions, ready?: () => void): any;

declare global {
  interface Window {
    Sopplayer: typeof Sopplayer;
    videojs: typeof videojs;
  }
}

export default Sopplayer;
