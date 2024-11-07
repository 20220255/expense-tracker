import { currentUser } from "@clerk/nextjs/server"
import { db } from "./db"


export const checkUser = async () => {
    const user = await currentUser()

    // Check for current logged in clerk user
    if (!user) {
        return null
    }

    // Check if user is in the neon database
    const loggedInUser = await db.user.findUnique({
        where: {
            clerkUserId: user.id
        }
    })

    // If user is in the neon database, return the user
    if (loggedInUser) {
        return loggedInUser
    }

    // If user is not in the neon database, create a new user
    const newUser = await db.user.create({
        data: {
            clerkUserId: user.id,
            email: user.emailAddresses[0].emailAddress,
            name: user.firstName + " " + user.lastName,
            imageUrl: user.imageUrl
        }
    })

    return newUser
}