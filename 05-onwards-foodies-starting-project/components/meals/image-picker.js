'use client'

import { useRef, useState } from 'react'
import classes from './image-picker.module.css'

export default function ImagePicker({label, name}) {
  
  const imagePickerRef = useRef()
  
  function handleImageClick() {
    imagePickerRef.current.click()
  }


 

    return (
    <div className={classes.picker}>
        <label htmlFor={name}>
            {label}
        </label>

        <div className={classes.controls}>
            <input
                className={classes.input}
                type="file"
                id={name}
                accept="image/png, image/jpeg"
                name={name}
                ref={imagePickerRef}
            />

            <button
            className={classes.button}
            type='button'
            onClick={handleImageClick}
            >Pick an Image</button>
        </div>
    </div>
  )
}
