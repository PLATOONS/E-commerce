export default function Measurements({measurements}: {measurements: string}){
    return <div className="w-auto p-3">
        <p className="mb-1.5 text-sm text-neutral-four">Measurements</p>
        <p className="text-lg">{measurements}</p>
    </div>
}