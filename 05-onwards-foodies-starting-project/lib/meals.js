import sql from 'better-sqlite3'
import slugify from 'slugify';
import xss from 'xss';
import fs from 'node:fs'

const db = sql('meals.db')

//gets the meals from the database
export function getMeals() {

    //  new Promise((resolve) => {
    //     setTimeout(resolve, 2000)
    // })
    
    // throw new Error('Loading failed')
    //We're getting All meals by fetching it
    return db.prepare('SELECT * FROM meals').all();
}


export function getMeal(slug) {
    //this gets one singular meal
    return db.prepare('SELECT * FROM meals WHERE slug = ?').get(slug)
}

export async function saveMeal(meal) {
    //{lower: true} means set all values to lowercase
    meal.slug = slugify(meal.title, {lower: true})
    meal.instructions = xss(meal.instructions)

    //gets the file image extension. 
    //Checks if its a JPEG or PNG
    //.name carries the name of the image file uploaded
    const extension = meal.image.name.split('.').pop()

    const fileName = `${meal.slug}.${extension}`

    const stream = fs.createWriteStream(`public/images/${fileName}`)

    const bufferedImage = await meal.image.arrayBuffer()

    stream.write(Buffer.from(bufferedImage), (error) =>{
        if (error) {
            throw new Error('Saving image failed')
        }
    })

    stream.end() 
    meal.image = `/images/${fileName}`


    db.prepare(`
        
        INSERT INTO meals
        (title, summary, instructions, creator, creator_email, image, slug)

        VALUES(
        
         @title,
         @summary,
         @instructions,
         @creator,
         @creator_email,
         @image,
         @slug
        
        )
        
        `).run(meal)
}