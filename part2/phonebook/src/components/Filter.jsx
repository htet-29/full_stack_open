const Filter = ({filterWord, handleFilterChange}) => {
    return (
        <div>
            filter show with <input value={filterWord} onChange={handleFilterChange}/>
        </div>
    );
};

export default Filter