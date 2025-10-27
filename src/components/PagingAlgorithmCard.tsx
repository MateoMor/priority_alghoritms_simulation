import React from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "./ui/card";
import { cn } from "../utils";
import type { AlgorithmResult } from "../utils/pagingAlgorithms.ts";

type PagingAlgorithmCardProps = {
  result: AlgorithmResult;
};

const formatPercent = (value: number): string => `${(value * 100).toFixed(1)}%`;

const PagingAlgorithmCard: React.FC<PagingAlgorithmCardProps> = ({ result }) => {
  const frameCount = result.steps[0]?.frames.length ?? 0;
  const hasSteps = result.steps.length > 0;

  if (!hasSteps) {
    return null;
  }

  return (
    <Card className="border-slate-200 bg-white/90 shadow-lg backdrop-blur">
      <CardHeader>
        <CardTitle>{result.name}</CardTitle>
        <CardDescription>{result.description}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex flex-wrap gap-3 text-sm text-slate-600">
          <span className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-3 py-1 font-medium text-slate-700">
            Fallos: {result.faults}
          </span>
          <span className="inline-flex items-center gap-2 rounded-full bg-emerald-100 px-3 py-1 font-medium text-emerald-700">
            Aciertos: {result.hits}
          </span>
          <span className="inline-flex items-center gap-2 rounded-full bg-indigo-100 px-3 py-1 font-medium text-indigo-700">
            Tasa de fallos: {formatPercent(result.faultRate)}
          </span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full border-separate border-spacing-y-2 text-left text-sm">
            <thead>
              <tr>
                <th className="sticky left-0 bg-white/95 px-3 py-2 font-semibold text-slate-500">
                  Referencia
                </th>
                {result.steps.map((step, idx) => (
                  <th
                    key={`ref-${idx}`}
                    className="min-w-[2rem] px-2 py-2 text-center font-semibold text-slate-700"
                  >
                    {step.reference}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {Array.from({ length: frameCount }).map((_, frameIdx) => (
                <tr key={`frame-${frameIdx}`} className="rounded-md bg-slate-50">
                  <td className="sticky left-0 bg-white/95 px-3 py-2 font-semibold text-slate-600">
                    Frame {frameIdx + 1}
                  </td>
                  {result.steps.map((step, idx) => (
                    <td
                      key={`frame-${frameIdx}-${idx}`}
                      className="px-2 py-2 text-center font-mono text-sm text-slate-800"
                    >
                      {step.frames[frameIdx] ?? "–"}
                    </td>
                  ))}
                </tr>
              ))}
              <tr>
                <td className="sticky left-0 bg-white/95 px-3 py-2 font-semibold text-slate-600">
                  Evento
                </td>
                {result.steps.map((step, idx) => (
                  <td
                    key={`event-${idx}`}
                    className={cn(
                      "px-2 py-2 text-center text-xs font-semibold",
                      step.fault
                        ? "rounded-md bg-rose-100 text-rose-600"
                        : "rounded-md bg-emerald-100 text-emerald-700"
                    )}
                  >
                    {step.fault ? "Fallo" : "Hit"}
                  </td>
                ))}
              </tr>
              <tr>
                <td className="sticky left-0 bg-white/95 px-3 py-2 font-semibold text-slate-600">
                  Reemplazo
                </td>
                {result.steps.map((step, idx) => (
                  <td
                    key={`replace-${idx}`}
                    className="px-2 py-2 text-center text-xs text-slate-500"
                  >
                    {step.replaced !== null && step.replaced !== undefined
                      ? step.replaced
                      : "—"}
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
};

export default PagingAlgorithmCard;
