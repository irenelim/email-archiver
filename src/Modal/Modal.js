 import React from 'react';

 import './Modal.css';
 
 const modal = props => (
     <div className="my-modal">
         <section className="modal__header"><h1>{props.title}</h1></section>
         <section className="modal__content">{props.children}</section>
         <section className="modal__actions">
            {props.canClose && <button className="btn btn-secondary" onClick={props.onClose}>Close</button>}
         </section>

     </div>
 );

 export default modal;