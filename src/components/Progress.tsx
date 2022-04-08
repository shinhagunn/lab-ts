interface ProgressProps {
  score: number
  title: string
  className?: string
}

function Progress(props: ProgressProps) {
  return (
    <div className={props.className}>
      <p className="font-bold pb-2">{props.title}</p>
      <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
        <div className="bg-cyan-500 h-2.5 rounded-full" style={{width: `${props.score}%`}}></div>
      </div>
    </div>
  )
}

export default Progress