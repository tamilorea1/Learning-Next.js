import { getMeal } from "@/lib/meals";
import Image from "next/image";
import { notFound } from "next/navigation";

export default function MealsDetailsPage({params}){
    const meal = getMeal(params.slug)


    if (!meal) {
        notFound()
    }

    return (
        <>
            <header>
                <div>
                    {/* <Image src={meal.image} alt="Meal image" fill/> */}
                    <Image fill/>
                </div>

                <div>
                    <h1>{meal.title}</h1>
                    <p>
                        by <a href={`mailto:${meal.creator_email}`}>{meal.creator}</a>
                    </p>

                    <p>
                        {meal.summary}
                    </p>
                </div>
            </header>

            <main>
                <p dangerouslySetInnerHTML={{
                    __html:meal.instructions,
                }}></p>
            </main>
        </>
    )
}