'use client'
import React from 'react'
import { useState, useRef } from 'react';
import {
  CircleXIcon,
  ImageIcon,
  ChartBarBigIcon,
  SmileIcon,
  CalendarClockIcon
} from 'lucide-react'
import data from '@emoji-mart/data';
import Picker from '@emoji-mart/react';

function Input() {
  const [input,setInput] = useState("");
  const [selectedFile, setSeletedFile] = useState(null);
  const [showEmojis, setShowEmojis] = useState(false);
  const filePickerRef = useRef(null);

  const addImageToPost = (e) => {

  };

  const addEmoji = (e) => {
    let sym = e.unified.split('-');
    let codesArray = [];
    sym.forEach((el) => codesArray.push('0x' + el));
    let emoji = String.fromCodePoint(...codesArray);
    setInput(input + emoji);
  };

  return (
    <div className={'border-b border-[#2f3336] p-3 flex space-x-3 overlfow-y-scroll'}> 
      <img 
          src="https://pbs.twimg.com/media/Gv9wxd9WQAAYZmG?format=jpg&name=large" 
          alt="input image" 
          className="h-11 w-11 rounded-full cursor-pointer"/>
      <div className="w-full divide-y divide-[#2f3336]">
        <div className={''}> 
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
                className="absolute w-8 h-8 bg-[#15181c] hover:bg-[#272c26] bg-opacity-75 rounded-full flex items-center justify-center top-1 left-1 cursor-pointer" 
                onClick={() => setSeletedFile(null)}
                > 
                <CircleXIcon className="text-white h-5"/>
                <img 
                  src={selectedFile} 
                  alt=""
                  className="rounded-2xl max-h-80 object-contain"
                />
              </div>
            </div>
          )}
        </div>
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
        </div>
      </div>
    </div>
  )
}

export default Input