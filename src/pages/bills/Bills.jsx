import React, { useState } from 'react'
import './Bills.css'
import Sidebar from '../../component/sidebar/Sidebar'
import Billtable from '../../component/billTable/Billtable'
import Billpopup from '../../component/billPopup/Billpopup'
import { Link, useLocation } from 'react-router-dom'
// import Billcard from '../../component/billCard/Billcard'
// import useFetch from '../../hooks/useFetch'

const Bills = () => {
  const loaction=useLocation().search.split('?');
  const projectId=loaction[1].split('=')[1];
  const projectname=loaction[2].split('=')[1].replaceAll('%20',' ');
  const [open,setOpen]=useState(false)
  const[change,setChange]=useState(0)
  const [item,setItem]=useState({name:'',invoiceDate:'',typeBill:'',status:''})
  const [input,setInput]=useState(false)
  // const { loding, data } = useFetch({
  //   url: `/Bill/GetByProjectId?page=${1}&pageSize=${100}&projectId=${projectId}`,
  //   change,
  // });
  return (
    <div>
      <div className="bill-main-container">
        <div className="bill-left"><Sidebar id={2}/>
        </div>
        <div className="bill-right">
              <div className={`${open?'bill-top blur':'bill-top'}`}>
                <div className="bill-path">
                <Link to={`/project`} className='bill-link'>Projects</Link>/<Link to={`/project/${projectId}`} className='bill-link'>{projectname[0].toUpperCase()+projectname.slice(1)} / </Link> <span>Bills</span>
                </div>
              </div>
              <div className={`${open?'bill-middle blur':'bill-middle'}`} >
                <div className="bill-summary">
                    <h3 className="summary-title">
                      Summary
                    </h3>
                    <div className="summary-container">
                      <div className="summary-box"></div>
                      <div className="summary-box"></div>
                      <div className="summary-box"></div>
                      <div className="summary-box"></div>
                    </div>
                </div>
                {/* <div className="add-card">
                  +
                </div>
                {!loding && data?.items?.map((item)=>(<Billcard key={item?.id} item={item}/>))} */}
              </div>
              <div className={`${open?'bill-footer blur':'bill-footer'}`}>
                <div className="bill-table">
                  <div className="bill-con">
                   <h3 className="bill-table-title">Bills</h3>
                   <button className="add-bill" onClick={()=>setOpen(true)}>+ Add Bill</button>
                  </div>
                  <Billtable setOpen={setOpen} change={change} setItem={setItem} setInput={setInput} setChange={setChange} open={open}/>
                </div>
              </div>
          {open && <Billpopup setOpen={setOpen} input={input} item={item} setItem={setItem} setInput={setInput} setChange={setChange} change={change}/>}
        </div>
      </div>
    </div>
  )
}

export default Bills
