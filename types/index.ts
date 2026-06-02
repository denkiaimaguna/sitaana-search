export type Category = "タップ" | "配管コネクタ";

export type PipeType = "PF管" | "E管" | "G管" | "プリカ" | "防水プリカ";

export interface TapResult {
  size: string;       // "M6"
  drillMm: number;   // 5.0
}

export interface PipeResult {
  pipeType: PipeType;
  size: string;       // "16", "22" など
  knockMm: number | number[]; // φ27 or [22, 27] (PF16のような複数)
  note?: string;
}
