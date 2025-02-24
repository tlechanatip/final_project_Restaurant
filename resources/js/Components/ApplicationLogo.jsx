export default function ApplicationLogo(props) {

    return (
        <img
            {...props}
            src="/storage/images/logo.png"
            alt="Application Logo"
            style={{ objectFit: "contain" }}
        />
    );
}
