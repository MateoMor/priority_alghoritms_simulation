import AlgorithmTable from "../components/AlgorithmTable";
import GanttResults from "../components/GanttResults";


export default function Cpu_algorithms() {
  return (
    <div className="space-y-8 py-10">
      
      
      {/* Tabla principal */}
      <AlgorithmTable />
      
      {/* Resultados de todos los algoritmos */}
      <GanttResults />
    
    </div>
  )
}
