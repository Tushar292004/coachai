import { currentUser } from "@clerk/nextjs/server"

export const checkUser = async () => {
    const user = await currentUser();

    if (!user) {
        return null
    }

    try {
        //Check if user is stored in database or not
        const loggedInUser = await db.user.findUnique({
            where: {
                clerkUserId: user.id,
            }
        })

        //If user stored in database return user
        if (loggedInUser) {
            return loggedInUser
        }

        //If user not stored in database, store user in database
        const name = `${user.firstName} ${user.lastName}`
        const newUser = await db.user.create({
            data: {
                clerkUserId: user.id,
                name,
                imageUrl: user.imageUrl,
                email: user.emailAddresses[0].emailAddress,
            }
        })
        return newUser;

    } catch (error) {
        console.log(error.message);
        
    }

}