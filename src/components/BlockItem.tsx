interface BlockItemProps {
  title: string
  start_date: string
  end_date: string
}

function BlockItem(props: React.PropsWithChildren<BlockItemProps>) {
  return (
    <div>
      <div className="flex justify-between">
        <p className="font-bold">{props.title}</p>
        <div>
          <span>{props.start_date} - </span>
          <span>{props.end_date}</span>
        </div>
      </div>
      {props.children}
    </div>
  )
}

export default BlockItem