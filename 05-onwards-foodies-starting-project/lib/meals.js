import sql from 'better-sqlite3'

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