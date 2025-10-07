const Notification = ({message, isError}) => {
    if (message === null) return null;

    return (
        <div className={isError ? 'noti error' : 'noti'}>
            {message}
        </div>
    );
}

export default Notification;