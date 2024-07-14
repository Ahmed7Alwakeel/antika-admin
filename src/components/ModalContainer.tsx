const ModalContainer = ({children, small, customClass}:any) => {
    return (
        <div className={`modal_container ${small ? 'small' : ''} ${customClass}`}>
            <div className={"modal"}>
                {children}
            </div>
        </div>
    );
}

export default ModalContainer;