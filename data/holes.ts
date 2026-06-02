import { TapResult, PipeResult } from "@/types";

// ===========================
// タップ下穴径（並目ネジ）
// ===========================
export const TAP_DATA: TapResult[] = [
  { size: "M4",  drillMm: 3.3 },
  { size: "M5",  drillMm: 4.2 },
  { size: "M6",  drillMm: 5.0 },
  { size: "M8",  drillMm: 6.8 },
  { size: "M10", drillMm: 8.5 },
  { size: "M12", drillMm: 10.2 },
];

// ===========================
// 配管コネクタ 下穴径
// ===========================
export const PIPE_DATA: PipeResult[] = [
  // PF管
  { pipeType: "PF管", size: "16", knockMm: [22, 27], note: "コネクタ種類によりφ22またはφ27" },
  { pipeType: "PF管", size: "22", knockMm: 27 },
  { pipeType: "PF管", size: "28", knockMm: 34 },
  { pipeType: "PF管", size: "36", knockMm: 42 },

  // E管（ねじなし電線管）
  { pipeType: "E管", size: "19", knockMm: 21.5 },
  { pipeType: "E管", size: "25", knockMm: 27.1 },
  { pipeType: "E管", size: "31", knockMm: 34.0 },
  { pipeType: "E管", size: "39", knockMm: 39.0 },
  { pipeType: "E管", size: "51", knockMm: 52.0 },
  { pipeType: "E管", size: "63", knockMm: 65.0 },
  { pipeType: "E管", size: "75", knockMm: 77.0 },

  // G管（厚鋼電線管）
  { pipeType: "G管", size: "16", knockMm: 21.5 },
  { pipeType: "G管", size: "22", knockMm: 27.1 },
  { pipeType: "G管", size: "28", knockMm: 34.0 },
  { pipeType: "G管", size: "36", knockMm: 43.0 },
  { pipeType: "G管", size: "42", knockMm: 49.0 },
  { pipeType: "G管", size: "54", knockMm: 61.0 },
  { pipeType: "G管", size: "70", knockMm: 76.0 },
  { pipeType: "G管", size: "82", knockMm: 89.0 },
  { pipeType: "G管", size: "104", knockMm: 115.0 },

  // プリカ
  { pipeType: "プリカ", size: "17",  knockMm: 21.5 },
  { pipeType: "プリカ", size: "24",  knockMm: 27.1 },
  { pipeType: "プリカ", size: "30",  knockMm: 34.0 },
  { pipeType: "プリカ", size: "38",  knockMm: 43.0 },
  { pipeType: "プリカ", size: "50",  knockMm: 49.0 },
  { pipeType: "プリカ", size: "63",  knockMm: 61.0 },
  { pipeType: "プリカ", size: "76",  knockMm: 76.0 },
  { pipeType: "プリカ", size: "83",  knockMm: 89.0 },
  { pipeType: "プリカ", size: "101", knockMm: 115.0 },

  // 防水プリカ（プリカと同サイズ）
  { pipeType: "防水プリカ", size: "17",  knockMm: 21.5 },
  { pipeType: "防水プリカ", size: "24",  knockMm: 27.1 },
  { pipeType: "防水プリカ", size: "30",  knockMm: 34.0 },
  { pipeType: "防水プリカ", size: "38",  knockMm: 43.0 },
  { pipeType: "防水プリカ", size: "50",  knockMm: 49.0 },
  { pipeType: "防水プリカ", size: "63",  knockMm: 61.0 },
  { pipeType: "防水プリカ", size: "76",  knockMm: 76.0 },
  { pipeType: "防水プリカ", size: "83",  knockMm: 89.0 },
  { pipeType: "防水プリカ", size: "101", knockMm: 115.0 },
];

export function findTap(size: string): TapResult | undefined {
  return TAP_DATA.find((t) => t.size === size);
}

export function findPipe(pipeType: string, size: string): PipeResult | undefined {
  return PIPE_DATA.find((p) => p.pipeType === pipeType && p.size === size);
}

export function getSizesByPipe(pipeType: string): string[] {
  return PIPE_DATA.filter((p) => p.pipeType === pipeType).map((p) => p.size);
}
