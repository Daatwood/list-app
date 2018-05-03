import React from 'react';
const List = ({list, onRemoveList, editingList}) =>
    <div className="single-list" key={list.id}>
        <span className="deleteButton" onClick={() => onRemoveList(list.id)}>x</span>
        <h4 onClick={() => editingList(list.id)}>{list.title}</h4>
        <p onClick={() => editingList(list.id)}>{list.excerpt}</p>
        <button onClick={() => editingList(list.id)}>Edit</button>
    </div>
export default List;