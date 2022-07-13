import React from 'react'
import { FaEdit, FaTrash } from 'react-icons/fa'


const List = ({items, removeitem, edititem}) => {
    return (
        <div className='grocery-list'>
            {items.map ((singleitem) => {
                const {id, title} = singleitem;
                return (
                    <article key={id} className='grocery-item'>
                        <p className='title'>{title}</p>
                        <div className='btn-container'>
                            <button type='button' className='edit-btn'
                            onClick={() => edititem(id)}>
                                <FaEdit/>
                            </button>
                            <button type='button' className='edit-btn' 
                            onClick={() => removeitem(id)}>
                                <FaTrash/>  
                            </button>
                        </div>
                    </article>
                )
            })}
        </div>
    )

}

export default List