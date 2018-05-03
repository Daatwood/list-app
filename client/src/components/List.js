import React from 'react';
const List = ({list, onRemoveList, editingList}) =>
    <div className="single-list" key={list.id}>
        <h4>{list.title}</h4>
        <p>{list.excerpt}</p>
        <button onClick={() => onRemoveList(list.id)}>Delete</button>
        <button onClick={() => editingList(list.id)}>Edit</button>
        <hr/>
    </div>
export default List;