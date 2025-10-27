import React, { useState } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "../components/ui/card";
import { Label } from "../components/ui/label";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import PagingAlgorithmCard from "../components/PagingAlgorithmCard";
import { runPagingAlgorithms } from "../utils/pagingAlgorithms.ts";
import type { AlgorithmResult } from "../utils/pagingAlgorithms.ts";

const Memory_algorithms: React.FC = () => {
  const [sequenceInput, setSequenceInput] = useState<string>("");
  const [framesInput, setFramesInput] = useState<string>("");
  const [formError, setFormError] = useState<string | null>(null);
  const [results, setResults] = useState<AlgorithmResult[] | null>(null);
  const [hasSimulated, setHasSimulated] = useState<boolean>(false);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const sanitizedSequence = sequenceInput.replace(/\s+/g, "");

    if (!sanitizedSequence.length) {
      setFormError("Ingresa al menos un número en la cadena de referencias.");
      setResults(null);
      setHasSimulated(false);
      return;
    }

    if (!/^\d+$/.test(sanitizedSequence)) {
      setFormError("La cadena solo puede contener dígitos (0-9).");
      setResults(null);
      setHasSimulated(false);
      return;
    }

    const frames = Number(framesInput);
    if (!Number.isInteger(frames) || frames <= 0) {
      setFormError("El número de marcos debe ser un entero positivo.");
      setResults(null);
      setHasSimulated(false);
      return;
    }

    const sequence = sanitizedSequence.split("").map(Number);
    const computedResults = runPagingAlgorithms(sequence, frames);

    setFormError(null);
    setResults(computedResults);
    setHasSimulated(true);
  };

  return (
    <div className="space-y-10 py-10">
      <Card className="border-slate-200 bg-white/80 shadow-lg backdrop-blur">
        <CardHeader>
          <CardTitle>Simulación de algoritmos de reemplazo de página</CardTitle>
          <CardDescription>
            Proporciona una cadena de referencias y la cantidad de marcos de página para
            visualizar los comportamientos de los algoritmos clásicos.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form
            onSubmit={handleSubmit}
            className="grid gap-6 md:grid-cols-[minmax(0,1fr)_minmax(0,220px)] md:items-end"
          >
            <div className="grid gap-2">
              <Label htmlFor="references">Cadena de referencias</Label>
              <Input
                id="references"
                placeholder="Ej: 987234124235"
                value={sequenceInput}
                onChange={(event) => setSequenceInput(event.target.value)}
                autoComplete="off"
              />
              <p className="text-xs text-slate-500">
                Introduce únicamente números, sin separadores ni espacios.
              </p>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="frames">Número de marcos</Label>
              <Input
                id="frames"
                type="number"
                min={1}
                placeholder="Ej: 3"
                value={framesInput}
                onChange={(event) => setFramesInput(event.target.value)}
              />
            </div>
            <div className="md:col-span-2 flex justify-end">
              <Button type="submit">Simular</Button>
            </div>
          </form>
          {formError ? (
            <p className="mt-4 text-sm text-rose-600">{formError}</p>
          ) : null}
        </CardContent>
      </Card>

      {hasSimulated && results ? (
        <div className="grid gap-6 lg:grid-cols-2">
          {results.map((result) => (
            <PagingAlgorithmCard key={result.key} result={result} />
          ))}
        </div>
      ) : (
        <div className="rounded-xl border border-dashed border-slate-300 bg-slate-50/80 p-10 text-center text-slate-500">
          Completa el formulario y presiona "Simular" para comparar los algoritmos de
          paginación.
        </div>
      )}
    </div>
  );
};

export default Memory_algorithms;
