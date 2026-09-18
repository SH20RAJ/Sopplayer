/**
 * TypeScript Type Definitions for Sopplayer v2.0
 */

export interface SopplayerOptions {
  theme?: 'default' | 'flamingo' | 'forest' | 'city' | 'sea' | 'fantasy' | 'minimal' | string;
  autoplay?: boolean;
  muted?: boolean;
  controls?: boolean;
  loop?: boolean;
  preload?: 'auto' | 'metadata' | 'none';
  volume?: number;
  playbackRate?: number;
  aspectRatio?: '16:9' | '4:3' | '1:1' | '21:9' | 'fill' | string;
  shortcuts?: boolean;
  hideControlsDelay?: number;
}

export type EventCallback = (...args: any[]) => void;

export class Sopplayer {
  static version: string;
  static defaults: SopplayerOptions;
  static initAll(selector?: string, options?: SopplayerOptions): Sopplayer[];

  video: HTMLVideoElement;
  container: HTMLDivElement;
  options: SopplayerOptions;

  constructor(target: string | HTMLVideoElement, options?: SopplayerOptions);

  on(event: string, handler: EventCallback): () => void;
  off(event: string, handler?: EventCallback): this;
  once(event: string, handler: EventCallback): () => void;
  emit(event: string, ...args: any[]): boolean;

  play(): Promise<void>;
  pause(): void;
  togglePlay(): void;
  seek(timeInSeconds: number): void;
  forward(seconds?: number): void;
  rewind(seconds?: number): void;
  setVolume(volume: number): void;
  setMuted(muted: boolean): void;
  toggleMute(): void;
  setSpeed(rate: number): void;
  toggleFullscreen(): Promise<boolean>;
  togglePip(): Promise<boolean>;
  toggleShortcuts(): void;
  toggleCaptions(): void;
  setTrack(index: number): void;
  setSource(src: string, type?: string): void;
  setPoster(url: string): void;
  setTheme(themeName: string): void;
  destroy(): void;

  readonly currentTime: number;
  readonly duration: number;
  readonly volume: number;
  readonly muted: boolean;
  readonly playbackRate: number;
  readonly paused: boolean;
  readonly ended: boolean;
  readonly textTracks: TextTrack[];
  readonly activeTrackIndex: number;
  readonly activeTrackLabel: string | null;
}

export default Sopplayer;
