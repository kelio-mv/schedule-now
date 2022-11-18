export default function MainNavItem(props) {
    return (
        <div
            onClick={() => props.onClick(props.name)}
            style={props.selected === props.name ? { backgroundColor: "var(--clr-primary)" } : null}
        >
            {props.children}
        </div>
    );
}
