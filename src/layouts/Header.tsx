import "../assets/styles/layouts/header.less"

interface HeaderProps {
  name: string
  job: string
  avatar: string
}

function Header(props: HeaderProps) {
  return (
    <div className="header">
      <div className="header-avatar">
        <img src={props.avatar} />
      </div>
      <div className="header-bg">
        <h2>{props.name}</h2>
        <p>{props.job}</p>
      </div>
    </div>
  )
}

export default Header