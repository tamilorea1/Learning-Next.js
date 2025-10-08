'use server';

import { redirect } from "next/navigation";
import { saveMeal } from "./meals";

 //this ensures the function executes on the server and only there.
  //basically a function that executes on a server

  //we also take a parameter 'formData'
  //this will be used to get the input fields of different names
  
  function isInvalidText(text) {
    return !text || text.trim() === ''
  }
  
  export async function shareMeal(formData) {

    const meal ={
      title: formData.get('title'),
      summary: formData.get('summary'),
      creator_email: formData.get('email'),
      instructions: formData.get('instructions'),
      image: formData.get('image'),
      creator: formData.get('name')

    }

    // console.log(meal)

    if (isInvalidText(meal.title) || 
        isInvalidText(meal.summary) ||
        isInvalidText(meal.instructions) ||
        isInvalidText(meal.creator)||
        isInvalidText(meal.creator_email) ||
        !meal.creator_email.includes('@')||
        isInvalidText(meal.image)  || meal.image.size === 0  
    ) {
        throw new Error('Invalid Input')
    }
    
    await saveMeal(meal)

    redirect('/meals')
  }