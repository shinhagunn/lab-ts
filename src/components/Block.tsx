import '../assets/styles/components/block.less';

function Block(props: any) {
  return (
    <div>
      {props.title === undefined ? '' : (
        <h3 className="pb-4 text-2xl font-bold">
          {props.title}
        </h3>
      )}
      <div className={`block-container flex flex-wrap ${props.className}`}>
        {props.children}
      </div>
    </div>
  );
}

export default Block;
