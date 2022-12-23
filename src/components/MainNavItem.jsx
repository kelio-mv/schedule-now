export default function MainNavItem(props) {
  return (
    <div
      className={"main-nav-item " + (props.selected === props.name ? "selected" : "")}
      onClick={() => props.onClick(props.name)}
    >
      <img src={props.imgSrc} />
      <p>{props.text}</p>
    </div>
  );
}
