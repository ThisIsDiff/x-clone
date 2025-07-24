'use client'
import React from 'react'
import { useState, useRef } from 'react';
import {
  XIcon,
  ImageIcon,
  ChartBarBigIcon,
  SmileIcon,
  CalendarClockIcon
} from 'lucide-react'
import data from '@emoji-mart/data';
import Picker from '@emoji-mart/react';
import { db, storage } from '../../firebase'; // Adjust the import based on your firebase setup
import {
  addDoc,
  collection, 
  doc,
  serverTimestamp,
  updateDoc,}
  from 'firebase/firestore';
import {getDownloadURL, ref, uploadString } from 'firebase/storage';

function Input() {
  const [input,setInput] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [showEmojis, setShowEmojis] = useState(false);
  const[loading, setLoading] = useState(false);
  const filePickerRef = useRef(null);

  const sendPost = async () => {
    if (loading) return;
    setLoading(true);

    const docRef = await addDoc(collection(db, 'posts'), {  //add to db (database) unser posts collection
      // id: sessionStorage.user.uid,
      // username: sessionStorage.user.name,
      // userImg: sessionStorage.user.image,
      // tag: sessionStorage.user.tag,
      text: input,
      timestamp: serverTimestamp()
    })

    const imageRef = ref(storage, `posts/${docRef.id}/image`);

    if (selectedFile) {
      await uploadString(imageRef, selectedFile, "data_url").then(async () => {
        const downloadURL = await getDownloadURL(imageRef)
        await updateDoc(doc(db, "posts", docRef.id), {
          image: downloadURL
        })
      })
    }

    setLoading(false);
    setInput("");
    setSelectedFile(null);
    setShowEmojis(false);
  }

  const addImageToPost = (e) => {
    const reader = new FileReader();
    if (e.target.files[0]) {
      reader.readAsDataURL(e.target.files[0]);
    }

    reader.onload = (readerEvent) => {
      setSelectedFile(readerEvent.target.result);
    };
  };

  const addEmoji = (e) => {
    let sym = e.unified.split('-');
    let codesArray = [];
    sym.forEach((el) => codesArray.push('0x' + el));
    let emoji = String.fromCodePoint(...codesArray);
    setInput(input + emoji);
  };


  return (
    <div className={`border-b border-[#2f3336] p-3 flex space-x-3 overlfow-y-scroll ${loading && "opacity-60"}`}> 
      <img 
          src="https://pbs.twimg.com/media/Gv9wxd9WQAAYZmG?format=jpg&name=large" 
          alt="input image" 
          className="h-11 w-11 rounded-full cursor-pointer"/>
      <div className="w-full divide-y divide-[#2f3336]">
        <div className={` ${selectedFile && "pb-7"} ${input && "space-y-2.4"}`}> 
          <textarea 
            value={input} 
            onChange={(e) => setInput(e.target.value)}
            rows={2} 
            placeholder="What's happening?"
            className="bg-transparent outline-none text-[#e4e6eb] text-lg placeholder-[#71767b] tracking-wide w-full min-h-[50px] hidden-scrollbar"
          />
          {selectedFile && (
            <div className="relative"> 
              <div 
                className="absolute w-8 h-8 bg-[rgba(21,24,28,0.75)] hover:bg-[rgba(39,44,38,0.75)] rounded-full flex items-center justify-center top-1 right-3.5 cursor-pointer" 
                onClick={() => setSelectedFile(null)}
                > 
                <XIcon className="text-white h-5"/>
              </div>
              <img 
                src={selectedFile} 
                alt=""
                className="rounded-2xl max-w-[514px] object-contain"
              />
            </div>
          )}
        </div>
{!loading && (
        <div className="flex items-center justify-between pt-2.5">
          <div className="flex items-center">
            <div className="relative">
              {showEmojis && (
              <div className="absolute left-0 top-10 z-50">
                <Picker
                data={data}
                onEmojiSelect={addEmoji}
                theme="dark"
                perLine={9}
                emojiSize={24}
                navPosition="top"
                style={{ marginLeft: -40 }}
                />
              </div>
              )}
            </div>
            <div className="icon" onClick= {() => filePickerRef.current.click()}>
              <ImageIcon className="h-[22px] text-[#1d9bf0]" />
              <input 
                type="file" 
                onChange={addImageToPost} 
                ref={filePickerRef} 
                hidden/>
            </div>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        
            <div className="icon">
              <ChartBarBigIcon className="text-[#1d9bf0] h-[22px]" />
            </div>

            <div className="icon" onClick={() => setShowEmojis(!showEmojis)}>
              <SmileIcon className="text-[#1d9bf0] h-[22px]" />
            </div>

            <div className="icon">
              <CalendarClockIcon className="text-[#1d9bf0] h-[22px]" />
            </div>
          </div>
            <button className="bg-[#eff3f4] text-[#0f1419] rounded-full px-4 py-1.5 font-bold shadow-md hover:bg-[rgb(215,219,220)] cursor-pointer disabled:hover:bg-[#eff3f4] disabled:opacity-50 disabled:cursor-default border-color:[#000000]" disabled={!input.trim() && !selectedFile} onClick={sendPost}>Post</button>
        </div>
)}
      </div>
    </div>
  )
}

export default Input