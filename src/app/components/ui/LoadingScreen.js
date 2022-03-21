export const LoadingScreen = () => {
    return (<div className="loading-container" style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        backgroundColor: "white",
        zIndex: 999,
        opacity: 0.5
    }}>
        <div className="loading-spinner" style={{
            display: "flex",
            width: "100%",
            height: "100%",
            alignContent: "center",
            alignItems: "center",
            justifyContent: "center"
        }}>
            <div className="spinner-border" role="status">
                <span className="visually-hidden">Loading...</span>
            </div>
        </div>
    </div>)
}