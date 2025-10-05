import Link from "next/link";
import classes from './page.module.css'
import MealsGrid from "@/components/meals/meals-grid";
export default function MealsPage(){
    return(
        <>
            <header className={classes.header}>

                <h1>
                    Delcious meals
                </h1>

                <p>Choose your fav recipe.</p>

                <p className={classes.cta}>
                    <Link href='/meals/share'>
                        share your fav recipe
                    </Link>
                </p>

            </header>

            <main className={classes.main}>

                <MealsGrid meals={[]}/>
            </main>
            
           
        </>
    )
}