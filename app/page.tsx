"use client";

import { useState } from "react";
import { Category, PipeType } from "@/types";
import { TAP_DATA, findTap, findPipe, getSizesByPipe } from "@/data/holes";
import ChoiceCard from "@/components/ChoiceCard";

type Step = 1 | 2 | 3 | 4;

const CATEGORY_OPTIONS: { value: Category; icon: string; label: string; sub: string }[] = [
  { value: "タップ",      icon: "🔩", label: "タップ下穴",      sub: "M4〜M12 並目ネジ" },
  { value: "配管コネクタ", icon: "🔧", label: "配管コネクタ下穴", sub: "PF・E管・G管・プリカ・防水プリカ" },
];

const PIPE_OPTIONS: { value: PipeType; icon: string; label: string; sub: string }[] = [
  { value: "PF管",    icon: "🟤", label: "PF管",          sub: "呼び 16・22・28・36" },
  { value: "E管",     icon: "⚪", label: "E管（ねじなし）", sub: "呼び 19・25・31・39・51・75" },
  { value: "G管",     icon: "🔵", label: "G管（厚鋼）",    sub: "呼び 16〜104" },
  { value: "プリカ",   icon: "🟠", label: "プリカ",        sub: "呼び 17〜101" },
  { value: "防水プリカ", icon: "🟣", label: "防水プリカ",   sub: "呼び 17〜101" },
];

export default function Home() {
  const [step, setStep]         = useState<Step>(1);
  const [category, setCategory] = useState<Category | null>(null);
  const [pipeType, setPipeType] = useState<PipeType | null>(null);
  const [tapSize, setTapSize]   = useState<string | null>(null);
  const [pipeSize, setPipeSize] = useState<string | null>(null);

  const tapResult  = tapSize ? findTap(tapSize) : null;
  const pipeResult = pipeType && pipeSize ? findPipe(pipeType, pipeSize) : null;
  const pipeSizes  = pipeType ? getSizesByPipe(pipeType) : [];

  function reset() {
    setStep(1);
    setCategory(null);
    setPipeType(null);
    setTapSize(null);
    setPipeSize(null);
  }

  function goBack() {
    if (step === 4) setStep(category === "タップ" ? 2 : 3);
    else if (step === 3) setStep(2);
    else if (step === 2) setStep(1);
  }

  const stepLabels =
    category === "タップ"
      ? ["種類", "サイズ"]
      : ["種類", "配管の種類", "呼び径"];

  const currentStepIndex =
    category === "タップ"
      ? step === 1 ? 0 : step === 2 ? 1 : 2
      : step === 1 ? 0 : step === 2 ? 1 : step === 3 ? 2 : 3;

  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      {/* ヘッダー */}
      <header className="sticky top-0 z-20 bg-zinc-950/95 backdrop-blur border-b border-zinc-800">
        <div className="max-w-lg mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-lg font-black text-white tracking-tight">🕳️ 下穴径 検索</h1>
              <p className="text-zinc-600 text-xs">タップ・配管コネクタ 下穴サイズ</p>
            </div>
            {step > 1 && (
              <button
                onClick={goBack}
                className="text-xs font-bold text-zinc-500 hover:text-white border border-zinc-700 hover:border-zinc-500 px-3 py-1.5 rounded-lg transition-colors"
              >
                ← 戻る
              </button>
            )}
          </div>

          {/* ステップインジケーター */}
          <div className="flex gap-1.5 mt-3">
            {stepLabels.map((_, i) => (
              <div
                key={i}
                className={`flex-1 h-1 rounded-full transition-all duration-300 ${
                  i < currentStepIndex
                    ? "bg-orange-500"
                    : i === currentStepIndex
                    ? "bg-orange-500/60"
                    : "bg-zinc-700"
                }`}
              />
            ))}
          </div>
          <div className="flex gap-1.5 mt-1">
            {stepLabels.map((label, i) => (
              <p
                key={i}
                className={`flex-1 text-center text-[10px] font-bold transition-colors ${
                  i < currentStepIndex
                    ? "text-orange-500"
                    : i === currentStepIndex
                    ? "text-orange-300"
                    : "text-zinc-600"
                }`}
              >
                {i < currentStepIndex ? "✓ " : ""}{label}
              </p>
            ))}
          </div>
        </div>
      </header>

      <main className="max-w-lg mx-auto px-4 pb-16">

        {/* Step 1: 種類選択 */}
        {step === 1 && (
          <div className="pt-6 space-y-3">
            <div className="mb-5">
              <p className="text-xs font-bold text-orange-400 mb-1">STEP 1　種類を選択</p>
              <p className="text-white font-black text-xl">何の下穴？</p>
            </div>
            {CATEGORY_OPTIONS.map((opt) => (
              <ChoiceCard
                key={opt.value}
                icon={opt.icon}
                label={opt.label}
                sub={opt.sub}
                selected={category === opt.value}
                onClick={() => { setCategory(opt.value); setStep(2); }}
              />
            ))}
          </div>
        )}

        {/* Step 2: タップ → サイズ選択 */}
        {step === 2 && category === "タップ" && (
          <div className="pt-6 space-y-3">
            <div className="mb-5">
              <p className="text-xs font-bold text-orange-400 mb-1">STEP 2　サイズを選択</p>
              <p className="text-white font-black text-xl">ネジサイズは？</p>
            </div>
            <div className="grid grid-cols-3 gap-3">
              {TAP_DATA.map((t) => (
                <button
                  key={t.size}
                  onClick={() => { setTapSize(t.size); setStep(4); }}
                  className={`py-5 rounded-2xl border-2 font-black text-xl transition-all active:scale-95 ${
                    tapSize === t.size
                      ? "bg-orange-500/10 border-orange-500 text-orange-300"
                      : "bg-zinc-900 border-zinc-700 hover:border-zinc-500 text-white"
                  }`}
                >
                  {t.size}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 2: 配管 → 配管種類選択 */}
        {step === 2 && category === "配管コネクタ" && (
          <div className="pt-6 space-y-3">
            <div className="mb-5">
              <p className="text-xs font-bold text-orange-400 mb-1">STEP 2　配管の種類を選択</p>
              <p className="text-white font-black text-xl">配管の種類は？</p>
            </div>
            {PIPE_OPTIONS.map((opt) => (
              <ChoiceCard
                key={opt.value}
                icon={opt.icon}
                label={opt.label}
                sub={opt.sub}
                selected={pipeType === opt.value}
                onClick={() => { setPipeType(opt.value); setStep(3); }}
              />
            ))}
          </div>
        )}

        {/* Step 3: 配管 → 呼び径選択 */}
        {step === 3 && category === "配管コネクタ" && pipeType && (
          <div className="pt-6 space-y-3">
            <div className="mb-5">
              <p className="text-xs font-bold text-orange-400 mb-1">STEP 3　呼び径を選択</p>
              <p className="text-white font-black text-xl">呼び径は？</p>
              <p className="text-zinc-500 text-sm mt-1">{pipeType}</p>
            </div>
            <div className="grid grid-cols-4 gap-3">
              {pipeSizes.map((s) => (
                <button
                  key={s}
                  onClick={() => { setPipeSize(s); setStep(4); }}
                  className={`py-5 rounded-2xl border-2 font-black text-lg transition-all active:scale-95 ${
                    pipeSize === s
                      ? "bg-orange-500/10 border-orange-500 text-orange-300"
                      : "bg-zinc-900 border-zinc-700 hover:border-zinc-500 text-white"
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 4: 結果 */}
        {step === 4 && (
          <div className="pt-6 space-y-4">
            <div className="mb-2">
              <p className="text-xs font-bold text-orange-400 mb-1">結果</p>
              <p className="text-white font-black text-xl">下穴径はこれ</p>
            </div>

            {/* タップ結果 */}
            {tapResult && (
              <div className="bg-zinc-900 border border-orange-500/40 rounded-2xl p-8 text-center space-y-2">
                <p className="text-zinc-400 text-sm font-bold">{tapResult.size} 並目ネジ タップ下穴</p>
                <p className="text-orange-400 font-black" style={{ fontSize: "5rem", lineHeight: 1 }}>
                  φ{tapResult.drillMm}
                </p>
                <p className="text-zinc-500 text-base font-bold">mm</p>
              </div>
            )}

            {/* 配管コネクタ結果 */}
            {pipeResult && (
              <div className="space-y-3">
                {/* ノックアウト径 */}
                <div className="bg-zinc-900 border border-orange-500/40 rounded-2xl p-8 text-center space-y-2">
                  <p className="text-zinc-400 text-sm font-bold">
                    {pipeResult.pipeType} 呼び{pipeResult.size} ノックアウト径
                  </p>
                  {Array.isArray(pipeResult.knockMm) ? (
                    <div className="space-y-1">
                      <div className="flex justify-center gap-6 items-end">
                        {pipeResult.knockMm.map((mm) => (
                          <p key={mm} className="text-orange-400 font-black" style={{ fontSize: "4rem", lineHeight: 1 }}>
                            φ{mm}
                          </p>
                        ))}
                      </div>
                      <p className="text-zinc-500 text-base font-bold">mm</p>
                    </div>
                  ) : (
                    <>
                      <p className="text-orange-400 font-black" style={{ fontSize: "5rem", lineHeight: 1 }}>
                        φ{pipeResult.knockMm}
                      </p>
                      <p className="text-zinc-500 text-base font-bold">mm</p>
                    </>
                  )}
                  {pipeResult.note && (
                    <p className="text-yellow-400 text-xs mt-3 bg-yellow-500/10 border border-yellow-500/30 rounded-xl px-3 py-2">
                      ⚠ {pipeResult.note}
                    </p>
                  )}
                </div>

                {/* IZUMIダイスサイズ */}
                {pipeResult.dieMm && (
                  <div className="bg-zinc-900 border border-blue-500/40 rounded-2xl p-6 text-center space-y-1">
                    <p className="text-zinc-400 text-xs font-bold">🔵 IZUMIパンチャー ダイスサイズ</p>
                    <p className="text-blue-400 font-black" style={{ fontSize: "3.5rem", lineHeight: 1 }}>
                      φ{pipeResult.dieMm}
                    </p>
                    <p className="text-zinc-500 text-base font-bold">mm</p>
                  </div>
                )}
              </div>
            )}

            <button
              onClick={reset}
              className="w-full py-4 mt-2 border-2 border-zinc-700 hover:border-orange-500/50 text-zinc-400 hover:text-orange-400 font-bold text-sm rounded-2xl transition-all duration-150"
            >
              ← 最初からやり直す
            </button>
          </div>
        )}

      </main>

      {/* フッター */}
      <footer className="border-t border-zinc-800 bg-zinc-950 mt-8">
        <div className="max-w-lg mx-auto px-4 py-5">
          <p className="text-zinc-700 text-[10px]">© 電気工事AIラボ｜参考ツール・施工前は必ずメーカー資料で確認してください</p>
        </div>
      </footer>
    </div>
  );
}
