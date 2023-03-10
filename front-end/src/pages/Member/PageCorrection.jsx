import Stack from '../../components/common/Stack'
import Input from '../../components/form/Input'
import TextArea from '../../components/form/TextArea'
import InputGroup from '../../components/form/InputGroup'
import Button from '../../components/form/Button'
import FlexBox from '../../components/common/FlexBox'
import useAuth from '../../hooks/useAuth'
import { useNavigate } from 'react-router-dom'
import { useCallback, useEffect, useRef, useState } from 'react'
import axios from 'axios'
import { da } from 'date-fns/locale'
import PopAddDom from '../../components/header/PopAddDom'
import PopAddPostCode from '../../components/header/PopAddPostCode'
import { set } from 'date-fns'
import el from 'date-fns/esm/locale/el/index.js'

const PageCorrection= () => {


const id = sessionStorage.getItem("mid");

const nav = useNavigate();

const inputBoard = useRef();
const borderCh = (e) => {
  inputBoard.current.style.border = '1px solid lightgray';
  inputBoard.current.style.background = 'white';
  inputBoard.current = e.target
  inputBoard.current.style.border = '1px solid black';
  inputBoard.current.style.background = 'rgb(245,245,245)';

}

const [userInfo, setUserInfo] = useState({})
const [data, setData] = useState({
  
});
const [a, setA] = useState('');
useEffect(()=> {
  const id = sessionStorage.getItem("mid");

    axios
    .post("/mypage", null,{params:{mid:id}})
    .then((res)=> {
      console.log(res.data)
      setUserInfo(res.data);
      setData(res.data)
    })
    .catch((err)=> console.log(err));
  
  console.log(userInfo)
  //setA(userInfo.maddr);
},[])

// console.log(data)

const onch = useCallback(
  (e) => {
    if(a === '') {
      console.log(a)
      setA(data.maddr)
    }
    //setA()
    let newData = {
      ...data,
      mpwd : '',
      maddr:a,
      [e.target.name]: e.target.value,      
    }

    console.log(newData)
    setData(newData)
  },[data]
);

const pwdRegExp = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,25}$/;

const onWrite = useCallback(
  (e) => {
    e.preventDefault();
    console.log(id);
    console.log(data)
    
      if(!pwdRegExp.test(data.mpwd)&&data.mpwd!==""){
        window.alert('??????+?????????+???????????? ???????????? 8?????? ?????? ??????????????????!')
        return;
      }else if(pwdRegExp.test(data.mpwd)||data.mpwd===""){
        axios
        .post("/updateMy", data)
        .then((res)=>{
      console.log(res.data);
      if(res.data === '?????? ??????'){
        window.alert('?????????????????????.');
        sessionStorage.removeItem('myPage')
        console.log(data.mpwd)
        
        nav('/member/mypage');
        
      } else{
        window.alert("?????? ??????");
        console.log(data.mpwd)
        
      }
    }).catch((err) => console.log(err));
    }    
  }, 
);

const cancle = () => {
  window.alert('?????????????????????.')
  nav('/member/mypage');
}


// ????????? ?????? ??????
const [isPopupOpen, setIsPopupOpen] = useState(false)

// ????????? ??????
const openPostCode = () => {
  setIsPopupOpen(true)
}

// ????????? ??????
const closePostCode = (v) => {
  setIsPopupOpen(false)
  console.log(v)
  //console.log(a)
  console.log(data)
    let newData = {
      ...data,
      maddr: v,  
    }

    console.log(newData)
    setData(newData)
}

  return (
    <form style={{ margin:'0 auto' ,width: '70%' }} onSubmit={()=>{onWrite()}}>
    <Stack style={{ width: '100%' }}>
      <InputGroup label="?????????">
        <Input style={{border: 0}} type="text" value={userInfo.mid} readOnly />
      </InputGroup>
      <InputGroup label="??????">
        <Input type="text" name='mname' ref={inputBoard} onClick={(e)=>borderCh(e)} onChange={(e)=>{onch(e)}} defaultValue={userInfo.mname} />
      </InputGroup>
      <InputGroup label="????????????">
        <Input type="password" name='mpwd' ref={inputBoard} onClick={(e)=>borderCh(e)} onChange={(e)=>{onch(e)}} />
      </InputGroup>
      <InputGroup label="?????????">
        <Input
          type="text" name='memail' ref={inputBoard} onClick={(e)=>borderCh(e)} onChange={(e)=>{onch(e)}} defaultValue={userInfo.memail} />
      </InputGroup>
      <InputGroup label="?????????">
        <Input
          type="text" name='mphone' ref={inputBoard} onClick={(e)=>borderCh(e)} onChange={(e)=>{onch(e)}} defaultValue={userInfo.mphone}  />
      </InputGroup>
      <InputGroup label="??????">
        <TextArea style={{overflow:'hidden', lineHeight:'25px', textAlign:'left'}}
          className="Input" type="text" value={a} name="maddr" 
          required defaultValue={userInfo.maddr} onClick={() => openPostCode()} ref={inputBoard}
           />
        </InputGroup>
        <InputGroup label="?????? ??????">
         <Input 
            type="text" name="mdaddr" ref={inputBoard} onClick={(e)=>borderCh(e)} onChange={(e)=>{onch(e)}} defaultValue={userInfo.mdaddr}
           />
        {/* <TextArea name='maddr'  onChange={(e)=>{onch(e)}} defaultValue={userInfo.maddr}  /> */}
      </InputGroup>
      <FlexBox gap={30} style={{ width: '500px', margin: '0 auto' }}>
        <Button onClick={(e)=>{onWrite(e);} }  style={{ flex: 1 }}>????????????</Button>
        <Button onClick={cancle} style={{ flex: 1 }}>????????????</Button>
        {/* ?????? ??? ?????? ?????? */}
      {/* ?????? ?????? ?????? div */}
      <div id="popupDom">
        {isPopupOpen && (
          <PopAddDom>
            <PopAddPostCode onClose={closePostCode} setA={setA} />
          </PopAddDom>
        )}
      </div>
      </FlexBox>
    </Stack>
  </form>
  
  )
}
export default PageCorrection;
