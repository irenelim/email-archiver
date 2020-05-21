import React, { useState, useEffect} from "react";
import DateRangePicker from "react-bootstrap-daterangepicker";
import moment from "moment";
import Backdrop from "./Backdrop/Backdrop";
import Modal from "./Modal/Modal";
import { compareFn } from "./Utils";
import { datas, initialHeader } from "./data";
import archiver from "./assets/images/logo.png";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-daterangepicker/daterangepicker.css";
import "./App.css";

function App() {
  const [isHighlight, setIsHighlight] = useState(null);
  const [daterange, setDaterange] = useState({});
  const [daterangeStr, setDaterangeStr] = useState("");
  const [emails, setEmails] = useState([]);
  const [header, setHeader] = useState(initialHeader);
  const [showModal, setShowModal] = useState(false);
  const [emailGroup, setEmailGroup] = useState(null);
  const [toggles, setToggles] = useState({});

  useEffect(() => {
    if (Object.keys(daterange).length > 0){
      const getData = (startDate, endDate) => {
        setEmails(datas.filter(data=>{
          const theMoment = (moment(data.datetime));
          return theMoment>=startDate && theMoment<=endDate;
        }));
      }
      getData(daterange.startDate, daterange.endDate);
    }    
  }, [daterange]);

  const handleHeaderClick = (th) => {
    const sortOrder = th.sortOrder ==='asc'? 'desc': 'asc';
    setIsHighlight(th.id);
    setHeader(headers=>[...headers.map(item=>item.id===th.id? 
      {...item, sortOrder: sortOrder} : item)])
    setEmails([...emails].sort(compareFn(th.sortBy, sortOrder)) );
  };

  const dateRangeChange = (e, picker) => {
    if (e.type === "apply") {
      setDaterange({ startDate: picker.startDate, endDate: picker.endDate });
      setDaterangeStr(
        `${picker.startDate.format("YYYY/MM/DD")} - ${picker.endDate.format(
          "YYYY/MM/DD"
        )}`
      );
    }
  }; 

  const modalCloseHandler = () => {
    setShowModal(false);
    setToggles({});
  };

  return (
    <div className="App">
      <div className="container my-5">
        <DateRangePicker
          containerStyles={{}}
          containerClass="react-bootstrap-daterangepicker-container col-md-6 col-lg-4"
          startDate="1/4/2020"
          endDate="1/6/2020"
          autoApply={true}
          autoUpdateInput={true}
          onEvent={dateRangeChange}
        >
          <div className="input-group pointer mb-3">
            <span className="calendar"></span>
            <input
              type="text"
              className="form-control daterange"
              placeholder="Search date range"
              readOnly
              value={daterangeStr}
            />
            <div className="input-group-append">
              <span className="input-group-text">
                <span className="search"></span>
              </span> 
            </div>
          </div>
        </DateRangePicker>

        <p className="mb-1"><strong>Results: {emails.length} mail(s)</strong></p>
        {emails.length===0 && (
          <>
          <hr />
          <div className="archive-logo">
            <img
                  src={archiver}
                  className="archiver"
                  alt="mail archiver"
                  width="125px"
                />
          </div>
          </>
        )}
          
        {emails.length>0 && (          
        <table className="table table-hover table-ellipsis">
          <thead className="d-none d-md-block thead-light">
            <tr className="row">
              <th className="col-12 col-md-3"
                onClick={()=>handleHeaderClick(header[0])}
              >{initialHeader[0].header}
                {isHighlight===initialHeader[0].id && <div className="d-inline-block ascending"></div>}
              </th>
              <th className="col-12 col-md-3"
                onClick={()=>handleHeaderClick(header[1])}
              >{initialHeader[1].header}
                {isHighlight===initialHeader[1].id && <div className="d-inline-block ascending"></div>}
              </th>
              <th className="col-12 col-md-4"
                onClick={()=>handleHeaderClick(header[2])}
              >{initialHeader[2].header}
                {isHighlight===initialHeader[2].id && <div className="d-inline-block ascending"></div>}
              </th>
              <th className="col-12 col-md-2"
                onClick={()=>handleHeaderClick(header[3])}
              >{initialHeader[3].header}
                {isHighlight===initialHeader[3].id && <div className="d-inline-block ascending"></div>}
              </th>
            </tr>
          </thead>
          {/* mobile view */}
          <thead className="d-block d-md-none thead-light">
            <tr className="row">
              <th className="col"> 
                <span className="d-inline-block px-2"
                  onClick={()=>handleHeaderClick(header[0])}
                >{initialHeader[0].header}
                  {isHighlight===initialHeader[0].id && <div className="d-inline-block ascending"></div>}
                  </span> |
                <span className="d-inline-block px-2"
                  onClick={()=>handleHeaderClick(header[1])}
                >{initialHeader[1].header}
                  {isHighlight===initialHeader[1].id && <div className="d-inline-block ascending"></div>}
                </span> | 
                <span className="d-inline-block px-2"
                  onClick={()=>handleHeaderClick(header[2])}
                >{initialHeader[2].header}
                  {isHighlight===initialHeader[2].id && <div className="d-inline-block ascending"></div>}
                </span> | 
                <span className="d-inline-block px-2"
                  onClick={()=>handleHeaderClick(header[3])}
                >{initialHeader[3].header}
                  {isHighlight===initialHeader[3].id && <div className="d-inline-block ascending"></div>}
                </span>
              </th>
            </tr>
          </thead>

          <tbody className="d-none d-md-block">
            {
            emails.map(email=>(
              <tr className="row email-row" key={email.id} 
                  onClick={() => {setShowModal(true);setEmailGroup(email)}}
              >
                <td className={`col-12 col-md-3 font-weight-${isHighlight===initialHeader[0].id?"bold":"normal"}`}>
                  <div className="truncate">{email.emailFrom}</div>
                </td>
                <td className={`col-12 col-md-3 font-weight-${isHighlight===initialHeader[1].id?"bold":"normal"}`}>
                  <div className="d-flex justify-content-between align-items-center">
                    <span className="truncate">{email.emailTo}</span> 
                    {!!email.replies && <span className="badge badge-secondary">+{email.replies.length}</span>}
                  </div>
                </td>
                <td className={`col-12 col-md-4 font-weight-${isHighlight===initialHeader[2].id?"bold":"normal"}`}>
                  <div className="d-flex justify-content-between align-items-center">
                    <span className="truncate">{email.subject}</span>
                    {!!email.attachment && <div className="d-inline-block attachment"></div>}
                  </div>
                </td>
                <td className={`col-12 col-md-2 font-weight-${isHighlight===initialHeader[3].id?"bold":"normal"}`}>
                  <div className="truncate">{
                    moment().isSame(moment(email.datetime), 'day') ? moment(email.datetime).format("H:mm") :
                    moment().isSame(moment(email.datetime), 'year') ? moment(email.datetime).format("MMM DD"): 
                      moment(email.datetime).format("YYYY/MM/DD")
                  }</div>
                </td>
              </tr >
              
            ))
          }
          </tbody>
          {/* mobile view */}
          <tbody className="d-block d-md-none">
            {
            emails.map(email=>(
              <tr className="row email-row" key={email.id}
                onClick={() => {setShowModal(true);setEmailGroup(email)}}
              >
                <td className="w-100">
                  <div className="container"><div className="row">
                    <div className="col-1 p-0 mail-sp"></div>
                    <div className="col p-0">

                      <div className="d-flex justify-content-between align-items-center">   
                        <div className={`truncate font-weight-${isHighlight===initialHeader[0].id?"bold":"normal"}`}>
                          {email.emailFrom}
                        </div>
                        <div className="on-rt">                    
                          {!!email.attachment && <div className="d-inline-block mr-1 attachment"></div>}
                          <div className={`d-inline-block emaildate font-weight-${isHighlight===initialHeader[3].id?"bold":"normal"}`}>{
                            moment().isSame(moment(email.datetime), 'day') ? moment(email.datetime).format("H:mm") :
                            moment().isSame(moment(email.datetime), 'year') ? moment(email.datetime).format("MMM DD"): 
                              moment(email.datetime).format("YYYY/MM/DD")
                          }</div>
                          <div className="d-inline-block detail"></div>                 
                        </div>
                      </div>
                      <div className={`d-flex justify-content-between align-items-center font-weight-${isHighlight===initialHeader[1].id?"bold":"normal"}`}>
                        <span className="truncate">{email.emailTo}</span> 
                        {!!email.replies && <span className="badge badge-secondary">+{email.replies.length}</span>}
                      </div>

                    </div>                    
                  </div></div>

                  <div className={`d-flex justify-content-between align-items-center font-weight-${isHighlight===initialHeader[2].id?"bold":"normal"}`}>
                    <span className="mob-subject truncate">{email.subject}</span>                    
                  </div>                
                </td>
              </tr >              
            ))
          }
          </tbody>
        </table>
       
        )}    
      </div>

      {showModal && <Backdrop />}
      {showModal && (
        <Modal
          title={emailGroup.subject}
          canClose
          onClose={modalCloseHandler}
        >
          <div className="list-group">            
            <div className="list-group-item list-group-item-action flex-column align-items-start"
              onClick={()=> setToggles({...toggles, [emailGroup.id]: toggles[emailGroup.id]===undefined? true: !toggles[emailGroup.id]})
              }
            >
              <div className="d-flex w-100 justify-content-between">
                <div className="font-weight-bold mb-1">{emailGroup.emailFrom}</div>                
                <small className="text-muted">{!!emailGroup.attachment && <span className="d-inline-block attachment"></span>}
                  {moment().isSame(moment(emailGroup.datetime), 'day') ? moment(emailGroup.datetime).format("h:mm a") :
                  moment().isSame(moment(emailGroup.datetime), 'year') ? moment(emailGroup.datetime).format("MMM DD, h:mm a"): 
                  moment(emailGroup.datetime).format("dddd, MMMM Do YYYY, h:mm a")}</small>
              </div>
              <small className={`text-muted ${toggles[emailGroup.id]?"":"d-none"}`}><strong>To</strong> {emailGroup.emailTo}</small>
              <p className={`mb-1 ${toggles[emailGroup.id]?"":"text-truncate"}`}>{emailGroup.body}</p>
              {toggles[emailGroup.id] && !!emailGroup.attachment && ( 
                <>
                <hr/>
                <span className="small">{emailGroup.attachment.length} Attachment{emailGroup.attachment.length>1 && "s"}</span>
                {emailGroup.attachment.map((item, index)=>(
                  <p key={index}>[{item}]</p>
                ))
                }
                </>
              )}
            </div>
            {!!emailGroup.replies &&
              emailGroup.replies.map(reply=>(
                <div className="list-group-item list-group-item-action flex-column align-items-start"
                  onClick={()=>setToggles({...toggles, [reply.id]: toggles[reply.id]===undefined? true: !toggles[reply.id]})
                  } key={reply.id}
                >
                  <div className="d-flex w-100 justify-content-between">
                    <div className="font-weight-bold mb-1">{reply.emailFrom}</div>                
                    <small className="text-muted">{!!reply.attachment && <span className="d-inline-block attachment"></span>}
                      {moment().isSame(moment(reply.datetime), 'day') ? moment(reply.datetime).format("h:mm a") :
                      moment().isSame(moment(reply.datetime), 'year') ? moment(reply.datetime).format("MMM DD, h:mm a"): 
                      moment(reply.datetime).format("dddd, MMMM Do YYYY, h:mm a")}</small>
                  </div>
                  <small className={`text-muted ${toggles[reply.id]?"":"d-none"}`}><strong>To</strong> {reply.emailTo}</small>
                  <p className={`mb-1 ${toggles[reply.id]?"":"text-truncate"}`}>{reply.body}</p>
                  {toggles[reply.id] && !!reply.attachment && ( 
                    <>
                    <hr/>
                    <span className="small">{reply.attachment.length} Attachment{reply.attachment.length>1 && "s"}</span>
                    {reply.attachment.map((item, index)=>(
                      <p key={index}>[{item}]</p>
                    ))
                    }
                    </>
                  )}
                </div>
              ))
            }
          </div>
        </Modal>
      )}

    </div>
  );
}

export default App;
