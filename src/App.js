import React, { useState, useEffect } from 'react'
import List from './list'
import Alert from './alert'

  const getlocalStorage = () => {               //Local storage is used to store data in key value pair and 
    let list = localStorage.getItem('list');    //it persists in the database even fafter the browser is closed.
    if(list){
      return JSON.parse(localStorage.getItem('list'));
    }
    else{
      return [];
    }
  }

function App() {
  const [name, setname] = useState('');
  const [list, setlist] = useState(getlocalStorage());
  const [isediting, setisediting] = useState(false);
  const [editid, seteditid] = useState(null);
  const [alert, setalert] = useState({show: false, msg: '', type: ''});

  const handlesubmit = (e) => {
    e.preventDefault();
    if(!name){            //if nothing is written in the field of item.
      //displaying alert if submit is pressed without any item.
      showalert(true,'Please enter item', 'danger')
    }
    else if(name && isediting){     //if item name is written and edit button is visible.
      //handling the edit button so that on clicking edit button, item is added.
      setlist(
         list.map((singleitem) => {
          if(singleitem.id == editid){
            return {...singleitem, title: name}
          }
          return singleitem;
         })
      )    
      setname('');
      seteditid(null);
      setisediting(false);
      showalert(true, 'Item Edited', 'success')
    }
    else{
      showalert(true, 'Item Added', 'success');     //after editing add the item into the list.
      const newitem = {id: new Date().getTime().toString(), title: name};
      setlist([...list, newitem]);
      setname('');
    }
  }

   const showalert = (show=false, msg='', type='') => {   //for showing the alert message type.
    setalert({show, msg, type});
   }

   const clearlist = () => {
    setlist([]);
    showalert(true, 'List is empty', 'danger');
   }

   const removeitem = (id) => {
      setlist(list.filter((singleitem) => singleitem.id != id))
      setalert(true, 'Item removed', 'danger');
   }

   const edititem = (id) => {
      const edititem = list.find((singleitem) => singleitem.id == id);
      setisediting(true);
      seteditid(id);
      setname(edititem.title);
     // setalert(true, 'Item Edit', 'success');
   }

   useEffect(() => {
    localStorage.setItem('list', JSON.stringify(list));
   }, [list]);
                                                          /* on pressing submit button the event handler will */
    return <section className='section-center'>           /*be invoked and respective if else condition will be running*/
      <form className='grocery-form' onSubmit={handlesubmit}>  
        {alert.show && <Alert {...alert} removealert = {showalert}/>}
        <h3>Grocery Items</h3>
        <div className='form-control'>
          <input type="text" className='grocery' placeholder='Eg : Vegetables'
          value={name} onChange = {(e) => setname(e.target.value)}/>
          
          <button type='submit' className='submit-btn'>
            {isediting ? 'Edit' : 'submit'}
          </button>
        </div>
        </form>
        {list.length > 0 && (
            <div className='grocery-container'>
              <List items={list} removeitem = {removeitem} edititem = {edititem}/> 
              <button className='clear-btn' onClick = {clearlist}>Clear Items</button>
            </div>
        )}
    </section>
  }

export default App