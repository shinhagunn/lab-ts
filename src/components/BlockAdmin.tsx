import "../assets/styles/components/block_admin.less"

interface BlockAdminProps {
  blockName?: string
  className?: string
}

function BlockAdmin(props: React.PropsWithChildren<BlockAdminProps>) {
  return (
    <div className={`content-block ${props.className}`}>
      <h2>{ props.blockName }</h2>
      {props.blockName ? (
        <span className="underline"></span>
      ): ""}
      {props.children}
    </div>
  )
}

export default BlockAdmin
